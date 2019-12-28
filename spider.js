const fetch = require('node-fetch');
const config = require('./config.js');
const getXKList = require('./getXKList.js');
const getClassList = require('./getClassList.js');
const filter = require('./filter');
let consoleCount = 0;
async function main() {
    let xkLink;
    do {
        xkLink = await getXKList(config.cookie);
    }
    while (xkLink == undefined);
    xkLink = config.base + xkLink.replace("xklc_view", "xsxk_index");
    await fetch(xkLink, {
        "headers": {
            "accept": "*/*",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6",
            "x-requested-with": "XMLHttpRequest",
            "cookie": config.cookie
        },
        "referrer": "http://jwgl.bupt.edu.cn/jsxsd/xsxkkc/comeInBxxk",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors"
    })
    console.log("尝试获取课程列表...");
    const list = await getClassList();
    let classList = [];
    if (list) {
        console.log("课程列表获取成功");
        classList = list.aaData.map(item => ({
            name: item.fzmc,
            url: `http://jwgl.bupt.edu.cn/jsxsd/xsxkkc/bxxkOper?kcid=${item.jx02id}&cfbs=null&jx0404id=${item.jx0404id}&xkzy=&trjf=`
        }));
        if (!config.jibuzeshi)
            classList = classList.filter(item => {
                for (const expect of filter) {
                    if (item.name.includes(expect))
                        return true;
                }
                return false;
            });
        let successFlag = false;
        while (!successFlag) {
            await Promise.all(classList.map(async classToGet => {
                const data = await fetch(classToGet.url, {
                    "headers": {
                        "accept": "*/*",
                        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6",
                        "x-requested-with": "XMLHttpRequest",
                        "cookie": config.cookie
                    },
                    "referrer": "http://jwgl.bupt.edu.cn/jsxsd/xsxkkc/comeInBxxk",
                    "referrerPolicy": "no-referrer-when-downgrade",
                    "body": null,
                    "method": "GET",
                    "mode": "cors"
                })
                const result = await data.json();
                if (!result.success || result.success[1] == false) {
                    console.log(`${classToGet.name}:${result.message}`);
                    consoleCount++;
                } else {
                    console.log(`抢课成功:${classToGet.name}`);
                    successFlag = true;
                    global.process.exit(0);
                }
            }));
            if (consoleCount > 200) {
                console.clear();
                consoleCount = 0;
            }
        };
    }
    else{
        console.log('课程列表为空，选课可能还未开始');
        process.exit(0);
    }
};
main();