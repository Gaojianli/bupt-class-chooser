# bupt-class-chooser
[老教务系统](https://github.com/linyinfeng/bupt-class-chooser)
## Usage
### Install Dependencies
```bash
npm i
```
### Config
1. 填写`config.json`
    |参数名称|类型|描述|
    | ------ | ------ | ------ |
    |cookie|`string`|你的cookie|
    |base|`string`|教务系统URL，可替换为IP|
    |compulsory|`boolean`|必修/选修开关|
    |RenXuanKe|`boolean`|校任选课开关|
    |jibuzeshi|`boolean`|饥不择食模式，选择所有能选的课。注意：**非常不建议此开关与校任选课开关同时打开，后果自负**|
1. 在`filter.json`填写你想要选择的科目
### Run
```bash
npm start
```