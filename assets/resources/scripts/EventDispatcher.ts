import { _decorator, Component, Node } from 'cc';
import { EventTarget } from 'cc';
const { ccclass, property } = _decorator;
const event_target = new EventTarget();
/**
 * 自定义事件
 * @author 개발자
 * Construct 
 */
export class EventDispatcher {
    /**
     * 单利对象
     */
    private static instance :EventDispatcher;
    /**
     * 更新面板分数
     */
    static UPDATE_SCORE_LABEL:string = "UPDATE_SCORE_LABEL";
    /**
     * 打开游戏结束界面
     */
    static SHOW_OVER_WINDOW:string = "SHOW_OVER_WINDOW";
    /**
     * 게임 시작(在玩一次)
     */
    static START_GAME:string = "START_GAME";
    /**
     * Update heart count label
     */
    static UPDATE_HEART_LABEL:string = "UPDATE_HEART_LABEL";
    /**
     * 获取单利
     * @returns 
     */
    static get_instance():EventDispatcher{
        if(!EventDispatcher.instance){
            EventDispatcher.instance = new EventDispatcher();
        }
        return EventDispatcher.instance;
    }
    /**
     * 获取event
     */
    get target():EventTarget{
        return event_target;
    }



}

