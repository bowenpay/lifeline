/**
 *
 * @author 
 *
 */
class StatusBtn extends eui.Button{
	public constructor() {
    	super();
	}
	
    public timeLabel:eui.Label;
    private _timeLabelStr:string = "";
    public fundLabel: eui.Label;
    private _fundLabelValue: number = 0; 
    
    public get timeLabelStr():string{
        return this._timeLabelStr;
    }
    
    public get fundLabelValue(): number {
        return this._fundLabelValue;
    }
    
    public set timeLabelStr(value:string){
        this._timeLabelStr = value;
        if(this.timeLabel){
            this.timeLabel.text = value;
        }
    }
    
    public set fundLabelValue(value: number) {
        this._fundLabelValue = value;
        if(this.fundLabel) {
            if(this._fundLabelValue < 10000) {
                this.fundLabel.text = '资产：' + String(this._fundLabelValue) + '元';
            } else {
                this.fundLabel.text = '资产：' + String(this._fundLabelValue / 10000) + '万';
            }
        }
    }
    
    protected childrenCreated():void{
        super.childrenCreated();
        if(this.timeLabel){
            this.timeLabel.text = this._timeLabelStr;
        }
        if(this.fundLabel) {
            if(this._fundLabelValue < 10000) {
                this.fundLabel.text = '资产：' + String(this._fundLabelValue) + '元';
            } else {
                this.fundLabel.text = '资产：' + String(this._fundLabelValue / 10000) + '万';
            }
        }
    }
    
}
