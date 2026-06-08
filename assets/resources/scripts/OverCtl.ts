import { _decorator, Component, Node, Label, instantiate } from 'cc';
import { EventDispatcher } from './EventDispatcher';
import { GameData } from './GameData';
import { ads } from './AdsController';
const { ccclass, property } = _decorator;
/**
 * 游戏结束界面,脚本
 * @author 개발자
 * Construct 
 */
@ccclass('OverCtl')
export class OverCtl extends Component {
    //本局分数
    @property({ type: Label })
    total_score: Label = null;
    //历史最高分
    @property({ type: Label })
    history_score: Label = null;

    start() {
        //注册打开游戏结束界面事件
        EventDispatcher.get_instance().target.on(EventDispatcher.SHOW_OVER_WINDOW, this.show, this);
        this.node.active = false;
        
        // Hide ranking
        this.node.children.forEach(child => {
            if (child.name.toLowerCase().includes("rank")) {
                child.active = false;
            }
        });
        
        // Clone and setup rewarded restart button
        let restartNode = this.node.getChildByName("btn_restart");
        if (restartNode && !this.node.getChildByName("BtnRewarded")) {
            let rewardedBtn = instantiate(restartNode);
            rewardedBtn.name = "BtnRewarded";
            this.node.addChild(rewardedBtn);
            
            let pos = restartNode.getPosition();
            restartNode.setPosition(pos.x, pos.y + 60); // Move normal restart up
            rewardedBtn.setPosition(pos.x, pos.y - 60); // Move rewarded restart down
            
            // Adjust labels
            let origLabelNode = restartNode.getChildByName("Label") || restartNode.children.find(c => c.getComponent(Label));
            if (origLabelNode) {
                origLabelNode.getComponent(Label).string = "다시하기";
            }
            
            let rewLabelNode = rewardedBtn.getChildByName("Label") || rewardedBtn.children.find(c => c.getComponent(Label));
            if (rewLabelNode) {
                rewLabelNode.getComponent(Label).string = "AD 하트 2개로 다시하기";
            }
            
            // Adjust handler
            let btn = rewardedBtn.getComponent('cc.Button');
            if (btn && btn.clickEvents.length > 0) {
                btn.clickEvents[0].handler = "rewardedRestart";
            }
        }
    }

    /**
     * 显示游戏结束界面
     */
    show(): void {
        this.scheduleOnce(() => {
            // Heart count is reset when result screen is reached
            GameData.set_hearts(0);
            EventDispatcher.get_instance().target.emit(EventDispatcher.UPDATE_HEART_LABEL);

            this.node.setPosition(0, 0);
            this.node.active = true;
            this.total_score.string = GameData.get_total_score() + "";
            let histroy = localStorage.getItem("jumpjump.bestScore");
            if (!histroy) {
                histroy = "0";
            }
            this.history_score.string = histroy;
        },0.5);

    }

    update(deltaTime: number) {

    }
    /**
     * 重新게임 시작
     */
    async restart() {
        let result = await ads.showInterstitialAd({ placement: 'result_retry' });
        
        // Starts with 0 hearts
        GameData.set_hearts(0);
        EventDispatcher.get_instance().target.emit(EventDispatcher.UPDATE_HEART_LABEL);

        //隐藏该界面
        this.node.setPosition(-1000, 0);
        this.node.active = false;
        //发送游戏开始事件
        EventDispatcher.get_instance().target.emit(EventDispatcher.START_GAME);
    }

    async rewardedRestart() {
        let result = await ads.showRewardedAd({ placement: 'result_reward_retry' });
        if (result.completed && result.rewarded) {
            GameData.set_hearts(2);
            EventDispatcher.get_instance().target.emit(EventDispatcher.UPDATE_HEART_LABEL);
            
            this.node.setPosition(-1000, 0);
            this.node.active = false;
            EventDispatcher.get_instance().target.emit(EventDispatcher.START_GAME);
        } else {
            console.log("광고를 끝까지 보면 하트 2개로 다시 할 수 있어요.");
        }
    }
}

