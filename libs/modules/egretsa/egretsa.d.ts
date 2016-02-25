declare module esa {
    module EgretSA {
        var $playerInfo: any;
        var $gameId: string;
        var $chanId: number;
        var $debug: boolean;
        var $data: Array<any>;
        var $localData: any;
        var $localPlayerData: any;
        var $loadingUrl: string;
        var $logUrl: string;
        var $timeSpace: number;
        var $os: any;
        var $pixel: any;
        /**
         * === 初始化 ==注意:在用户打开游戏的时候调用
         * gameId:游戏id
         * chanId：渠道id
         * debug：true or false ，当值为true 时 不发送日志数据，建议在游戏开发的时候设置为true,避免测试数据影响真实数据
         */
        function init(info: any): void;
        function $getDate(): string;
        function $getTime(): number;
        function $getLocalPlayerData(): void;
        function $getLoadLocalData(): any;
        /**
         * ===  设置loading过程,在游戏资源加载前调用 ===
         *loadingIndex：不允许为空,loading顺序,格式为从1开始自增数字
         *loadingName: 不允许为空,loading步骤说明,最多32个字符
         */
        function loadingSet(loadingIndex: any, loadingName: any): void;
        /**
         * === 设置新手引导 ===
         EgretSA.newUsersGuideSet(guideIndex, guideName);
         guideIndex:新手引导顺序,格式为从1开始自增数字，类型int
         guideName:新手引导名称,最多32个字符，类型string
         */
        function newUsersGuideSet(guideIndex: any, guideName: any): void;
        function $setLocalGuide(guideIndex: number): void;
        /**
         * === 游戏任务 ===
         EgretSA.onTaskAccept(type, taskName); // 接受任务
         type:任务类型 1主线 2支线 3其它，类型int
         taskName：不允许为空，任务名称,最多32个字符，类型string
         */
        function onTaskAccept(type: number, taskName: string): void;
        /**
         * === 游戏任务 ===
         EgretSA.onTaskCompleted(type, taskName); // 完成任务
         type:任务类型 1主线 2支线 3其它，类型int
         taskName：不允许为空，任务名称,最多32个字符，类型string
         */
        function onTaskCompleted(type: number, taskName: string): void;
        /**
         * === 游戏关卡 ===
         EgretSA.onLevelDesignCompleted(type, levelDesignName); // 关卡成功
         EgretSA.onLevelDesignFailed(type, levelDesignName); // 关卡失败
         type:关卡类型 1主线 2支线 3副本 4其它，类型int
         levelDesignName：不允许为空，关卡名称,最多32个字符，类型string
         */
        function onLevelDesignCompleted(type: number, levelDesignName: string): void;
        function onLevelDesignFailed(type: number, levelDesignName: string): void;
        /**
         * EgretSA.onDiamondUse(item, itemNumber, priceInDiamond);
         示例：EgretSA.onDiamondUse("重置副本", 1, 20); // 重置1次副本，重置副本单价20钻石
         item:不允许为空，某个消费点编号或名称，最多32个字符，类型string
         itemNumber:不允许为空，消费数量，类型int
         priceInDiamond:不允许为空，消费点单价，类型int
         */
        function onDiamondUse(item: string, itemNumber: number, priceInDiamond: number): void;
        /**
         * EgretSA.onDiamondReward(num, reason);
         示例：EgretSA.onDiamondReward(100, "任务奖励"); // 任务奖励得到100钻石
         num:不允许为空，钻石数量，类型int
         reason:不允许为空，理由,最多32个字符，类型string
         */
        function onDiamondReward(num: number, reason: string): void;
        /**
         * // 获得和消耗金币
         EgretSA.onGoldOutput(num, reason);
         示例：EgretSA.onGoldOutput(10, "任务奖励"); // 完成某一个任务奖励10个金币
         num:不允许为空，金币数量，类型int
         reason:不允许为空，理由,最多32个字符，类型string
         */
        function onGoldOutput(num: number, reason: string): void;
        /**
         EgretSA.onGoldUse(item, itemNumber, priceInGold);
         示例：EgretSA.onGoldUse("重置副本", 1, 200); // 重置1次副本，重置副本单价200金币
         item:不允许为空，某个消费点编号或名称，最多32个字符，类型string
         itemNumber:不允许为空，消费数量，类型int
         priceInGold:不允许为空，消费点单价，类型int
         */
        function onGoldUse(item: string, itemNumber: number, priceInGold: number): void;
        /**
         * // 道具、武器装备产出和消耗
         // 产出
         EgretSA.onPropOutput(item, itemNumber, reason);
         示例：EgretSA.onPropOutput("紫水晶", 10, "关卡掉落"); // 关卡掉落获得10个紫水晶
         item:不允许为空，道具编号或名称，最多32个字符，类型string
         itemNumber:不允许为空，产出数量，类型int
         reason:允许为空，理由,最多32个字符，类型string
         */
        function onPropOutput(item: string, itemNumber: number, reason?: string): void;
        /**
         * // 消耗
         EgretSA.onPropUse(item, itemNumber, reason);
         示例：EgretSA.onPropUse("紫水晶", 10, "合成装备"); // 合成装备消耗10个紫水晶
         item:不允许为空，道具编号或名称，最多32个字符，类型string
         itemNumber:不允许为空，产出数量，类型int
         reason:允许为空，理由,最多32个字符，类型string
         */
        function onPropUse(item: string, itemNumber: number, reason?: string): void;
        /**
         * // 活动参加
         EgretSA.onJoinActivity(item);
         示例：EgretSA.onJoinActivity("魔王活动"); // 参加魔王活动
         item:不允许为空，活动编号或名称，最多32个字符，类型string
         */
        function onJoinActivity(item: string): void;
        function $setData(data: any): void;
        function $sendLoginData(): void;
        function $sendLoadingData(loadingIndex: number, loadingName: string): void;
        function $sendUrl(url: string, param: string, onResult: Function): void;
        function $doPost(obj: any): void;
        module player {
            /**
             === 初始化玩家数据 ===
             EgretSA.player.init({
            "egretId":"111111", // egretId 不允许为空，类型string
            "level":1, // 允许为空，等级，类型int
            "serverId":1, // 不允许为空，默认1，区服id 数字从1开始，类型int
            "playerName":"昵称", // 允许为空，玩家昵称,最多32个字符，类型string
            "diamond":50, // 允许为空，游戏内充值得到的虚拟币，类型int
            "gold":1000, // 允许为空，游戏内部非充值得到的虚拟币，类型int
            "age":30, // 允许为空，年龄，类型int
            "gender":1, // 允许为空，性别 1男2女，类型int
         });
             */
            function init(playerInfo: any): void;
            /**
             * === 设置玩家等级 ===
             EgretSA.player.setLevel(level);
             level:玩家等级，类型int
             */
            function setLevel(level: number): void;
            /**
             * === 设置玩家昵称 ===
             EgretSA.player.setPlayerName(name);
             level:玩家昵称，类型string
             */
            function setPlayerName(name: any): void;
            /**
             * === 设置玩家钻石 ===
             EgretSA.player.setLevel(diamond);
             level:玩家钻石，类型int
             */
            function setDiamond(diamond: any): void;
            /**
             * === 设置玩家金币 ===
             EgretSA.player.setLevel(gold);
             level:玩家金币，类型int
             */
            function setGold(gold: any): void;
        }
        function $setLevelSec(): void;
        function $setUpSec(): void;
        function $upLoginDate(): void;
        /**
         * // 离开游戏
         EgretSA.onLeave();
         */
        function onLeave(): void;
        function $sendData(): void;
        function $getUid(): string;
        function $getOs(): any;
    }
}
