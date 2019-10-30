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
export default class gameManager extends cc.Component {

    @property(cc.Prefab)
    prfab: cc.Prefab = null;

    @property(cc.EditBox)
    edit: cc.EditBox = null;

    @property(cc.Button)
    submit: cc.Button = null;

    @property(cc.Button)
    idea: cc.Button = null;

    @property(cc.Node)
    pieceLayer: cc.Node=null;

    answer: String = null;

    map = [[100,500],[100,450],
           [100,400],[100,350],
           [100,300],[100,250],
        ]

    onLoad () {
        player.next_bar = this.callback_next;
        player.manager = this
        this.submit.node.on('click', this.callback_submit, this);
        this.idea.node.on('click', this.callback_idea, this);
        player.shut = new Number(cc.sys.localStorage.getItem("shut"))
        console.log(player.shut)
        console.log('haohaohao')
        var self = this;
        cc.loader.loadRes('strokes_2.json', function (err, object) {
            if (err) {
                console.log(err);
                return;
            }
            // 读取的数据返回在object中，这是一个拥有2个元素的对象
            strokes = object.json;
            console.log("初始化读取缓存：")
            // console.log(_shut)
            // 设置缓存
            // cc.sys.localStorage.setItem("shut",player.shut)
            // let _shut = cc.sys.localStorage.getItem("shut")
            
            self.panelInit(player.shut)
        });
    }

    callback_submit (){
        console.log(this.answer)
        // // console.log(this.edit.string)
        if (this.edit.string==this.answer){
            // cc.director.loadScene('main')
            //读取缓存
            let _shut = cc.sys.localStorage.getItem("shut")
            console.log("读取缓存：")
            console.log(_shut)
            player.shut +=1
            cc.sys.localStorage.setItem("shut",player.shut)
            console.log(player.shut)
            var kvDataList = [{key: 'level', value: player.shut.toString}]
            wx.setUserCloudStorage({
                KVDataList: kvDataList
            })
        
            // 下一关，后面会加上提示
            // this.panelInit(player.shut)
            cc.loader.loadRes('prefab/sucess_result', function (err, prefab) {
                if (err) {
                    console.log(err);
                    return;
                }
                var result = cc.instantiate(prefab);
                console.log(result)
                result.parent = this.pieceLayer;
                result.x = 360;
                result.y = 50;
                console.log('#####')
                console.log(this.node.children)
            }.bind(this))
        }
    }

    callback_idea (){
        var piece = cc.instantiate(this.prfab).getComponent(cc.Label);
        piece.string = '提示：'+this.answer.toString();
        piece.fontSize = 30;
        // piece.node.color = 'BLACK'
        // piece.string = _s;
        piece.node.parent = this.pieceLayer;
        piece.node.x = 300;
        piece.node.y = -300;
    }

    callback_next () {
        console.log(this.node.parent)
        console.log(this.panelInit)
        var strokeLayer = this.node.parent;
        // player.panelIni
        this.panelInit(player.shut);
    }

    panelInit(_shut) {
        // var _p = strokes[player.shut]
        if (strokes!==null){
            this.pieceLayer.removeAllChildren()
            this.edit.string = ''
            console.log(strokes)
            var _p = strokes[_shut]
            console.log(_p)
            console.log('yiyiyi')
            this.answer = _p[0]
            var stroke = _p[1]
            console.log(_p[1])
            console.log('下一关？')
            var piece = cc.instantiate(this.prfab).getComponent(cc.Label);
            piece.string = '第'+(player.shut+1).toString()+'题';
            piece.node.parent = this.pieceLayer;
            piece.node.x = 300;
            piece.node.y = 600;
            for (var _i = 0; _i < stroke.length; _i++) {
                var piece = cc.instantiate(this.prfab).getComponent(cc.Label);
                var _s = stroke[_i];
                var _m = this.map[_i];
                piece.string = '第'+(_i+1).toString()+'笔：'+_s;
                piece.node.parent = this.pieceLayer;
                piece.node.x = _m[0];
                piece.node.y = _m[1];
            }
        }
        
    }

    // start () {
    // }

    // update (dt) {
    // }
}
