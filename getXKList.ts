import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'
export function getXKList(cookie: string): Promise<string> | undefined {
    return fetch('http://jwgl.bupt.edu.cn/jsxsd/xsxk/xklc_list', {
        headers: {
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6',
            'upgrade-insecure-requests': '1',
            cookie: cookie
        },
        body: undefined,
        method: 'GET'
    }).then(res => res.text())
        .then(data => {
            const {
                document
            } = (new JSDOM(data)).window
            Object.assign(global, document);
            if (data.includes('请先登录系统')) { throw Error('请重新登录') }
            const window = document.defaultView
            const $ = require('jquery')(window)
            return $('a:contains("进入选课")').attr('href')
        }).catch(err => {
            console.log(`Cookie可能已失效,${err}`)
            process.exit(-1)
        })
}
