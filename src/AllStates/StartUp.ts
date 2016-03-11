/**
 *
 * 创业状态
 *
 */
class StartUp {
    public static QUESTIONS = [


        {
            question: "去哪里找你的合伙人呢？",
            detail: [
                '创业不是一个人能完成的，你需要找到一起奋斗的小伙伴，那么你去哪里找你的合伙人呢？',
            ],
            answers: [
                { answer: "找同学，同事或朋友",event: "互联网行业初期找合伙人事件1" },
                { answer: "去创业咖啡馆找",event: "互联网行业初期找合伙人事件2" },
                { answer: "在网上找",event: "互联网行业初期找合伙人事件3" },
            ],
            left_times: 1,
            require: function(properties) { return 1 },
        },
        {
            question: "公司本身还没有盈利能力，你需要找到资金来维持公司运营，那么，怎么去找钱呢？",
            answers: [
                {
                    answer: "找风投",
                    event: function(properties) {
                        if(Math.random() < 0.1 * properties.ability / 100) {
                            return "互联网行业初期找钱事件1";
                        } else {
                            return "互联网行业初期找钱事件5";
                        }
                    }
                },
                {
                    answer: "找亲戚朋友投资",event: function(properties) {
                        if(Math.random() < 0.5 * properties.ability / 100) {
                            return "互联网行业初期找钱事件2";
                        } else {
                            return "互联网行业初期找钱事件6";
                        }
                    }
                },
                {
                    answer: "在网上众筹",event: function(properties) {
                        if(Math.random() < 0.2 * properties.ability / 100) {
                            return "互联网行业初期找钱事件3";
                        } else {
                            return "互联网行业初期找钱事件7";
                        }
                    }
                },
                { answer: "没钱还创什么业，放弃",event: "互联网行业初期找钱事件4" }

            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time == 2) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "公司的财务状况很糟了，急需一笔融资，该怎么去找？",
            answers: [
                {
                    answer: "找风投",
                    event: function(properties) {
                        if(Math.random() < 0.2 * properties.ability / 100) {
                            return "互联网行业初期找钱事件1";
                        } else {
                            return "互联网行业初期找钱事件5";
                        }
                    }
                },
                {
                    answer: "找亲戚朋友投资",event: function(properties) {
                        if(Math.random() < 0.5 * properties.ability / 100) {
                            return "互联网行业初期找钱事件2";
                        } else {
                            return "互联网行业初期找钱事件6";
                        }
                    }
                },
                {
                    answer: "在网上众筹",event: function(properties) {
                        if(Math.random() < 0.3 * properties.ability / 100) {
                            return "互联网行业初期找钱事件3";
                        } else {
                            return "互联网行业初期找钱事件7";
                        }
                    }
                },
                { answer: "没钱还创什么业，放弃",event: "互联网行业初期找钱事件4" }

            ],
            left_times: 1,
            require: function(properties) {
                if(properties.fund < 100000) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "发不出工资了，然而你的项目并没有踏上正轨，所以...你创业失败了",
            answers: [
                { answer: "由于资金链断裂，你的公司倒闭了",event: "互联网行业初期创业失败事件1" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 3 && properties.fund < 80000) { return 1; }
                else { return 3; }
            },
        },

        {
            question: "你作为公司创始人，已经很长时间没有领工资了，你自己的积蓄已经用完了，怎么办？",
            answers: [
                { answer: "自己出去做点儿私活养活自己",event: "互联网行业初期没钱了事件1" },
                { answer: "从公司账户偷偷拿点儿钱花",event: "互联网行业初期没钱了事件2" },
                { answer: "跟父母要一笔钱救急",event: "互联网行业初期没钱了事件3" },
                { answer: "创业太苦B了，我不干了",event: "互联网行业初期没钱了事件4" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 2 && properties.wealth < 10000) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "由于你的家境殷实，你爸妈支援了你一笔钱作为创业启动资金，是否接受？",
            answers: [
                { answer: "接受",event: "互联网行业初期富裕事件1" },
                { answer: "不接受，相信自己",event: "互联网行业初期富裕事件2" },

            ],
            left_times: 1,
            require: function(properties) {
                if(properties.fuyu == 1) { return 1; }
                else { return 3; }
            },
        },

        {
            question: "你的公司做的不错，小伙伴们都很有干劲，市场反馈也很好，你该如何抉择？",
            answers: [
                { answer: "我的目标是IPO，当然继续拉",event: "互联网行业初期两年后做的不错事件1" },
                { answer: "见好就收，把公司卖掉",event: "互联网行业初期两年后做的不错事件2" },
                { answer: "收回自己的股份，退出创业",event: "互联网行业初期两年后做的不错事件3" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 8 && properties.fund > 1000000) { return 1; }
                else { return 3; }
            },
        },



        {
            question: "怎么去找到你的种子用户呢？",
            answers: [
                { answer: "网上买流量",event: "互联网行业初期找种子用户事件1" },
                { answer: "自己去扫楼，扫街",event: "互联网行业初期找种子用户事件2" },
                { answer: "自己到社区，朋友圈发帖",event: "互联网行业初期找种子用户事件3" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },

        {
            question: "对于一个互联网公司，人才是最重要的，你准备怎么招人？",
            answers: [
                { answer: "找猎头",event: "互联网行业初期招人方式事件1" },
                { answer: "朋友介绍",event: "互联网行业初期招人方式事件2" },
                { answer: "自己去创投圈找",event: "互联网行业初期招人方式事件3" },
                { answer: "网上发布岗位",event: "互联网行业初期招人方式事件4" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },

        {
            question: "公司产品反响不错，接下来怎么选择？",
            answers: [
                { answer: "先增加用户量，暂缓盈利",event: "互联网行业初期公司产品反响事件1" },
                { answer: "先盈利，再图发展",event: "互联网行业初期公司产品反响事件2" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },

        {
            question: "由于你能力超群，一个朋友愿意注资成为你的合伙人，但他什么都不会，你该怎么办？",
            answers: [
                { answer: "钱最重要，必须接受啊",event: "互联网行业初期富二代朋友加入事件1" },
                { answer: "不接受，他进入公司会影响我的决策和运营",event: "互联网行业初期富二代朋友加入事件2" },
                { answer: "接受，但要谈好细则，估值等",event: "互联网行业初期富二代朋友加入事件3" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.success > 27) { return 1; }
                else { return 3; }
            },
        },

        {
            question: "有几个投资人对你的公司感兴趣，你更倾向于选择哪种类型的投资人呢？",
            answers: [
                { answer: "专业的投资机构",event: "互联网行业初期投资人感兴趣事件1" },
                { answer: "大公司的投资部门",event: "互联网行业初期投资人感兴趣事件2" },
                { answer: "土豪老板",event: "互联网行业初期投资人感兴趣事件3" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.success > 32) { return 1; }
                else { return 3; }
            },
        },

        {
            question: "产品上线了，在运营过程中你会选择？",
            answers: [
                { answer: "补贴用户，快速扩张",event: "互联网行业初期产品上线运营事件1" },
                { answer: "自然增长，静观其变",event: "互联网行业初期产品上线运营事件2" },
                { answer: "细水长流，快速盈利",event: "互联网行业初期产品上线运营事件3" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },

        {
            question: "由于一心创业，你与家里关系情况变得很差，你怎么办？",
            answers: [
                { answer: "继续创业",event: "互联网行业初期家人劝放弃事件1" },
                { answer: "放弃创业",event: "互联网行业初期家人劝放弃事件2" },
            ],
            left_times: 1,
            require: function(properties) { return 2; }

        },

        {
            question: "由于长期熬夜，加班加点的工作，你的身体出现了一些问题，你该如何选择？",
            answers: [
                { answer: "有得必有失，继续坚持创业",event: "互联网行业初期身体出问题事件1" },
                { answer: "调整作息，锻炼身体，少花一些时间在工作上",event: "互联网行业初期身体出问题事件2" },
                { answer: "放弃创业，保重身体要紧",event: "互联网行业初期身体出问题事件3" },
                { answer: "给自己放一个假，公司的事让合伙人盯着",event: "互联网行业初期身体出问题事件4" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.health < 80) { return 1; }
                else { return 3; }
            },
        },

        {
            question: "有个潜在的客户需要去挖掘，该客户喜欢赌博，你是否花时间去陪他赌博？",
            answers: [
                { answer: "陪，客户就是上帝",event: "互联网行业初期陪客户赌博事件1" },
                { answer: "不陪，这样的客户不要也罢",event: "互联网行业初期陪客户赌博事件2" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },

        {
            question: "对于公司或产品的PR(public relations,公共关系)，你怎么看？",
            answers: [
                { answer: "PR很重要，要花大功夫去做",event: "互联网行业初期做公司PR事件1" },
                { answer: "PR重要但不必要，做的一般般就行",event: "互联网行业初期做公司PR事件2" },
                { answer: "PR可有可无",event: "互联网行业初期做公司PR事件3" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },


        {
            question: "时间过去了两年多，你的公司运营一直没有什么起色，投资人决定撤资",
            answers: [
                { answer: "创业失败...",event: "互联网行业初期两年后放弃事件" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 7 && properties.fund < 1000000) { return 1; }
                else { return 3; }
            },
        },

        {
            question: "你因为创业太忙没有时间陪女（男）朋友，导致你们经常吵架，怎么办？",
            answers: [
                { answer: "事业高于一切，不行就先分手吧",event: "互联网行业初期对象吵架事件1" },
                { answer: "我要事业爱情兼顾",event: "互联网行业初期对象吵架事件2" },
                { answer: "爱情重要，多抽时间陪陪他（她）吧",event: "互联网行业初期对象吵架事件3" },
            ],
            left_times: 1,
            require: function(properties) { return 2; }

        },


        {
            question: "初期的公司财务怎么处理？",
            answers: [
                { answer: "交给代理财务公司去做",event: "互联网行业初期财务问题事件1" },
                { answer: "自己招会计和出纳",event: "互联网行业初期财务问题事件2" },
                { answer: "自己做",event: "互联网行业初期财务问题事件3" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },
        {
            question: "你的身体状况很差，小病不断，大病连连，已经不能再坚持创业了",
            answers: [
                { answer: "身体才是革命的本钱啊骚年...",event: "互联网行业初期生病放弃事件" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.health < 66) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "办公场地怎么解决？",
            answers: [
                { answer: "租写字楼，有利于招聘和PR",event: "互联网行业初期办公场地事件1" },
                { answer: "租民房，节省资金又能在一起办公",event: "互联网行业初期办公场地事件2" },
                { answer: "进驻创业咖啡厅，租工位",event: "互联网行业初期办公场地事件3" },
                { answer: "大家在家办公，线上交流",event: "互联网行业初期办公场地事件4" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },
        {
            question: "你和你的合伙人怎么分配股权？",
            answers: [
                { answer: "我是领头人，我占大头",event: "互联网行业初期股权问题事件1" },
                { answer: "大家平分",event: "互联网行业初期股权问题事件2" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },
        {
            question: "有个合伙人老是跟你唱反调，经常为了一些公司决策吵架，你该怎么办？",
            answers: [
                { answer: "必须确定自己的权威，找个机会把他踢掉",event: "互联网行业初期合伙人吵架事件1" },
                { answer: "吵架是好事，只要大家都是为了公司利益",event: "互联网行业初期合伙人吵架事件2" },
                { answer: "尽量避免吵架，有的事情可以妥协",event: "互联网行业初期合伙人吵架事件3" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },
        {
            question: "公司招了一个员工，但是试用期结束他的能力并不如预想的强，你该怎么办？",
            answers: [
                { answer: "踢掉！创业不能养庸才",event: "互联网行业初期员工能力不够事件1" },
                { answer: "先凑合着用，找到合适的再换",event: "互联网行业初期员工能力不够事件2" },
                { answer: "能招到人就不错了，哪还能挑肥拣瘦",event: "互联网行业初期员工能力不够事件3" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },
        {
            question: "你的公司做的很成功，恭喜你进入创业的下一个阶段！",
            answers: [
                { answer: "确定",event: "互联网行业初期进入下一阶段事件" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 12 && properties.success > 50) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "你的公司一直没有太大起色，该放弃了。",
            answers: [
                { answer: "确定",event: "互联网行业初期进入下一阶段事件2" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 13 && properties.success < 50) { return 1; }
                else { return 3; }
            },
        },

    ]


    public static EVENTS = [ 
        //创业初期
        { detail: [],name: '互联网行业初期找合伙人事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 200000,wealth: 0,ability: 1,health: 0,success: 4 } },
        { detail: [],name: '互联网行业初期找合伙人事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 200000,wealth: 0,ability: 1,health: 0,success: 2 } },
        { detail: [],name: '互联网行业初期找合伙人事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 200000,wealth: 0,ability: 0,health: 0,success: 2 } },
        { detail: ["你鸿运当头，有一位天使投资人愿意给你投钱，你算是有了点创业的基础子弹"],name: '互联网行业初期找钱事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 500000,wealth: 20000,ability: 4,health: 0,success: 6 } },
        { detail: ['你成功的找到了一个搞房地产的土老板叔叔，忽悠他给你投了点钱，虽然不多，启动项目应该是够了'],name: '互联网行业初期找钱事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 300000,wealth: 20000,ability: 1,health: 0,success: 2 } },
        { detail: ['你在网上众筹成功，不仅融到了一笔可观的钱，还帮助产品提高了些知名度'],name: '互联网行业初期找钱事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 200000,wealth: 20000,ability: 2,health: 0,success: 4 } },
        { detail: ['这就放弃啦？好吧，看来你确实不适合创业'],name: '互联网行业初期找钱事件4',from: '互联网行业初期状态',to: '互联网创业失败',properties: { ending: 100,__SHOW_ENDING: 1 } },
        { detail: ["跟大多数人一样，你找了三个月的投资，然而并没有人鸟你"],name: '互联网行业初期找钱事件5',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,ability: 1,health: 0,success: 1 } },
        { detail: ["你联系了几个有钱的叔叔阿姨，然而并没有人鸟你"],name: '互联网行业初期找钱事件6',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,ability: 1,health: 0,success: 1 } },
        { detail: ["你在许多网站上申请众筹，但是没有一个网站上众筹成功"],name: '互联网行业初期找钱事件7',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,ability: 1,health: 0,success: 1 } },
        { detail: [],name: '互联网行业初期找种子用户事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -80000,wealth: 0,ability: 1,health: 0,success: 4 } },
        { detail: [],name: '互联网行业初期找种子用户事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -40000,wealth: 0,ability: 2,health: -1,success: 2 } },
        { detail: [],name: '互联网行业初期找种子用户事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 0,ability: 1,health: 0,success: 1 } },
        { detail: [],name: '互联网行业初期没钱了事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 30000,ability: 1,health: -3,success: -2,time: -1,state_time: -1 } },
        { detail: [],name: '互联网行业初期没钱了事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -40000,wealth: 30000,ability: 0,health: 0,success: -2,time: -1,state_time: -1 } },
        { detail: [],name: '互联网行业初期没钱了事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 30000,ability: 0,health: 0,success: 0,time: -1,state_time: -1 } },
        { detail: [],name: '互联网行业初期没钱了事件4',from: '互联网行业初期状态',to: '互联网创业失败',properties: { ending: 100,__SHOW_ENDING: 1} },
        { detail: [],name: '互联网行业初期招人方式事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -80000,wealth: 0,ability: 0,health: 0,success: 4 } },
        { detail: [],name: '互联网行业初期招人方式事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -40000,wealth: 0,ability: 1,health: 0,success: 3 } },
        { detail: [],name: '互联网行业初期招人方式事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 0,ability: 2,health: 0,success: 2 } },
        { detail: [],name: '互联网行业初期招人方式事件4',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,ability: 1,health: 0,success: 1 } },
        { detail: [],name: '互联网行业初期公司产品反响事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -80000,wealth: 0,ability: 4,health: 0,success: 4 } },
        { detail: [],name: '互联网行业初期公司产品反响事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 80000,wealth: 50000,ability: 2,health: 0,success: 1 } },
        { detail: [],name: '互联网行业初期投资人感兴趣事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 400000,wealth: 0,ability: 5,health: 0,success: 8 } },
        { detail: [],name: '互联网行业初期投资人感兴趣事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 500000,wealth: 0,ability: 3,health: 0,success: 6 } },
        { detail: [],name: '互联网行业初期投资人感兴趣事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 600000,wealth: 0,ability: 1,health: 0,success: 4 } },
        { detail: [],name: '互联网行业初期产品上线运营事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -80000,wealth: 0,ability: 2,health: 0,success: 4 } },
        { detail: [],name: '互联网行业初期产品上线运营事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -40000,wealth: 0,ability: 0,health: 0,success: 2 } },
        { detail: [],name: '互联网行业初期产品上线运营事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 50000,ability: 0,health: 1,success: 1 } },
        { detail: [],name: '互联网行业初期家人劝放弃事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 20000,wealth: 0,ability: 5,health: -2,success: 2,time: -1,state_time: -1 } },
        { detail: [],name: '互联网行业初期家人劝放弃事件2',from: '互联网行业初期状态',to: '互联网行业创业失败',properties: { ending: 100,__SHOW_ENDING: 1 } },
        { detail: [],name: '互联网行业初期身体出问题事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 20000,wealth: 10000,ability: -2,health: 0,success: 0,time: -1,state_time: -1 } },
        { detail: [],name: '互联网行业初期身体出问题事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 10000,ability: -4,health: 6,success: -3,time: -1,state_time: -1 } },
        { detail: [],name: '互联网行业初期身体出问题事件3',from: '互联网行业初期状态',to: '互联网创业失败',properties: { ending: 90,__SHOW_ENDING: 1} },
        { detail: [],name: '互联网行业初期身体出问题事件4',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 0,ability: -5,health: 8,success: -2,time: -1,state_time: -1 } },
        { detail: [],name: '互联网行业初期陪客户赌博事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 40000,wealth: 0,ability: 2,health: -2,success: 2 } },
        { detail: [],name: '互联网行业初期陪客户赌博事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 0,ability: 1,health: 1,success: 0 } },
        { detail: [],name: '互联网行业初期做公司PR事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -80000,wealth: 0,ability: 4,health: -2,success: 4 } },
        { detail: [],name: '互联网行业初期做公司PR事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -40000,wealth: 0,ability: 2,health: -1,success: 2 } },
        { detail: [],name: '互联网行业初期做公司PR事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,ability: -1,health: 1,success: 0 } },
        { detail: [],name: '互联网行业初期两年后放弃事件',from: '互联网行业初期状态',to: '互联网创业失败',properties: { ending: 95,__SHOW_ENDING: 1} },
        { detail: [],name: '互联网行业初期富二代朋友加入事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 300000,wealth: 0,ability: 0,health: 0,success: 2 } },
        { detail: [],name: '互联网行业初期富二代朋友加入事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,ability: 4,health: 0,success: 4 } },
        { detail: [],name: '互联网行业初期富二代朋友加入事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 150000,wealth: 0,ability: 2,health: 0,success: 2 } },
        { detail: [],name: '互联网行业初期两年后做的不错事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 100000,wealth: 0,ability: 5,health: -2,success: 4 } },
        { detail: [],name: '互联网行业初期两年后做的不错事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 500000,ability: -5,health: 4,success: 0 } },
        { detail: [],name: '互联网行业初期两年后做的不错事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 500000,ability: -5,health: 4,success: 0 } },
        { detail: [],name: '互联网行业初期对象吵架事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,ability: 4,health: -2,success: 4 } },
        { detail: [],name: '互联网行业初期对象吵架事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,ability: 2,health: -4,success: 2 } },
        { detail: [],name: '互联网行业初期对象吵架事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,ability: -2,health: 0,success: 0 } },
        { detail: [],name: '互联网行业初期创业失败事件1',from: '互联网行业初期状态',to: '互联网行业创业失败',properties: { ending: 100,__SHOW_ENDING: 1 } },
        { detail: [],name: '互联网行业初期财务问题事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 0,ability: 0,health: 0,success: 2 } },
        { detail: [],name: '互联网行业初期财务问题事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -60000,wealth: 0,ability: 0,health: 0,success: 4 } },
        { detail: [],name: '互联网行业初期财务问题事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,ability: 4,health: -2,success: 0 } },
        { detail: [],name: '互联网行业初期办公场地事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -80000,wealth: 0,ability: 4,health: 1,success: 3 } },
        { detail: [],name: '互联网行业初期办公场地事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -60000,wealth: 0,ability: 3,health: 1,success: 2 } },
        { detail: [],name: '互联网行业初期办公场地事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -40000,wealth: 0,ability: 2,health: 1,success: 2 } },
        { detail: [],name: '互联网行业初期办公场地事件4',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 0,ability: 1,health: 1,success: 1 } },
        { detail: [],name: '互联网行业初期股权问题事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,bility: 4,health: 0,success: 2 } },
        { detail: [],name: '互联网行业初期股权问题事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,ability: 2,health: 0,success: -2 } },
        { detail: [],name: '互联网行业初期合伙人吵架事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -40000,wealth: 0,ability: -2,health: -2,success: -4 } },
        { detail: [],name: '互联网行业初期合伙人吵架事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,ability: 2,health: -2,success: 4 } },
        { detail: [],name: '互联网行业初期合伙人吵架事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,ability: 0,health: -1,success: 0 } },
        { detail: [],name: '互联网行业初期员工能力不够事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -40000,wealth: 0,ability: 4,health: 0,success: 4 } },
        { detail: [],name: '互联网行业初期员工能力不够事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 0,ability: 0,health: 0,success: 2 } },
        { detail: [],name: '互联网行业初期员工能力不够事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网行业初期进入下一阶段事件',from: '互联网行业初期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 500000,ability: 4,health: 2,success: 4 } },
        { detail: [],name: '互联网行业初期进入下一阶段事件2',from: '互联网行业初期状态',to: '互联网行业创业失败',properties: { ending: 100,__SHOW_ENDING: 1} },
        { detail: [],name: '互联网行业初期生病放弃事件',from: '互联网行业初期状态',to: '互联网行业创业失败',properties: { ending: 90,__SHOW_ENDING: 1 } },
        { detail: [],name: '互联网行业初期富裕事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 200000,wealth: 0,ability: 0,health: 0,success: 2 } },
        { detail: [],name: '互联网行业初期富裕事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,ability: 2,health: 0,success: 0 } },

    ];

    public static STATES = {
        name: "互联网行业初期状态",
        displayName: "创业初级阶段",
        properties: { time: 1,state_time: function(properties) { return 1 },fund: function(properties) { return 20000 },success: function(properties) { return 1 },health: function(properties) { return -2 },wealth: function(properties) { return -10000 },ability: function(properties) { return 4 }, },
        questions: StartUp.QUESTIONS,
        initialState: {
            state_time: function(properties) { return -properties.state_time; }
        }
    }


}
