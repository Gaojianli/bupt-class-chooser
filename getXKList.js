const jsdom = require('jsdom');
const fetch = require('node-fetch');
const {
    JSDOM
} = jsdom;
module.exports = function getXKList(cookie) {
    return fetch("http://jwgl.bupt.edu.cn/jsxsd/xsxk/xklc_list", {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6",
                "upgrade-insecure-requests": "1",
                "cookie": cookie
            },
            "referrer": "http://jwgl.bupt.edu.cn/jsxsd/framework/xsMain.jsp",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": null,
            "method": "GET",
            "mode": "cors"
        }).then(res => res.text())
        .then(data => {
            const {
                document
            } = (new JSDOM(data)).window;
            global.document = document;
            const window = document.defaultView;
            const $ = require('jquery')(window);
            return $('a:contains("进入选课")').attr("href");
        }).catch(err => {
            console.log(`Cookie可能已失效,${err}`);
            process.exit(-1);
        });
}