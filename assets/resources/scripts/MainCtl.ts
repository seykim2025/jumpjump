import { _decorator, Component, Node, Label, macro, profiler, Color, LabelOutline, Widget, UITransform, Size } from 'cc';
import { EventDispatcher } from './EventDispatcher';
import { GameData } from './GameData';
import { LogicCtl } from './LogicCtl';
const { ccclass, property } = _decorator;
/**
 * 主脚本,挂载canvas上
 * @author 개발자
 * Construct 
 */
@ccclass('MainCtl')
export class MainCtl extends Component {

    //home_page 页面
    @property({type:Node})
    home_page:Node = null;
    //逻辑层
    @property({type:LogicCtl})
    logic_ctl:LogicCtl = null;
    //本局得分
    @property({type:Label})
    score_label:Label = null;
    
    private heartLabel: Label = null;
    private bannerNode: Node = null;

    start() {
        // Hide profiler
        profiler.hideStats();
        //设置homg page 显示在屏幕中间
        this.home_page?.setPosition(0,0);
        //注册监听自定义事件 (更新分数)
        EventDispatcher.get_instance().target.on(EventDispatcher.UPDATE_SCORE_LABEL,this.update_score_label,this);
        EventDispatcher.get_instance().target.on(EventDispatcher.UPDATE_HEART_LABEL,this.update_heart_label,this);
        //注册监听自定义事件 (게임 시작)
        EventDispatcher.get_instance().target.on(EventDispatcher.START_GAME,this.start_game,this);
        
        this.createHeartUI();
        this.createBannerPlaceholder();
        
        //延迟2秒执行自动跳
        this.schedule(this.auto_play,2,macro.REPEAT_FOREVER,2);
    }

    update(deltaTime: number) {
    }

    /**
     * 更新本局得分
     */
    update_score_label(){
        this.score_label.string = GameData.get_total_score()+"";
    }

    update_heart_label() {
        if(this.heartLabel) this.heartLabel.string = "❤ x " + GameData.get_hearts();
    }

    createHeartUI() {
        let node = new Node("HeartNode");
        this.node.addChild(node);
        let widget = node.addComponent(Widget);
        widget.isAlignRight = true;
        widget.right = 30;
        widget.isAlignTop = true;
        widget.top = 30;

        let label = node.addComponent(Label);
        label.string = "❤ x " + GameData.get_hearts();
        label.color = new Color(255, 0, 0, 255);
        label.fontSize = 40;
        
        let outline = node.addComponent(LabelOutline);
        outline.color = new Color(0, 0, 0, 255);
        outline.width = 3;
        
        this.heartLabel = label;
        
        // Ensure rendering order
        node.setSiblingIndex(999);
    }

    createBannerPlaceholder() {
        let node = new Node("BannerPlaceholder");
        this.node.addChild(node);
        
        let uiTransform = node.addComponent(UITransform);
        uiTransform.setContentSize(new Size(720, 96)); 

        let widget = node.addComponent(Widget);
        widget.isAlignBottom = true;
        widget.bottom = 0;
        widget.isAlignLeft = true;
        widget.left = 0;
        widget.isAlignRight = true;
        widget.right = 0;

        let labelNode = new Node("BannerLabel");
        node.addChild(labelNode);
        let label = labelNode.addComponent(Label);
        label.string = "Banner Ad Placeholder";
        label.color = new Color(255, 255, 255, 255);
        label.fontSize = 30;
        
        let outline = labelNode.addComponent(LabelOutline);
        outline.color = new Color(0, 0, 0, 255);
        outline.width = 3;
        
        this.bannerNode = node;
        node.setSiblingIndex(1000);
    }

    /**
     * 手动게임 시작
     */
    start_game():void{
        this.unschedule(this.auto_play);
        //设置默认本局得分0
        this.score_label.string = ""+0;
        //重置游戏数据,游戏状态
        GameData.reset_data();
        //移动和隐藏,home page
        this.home_page.setPosition(-1000,0);
        this.home_page.active = false;
        //게임 시작,状态为1
        this.logic_ctl?.run_game(1);
    }
    /**
     * 自动게임 시작
     */
    auto_play(){
        // 状态合法性判断
        if(GameData.get_game_state() == -1){
            //自动跳
            this.logic_ctl.auto_jump();
        }
    }

}

