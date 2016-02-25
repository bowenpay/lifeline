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
    private question_group = null;
    private message_scroller = null;
    private game_data = new Data();
    private game_state = 0; // 0: 显示splash 1： 正常走时间 2： 问答 3: 没有问题了，只走时间 4  游戏结束
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
        if(this.myproperties.time >= 10 && this.game_state != 5) {
            // 游戏时间结束
            this.game_state = 4;
        }
        
        switch(this.game_state) {
            case 0: 
                // 显示splash
                this.createSplash();
                break; 
            case 1: 
                // 正常走时间，可以提问题
                this.processState();
                this.question();
                break;
            case 2:
                // 问答状态
                break;
            case 3:
                // 没有问题了，走时间
                this.processState();
                break;
            case 4:
                // 游戏结束，显示主人公结局
                this.showEnding();
                this.game_state = 5;
                break;
            case 5:
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
        image.source = "resource/background.jpg";
        image.percentWidth = 100;
        image.percentHeight = 100;
        this.addChild(image);
        // 显示“进入”按钮
        var button = new eui.Button();
        button.left = 110;
        button.top = 280;
        button.width = 100;
        button.height = 80;
        button.label = "点击进入";
        button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.splashHandler, this);
        this.addChild(button);
    }
    private splashHandler(evt: eui.UIEvent): void {
        this.removeChild(evt.target);
        this.createMsgBox();
        this.game_state = 1;
        this.splash = null;
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
        vLayout.gap = 10;
        vLayout.paddingTop = 30;
        vLayout.paddingLeft = 5;
        vLayout.paddingBottom = 200;
        vLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        group.layout = vLayout; 
        
        // 添加多行对话文字
        this.ask("有人在吗？ 请回答我");
        this.answer("你是谁？");
        this.ask("我是nova，来自洛杉矶，我现在迷路了，你可以帮帮我吗？");
        
        //创建一个Scroller
        this.message_scroller = new eui.Scroller();
        var myScroller = this.message_scroller;
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        myScroller.percentWidth = 100;
        myScroller.percentHeight = 100;
        //设置viewport
        myScroller.viewport = group;
        this.addChild(myScroller);
    }
    
    /**
     * 将msgbox scroll 到底部
     */
    private scrollerToBottom() {
        var sc = this.message_scroller;
        while(true) {
            if((sc.viewport.scrollV + sc.height) >= sc.viewport.contentHeight) {
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
        var label = new eui.Label(content);
        label.size = 14;
        label.textColor = 0x090909;
        label.percentWidth = 100;
        label.lineSpacing = 5;
        this.msgBox.addChild(label);
    }
    
    /**
     * 在对话框中展示答案
     */ 
    
    private answer(content: string) {
        var label = new eui.Label(content);
        label.size = 14;
        label.textColor = 0xFFFFFF;
        label.percentWidth = 100;
        label.lineSpacing = 5;
        this.msgBox.addChild(label);
    }
    

    /**
     * 处理当前状态基本任务
     */ 
    private processState() {
        this.myproperties.time += 1;
        var funcs = this.game_data.getStatesPropertiesFunctions();
        var mp_clone = JSON.parse(JSON.stringify(this.myproperties));
        for(var key in funcs) {
            this.myproperties[key] += funcs[key](mp_clone);
        }
        console.log(funcs);
        console.log(mp_clone);
        console.log(this.myproperties);

    }
    /**
     * 发起一个提问
     */ 
    private question(): void {
        this.game_state = 2;
        var gdata = this.game_data;
        var q = gdata.getQuestion(this.myproperties);
        if(!q) {
            this.ask(this.myproperties.time + ': 没有问题了');
            this.scrollerToBottom();
            this.game_state = 3
            return;
        }
        this.ask(this.myproperties.time + ': ' + q.question);

        this.question_group = new eui.Group();
        this.display_question_answers(q);
    }
    
    /**
     * 显示问题的所有答案选项
     */ 
    private display_question_answers(q) {
        q.left_times -= 1;
        // 使用显示答案的容器
        var group: eui.Group = this.question_group;
        group.percentWidth = 80;
        group.percentHeight = 80;
        group.top = 200;
        group.bottom = 100;
        
        // 设置问垂直布局
        var vLayout:eui.VerticalLayout = new eui.VerticalLayout();
        vLayout.gap = 10;
        vLayout.paddingTop = 30;
        vLayout.paddingLeft = 30;
        vLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
        group.layout = vLayout; 
        // 添加选项
        var radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
        radioGroup.addEventListener(eui.UIEvent.CHANGE,this.questionHandler,this);
        
        var answers = q.answers;
        for(var index in answers) {
            var answer = answers[index]; 
            var rdb: eui.RadioButton = new eui.RadioButton();
            rdb.label = answer.answer;
            rdb.value = answer.event;
            rdb.group = radioGroup;
            group.addChild(rdb);
        }
        this.addChild(group);
    }
    /**
     * 回答问题的回调处理
     */ 
    private questionHandler(evt: eui.UIEvent): void {
        var radioGroup: eui.RadioButtonGroup = evt.target;
        console.log(radioGroup.selectedValue);
        var event = this.game_data.EVENTS_MAP[radioGroup.selectedValue];
        this.processEvent(event);
    }
    
    /**
     * 处理回答问题所触发的对应事件
     */ 
    private processEvent(event) {
        this.answer(event.name);
        if(event.from == this.game_data.current) {
            this.game_data.current = event.to;
            var mp = this.myproperties;
            var ep = event.properties;
            for(var key in ep) { 
                mp[key] += ep[key];
            }
            console.log(this.myproperties);
        } else { 
            console.log("from 状态错误");
        }

        this.scrollerToBottom();
        this.removeChild(this.question_group);
        this.question_group = null;
        this.game_state = 1;
    }
    /**
     * 游戏结束，显示主人公结局
     */ 
    private showEnding() {
        if(this.splash != null) {
            return;
        }
        
        // TODO: 显示主人公结局
        var ending = this.game_data.getMyEnding(this.myproperties);
        console.log("游戏结束：显示主人公结局");
        console.log(this.myproperties);
        console.log(ending);
        
        // 显示splash背景图
        var image = new eui.Image();
        image.source = "resource/background.jpg";
        image.percentWidth = 100;
        image.percentHeight = 100;
        this.addChild(image);
        // 显示“进入”按钮
        var button = new eui.Button();
        button.left = 110;
        button.top = 280;
        button.width = 100;
        button.height = 80;
        button.label = "关注公众号";
        this.addChild(button);        
    }
    /**
     * 退出游戏
     */ 
    private quitGame() { 
        this.timer.stop();
    }
    
}
