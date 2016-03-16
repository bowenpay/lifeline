var STATE_SPLASH = 0; // 显示splash 
var STATE_STATE = 1; // 处于状态下 
var STATE_QUESTION = 2; // 显示问题detail状态
var STATE_ANSWER = 3; // 等待回答状态 
var STATE_NOOP = 4; // 没有问题了，什么也不做 
var STATE_END = 5; // 显示结局
var STATE_QUIT = 6; // 退出游戏状态
interface SignPackage {
    timestamp: number;
    appId: string;
    signature: string;
    debug: boolean;
    nonceStr: string;
    jsApiList: Array<string>;
}
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
        // 统计代码
        tongji(['_trackEvent', '一块钱游戏',  '进入游戏', '开始加载', 1]);
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
        //RES.loadGroup("states");
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
        // 统计代码
        tongji(['_trackEvent','游戏','进入游戏','加载完成',1]);
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
    private host = window.location.host;
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
    private endDownImage:eui.Image = null;
    private endDownLabel:eui.Label = null;
    private beginPage:BeginUI = null;
    private endPage:EndUI = null;
    // 游戏状态
    private game_state = STATE_SPLASH; 
    private myproperties = { 
        time: 0, 
        __SHOW_ENDING: 0,
        money: 0
    };
    
    /**
     * 创建计时器
     */ 
    private createTimer(): void { 
        //创建一个计时器对象
        this.timer = new egret.Timer(70, 0);
        //注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandler,this);
        //开始计时
        this.timer.start();
    }
    
    /**
     * 计时器控制器
     */ 
    private timerHandler(evt: eui.UIEvent): void {
        if(this.myproperties['__SHOW_ENDING'] > 0 && this.event_detail.length == 0) {
            // 游戏时间结束
            this.game_state = STATE_END;
        }
        
        switch(this.game_state) {
            case STATE_SPLASH: 
                // 显示splash
                document.getElementById("preloading").style.display = "none";
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
                //this.game_state = STATE_QUIT;
                break;
            case STATE_QUIT:
                // 游戏退出
                this.quitGame();
                break;
        }
    }
    /* *
     * 微信
     * 
     * */
    private signPackage: SignPackage;
    /**
    * 获取签名分享
    */
    private getSignPackage() {
        var signUrl = window.location.href.split("#")[0];
        var url = encodeURIComponent(signUrl);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest('/api/weixin/sign/?url='+url);
        urlloader.load(req);
        req.method = egret.URLRequestMethod.GET;
        urlloader.addEventListener(egret.Event.COMPLETE,(e) => {
            var data = JSON.parse(e.target.data);
            this.signPackage = <SignPackage>data.config;
            this.getWeiXinConfig();//下面会定义
        },this);
    }
    private getWeiXinConfig() {
        var self = this;
        //配置参数
        var bodyConfig = new BodyConfig();
        bodyConfig.debug = this.signPackage.debug;// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        bodyConfig.appId = this.signPackage.appId;// 必填，公众号的唯一标识
        bodyConfig.timestamp = this.signPackage.timestamp;// 必填，生成签名的时间戳
        bodyConfig.nonceStr = this.signPackage.nonceStr;// 必填，生成签名的随机串
        bodyConfig.signature = this.signPackage.signature;// 必填，签名，见附录1
        bodyConfig.jsApiList = this.signPackage.jsApiList;
        wx.config(bodyConfig);
        wx.ready(function() {
            var title = "创业那些年，你能走多远？";
            var desc = "最真实的文字模拟游戏《创业那些年》。只有不到千分之一的人能玩到成功上市，快来试试吧！";
            var link = "http://"+self.host+"/startup/";
            var imgUrl = "http://"+self.host+"/startup/resource/wx_share.jpg";
            // 分享到微信好友
            var shareAppMessage = new BodyMenuShareAppMessage();
            shareAppMessage.title = title;
            shareAppMessage.desc = desc;
            shareAppMessage.link = link;
            shareAppMessage.imgUrl = imgUrl;
            shareAppMessage.trigger = function (res) {}    
            shareAppMessage.success = function (res) {
                tongji(['_trackEvent','微信分享','分享给好友', '好友', 1]);
            };
            shareAppMessage.fail = function (res) {};
            shareAppMessage.cancel = function (res) {}; 
            wx.onMenuShareAppMessage(shareAppMessage);
            // 分享到朋友圈
            var shareTimeline = new BodyMenuShareTimeline();
            shareTimeline.title = title;
            shareTimeline.link = link;
            shareTimeline.imgUrl = imgUrl;
            shareTimeline.trigger = function(res) {}
            shareTimeline.success = function(res) { 
                tongji(['_trackEvent','微信分享','分享到朋友圈','朋友圈',1]);
            };
            shareTimeline.fail = function(res) { };
            shareTimeline.cancel = function(res) { };
            wx.onMenuShareTimeline(shareTimeline);
            
        });
    }
    /**
     * 结局页面分享
     */ 
    private weixinShareOnEnding(title) { 
        var self = this;
        wx.ready(function() {
            var desc = "最真实的文字模拟游戏《创业那些年》。只有不到千分之一的人能玩到成功上市，快来试试吧！";
            var link = "http://" + self.host+"/startup/";
            var imgUrl = "http://" + self.host+"/startup/resource/wx_share.jpg";
            // 分享到微信好友
            var shareAppMessage = new BodyMenuShareAppMessage();
            shareAppMessage.title = title;
            shareAppMessage.desc = desc;
            shareAppMessage.link = link;
            shareAppMessage.imgUrl = imgUrl;
            shareAppMessage.trigger = function(res) { }
            shareAppMessage.success = function(res) {
                tongji(['_trackEvent','微信分享','分享给好友','好友',1]);
            };
            shareAppMessage.fail = function(res) { };
            shareAppMessage.cancel = function(res) { };
            wx.onMenuShareAppMessage(shareAppMessage);
            // 分享到朋友圈
            var shareTimeline = new BodyMenuShareTimeline();
            shareTimeline.title = title;
            shareTimeline.link = link;
            shareTimeline.imgUrl = imgUrl;
            shareTimeline.trigger = function(res) { }
            shareTimeline.success = function(res) {
                tongji(['_trackEvent','微信分享','分享到朋友圈','朋友圈',1]);
            };
            shareTimeline.fail = function(res) { };
            shareTimeline.cancel = function(res) { };
            wx.onMenuShareTimeline(shareTimeline);

        });
    }
    /**
     * 显示splash
     */ 
    
    private createSplash(): void {
        if(this.beginPage != null)
        {
            return;
        }
        
        this.beginPage = new BeginUI();
        this.beginPage.percentWidth = 100;
        this.beginPage.percentHeight = 100;
        this.addChild(this.beginPage);
        this.beginPage.addEventListener(GameEvents.EVT_BEGIN,this.splashHandler,this);

        tongji(['_trackEvent','游戏','闪屏','进入闪屏',1]);

        // 微信分享
        this.getSignPackage();
    }
    private splashHandler(): void {
        tongji(['_trackEvent','一块钱游戏','闪屏','点击进入',1]);
        this.removeChild(this.beginPage);
        this.beginPage.removeEventListener(GameEvents.EVT_BEGIN,this.splashHandler,this);
        

        this.createMsgBox();
        this.game_state = STATE_STATE;
        this.splash = null;
        this.timer.start();
        
        // 初始化进入时的状态
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
        // 
        this.state_btn = new StatusBtn();
        this.state_btn.skinName = "resource/custom_eui_skins/statusBtnSkin.exml"
        this.state_btn.label = this.game_data.getStatesDisplyName();
        this.state_btn.timeLabelStr = String(this.myproperties.time) + '天';
        this.state_btn.fundLabelValue = this.myproperties.money;

        this.state_btn.height = 80;
        this.state_btn.left = 0;
        this.state_btn.top = 0;
        this.state_btn.percentWidth = 100;
        this.addChild(this.state_btn);
        
    }
    /**
     * 创建对话框
     */ 
    private createMsgBox(): void { //创建一个容器, 设置问垂直布局
        this.msgBox = new eui.Group();
        
        var image = new eui.Image();
        image.source = "resource/game/chuanye.jpg";
        image.percentWidth = 100;
        image.percentHeight = 100;
        this.addChild(image);
        
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
        

    }
    
    /**
     * 将msgbox scroll 到底部
     */
    private scrollerToBottom() {
        var sc = this.message_scroller;
        while(true) {
            if((sc.viewport.scrollV + sc.height*5/6) >= sc.viewport.contentHeight) {
                // console.log("滚动到底部了");
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
        this.state_btn.timeLabelStr = String(this.myproperties.time) + '天';
        this.state_btn.fundLabelValue = this.myproperties.money;
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
        egret.log('-------------------------------'); 
        egret.log(this.game_data.current+'状态下，属性改变：');        
        egret.log(JSON.stringify(this.myproperties));
    }
    /**
     * 发起一个提问
     */ 
    private question(): void {
        var gdata = this.game_data;
        var q = gdata.getQuestion(this.myproperties);
        this.current_question = q;
        if(!q) {
            tongji(['_trackEvent','显示问题','没有问题','',1]);
            // 如果问题已经问完了，返回
            this.ask('最近什么也没有发生，生活好安逸啊');
            this.scrollerToBottom();
            return;
        } 
        
        tongji(['_trackEvent','显示问题', '提问', q.question, 1]);
        egret.log('提问：' + q.question);
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
        if(typeof answer === "function") {
            var mp_clone = JSON.parse(JSON.stringify(this.myproperties));
            var event_name = answer(mp_clone);
        } else {
            var event_name = answer;
        }
        var event = this.game_data.EVENTS_MAP[event_name];
        tongji(['_trackEvent','回答问题','回答', radioGroup.selection.label,1]);
        tongji(['_trackEvent','回答问题','事件', event.name,1]);
        egret.log('回答:' + radioGroup.selection.label);
        egret.log('事件:' + event.name);
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
        this.state_btn.fundLabelValue = this.myproperties.money;
        egret.log('属性改变：');
        egret.log(JSON.stringify(this.myproperties));
        
        /// 改变状态
        // event.to是空，表示不改变状态。否则改变
        if(event.to != '' && this.game_data.current !== event.to) {

            tongji(['_trackEvent','状态','改变到',event.to,1]);
            this.game_data.current = event.to;
            this.state_btn.label = this.game_data.getStatesDisplyName();

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
            egret.log(JSON.stringify(mp_clone));
            egret.log(JSON.stringify(this.myproperties));
        }
        
        // 滑动滚动条
        this.scrollerToBottom();
    }
    /**
     * 游戏结束，显示主人公结局
     */ 
    private showEnding() {

        if(this.endPage == null)
        {
            // 将结局中函数替换掉
            var ending = this.game_data.getMyEnding(this.myproperties);
            var result = ending.result;
            var mp_clone = JSON.parse(JSON.stringify(this.myproperties));
            for(var key in result) {
                var value = result[key];
                if(typeof value === "function") {
                    result[key] = value(mp_clone);
                } 

            }
            // 展示结局
            this.endPage = new EndUI();
            this.endPage.percentWidth = 100;
            this.endPage.percentHeight = 100;
            this.endPage.imageBg.source = result.imageBg;
            this.endPage.title.text = result.title;
            this.endPage.desc.text = result.desc;       
//            this.addChild(this.endPage); 
//            this.endScrollV = this.message_scroller.viewport.scrollV;
//            this.message_scroller.viewport.scrollV = 0;
            this.addEndDownImage();
            this.message_scroller.addEventListener(eui.UIEvent.CHANGE_END, this.scrollChangeEnd, this);
            
            var endingTitle = result.weixintitle;
            document.title = endingTitle;
            // 统计            
            tongji(['_trackEvent','结局','显示结局',endingTitle,1]);
            // 微信分享
            this.weixinShareOnEnding(result.weixintitle);
        }

    }
    private addEndDownImage()
    {
        this.endDownImage = new eui.Image();       
        this.endDownImage.source = "resource/game/end_down.png";
        this.endDownImage.bottom = 20;
        this.endDownImage.height = 50;
        this.endDownImage.width = 40;
        this.endDownImage.horizontalCenter = 0;
        this.endDownImage.visible = true;
        
        this.endDownLabel = new eui.Label("");
        this.endDownLabel.percentWidth = 70;
        this.endDownLabel.bottom = 0;
        this.endDownLabel.height = 60;
        this.endDownLabel.alpha = 0;
        this.endDownLabel.horizontalCenter = 0;
        this.addChild(this.endDownImage);
        this.addChild(this.endDownLabel);
        
        
        var tw = egret.Tween.get(this.endDownImage,{ loop: true });
        tw.to({ bottom: 10 },1500);
        
        this.endDownImage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchEndDownHandler,this);
        this.endDownLabel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchEndDownHandler,this);
    }
    
    //message_scroller滑动到底部
    private scrollChangeEnd(evt: eui.UIEvent): void {
        console.log("scrollChangeEnd");
        if((this.message_scroller.viewport.scrollV + this.message_scroller.viewport.height*1/6 >= this.endScrollV) && (this.endPage != null)) {
            this.endDownImage.visible = true;
            this.endDownLabel.visible = true;
        }
    }
    
    //message_scroller滑动到底部
    private touchEndDownHandler(evt: eui.UIEvent): void {
        console.log("scrollChangeEnd");
        this.endDownImage.visible = false;
        this.endDownLabel.visible = false;
        this.addChild(this.endPage);
    }
    
    /**
     * 退出游戏
     */ 
    private quitGame() { 
        this.timer.stop();
    }
    
    /**
     * 只展示有用的log
     */ 
    
}
