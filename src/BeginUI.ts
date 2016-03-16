/**
 *
 * @author 
 *
 */
class BeginUI extends eui.Component {
    private beginBackgroundImg: eui.Image;
    private beginBackgroundTitleImg: eui.Image;
    private beginEnterImg: eui.Image;
	public constructor() {
    	super();
    	this.skinName = "resource/custom_eui_skins/beginUISkin.exml";
    	var tw = egret.Tween.get(this.beginBackgroundTitleImg);
    	tw.to({alpha:1, y:80},1000);
    	var enterTw = egret.Tween.get(this.beginEnterImg);
    	enterTw.to({alpha:1, width:190, height:73},500);
    	
    	this.beginEnterImg.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
        	this.dispatchEventWith(GameEvents.EVT_BEGIN);
        	},this);
	}
}
