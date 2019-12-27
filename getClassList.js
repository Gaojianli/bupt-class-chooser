const fetch = require('node-fetch');
const {
    cookie,
    compulsory,
} = require("./config");
module.exports = async () => (await fetch(compulsory ? 'http://jwgl.bupt.edu.cn/jsxsd/xsxkkc/xsxkBxxk' : 'http://jwgl.bupt.edu.cn/jsxsd/xsxkkc/xsxkXxxk', {
    "headers": {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-requested-with": "XMLHttpRequest",
        "cookie": cookie
    },
    "referrer": "http://jwgl.bupt.edu.cn/jsxsd/xsxkkc/comeInBxxk",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": "sEcho=1&iColumns=11&sColumns=&iDisplayStart=0&iDisplayLength=15&mDataProp_0=kch&mDataProp_1=kcmc&mDataProp_2=fzmc&mDataProp_3=ktmc&mDataProp_4=xf&mDataProp_5=skls&mDataProp_6=sksj&mDataProp_7=skdd&mDataProp_8=xqmc&mDataProp_9=ctsm&mDataProp_10=czOper",
    "method": "POST",
    "mode": "cors"
})).json()