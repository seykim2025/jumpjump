import { _decorator, Component, Node, Prefab, instantiate, Label } from 'cc';
const { ccclass, property } = _decorator;
/**
 * 랭킹界面,脚本
 * @author 개발자
 * Construct 
 *///电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
@ccclass('RankCtl')
export class RankCtl extends Component {
    //预制体,랭킹你的
    @property({type:Prefab})
    pre_rank_item:Prefab = null;
    //排行数据容器
    @property({type:Node})
    content:Node = null;



    start() {
        //默认不显示
        this.node.active = false;
    }

    update(deltaTime: number) {
        
    }
    /**
     * 显示该页面
     */
    show(){
        this.node.setPosition(0,0);
        this.node.active = true;
        this.content.removeAllChildren();
        //制造假数据
        for(let i = 0;i<15;i++){
            let item = instantiate(this.pre_rank_item);
            item.setParent(this.content);
            item.setPosition(-7,i*-72-35);

            //假数据哦
            item.getChildByName("order").getComponent(Label).string = i+1+"";
            item.getChildByName("nick_name").getComponent(Label).string = "플레이어"+i+"";
            item.getChildByName("score").getComponent(Label).string = Math.round(Math.random()*100)+"";

        }
    }

    /**
     * 关闭该页面
     */
    close(){
        this.node.setPosition(-1000,0);
        this.node.active = false;
    }
}

