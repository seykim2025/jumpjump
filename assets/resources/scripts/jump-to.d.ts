/**
 * 接口生命
 * @author 一朵毛山
 * Construct 
 */
declare module 'cc'{
    interface Node{
        //变量 
        jump_x?:number;
        jump_y?:number;
        jump_offset_y?:number;
        //没实现的方法
        jump_to(to:Vec3,jump_height:number,duration:number,call_back?:Function):Tween<Node>;
    }
}//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999