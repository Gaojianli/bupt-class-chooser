import fetch from 'node-fetch'
import config from './config.json'
import { getXKList } from './getXKList'
import { getClassList } from './getClassList'
import { expected } from './filter.json'
let consoleCount = 0
async function main() {
    let xkLink
    do {
        xkLink = await getXKList(config.cookie)
        if (!xkLink) {
            console.log('选课尚未开始！')
        }
    }
    while (xkLink === undefined)
    xkLink = config.base + xkLink.replace('xklc_view', 'xsxk_index')
    await fetch(xkLink, {
        headers: {
            accept: '*/*',
            'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6',
            'x-requested-with': 'XMLHttpRequest',
            cookie: config.cookie
        },
        body: undefined,
        method: 'GET',
    })
    console.log('尝试获取课程列表...')
    const list = await getClassList()
    let classList = []
    if (list) {
        console.log('课程列表获取成功')
        classList = (list.aaData as { fzmc: string; jx02id: string; jx0404id: string, kcmc: string }[]).map(item => ({
            name: config.compulsory ? item.fzmc : item.kcmc,
            url: `http://jwgl.bupt.edu.cn/jsxsd/xsxkkc/bxxkOper?kcid=${item.jx02id}&cfbs=null&jx0404id=${item.jx0404id}&xkzy=&trjf=`
        }))
        if (!config.hunger) {
            classList = classList.filter(item => {
                for (const expect of expected) {
                    if (item.name.includes(expect)) {
                        return true
                    }
                }
                return false
            })
        }
        let successFlag = false
        while (!successFlag) {
            await Promise.all(classList.map(async classToGet => {
                const data = await fetch(classToGet.url, {
                    headers: {
                        accept: '*/*',
                        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6',
                        'x-requested-with': 'XMLHttpRequest',
                        cookie: config.cookie
                    },
                    body: undefined,
                    method: 'GET',
                })
                const result = await data.json()
                if (!result.success || result.success[1] === false) {
                    console.log(`${classToGet.name}:${result.message}`)
                    consoleCount++
                } else {
                    console.log(`抢课成功:${classToGet.name}`)
                    successFlag = true
                    if(!config.hunger)
                        setTimeout(() => global.process.exit(0), 1000);
                }
            }))
            if (consoleCount > 200) {
                console.clear()
                consoleCount = 0
            }
        };
    } else {
        console.log('课程列表为空，请检查课程类型是否有误')
        process.exit(0)
    }
};
main()
