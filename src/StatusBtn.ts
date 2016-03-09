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
    
    public get timeLabelStr():string{
        return this._timeLabelStr;
    }
    
    public set timeLabelStr(value:string){
        this._timeLabelStr = value;
        if(this.timeLabel){
            this.timeLabel.text = value;
        }
    }
    
    protected childrenCreated():void{
        super.childrenCreated();
        if(this.timeLabel){
            this.timeLabel.text = this._timeLabelStr;
        }
    }
}
