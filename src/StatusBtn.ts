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
    private _fundLabelStr: string = ""; 
    
    public get timeLabelStr():string{
        return this._timeLabelStr;
    }
    
    public get fundLabelStr(): string {
        return this._fundLabelStr;
    }
    
    public set timeLabelStr(value:string){
        this._timeLabelStr = value;
        if(this.timeLabel){
            this.timeLabel.text = value;
        }
    }
    
    public set fundLabelStr(value: string) {
        this._fundLabelStr = value;
        if(this.fundLabel) {
            this.fundLabel.text = value;
        }
    }
    
    protected childrenCreated():void{
        super.childrenCreated();
        if(this.timeLabel){
            this.timeLabel.text = this._timeLabelStr;
        }
        if(this.fundLabel) {
            this.fundLabel.text = this._fundLabelStr;
        }
    }
    
}
