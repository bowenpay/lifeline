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

module esa {
    export module EgretSA {
        export var $playerInfo:any = {};
        export var $gameId:string;
        export var $chanId:number;
        export var $debug:boolean = false;
        export var $data:Array<any> = [];
        export var $localData:any = {};
        export var $localPlayerData:any = {};
        export var $loadingUrl:string = "http://gameanalysis.egret.com/loadingStat.php";
        export var $logUrl:string = "http://gameanalysis.egret.com/gameStat.php";
        export var $timeSpace:number = 20000;
        export var $os:any;
        export var $pixel:any = {
            "height": 0,
            "width": 0,
            "dp": 0
        };

        /**
         * === 初始化 ==注意:在用户打开游戏的时候调用
         * gameId:游戏id
         * chanId：渠道id
         * debug：true or false ，当值为true 时 不发送日志数据，建议在游戏开发的时候设置为true,避免测试数据影响真实数据
         */
        export function init(info:any):void {
            if (info.gameId == undefined || info.chanId == undefined) {
                console.log("gameId 或 渠道id 为空");
            }
            EgretSA.$gameId = info.gameId;
            EgretSA.$chanId = info.chanId;
            if (info.debug) {
                EgretSA.$debug = info.debug;
            }
            EgretSA.$localData = EgretSA.$getLoadLocalData();
            if(egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                var devicePixelRatio = window.devicePixelRatio;
                var height = window.screen.height;
                var width = window.screen.width;
                EgretSA.$pixel = {
                    "height": height,
                    "width": width,
                    "dp": devicePixelRatio
                };
            }
            EgretSA.$os = EgretSA.$getOs();
            EgretSA.$sendLoginData();
        }

        export function $getDate():string {
            var year:number = new Date().getFullYear();
            var month:number = new Date().getMonth() + 1;
            var day:number = new Date().getDate();
            var date:string = year + "-" + month + "-" + day;
            return date;
        }

        export function $getTime():number {
            var time:number = new Date().getTime();
            time = time / 1000;
            time = +time;
            return time;
        }

        export function $getLocalPlayerData():void {
            var storage = egret.localStorage;
            var localData:any = storage.getItem("__EgretSAPlayerInfo");
            var egretId = EgretSA.$playerInfo.egretId;
            var serverId = EgretSA.$playerInfo.serverId;
            var date = EgretSA.$getDate();
            var time = EgretSA.$getTime();
            if (localData) {
                localData = JSON.parse(localData);
                if (!localData[egretId]) {
                    localData[egretId] = {};
                    localData[egretId][EgretSA.$gameId] = {};
                    localData[egretId][EgretSA.$gameId][serverId] = {};
                    localData[egretId][EgretSA.$gameId][serverId]["joinTime"] = time;
                    localData[egretId][EgretSA.$gameId][serverId]["upSec"] = 0;
                    localData[egretId][EgretSA.$gameId][serverId]["joinDate"] = date;
                    localData[egretId][EgretSA.$gameId][serverId]["loginDate"] = date;
                    storage.setItem("__EgretSAPlayerInfo", JSON.stringify(localData))
                }
                if (!localData[egretId][EgretSA.$gameId]) {
                    localData[egretId][EgretSA.$gameId] = {};
                    localData[egretId][EgretSA.$gameId][serverId] = {};
                    localData[egretId][EgretSA.$gameId][serverId]["joinTime"] = time;
                    localData[egretId][EgretSA.$gameId][serverId]["upSec"] = 0;
                    localData[egretId][EgretSA.$gameId][serverId]["joinDate"] = date;
                    localData[egretId][EgretSA.$gameId][serverId]["loginDate"] = date;
                    storage.setItem("__EgretSAPlayerInfo", JSON.stringify(localData))
                }
                if (!localData[egretId][EgretSA.$gameId][serverId]) {
                    localData[egretId][EgretSA.$gameId][serverId] = {};
                    localData[egretId][EgretSA.$gameId][serverId]["joinTime"] = time;
                    localData[egretId][EgretSA.$gameId][serverId]["upSec"] = 0;
                    localData[egretId][EgretSA.$gameId][serverId]["joinDate"] = date;
                    localData[egretId][EgretSA.$gameId][serverId]["loginDate"] = date;
                    storage.setItem("__EgretSAPlayerInfo", JSON.stringify(localData))
                }
                return localData[egretId][EgretSA.$gameId][serverId]
            } else {
                localData = {};
                localData[egretId] = {};
                localData[egretId][EgretSA.$gameId] = {};
                localData[egretId][EgretSA.$gameId][serverId] = {};
                localData[egretId][EgretSA.$gameId][serverId]["joinTime"] = time;
                localData[egretId][EgretSA.$gameId][serverId]["upSec"] = 0;
                localData[egretId][EgretSA.$gameId][serverId]["joinDate"] = date;
                localData[egretId][EgretSA.$gameId][serverId]["loginDate"] = date;
                storage.setItem("__EgretSAPlayerInfo", JSON.stringify(localData));
                return localData[egretId][EgretSA.$gameId][serverId];
            }
        }

        export function $getLoadLocalData():any {
            var storage = egret.localStorage;
            var localData:any = storage.getItem("__EgretSALoadingPlayerInfo");
            if (localData) {
                localData = JSON.parse(localData);
                if (!localData[EgretSA.$gameId]) {
                    localData[EgretSA.$gameId] = {};
                    var date = EgretSA.$getDate();
                    localData[EgretSA.$gameId]["joinDate"] = date;
                    storage.setItem("__EgretSALoadingPlayerInfo", JSON.stringify(localData))
                }
                return localData;
            } else {
                localData = {};
                localData[EgretSA.$gameId] = {};
                var uuid = EgretSA.$getUid();
                var date = EgretSA.$getDate();
                localData["uuid"] = uuid;
                localData[EgretSA.$gameId]["joinDate"] = date;
                storage.setItem("__EgretSALoadingPlayerInfo", JSON.stringify(localData));
                return localData;
            }
        }

        /**
         * ===  设置loading过程,在游戏资源加载前调用 ===
         *loadingIndex：不允许为空,loading顺序,格式为从1开始自增数字
         *loadingName: 不允许为空,loading步骤说明,最多32个字符
         */
        export function loadingSet(loadingIndex, loadingName):void {
            if (loadingIndex == undefined || loadingName == undefined) {
                console.log("loading顺序 或 loading 名称为空");
            }
            loadingIndex = parseInt(loadingIndex);
            EgretSA.$sendLoadingData(loadingIndex, loadingName);
        }

        /**
         * === 设置新手引导 ===
         EgretSA.newUsersGuideSet(guideIndex, guideName);
         guideIndex:新手引导顺序,格式为从1开始自增数字，类型int
         guideName:新手引导名称,最多32个字符，类型string
         */
        export function newUsersGuideSet(guideIndex, guideName):void {
            if (guideIndex == undefined || guideName == undefined) {
                console.log("新手引导顺序 或 新手引导名称为空");
                return;
            }
            guideIndex = parseInt(guideIndex);
            var data = {
                "act": "newUserGuide",
                "item": guideIndex,
                "name": guideName
            };
            var date = EgretSA.$getDate();
            if (EgretSA.$localPlayerData.joinDate != date) {
                return;
            }
            if (EgretSA.$localPlayerData[guideIndex] == 1) {
                return;
            }
            EgretSA.$setLocalGuide(guideIndex);
            EgretSA.$setData(data);
        }

        export function $setLocalGuide(guideIndex:number):void {
            var storage = egret.localStorage;
            var localData = storage.getItem("__EgretSAPlayerInfo");
            localData = JSON.parse(localData);
            var egretId = EgretSA.$playerInfo.egretId;
            var serverId = EgretSA.$playerInfo.serverId;
            localData[egretId][EgretSA.$gameId][serverId][guideIndex] = 1;
            storage.setItem("__EgretSAPlayerInfo", JSON.stringify(localData));
            EgretSA.$localPlayerData[guideIndex] = 1
        }

        /**
         * === 游戏任务 ===
         EgretSA.onTaskAccept(type, taskName); // 接受任务
         type:任务类型 1主线 2支线 3其它，类型int
         taskName：不允许为空，任务名称,最多32个字符，类型string
         */
        export function onTaskAccept(type:number, taskName:string):void {
            if (type == undefined || taskName == undefined) {
                console.log("任务类型 或 任务名称为空");
                return;
            }
            type = +type || 0;
            var data = {
                "act": "taskAccept",
                "type": type,
                "name": taskName
            };
            EgretSA.$setData(data);
        }

        /**
         * === 游戏任务 ===
         EgretSA.onTaskCompleted(type, taskName); // 完成任务
         type:任务类型 1主线 2支线 3其它，类型int
         taskName：不允许为空，任务名称,最多32个字符，类型string
         */
        export function onTaskCompleted(type:number, taskName:string):void {
            if (type == undefined || taskName == undefined) {
                console.log("任务类型 或 任务名称为空");
                return;
            }
            type = +type || 0;
            var data = {
                "act": "taskCompleted",
                "type": type,
                "name": taskName
            };
            EgretSA.$setData(data);
        }

        /**
         * === 游戏关卡 ===
         EgretSA.onLevelDesignCompleted(type, levelDesignName); // 关卡成功
         EgretSA.onLevelDesignFailed(type, levelDesignName); // 关卡失败
         type:关卡类型 1主线 2支线 3副本 4其它，类型int
         levelDesignName：不允许为空，关卡名称,最多32个字符，类型string
         */
        export function onLevelDesignCompleted(type:number, levelDesignName:string):void {
            if (type == undefined || levelDesignName == undefined) {
                console.log("关卡类型 或 关卡名称为空");
                return;
            }
            type = +type || 0;
            var data = {
                "act": "levelDesignCompleted",
                "type": type,
                "name": levelDesignName
            };
            EgretSA.$setData(data)
        }

        export function onLevelDesignFailed(type:number, levelDesignName:string):void {
            if (type == undefined || levelDesignName == undefined) {
                console.log("关卡类型 或 关卡名称为空");
                return;
            }
            type = +type;
            var data = {
                "act": "levelDesignFailed",
                "type": type,
                "name": levelDesignName
            };
            EgretSA.$setData(data);
        }

        /**
         * EgretSA.onDiamondUse(item, itemNumber, priceInDiamond);
         示例：EgretSA.onDiamondUse("重置副本", 1, 20); // 重置1次副本，重置副本单价20钻石
         item:不允许为空，某个消费点编号或名称，最多32个字符，类型string
         itemNumber:不允许为空，消费数量，类型int
         priceInDiamond:不允许为空，消费点单价，类型int
         */
        export function onDiamondUse(item:string, itemNumber:number, priceInDiamond:number):void {
            if (item == undefined || itemNumber == undefined || priceInDiamond == undefined) {
                console.log("钻石消耗参数错误");
                return;
            }
            itemNumber = +itemNumber;
            priceInDiamond = +priceInDiamond;
            var data = {
                "act": "diamondUse",
                "num": itemNumber,
                "item": item,
                "price": priceInDiamond
            };
            EgretSA.$setData(data);
        }

        /**
         * EgretSA.onDiamondReward(num, reason);
         示例：EgretSA.onDiamondReward(100, "任务奖励"); // 任务奖励得到100钻石
         num:不允许为空，钻石数量，类型int
         reason:不允许为空，理由,最多32个字符，类型string
         */
        export function onDiamondReward(num:number, reason:string):void {
            if (num == undefined || reason == undefined) {
                console.log("赠予钻石数字 或 理由为空");
                return;
            }
            num = +num;
            var data = {
                "act": "diamondReward",
                "num": num,
                "reason": reason
            };
            EgretSA.$setData(data);
        }

        /**
         * // 获得和消耗金币
         EgretSA.onGoldOutput(num, reason);
         示例：EgretSA.onGoldOutput(10, "任务奖励"); // 完成某一个任务奖励10个金币
         num:不允许为空，金币数量，类型int
         reason:不允许为空，理由,最多32个字符，类型string
         */
        export function onGoldOutput(num:number, reason:string):void {
            if (num == undefined || reason == undefined) {
                console.log("金币获取数字 或 理由为空");
                return;
            }
            num = +num;
            var data = {
                "act": "goldOutput",
                "num": num,
                "reason": reason
            };
            EgretSA.$setData(data);
        }

        /**
         EgretSA.onGoldUse(item, itemNumber, priceInGold);
         示例：EgretSA.onGoldUse("重置副本", 1, 200); // 重置1次副本，重置副本单价200金币
         item:不允许为空，某个消费点编号或名称，最多32个字符，类型string
         itemNumber:不允许为空，消费数量，类型int
         priceInGold:不允许为空，消费点单价，类型int
         */
        export function onGoldUse(item:string, itemNumber:number, priceInGold:number):void {
            if (item == undefined || itemNumber == undefined || priceInGold == undefined) {
                console.log("金币消耗参数错误");
                return;
            }
            itemNumber = +itemNumber;
            priceInGold = +priceInGold;
            var data = {
                "act": "goldUse",
                "num": itemNumber,
                "item": item,
                "price": priceInGold
            };
            EgretSA.$setData(data);
        }

        /**
         * // 道具、武器装备产出和消耗
         // 产出
         EgretSA.onPropOutput(item, itemNumber, reason);
         示例：EgretSA.onPropOutput("紫水晶", 10, "关卡掉落"); // 关卡掉落获得10个紫水晶
         item:不允许为空，道具编号或名称，最多32个字符，类型string
         itemNumber:不允许为空，产出数量，类型int
         reason:允许为空，理由,最多32个字符，类型string
         */
        export function onPropOutput(item:string, itemNumber:number, reason:string = ""):void {
            if (item == undefined || itemNumber == undefined) {
                console.log("道具产出参数错误");
                return;
            }
            itemNumber = +itemNumber;
            var data = {
                "act": "propOutput",
                "num": itemNumber,
                "item": item,
                "reason": reason
            };
            EgretSA.$setData(data);
        }

        /**
         * // 消耗
         EgretSA.onPropUse(item, itemNumber, reason);
         示例：EgretSA.onPropUse("紫水晶", 10, "合成装备"); // 合成装备消耗10个紫水晶
         item:不允许为空，道具编号或名称，最多32个字符，类型string
         itemNumber:不允许为空，产出数量，类型int
         reason:允许为空，理由,最多32个字符，类型string
         */
        export function onPropUse(item:string, itemNumber:number, reason:string = ""):void {
            if (item == undefined || itemNumber == undefined) {
                console.log("道具使用参数错误");
                return;
            }
            itemNumber = +itemNumber;
            var data = {
                "act": "propUse",
                "num": itemNumber,
                "item": item,
                "reason": reason
            };
            EgretSA.$setData(data);
        }

        /**
         * // 活动参加
         EgretSA.onJoinActivity(item);
         示例：EgretSA.onJoinActivity("魔王活动"); // 参加魔王活动
         item:不允许为空，活动编号或名称，最多32个字符，类型string
         */
        export function onJoinActivity(item:string):void {
            if (item == undefined) {
                console.log("活动参数错误");
                return;
            }
            var data = {
                "act": "activity",
                "item": item
            };
            EgretSA.$setData(data);
        }

        export function $setData(data):void {
            if (EgretSA.$playerInfo["egretId"] == undefined || EgretSA.$chanId == undefined || EgretSA.$gameId == undefined) {
                return;
            }
            data["egretId"] = EgretSA.$playerInfo["egretId"];
            if (EgretSA.$playerInfo["level"]) {
                data["level"] = EgretSA.$playerInfo["level"]
            }
            data["serverId"] = EgretSA.$playerInfo["serverId"];
            if (EgretSA.$playerInfo["serverName"]) {
            }
            if (EgretSA.$playerInfo["playerName"]) {
                data["playerName"] = EgretSA.$playerInfo["playerName"]
            }
            if (EgretSA.$playerInfo["diamond"]) {
                data["diamond"] = EgretSA.$playerInfo["diamond"]
            }
            if (EgretSA.$playerInfo["gold"]) {
                data["gold"] = EgretSA.$playerInfo["gold"]
            }
            if (EgretSA.$playerInfo["gender"]) {
                data["gender"] = EgretSA.$playerInfo["gender"]
            }
            if (EgretSA.$playerInfo["age"]) {
                data["age"] = EgretSA.$playerInfo["age"]
            }
            data["chanId"] = EgretSA.$chanId;
            data["gameId"] = EgretSA.$gameId;
            data["pixel"] = EgretSA.$pixel;
            data["os"] = EgretSA.$os;
            EgretSA.$data.push(data)
        }

        export function $sendLoginData():void {
            if (EgretSA.$chanId == undefined || EgretSA.$gameId == undefined) {
                return;
            }
            var loginData = {};
            loginData["uid"] = EgretSA.$localData.uuid;
            loginData["act"] = "login";
            loginData["gameId"] = EgretSA.$gameId;
            loginData["chanId"] = EgretSA.$chanId;
            loginData["pixel"] = EgretSA.$pixel;
            loginData["os"] = EgretSA.$os;
            var url = EgretSA.$loadingUrl;
            var param = "data=" + JSON.stringify(loginData);
            EgretSA.$sendUrl(url, param, onSuccess);
            function onSuccess(dataObj) {

            }
        }

        export function $sendLoadingData(loadingIndex:number, loadingName:string):void {
            if (EgretSA.$chanId == undefined || EgretSA.$gameId == undefined) {
                return;
            }
            var loadingData = {};
            loadingData["uid"] = EgretSA.$localData.uuid;
            var date = EgretSA.$getDate();
            if (date != EgretSA.$localData[EgretSA.$gameId]["joinDate"]) {
                return;
            }
            loadingData["index"] = loadingIndex;
            loadingData["name"] = loadingName;
            loadingData["gameId"] = EgretSA.$gameId;
            loadingData["chanId"] = EgretSA.$chanId;
            loadingData["pixel"] = EgretSA.$pixel;
            loadingData["os"] = EgretSA.$os;
            var url = EgretSA.$loadingUrl;
            var param = "data=" + JSON.stringify(loadingData);
            EgretSA.$sendUrl(url, param, onSuccess);
            function onSuccess(dataObj) {
            }
        }

        export function $sendUrl(url:string, param:string, onResult:Function):void {
            if (EgretSA.$debug == true) {
                return;
            }
            EgretSA.$doPost({
                url: url,
                onSuccess: function (data) {
                    try {
                        onResult(data.response)
                    } catch (e) {
                    }
                },
                param: param,
                onFail: function () {
                    onResult(false)
                }
            })
        }

        export function $doPost(obj):void {
            var url = obj.url;
            var onSuccess = obj.onSuccess;
            var param = obj.param;
            if (!url) {
                console.error("no url");
                return;
            }
            if (!onSuccess) {
                console.error("no onSuccess");
                return;
            }
            var loader:egret.URLLoader = new egret.URLLoader();
            loader.addEventListener(egret.Event.COMPLETE, function () {
                var data = {
                    "response": loader.data
                };
                onSuccess(data)
            }, this);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                console.error("404:" + url);
            }, this);
            loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            var request = new egret.URLRequest(url);
            request.method = egret.URLRequestMethod.POST;
            request.data = new egret.URLVariables(param);
            loader.load(request);
        }

        export module player {
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
            export function init(playerInfo):void {
                if (playerInfo.egretId != undefined && playerInfo.egretId != null) {
                    EgretSA.$playerInfo["egretId"] = playerInfo.egretId
                }
                if (playerInfo.level != undefined && playerInfo.level != null) {
                    EgretSA.$playerInfo.level = parseInt(playerInfo.level)
                }
                if (playerInfo.serverId != undefined && playerInfo.serverId != null) {
                    EgretSA.$playerInfo.serverId = parseInt(playerInfo.serverId)
                } else {
                    EgretSA.$playerInfo.serverId = 1
                }
                if (playerInfo.playerName != undefined && playerInfo.playerName != null) {
                    EgretSA.$playerInfo.playerName = playerInfo.playerName
                }
                if (playerInfo.diamond != undefined && playerInfo.diamond != null) {
                    EgretSA.$playerInfo.diamond = parseInt(playerInfo.diamond)
                }
                if (playerInfo.gold != undefined && playerInfo.gold != null) {
                    EgretSA.$playerInfo.gold = parseInt(playerInfo.gold)
                }
                if (playerInfo.age != undefined && playerInfo.age != null) {
                    EgretSA.$playerInfo.age = parseInt(playerInfo.age)
                }
                if (playerInfo.gender != undefined && playerInfo.gender != null) {
                    EgretSA.$playerInfo.gender = parseInt(playerInfo.gender)
                }
                EgretSA.$localPlayerData = EgretSA.$getLocalPlayerData();
                var data = {
                    "act": "login"
                };
                EgretSA.$setData(data);
                egret.setInterval(EgretSA.$sendData, EgretSA, EgretSA.$timeSpace);
            }

            /**
             * === 设置玩家等级 ===
             EgretSA.player.setLevel(level);
             level:玩家等级，类型int
             */
            export function setLevel(level:number):void {
                if (EgretSA.$playerInfo.level < level) {
                    EgretSA.$playerInfo.level = level;
                    var num = EgretSA.$localPlayerData.upSec;
                    if (num == 0) {
                        var time = EgretSA.$getTime();
                        num = time - EgretSA.$localPlayerData.joinTime;
                        var space = EgretSA.$timeSpace / 1000;
                        if (num > space) {
                            num = space
                        }
                    }
                    var data = {
                        "act": "levelChange",
                        "num": num
                    };
                    EgretSA.$setLevelSec();
                    EgretSA.$setData(data)
                }
            }

            /**
             * === 设置玩家昵称 ===
             EgretSA.player.setPlayerName(name);
             level:玩家昵称，类型string
             */
            export function setPlayerName(name):void {
                EgretSA.$playerInfo.playerName = name;
            }

            /**
             * === 设置玩家钻石 ===
             EgretSA.player.setLevel(diamond);
             level:玩家钻石，类型int
             */
            export function setDiamond(diamond):void {
                EgretSA.$playerInfo.diamond = parseInt(diamond);
            }

            /**
             * === 设置玩家金币 ===
             EgretSA.player.setLevel(gold);
             level:玩家金币，类型int
             */
            export function setGold(gold):void {
                EgretSA.$playerInfo.gold = parseInt(gold);
            }
        }

        export function $setLevelSec():void {
            var storage = egret.localStorage;
            var localData = storage.getItem("__EgretSAPlayerInfo");
            localData = JSON.parse(localData);
            var egretId = EgretSA.$playerInfo.egretId;
            var serverId = EgretSA.$playerInfo.serverId;
            localData[egretId][EgretSA.$gameId][serverId]["upSec"] = 0;
            storage.setItem("__EgretSAPlayerInfo", JSON.stringify(localData));
            EgretSA.$localPlayerData.upSec = 0;
        }

        export function $setUpSec():void {
            var storage = egret.localStorage;
            var localData = storage.getItem("__EgretSAPlayerInfo");
            localData = JSON.parse(localData);
            var egretId = EgretSA.$playerInfo.egretId;
            var serverId = EgretSA.$playerInfo.serverId;
            var space = EgretSA.$timeSpace / 1000;
            var sec = localData[egretId][EgretSA.$gameId][serverId]["upSec"] + space;
            localData[egretId][EgretSA.$gameId][serverId]["upSec"] = sec;
            EgretSA.$localPlayerData.upSec = sec;
            storage.setItem("__EgretSAPlayerInfo", JSON.stringify(localData));
        }

        export function $upLoginDate():void {
            var date = EgretSA.$getDate();
            if (EgretSA.$localPlayerData.loginDate != date) {
                EgretSA.$localPlayerData.loginDate = date;
                var data = {
                    "act": "loginReload"
                };
                EgretSA.$setData(data);
            }
            var storage = egret.localStorage;
            var localData = storage.getItem("__EgretSAPlayerInfo");
            localData = JSON.parse(localData);
            var egretId = EgretSA.$playerInfo.egretId;
            var serverId = EgretSA.$playerInfo.serverId;
            localData[egretId][EgretSA.$gameId][serverId]["loginDate"] = date;
            storage.setItem("__EgretSAPlayerInfo", JSON.stringify(localData));
        }

        /**
         * // 离开游戏
         EgretSA.onLeave();
         */
        export function onLeave():void {
            EgretSA.$sendData();
        }

        export function $sendData():void {
            if (EgretSA.$data.length != 0) {
                var url = EgretSA.$logUrl;
                var param = "data=" + JSON.stringify(EgretSA.$data);
                EgretSA.$sendUrl(url, param, onSuccess);
                function onSuccess(dataObj) {}
            }
            EgretSA.$setUpSec();
            EgretSA.$data = [];
            EgretSA.$upLoginDate();
        }

        export function $getUid():string {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 16), 1)
            }
            s[14] = "4";
            s[19] = hexDigits.substr((s[19] & 3) | 8, 1);
            s[8] = s[13] = s[18] = s[23] = "";
            var uuid = s.join("");
            return uuid;
        }

        export function $getOs():any {
            var osInfo = {};
            //是runtime
            if(egret.getOption("egret.runtime.nest") != null) {
                osInfo["os"] = 3;
                return osInfo;
            }
            //是app
            if(egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                osInfo["os"] = 4;
                return osInfo;
            }
            var appVersion = window.navigator.appVersion;
            var isAndroid = appVersion.indexOf("Android") > -1 || appVersion.indexOf("Linux") > -1;
            var isIos = appVersion.indexOf("iPhone") > -1 || appVersion.indexOf("Mac") > -1;
            var isWindows = appVersion.indexOf("Windows") > -1;
            var os = 4;
            var brand = "";
            var version = "";
            if (isAndroid !== false) {
                os = 3;
                var start = appVersion.indexOf("(");
                var end = appVersion.indexOf(")");
                var info = appVersion.substring(start + 1, end);
                var infoArr = info.split(";");
                var brandStr = infoArr[infoArr.length - 1].trim();
                brand = brandStr.substring(0, brandStr.indexOf("Build") - 1);
                for (var i = infoArr.length - 1; i >= 0; i--) {
                    if (infoArr[i].indexOf("Android") > -1) {
                        version = infoArr[i].trim().substring(8);
                        break
                    }
                }
            }
            if (isIos !== false) {
                os = 1;
                var start = appVersion.indexOf("(");
                var end = appVersion.indexOf(")");
                var info = appVersion.substring(start + 1, end);
                var infoArr = info.split(";");
                brand = infoArr[0];
                for (var i = infoArr.length - 1; i >= 1; i--) {
                    if (infoArr[i].indexOf("CPU") > -1) {
                        var versionArr = infoArr[i].trim().split(" ");
                        for (var i = 1; i <= versionArr.length - 1; i++) {
                            if (versionArr[i].indexOf("_") > -1) {
                                version = versionArr[i].trim();
                                break
                            }
                        }
                        break
                    }
                }
            }
            if (isWindows !== false) {
                os = 2;
                var start = appVersion.indexOf("(");
                var end = appVersion.indexOf(")");
                var info = appVersion.substring(start + 1, end);
                var infoArr = info.split(";");
                brand = infoArr[0];
                for (var i = 1; i <= infoArr.length - 1; i++) {
                    var index = infoArr[i].indexOf("Phone");
                    if (index > -1) {
                        version = infoArr[i].substring(index + 6);
                        break
                    }
                }
            }
            osInfo["os"] = os;
            osInfo["brand"] = brand;
            osInfo["version"] = version;
            return osInfo;
        }
    }
}