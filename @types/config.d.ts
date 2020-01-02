declare module '*config.json' {
    export interface config {
        cookie: string, // Your cookies
        base: string, // Base url
        compulsory: boolean, //必修/选修开关
        RenXuanKe: boolean//任选课开关
        hunger: boolean // 饥不择食模式
    }
}