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
export default class NewClass extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    @property(cc.Prefab)
    prfab: cc.Prefab = null;

    @property(cc.EditBox)
    edit: cc.EditBox = null;

    @property(cc.Button)
    queding: cc.Button = null;

    @property(cc.Node)
    pieceLayer: cc.Node=null;

    bihua: cc.JsonAsset = null
    daan: String = null;

    map = [[100,300],[100,200],[100,100],
           [250,300],[250,200],[250,100],
        ]

    _t = ['孔','王','飞'];
    
    _n = 0;

    onLoad () {
        this.queding.node.on('click', this.callback, this);
        // var piece = cc.instantiate(this.prfab).getComponent(cc.Label);
        //         piece.string = 'test';
        //         piece.node.parent = this.pieceLayer;
        //         piece.node.x = 200;
        //         piece.node.y = 200;
        var self = this;
        cc.loader.loadRes('bihua.json', function (err, object) {
            if (err) {
                console.log(err);
                return;
            }
            // 读取的数据返回在object中，这是一个拥有2个元素的对象
            self.bihua = object.json;
            var bihua = object.json;
            var _b = self._t[self._n]
            console.log(_b)
            var _now = bihua._b
            console.log(_now)

            for (var _i = 0; _i < _now.length; _i++) {
                var piece = cc.instantiate(self.prfab).getComponent(cc.Label);
                var _s = _now[_i];
                var _m = self.map[_i]
                piece.string = (_i+1).toString()+'、'+_s;
                piece.node.parent = self.pieceLayer;
                piece.node.x = _m[0];
                piece.node.y = _m[1];
                console.log(_s);
            }
            
        });
    }

    callback (){
        console.log(this.edit.string)
        if (this.edit.string==this.daan){
            // cc.director.loadScene('main')
            this._n += 1;
            var _b = this._t[this._n]
            var _now = this.bihua._b

            for (var _i = 0; _i < _now.length; _i++) {
                var piece = cc.instantiate(this.prfab).getComponent(cc.Label);
                var _s = _now[_i];
                var _m = this.map[_i]
                piece.string = (_i+1).toString()+'、'+_s;
                piece.node.parent = this.pieceLayer;
                piece.node.x = _m[0];
                piece.node.y = _m[1];
                console.log(_s);
            }
        }
    }
    start () {
        // // this.label.string=this.text;
        // var self = this;
        // cc.loader.loadRes('bihua.json', function (err, object) {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        
        //     // 读取的数据返回在object中，这是一个拥有2个元素的对象
        //     let bihua = object.json;
        //     // self.label.string = bihua.八[0];
        //     self.pieceLayer.removeAllChildren();
        //     for (let i of bihua.八) {
        //         console.log(i);
        //         var piece = cc.instantiate(self.prfab).getComponent(cc.Label);
        //         piece.string = i;
        //         piece.node.parent = self.pieceLayer;
        //         piece.node.x = 10;
        //         piece.node.y = 10;
        //      }
            
        // });
    }

    // update (dt) {
    //     console.log(this.edit.string)
    //     if (this.edit.string=='八'){
    //         cc.director.loadScene('main')
    //     }
    // }
}
