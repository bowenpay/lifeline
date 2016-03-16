/**
 *
 * @author 
 *
 */
class BeginUI extends eui.Component {
    private beginBackgroundImg: eui.Image;
    private beginBackground1Img: eui.Image;
    private beginBackgroundTitleImg: eui.Image;  
    private beginEnterImg: eui.Image;
    private twTimer: egret.Timer;
//    private titleTimer: egret.Timer;
	public constructor() {
    	super();
    	this.skinName = "resource/custom_eui_skins/beginUISkin.exml";
      this.twTimer = new egret.Timer(700,0);
      this.twTimer.addEventListener(egret.TimerEvent.TIMER,this.twTimerFunc,this);
      this.twTimer.start();
      
//      this.titleTimer = new egret.Timer(500,0);
//      this.titleTimer.addEventListener(egret.TimerEvent.TIMER,this.titleTimerFunc,this);
//      this.titleTimer.start();
    	var enterTw = egret.Tween.get(this.beginEnterImg);
    	enterTw.to({alpha:1, width:195, height:70},500);
    	
    	this.beginEnterImg.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
        	this.dispatchEventWith(GameEvents.EVT_BEGIN);
        	},this);
	}
	
    private twTimerFunc(event: egret.TimerEvent) {
        this.beginBackground1Img.visible = !this.beginBackground1Img.visible;
        this.beginBackgroundTitleImg.visible = !this.beginBackgroundTitleImg.visible;
    }
    
//    private titleTimerFunc(event: egret.TimerEvent) {
//        this.beginBackgroundTitleImg.visible = !this.beginBackgroundTitleImg.visible;
//    }
}
