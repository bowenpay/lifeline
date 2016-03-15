/**
 *
 * @author 
 *
 */
class EndUI extends eui.Component {
    public imageBg: eui.Image;
    public title: eui.Label;
    public desc: eui.Label;
    public playAgainBtn: eui.Button;
    public shareBtn: eui.Button;
    public shareMask:eui.Image;
    public backImage:eui.Image;
    public backLabel:eui.Label;
    public qrcodeImg:eui.Image;
    public backImageLabel:eui.Label;
    
	constructor() {
    	super();
    	this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);
      this.skinName = "resource/custom_eui_skins/endUISkin.exml";
      var tw = egret.Tween.get(this.backImage,{loop:true});
      tw.to({top:15},1500);

	}
    private uiCompHandler(): void {
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareBtnHandler,this);
        this.shareMask.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareMaskHandler,this);
        this.backImage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.endBackHandler,this);
        this.backLabel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.endBackHandler,this);
        this.backImageLabel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.endBackHandler,this);
        this.playAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.playAgainBtnHandler,this);
        this.qrcodeImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.qrcodeImgTouchBegin,this);
        this.qrcodeImg.addEventListener(egret.TouchEvent.TOUCH_END,this.qrcodeImgTouchEnd,this);
        this.qrcodeImg.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.qrcodeImgReleaseOut,this);
    }
    private qrcodeImgTouchBegin(evt: egret.TouchEvent): void {
        console.log("qrcodeImgTouchBegin");
        document.getElementById("qrcodeMask").setAttribute("src","resource/game/game_mask.png");
        document.getElementById("qrcodeMask").setAttribute("style","position:absolute;margin-top:0px;z-index:1;");
    }
    
    private qrcodeImgTouchEnd(evt: egret.TouchEvent): void {
        console.log("qrcodeImgTouchEnd");
        document.getElementById("qrcodeMask").setAttribute("src","resource/game/game_mask.png");
        document.getElementById("qrcodeMask").setAttribute("style","position:absolute;margin-top:0px;z-index:-1;");
    }
    
    private qrcodeImgReleaseOut(evt: egret.TouchEvent): void {
        console.log("qrcodeImgTouchEnd");
        document.getElementById("qrcodeMask").setAttribute("src","resource/game/game_mask.png");
        document.getElementById("qrcodeMask").setAttribute("style","position:absolute;margin-top:0px;z-index:-1;");
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
