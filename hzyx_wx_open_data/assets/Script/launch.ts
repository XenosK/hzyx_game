// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Launch extends cc.Component {

    @property(cc.Label)
    tips: cc.Label = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Prefab)
    user_score: cc.Prefab = null;

    // onLoad () {}

    start () {
        if (typeof wx === 'undefined') {
            return;
        }

        wx.onMessage(data => {
            switch (data.message) {
                case 'Show':
                    this.content.removeAllChildren();
                    this._show();
                    break;
                case 'Hide':
                    this._hide();
                    break;
            }
        });

        // 初始化标题，用户，好友信息
        this.initTips();
        // this.initUserInfo();
        this.initFriendInfo();

        // 初始化用户数据，读取到全局变量
        // this.initPlayerInfo();

    }

    // update (dt) {}

    // 初始化标题
    initTips () {
        let renderTypeStr = 'Canvas';
        if (cc.game.renderType === cc.game.RENDER_TYPE_WEBGL) {
            renderTypeStr = 'WEBGL';
        }
        this.tips.string = `排行榜${renderTypeStr}`
    }

    //初始化用户信息
    initUserInfo () {
        wx.getUserInfo ({
            openIdList: ['selfOpenId'],
            lang: 'zh_CN',
            success: (res) => {
                // for (var i; i<20; ++i) {
                this.createUserBlock(res.data[0])
                // }
            },

            fail: (res) => {
                console.error(res);
            }
        })
    }

    // 初始化好友信息
    initFriendInfo () {
        wx.getFriendCloudStorage({
            keyList: ["score"],

            success: (res) => {
                for (let i = 0; i < res.data.length; ++i) {
                    this.createUserBlock(res.data[i])
                }
            },

            fail: (res) => {
                console.error(res);
            },
        });

    }

    // 构造用户block
    createUserBlock (user) {
        let node = cc.instantiate(this.user_score);
        node.parent = this.content;
        node.x = 0;
        //设置用户名
        let userName = node.getChildByName('userName').getComponent(cc.Label);
        let name = user.Nickname || user.nickname
        if (user.KVDataList.length > 0) {
            console.log(user.KVDataList)
            let score = user.KVDataList[0].value;
            userName.string = name+':'+score
        } else {
            userName.string = user.nickname || user.nickname;
        }
        //设置用户照片
        cc.loader.load({url: user.avatarUrl, type: 'png'}, (err, texture) => {
            if (err) console.error(err);
            let userIcon = node.getChildByName('mask').children[0].getComponent(cc.Sprite);
            userIcon.spriteFrame = new cc.SpriteFrame(texture);
        })
    }

    // update() {
    //     wx.getUserCloudStorage({
    //         success: res => {
    //             console.log(res)
    //           const data = res.data
    //           console.log(data)
    //         },
    //         fail: res => {
    //             var kvDataList = new Array();
    //             kvDataList.push({
    //                 key: "score",
    //                 value: "111"
    //             });
    //             wx.setUserCloudStorage({
    //             KVDataList: kvDataList
    //             })
    //             console.log(res)
    //         }
    //     })
    // }

    _show() {
        console.log('i show 111');
        this.initFriendInfo();
    }
    _hide() {
        // let moveTo = cc.moveTo(0.5, 0, 1000);
        // this.display.runAction(moveTo);

    }


    // // 初始化用户数据，读取到本地全局变量
    // initPlayerInfo () {
    //     wx.getUserCloudStorage({
    //         keyList: ['shut'],
    //         success: function (res) {
    //             var KVDarray = res.KVDataList

    //             if (KVDarray){
    //                 // 已有数据
    //                 var _r = KVDarray[0]
    //                 // 写入本地缓存
    //                 cc.sys.localStorage.setItem("shut", _r.shut)
    //                 // player.shut = _r.shut
    //             } else {
    //                 // 没有用户数据，初始化用户数据,分数为0
    //                 var kvDataList = new Array();
    //                 kvDataList.push({
    //                     key: "shut",
    //                     value: "0",
    //                 });
    //                 wx.setUserCloudStorage({
    //                     KVDataList: kvDataList
    //                 })
    //             }
    //             // console.log(res.errMsg);
    //         }
    //     });
    // }
}
