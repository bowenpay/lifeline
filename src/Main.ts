//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var STATE_SPLASH = 0; // 显示splash 
var STATE_STATE = 1; // 处于状态下 
var STATE_QUESTION = 2; // 显示问题detail状态
var STATE_ANSWER = 3; // 等待回答状态 
var STATE_NOOP = 4; // 没有问题了，什么也不做 
var STATE_END = 5; // 显示结局
var STATE_QUIT = 6; // 退出游戏状态

class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren();
        /**
         * 游戏统计调用方法 初始化
         */
        esa.EgretSA.init({ "gameId": "536E77485757673D","chanId": egret.getOption("egret.runtime.spid") || egret.getOption("channelId"), "debug": false });
        esa.EgretSA.loadingSet(1,"开始加载"); // 记录加载过程
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }
    private createScene(){
        if(this.isThemeLoadEnd && this.isResourceLoadEnd){
            this.startCreateScene();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        esa.EgretSA.loadingSet(2, "加载完成，游戏开始"); // 记录加载过程
        this.createTimer();
         
    }

    // 自定义全局变量
    private splash: eui.Image = null;   // 闪屏
    private endingBox: eui.Group = null;  // 结局
    private timer: egret.Timer = null; // 计时器
    private msgBox: eui.Group = null;
    private endGrp: eui.Group = null;
    private endScroller: eui.Scroller = null;
    private question_group = null;
    private current_question = null;    // 当前显示的问题
    private question_detail = [];
    private event_detail = [];
    private event_image: eui.Image = null; // 爆点事件显示图片
    private message_scroller: eui.Scroller = null;
    private game_data = new Data();
    private previous_choose_box = [];
    private state_btn: StatusBtn = null;
    private endScrollV: number = 0;
    private timeStr =[
        "第1年1季度","第1年2季度","第1年3季度","第1年4季度",
        "第2年1季度","第2年2季度","第2年3季度","第2年4季度",
        "第3年1季度","第3年2季度","第3年3季度","第3年4季度",
        "第4年1季度","第4年2季度","第4年3季度","第4年4季度", 
        "第5年1季度","第5年2季度","第5年3季度","第5年4季度",
        "第6年1季度","第6年2季度","第6年3季度","第6年4季度",
        "第7年1季度","第7年2季度","第7年3季度","第7年4季度",
        "第8年1季度","第8年2季度","第8年3季度","第8年4季度", 
        "第9年1季度","第9年2季度","第9年3季度","第9年4季度",
        "第10年1季度","第10年2季度","第10年3季度","第10年4季度"       
    ];
    // 游戏状态
    private game_state = STATE_SPLASH; 
    private myproperties = { 
        health: 0, wealth: 0, ability: 0, happiness: 0,
        time: 0
    };
    
    /**
     * 创建计时器
     */ 
    private createTimer(): void { 
        //创建一个计时器对象
        this.timer = new egret.Timer(500,0);
        //注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandler,this);
        //开始计时
        this.timer.start();
    }
    
    /**
     * 计时器控制器
     */ 
    private timerHandler(evt: eui.UIEvent): void {
        if(this.myproperties.time >= 10 && this.game_state < STATE_END) {
            // 游戏时间结束
            this.game_state = STATE_END;
        }
        
        switch(this.game_state) {
            case STATE_SPLASH: 
                // 显示splash
                this.timer.stop();
                this.createSplash();
                break; 
            case STATE_STATE: 
                // 在STATE状态下，可以提问题
                this.processState();
                this.question();
                break;
            case STATE_QUESTION:
                // 在显示问题详情状态下
                this.display_question_detail();
                break;
            case STATE_ANSWER:
                // 等待回答状态， 什么也不做
                this.display_event_detail();
                break;
            case STATE_NOOP:
                // 没有问题了，走时间
                this.processState();
                break;
            case STATE_END:
                // 游戏结束，显示主人公结局
                this.showEnding();
                this.game_state = STATE_QUIT;
                break;
            case STATE_QUIT:
                // 游戏退出
                this.quitGame();
                break;
        }
    }
    /**
     * 显示splash
     */ 
    
    private createSplash(): void {
        if(this.splash != null) { 
            return;
        }
        // 显示splash背景图
        var image = new eui.Image();
        image.source = "resource/game/background.jpg";
        image.percentWidth = 100;
        image.percentHeight = 100;
        this.addChild(image);
        // 显示“进入”按钮
        var wid = document.documentElement.clientWidth;
        var hei = document.documentElement.clientHeight;
        var image = new eui.Image();
        image.source = "resource/game/clickEnter.png";
        image.width = 163.2;
        image.height = 57.6;
        image.horizontalCenter = 0;
        image.bottom = hei * 0.3;

        image.addEventListener(egret.TouchEvent.TOUCH_TAP,this.splashHandler,this);
        this.addChild(image);
    }
    private splashHandler(evt: eui.UIEvent): void {
        this.removeChild(evt.target);
        this.createMsgBox();
        this.game_state = STATE_STATE;
        this.splash = null;
        this.timer.start();
    }
    /**
     * 创建对话框
     */ 
    private createMsgBox(): void { //创建一个容器, 设置问垂直布局
        this.msgBox = new eui.Group();
        var group = this.msgBox;
        group.percentWidth = 100;
        group.percentHeight = 100;

        var vLayout: eui.VerticalLayout = new eui.VerticalLayout();
        vLayout.gap = 20;
        vLayout.paddingTop = 80;
        vLayout.paddingLeft = 5;
        vLayout.paddingBottom = 150;
        vLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        group.layout = vLayout; 
        
        //创建一个Scroller
        this.message_scroller = new eui.Scroller();
        var myScroller = this.message_scroller;
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        myScroller.percentWidth = 100;
        myScroller.percentHeight = 100;
        //设置viewport
        myScroller.viewport = group;
        this.addChild(myScroller);
        
        this.state_btn = new StatusBtn;
        this.state_btn.skinName = "resource/custom_eui_skins/statusBtnSkin.exml"
        this.state_btn.label = "本科";
        this.state_btn.timeLabelStr = "第1年1季度"

        this.state_btn.height = 80;
        this.state_btn.left = 0;
        this.state_btn.top = 0;
        this.state_btn.percentWidth = 100;
        this.addChild(this.state_btn);
    }
    
    /**
     * 将msgbox scroll 到底部
     */
    private scrollerToBottom() {
        var sc = this.message_scroller;
        console.log(sc.height);
        while(true) {
            if((sc.viewport.scrollV + sc.height*5/6) >= sc.viewport.contentHeight) {
                console.log("滚动到底部了");
                break;
            } else {
                sc.viewport.scrollV += 2;
            }
        }
    }

    /**
     * 在对话框中展示问题
     */ 
    private ask(content: string) { 
        var btn = new eui.Button();
        btn.skinName = "resource/custom_eui_skins/askBoxSkin.exml";
        btn.label = content;
        btn.percentWidth = 80;
        btn.height = 100;
        this.msgBox.addChild(btn);
        this.scrollerToBottom();
    }
    
    /**
     * 在对话框中展示答案
     */ 
    
    private answer(content: string) {
        console.log(content);
        var btn = new eui.Button();
        btn.skinName = "resource/custom_eui_skins/askBoxSkin.exml";
        btn.label = content;
        btn.percentWidth = 80;
        btn.height = 100;
        this.msgBox.addChild(btn);
        this.scrollerToBottom();
    }
    

    /**
     * 处理当前状态基本任务
     */ 
    private processState() {
        var properties = this.game_data.getStatesProperties();
        var mp_clone = JSON.parse(JSON.stringify(this.myproperties));
        for(var key in properties) {
            var value = properties[key];
            if(typeof value === "function") {
                this.myproperties[key] = (mp_clone[key] || 0) + value(mp_clone);
            } else { 
                this.myproperties[key] = (mp_clone[key] || 0) + value;
            }
            
        }
        console.log(mp_clone);
        console.log(this.myproperties);
    }
    /**
     * 发起一个提问
     */ 
    private question(): void {
        var gdata = this.game_data;
        var q = gdata.getQuestion(this.myproperties);
        this.current_question = q;
        if(!q) {
            // 如果问题已经问完了，返回
            this.ask('最近什么也没有发生，生活好安逸啊');
            this.scrollerToBottom();
            return;
        }
        this.game_state = STATE_QUESTION;
        // 显示问题
        if(q.detail != undefined) {
            this.question_detail = q.detail.slice(); // 将要显示的问题详情浅复制
        } else { 
            this.question_detail = [q.question]; // 如果没有detail，直接显示question
        }
        this.display_question_detail();
    }
    
    
    /**
     * 显示问题的所有内容
     */
    private display_question_detail() {
        var msg = this.question_detail.shift();
        if(msg == null) {
            // 问题详情已经显示结束,显示答案选项
            this.display_question_answers();
            this.timer.stop();
        } else { 
            this.ask(msg);
        }
    }
    
    /**
     * 显示问题的所有答案选项
     */ 
    private display_question_answers() {
        var q = this.current_question;
        q.left_times -= 1;
        // 使用显示答案的容器
        var group: eui.Group = new eui.Group();
        group.percentWidth = 80;
        // 采用网格布局，两列显示
        var tLayout: eui.TileLayout = new eui.TileLayout();
        tLayout.horizontalGap = 20;
        tLayout.verticalGap = 20;
        tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH;
        tLayout.rowAlign = eui.RowAlign.JUSTIFY_USING_HEIGHT;
        tLayout.paddingTop = 10;
        tLayout.paddingRight = 0;
        tLayout.paddingLeft = 0;
        tLayout.paddingBottom = 10;
        tLayout.requestedColumnCount = 2;  /// 设置两列显示
        group.layout = tLayout;    /// 网格布局

        // 添加选项
        var radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
        radioGroup.addEventListener(eui.UIEvent.CHANGE,this.questionHandler,this);
        this.previous_choose_box = [];
        var answers = q.answers;
        for(var index in answers) {
            var answer = answers[index]; 
            var rdb: eui.RadioButton = new eui.RadioButton();
            this.previous_choose_box.push(rdb);
            rdb.skinName = "resource/custom_eui_skins/radioBtnSkin.exml"
            rdb.label = answer.answer;
            rdb.value = answer.event;
            rdb.group = radioGroup;
            rdb.height = 100;
            rdb.width = 80;
            group.addChild(rdb);
        }
        this.msgBox.addChild(group);
        this.scrollerToBottom();
    }
    /**
     * 回答问题的回调处理
     */ 
    private questionHandler(evt: eui.UIEvent): void {
        
        for(var index in this.previous_choose_box){
            var pre_rdb:eui.RadioButton = this.previous_choose_box[index];
            pre_rdb.enabled = false;
        }
        
        var radioGroup: eui.RadioButtonGroup = evt.target;
        var answer = radioGroup.selectedValue;
        console.log(answer);
        if(typeof answer === "function") {
            var mp_clone = JSON.parse(JSON.stringify(this.myproperties));
            var event_name = answer(mp_clone);
        } else {
            var event_name = answer;
        }
        var event = this.game_data.EVENTS_MAP[event_name];
        console.log(event);
        this.processEvent(event);
        
        // 处理消息
        if(event.detail != undefined) {
            this.event_detail = event.detail.slice(); // 将要显示的事件详情浅复制
        } else {
            this.event_detail = [event.name]; // 如果没有detail，直接显示name
        }
        // 处理图片
        if(event.image) { 
            this.display_event_image(event.image);
        }
        this.game_state = STATE_ANSWER;

        this.timer.start();
    }
    /**
     * 显示问题的所有内容
     */
    private display_event_detail() {
        // 显示消息
        var msg = this.event_detail.shift();
        if(msg == null) {
            // 事件已经显示完了，如果有图片，去掉图片
            if(this.event_image) { 
                this.removeChild(this.event_image);
                this.event_image = null;
            }
            this.game_state = STATE_STATE;
        } else {
            if(msg) {
                this.answer(msg);
            }
        }
        
    }
    /**
     * 显示问题的所有内容
     */
    private display_event_image(image_path) {
        var wid = document.documentElement.clientWidth;
        var hei = document.documentElement.clientHeight;
        var image = new eui.Image();
        image.source = image_path;
        image.width = wid / 2;
        image.height = image.width;
        image.left = wid / 4;
        image.top = hei / 2 - (image.height / 2);
        this.addChild(image);
        this.event_image = image;
    }
    
    /**
     * 处理回答问题所触发的对应事件
     */ 
    private processEvent(event) {
        //this.answer(event.name);
        //// 判断状态是否可以改变
        // 如果from不是*，或者current，弹出错误，并返回
        if(event.from != '*' && event.from != this.game_data.current) { 
            alert("from 状态错误。current:" + this.game_data.current + "; from:" + event.from );
            return;
        }
        
        /// 改变对应的参数
        var properties = event.properties;
        var mp_clone = JSON.parse(JSON.stringify(this.myproperties));
        for(var key in properties) {
            var value = properties[key];
            if(typeof value === "function") {
                this.myproperties[key] = (mp_clone[key] || 0) + value(mp_clone);
            } else {
                this.myproperties[key] = (mp_clone[key] || 0) + value;
            }

        }
        console.log(mp_clone);
        console.log(this.myproperties);
        
        /// 改变状态
        // event.to是空，表示不改变状态。否则改变
        if(event.to != '' && this.game_data.current !== event.to) {
            this.game_data.current = event.to;
            this.state_btn.label=this.game_data.current;

            var properties = this.game_data.getStatesInitialState();
            var mp_clone = JSON.parse(JSON.stringify(this.myproperties));
            for(var key in properties) {
                var value = properties[key];
                if(typeof value === "function") {
                    this.myproperties[key] = (mp_clone[key] || 0) + value(mp_clone);
                } else {
                    this.myproperties[key] = (mp_clone[key] || 0) + value;
                }

            }
            this.state_btn.timeLabelStr = this.timeStr[this.myproperties.time];
            console.log(mp_clone);
            console.log(this.myproperties);
        }
        
        // 滑动滚动条
        this.scrollerToBottom();
        //this.removeChild(this.question_group);
        //this.question_group = null;
    }
    /**
     * 游戏结束，显示主人公结局
     */ 
    private showEnding() {
        if(this.splash != null) {
            return;
        }
        
        this.endGrp = new eui.Group();
        this.endGrp.percentWidth =100;
        this.endGrp.percentHeight = 100;
        
        // TODO: 显示主人公结局
        var ending = this.game_data.getMyEnding(this.myproperties);
        console.log("游戏结束：显示主人公结局");
        console.log(this.myproperties);
        console.log(ending);

        // 显示background_end背景图
        var label = new eui.Label();
        label.percentWidth = 100;
        label.percentHeight = 100;
        label.background = true;
        label.backgroundColor = 0xffffff;
        this.endGrp.addChild(label);
        
        // 显示结局文字end_state背景图
        var wid = document.documentElement.clientWidth; //获取屏幕宽度
        var hei = document.documentElement.clientHeight; //获取屏幕高度
        var image = new eui.Image();
        image.source = "resource/game/end_state.png";
        image.percentWidth = 100;
        image.percentHeight = 40;
        this.endGrp.addChild(image);

        //显示通回到十年
        var label = new eui.Label();
        label.text = "回到十年前";
        label.textColor = 0xffffff;
        label.size = 30;
        label.horizontalCenter = 0;//设置水平对齐方式
        label.top = 40;
        this.endGrp.addChild(label);
        // 显示“向前”按钮
        var image = new eui.Image();
        image.source = "resource/game/back.png";
        image.width = 40;
        image.height = 40;
        image.horizontalCenter = 0;
        image.top = 70;
        this.endGrp.addChild(image);
        
        label.addEventListener(egret.TouchEvent.TOUCH_TAP,this.backToBegin,this);
        image.addEventListener(egret.TouchEvent.TOUCH_TAP,this.backToBegin,this);
        
        //显示通过所有游戏
        var label = new eui.Label();
        label.text = "恭喜您！通过了所有的游戏！";
        label.size = 14;
        label.bold = true;
        label.textColor = 0xffd800;
        label.size = 36;
        label.horizontalCenter = 0;//设置水平对齐方式
        label.top = hei*0.3;
        this.endGrp.addChild(label);
        
        //显示故事结局标题
        var label = new eui.Label();
        label.text = ending.result.title;
        label.size = 35;
        label.bold = true;
        label.textColor = 0xf1cc00;
        label.horizontalCenter = 0;//设置水平对齐方式
        label.top = 430;
        this.endGrp.addChild(label);
        
        //显示故事结局文字
        var label = new eui.Label();
        label.fontFamily = "Tahoma";//设置字体
        label.text = ending.result.desc;
        label.size = 24;
        label.textColor = 0x000000;
        label.lineSpacing = 6;//行间距
        label.percentWidth = 88;
        label.horizontalCenter = 0;
        label.top = 510;
        this.endGrp.addChild(label);
        
        //显示再玩一次按钮
        var playAgainbtn = new eui.Button();
        playAgainbtn.skinName = "resource/custom_eui_skins/playAgainSkin.exml";
        playAgainbtn.percentWidth = 40;
        playAgainbtn.height = 100;
        playAgainbtn.bottom = 20;
        playAgainbtn.left= 20;
        this.endGrp.addChild(playAgainbtn);
        
        //显示分享的按钮
        var sharebtn = new eui.Button();
        sharebtn.skinName = "resource/custom_eui_skins/shareSkin.exml";
        sharebtn.percentWidth = 40;
        sharebtn.height = 100;
        sharebtn.bottom = 20;
        sharebtn.left = 240;
        this.endGrp.addChild(sharebtn);

        this.endScroller = new eui.Scroller();
        this.endScroller.percentWidth = 100;
        this.endScroller.percentHeight = 100;
        this.endScroller.viewport = this.endGrp;
        this.endScroller.bounces = true;
        
        this.addChild(this.endScroller);
        
        this.message_scroller.addEventListener(eui.UIEvent.CHANGE_END,this.scrollChangeEnd,this);
    }
    
    //message_scroller滑动到底部
    private scrollChangeEnd(evt: eui.UIEvent): void {
        console.log("scrollChangeEnd");
        console.log(this.message_scroller.viewport.contentHeight);
        
        //if((this.message_scroller.viewport.scrollV >= this.endScrollV) && (this.game_state == STATE_END))
        if((this.message_scroller.viewport.scrollV >= this.endScrollV))
        {
            console.log(this.message_scroller.viewport.scrollV);
            this.endGrp.visible = true;
        }
    }
    
    //回到十年前开始页面
    private backToBegin(evt: eui.UIEvent): void {
        this.endGrp.visible = false;
        this.endScrollV = this.message_scroller.viewport.scrollV;
        this.endScrollV -= this.message_scroller.viewport.height*1/6;
        console.log(this.endScrollV);
        this.message_scroller.viewport.scrollV = 0;
    }
    /**
     * 退出游戏
     */ 
    private quitGame() { 
        this.timer.stop();
    }
    
}
