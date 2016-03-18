/**
 *
 * @author 
 *
 */
class StatusBtn extends eui.Button{
	public constructor() {
    	super();
        this.skinName = "resource/custom_eui_skins/statusBtnSkin.exml";
	}
	
    public timeLabel: eui.Button;
    private _timeLabelStr:string = "";
    public fundLabel: eui.Button;
    private _fundLabelValue: number = 0;
    private timeLabelPlus: eui.Label;
    private fundLabelPlus: eui.Label; 
    
    public get timeLabelStr():string{
        return this._timeLabelStr;
    }
    
    public get fundLabelValue(): number {
        return this._fundLabelValue;
    }
    
    public set timeLabelStr(value:string){
        this._timeLabelStr = value;
        if(this.timeLabel){
            this.timeLabel.labelDisplay.text = value;
        }
    }
    
    public set fundLabelValue(value: number) {
        this._fundLabelValue = value;
        if(this.fundLabel) {
            if(this._fundLabelValue < 10000) {
                this.fundLabel.labelDisplay.text = '资产：' + String(this._fundLabelValue) + '元';
            } else {
                this.fundLabel.labelDisplay.text = '资产：' + String(this._fundLabelValue / 10000) + '万';
            }
        }
    }
    
    protected childrenCreated():void{
        super.childrenCreated();
        if(this.timeLabel){
            this.timeLabel.labelDisplay.text = this._timeLabelStr;
        }
        if(this.fundLabel) {
            if(this._fundLabelValue < 10000) {
                this.fundLabel.labelDisplay.text = '资产：' + String(this._fundLabelValue) + '元';
            } else {
                this.fundLabel.labelDisplay.text = '资产：' + String(this._fundLabelValue / 10000) + '万';
            }
        }
    }
    
    private getNumberText(value: number): string { 
        var num: string = '';
        var prefix = '';
        var sufix = '';
        
        if(value >= 0) {
            prefix = '+ ';
        } else {
            prefix = '- ';
        }
        var absValue = Math.abs(value);
        if(absValue > 100000000) {
            num = String(absValue / 100000000);
            sufix = '亿';
        } else if(absValue > 10000) {
            num = String(absValue / 10000);
            sufix = '万';
        } else { 
            num = String(absValue);
        }
        return prefix + num + sufix;
    }
    
    public showTimeLabelStrPlus(value: number): void { 
        var text = this.getNumberText(value);
        if(text) {
            this.timeLabelPlus.text = text + '天';
            var label: egret.Tween = egret.Tween.get(this.timeLabelPlus);
            label.to({ alpha: 1, top: 0,size: 40 },400).to({ alpah: 0,top: 40,size: 20 },1);
        }
        
    }

    public showFundLabelStrPlus(value: number): void {
        var text:string = this.getNumberText(value);
        if(text) {
            if(!(text.indexOf('万') > -1 || text.indexOf('亿') > -1)) {
                this.fundLabelPlus.text = text + '元';
            } else { 
                this.fundLabelPlus.text = text;
            }
            var label: egret.Tween = egret.Tween.get(this.fundLabelPlus);
            label.to({ alpha: 1, top: 0,size: 40 },400).to({ alpah: 0,top: 40,size: 20 },1);
        }

    }
}
