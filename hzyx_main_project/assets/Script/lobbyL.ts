const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {


    onLoad () {
        let exportJson = {};
        let sysInfo = window.wx.getSystemInfoSync();
        //获取微信界面大小
        let width = sysInfo.screenWidth;
        let height = sysInfo.screenHeight;

        window.wx.getSetting({
            success (res) {
                console.log(res.authSetting);
                console.log("用户未授权");
                    let button = window.wx.createUserInfoButton({
                        type: 'text',
                        text: '',
                        style: {
                            left: 120,
                            top: 50,
                            width: width,
                            height: height,
                            backgroundColor: '#00000000',//最后两位为透明度
                            color: '#ffffff',
                            fontSize: 20,
                            textAlign: "center",
                            lineHeight: height,
                        }
                    });
                    button.onTap((res) => {
                        if (res.userInfo) {
                            console.log("用户授权:", res);
                            exportJson.userInfo = res.userInfo;
                            //此时可进行登录操作
                            button.destroy();
                        }else {
                            console.log("用户拒绝授权:", res);
                        }
                    });
            }
        })
    };

}