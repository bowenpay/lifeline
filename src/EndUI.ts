/**
 *
 * @author 
 *
 */
class EndUI extends eui.Component {
    public imageBg: eui.Image;
    public imageTag: eui.Image;
    public title: eui.Label;
    public desc: eui.Label;
    public playAgainBtn: eui.Button;
    public shareBtn: eui.Button;
    public shareMask:eui.Image;
    public backImage:eui.Image;
    public backLabel:eui.Label;
    
	constructor() {
    	super();
    	this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);
      this.skinName = "resource/custom_eui_skins/endUISkin.exml";
	}
    private uiCompHandler(): void {
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareBtnHandler,this);
        this.shareMask.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareMaskHandler,this);
        this.backImage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.endBackHandler,this);
        this.backLabel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.endBackHandler,this);
        this.playAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.playAgainBtnHandler,this);
    }
    
    private shareBtnHandler(evt:egret.TouchEvent):void{
        console.log("shareBtnHandler");
        this.shareMask.source ="resource/assets/end/share_mask.png";
    }
    
    private shareMaskHandler(evt: egret.TouchEvent): void {
        console.log("shareMaskHandler");
        this.shareMask.source = "";
    }
    
    private endBackHandler(evt: egret.TouchEvent): void {
        console.log("endBackHandler");
        this.parent.removeChild(this);
    }
    
    private playAgainBtnHandler(evt: egret.TouchEvent): void {
        console.log("playAgainBtnHandler");
        window.location.reload();
    }
}
