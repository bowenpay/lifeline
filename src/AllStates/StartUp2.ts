/**
 *
 * 互联网后期状态
 *
 */
class StartUp2 {
    public static QUESTIONS = [
        {
            question: "你的公司已经颇具规模，原有的团队能力已经跟不上公司成长速度，你准备怎么办？",
            answers: [
                { answer: "能力大于一切，辞旧迎新",event: "互联网后期原团队能力问题1" },
                { answer: "老员工更忠诚，应培养和提携",event: "互联网后期原团队能力问题2" },
            ],
            left_times: 1,
            require: function(properties) { return 1; }
        },
        {
            question: "你的公司发展得很顺利，可以计划上市了，你准备：",
            answers: [
                { answer: "在国内上市",event: "互联网后期上市选择1" },
                { answer: "在国内借壳上市",event: "互联网后期上市选择2" },
                { answer: "去境外上市",event: "互联网后期上市选择3" },
                { answer: "不准备上市，私有更自由",event: "互联网后期上市选择4" },

            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time == 14 && properties.sucess > 350) { return 1; }
                else { return 3; }
            },
        },

        {
            question: "你选择了国内上市：",
            answers:
            [
                {
                    answer: "经过一系列复杂的准备和申请之后...",event: function(properties) {
                        if(Math.random() < 0.1 * properties.ablity / 100) {
                            return "互联网后期国内上市1";
                        } else {
                            return "互联网后期国内上市2";
                        }
                    },
                }
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time == 15 && properties.shangshi == 1) { return 1; }
                else { return 3; }
            },
        },

        {
            question: "你选择了借壳上市：",
            answers:
            [
                {
                    answer: "经过一系列复杂的准备和申请之后...",event: "互联网后期借壳上市1"
                }
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time == 15 && properties.shangshi == 2) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "你选择了国外上市：",
            answers:
            [
                {
                    answer: "经过一系列复杂的准备和申请之后...",event: function(properties) {
                        if(Math.random() < 0.1 * properties.ablity / 100) {
                            return "互联网后期国外上市1";
                        } else {
                            return "互联网后期国外上市2";
                        }
                    },
                }
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time == 15 && properties.shangshi == 3) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "你的公司发展得很顺利，但还没有到能够上市的阶段，你已经做的很成功啦：",
            answers: [
                { answer: "确定",event: "互联网后期不能上市1" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time == 14 && properties.sucess < 350) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "公司在进行下一轮融资，你更倾向于什么样的投资者？",
            answers: [
                {
                    answer: "给钱多但不能提供资源的土豪",
                    event: function(properties) {
                        if(Math.random() < 0.2 * properties.ability / 100) {
                            return "互联网后期找钱事件1";
                        } else {
                            return "互联网后期找钱事件2";
                        }
                    }
                },
                {
                    answer: "能给资源但钱给的比较少的机构投资者",event: function(properties) {
                        if(Math.random() < 0.2 * properties.ability / 100) {
                            return "互联网后期找钱事件3";
                        } else {
                            return "互联网后期找钱事件4";
                        }
                    }
                },


            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 5) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "你在市场的占有率已经到了第一，但与第二的差距并不大，是继续烧钱还是先盈利？",
            answers: [
                { answer: "先拉开身后的差距，不着急盈利",event: "互联网后期烧钱是否在意1" },
                { answer: "盈利是一切的根本，要尽快盈利",event: "互联网后期烧钱是否在意2" },
            ],
            left_times: 1,
            require: function(properties) { return 2; }
        },
        {
            question: "公司的创新能力枯竭，你的市场占有率逐步下跌，该怎么办？",
            answers: [
                { answer: "增加创新投入，收购创业公司",event: "互联网后期市场占有率下降1" },
                { answer: "增加广告投入，重新夺回市场",event: "互联网后期市场占有率下降2" },
                { answer: "精益求精，把自身的产品做到极致以赢回用户",event: "互联网后期市场占有率下降3" },
            ],
            left_times: 1,
            require: function(properties) { return 2; }
        },
        {
            question: "你的公司由于丑闻出现公关危机，一群大V在微博上讨伐你，该怎么办？",
            answers: [
                { answer: "绝不认错，雇佣水军，扳倒舆论",event: "互联网后期大V的讨伐1" },
                { answer: "诚意道歉，严查错乱，挽回用户",event: "互联网后期大V的讨伐2" },
            ],
            left_times: 1,
            require: function(properties) { return 2; }
        },
        {
            question: "你的员工越来越多，怎么管理才好呢？",
            answers: [
                { answer: "建立多层级的整套管理机制，谁对谁负责一目了然",event: "互联网后期员工越来越多1" },
                { answer: "建立扁平的管理机制，充分发掘员工潜能",event: "互联网后期员工越来越多2" },
            ],
            left_times: 1,
            require: function(properties) { return 2; }


        },
        {
            question: "你的企业运营思路受到一些董事会和投资人的质疑，你会怎么处理？",
            answers: [
                { answer: "游说董事会成员，让他们接受自己的运营思路",event: "互联网后期董事会质疑运营1" },
                { answer: "联合其他股东找机会将不同意见者踢掉",event: "互联网后期董事会质疑运营2" },
            ],
            left_times: 1,
            require: function(properties) { return 2; }
        },
        {
            question: "你的产品由于创新影响了很多传统行业商家的利益，他们在各种渠道黑你的公司和产品，你该怎么应对？",
            answers: [
                { answer: "改善与他们的关系，争取共赢",event: "互联网后期传统行业商家抗议1" },
                { answer: "落后就该被淘汰，坚持颠覆性创新",event: "互联网后期传统行业商家抗议2" },
                { answer: "放缓节奏，把他们当温水里的青蛙，慢慢的玩死他们",event: "互联网后期传统行业商家抗议3" },
            ],
            left_times: 1,
            require: function(properties) { return 2; }
        },
        {
            question: "你的产品供应链出现了问题，导致成本变高，你要如何处理盈利与用户反响的关系？",
            answers: [
                { answer: "增加收费，不能降低盈利",event: "互联网后期产品供应链出问题1" },
                { answer: "用户才是上帝，保持价格不变，减少盈利",event: "互联网后期产品供应链出问题2" },
            ],
            left_times: 1,
            require: function(properties) { return 2; }
        },
        {
            question: "你的竞争对手为了跟你抢占市场，跟你打起价格战，是否要放弃部分盈利，跟竞争对手应战？",
            answers: [
                { answer: "是，市场才是战略要地，不能让出",event: "互联网后期竞争对手价格战1" },
                { answer: "否，相信产品质量才是根本竞争力",event: "互联网后期竞争对手价格战2" },
            ],
            left_times: 1,
            require: function(properties) { return 2; }
        },
        {
            question: "你感觉市面上有一款产品的市场和前景都不错，你要怎么办？",
            answers: [
                { answer: "收购该产品的团队，共同发展",event: "互联网后期市面某产品不错1" },
                { answer: "抄袭该产品，投入更大财力竞争",event: "互联网后期市面某产品不错2" },
                { answer: "不做动作，只专注自己的产品改进",event: "互联网后期市面某产品不错3" },
            ],
            left_times: 1,
            require: function(properties) { return 2; }
        },
        {
            question: "你的产品在国内市场已经没有对手，如何做下一步战略规划？",
            answers: [
                { answer: "沉下来，在国内寻找更多潜在的需求",event: "互联网后期战略规划1" },
                { answer: "走出去，开拓海外市场",event: "互联网后期战略规划2" },
                { answer: "开辟新的战场，做新的产品线",event: "互联网后期战略规划3" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 6 && properties.sucess > 250) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "你的公司被某互联网巨头看上了，他们想以很高的价格控股你的公司，你完全可以因此而身家过亿，该怎么选择？",
            answers: [
                { answer: "拒绝，上市才是我唯一的目标",event: "互联网后期巨头事件1" },
                { answer: "接受，这次创业已经超过了我的预期，是时候结束了",event: "互联网后期巨头事件2" },
                { answer: "你可以成为我的股东，但不能控股",event: "互联网后期巨头事件3" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 10 && properties.sucess > 300) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "你的公司陷入了一个发展停滞期，核心股东套现走人，新的融资迟迟没有谈拢，你只能寻求收购来退出了",
            answers: [
                { answer: "可惜呀，离上市不远啦，骚年，再接再厉吧",event: "互联网后期被并购1" },

            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 12 && properties.sucess < 300) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "你的公司陷入了一个发展停滞期，核心股东套现走人，新的融资迟迟没有谈拢，你只能寻求收购来退出了",
            answers: [
                { answer: "可惜呀，离上市不远啦，骚年，再接再厉吧",event: "互联网后期被并购1" },

            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 12 && properties.fund < 25000000) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "常年的创业让你经常感觉到身心疲惫，你是否还要坚持？",
            answers: [
                { answer: "坚持，我已经习惯了创业的状态，痛并快乐",event: "互联网后期身心1" },
                { answer: "再扛一扛，我相信上市就在不远处了",event: "互联网后期身心2" },
                { answer: "找机会退出吧，做到今天已经很成功了",event: "互联网后期身心3" },

            ],
            left_times: 1,
            require: function(properties) { return 2; }

        },
        {
            question: "公司做到一定的体量，必然会跟政府打交道，你怎么看政府关系的处理？",
            answers: [
                { answer: "一定要搞好政府关系，这是成功必须的",event: "互联网后期政府关系1" },
                { answer: "只要遵纪守法不用刻意的做政府关系维护",event: "互联网后期政府关系2" },

            ],
            left_times: 1,
            require: function(properties) { return 2; }

        },

    ];

    public static EVENTS = [ 
        //互联网后期状态事件
        { detail: ["看来你已经百炼成钢了，成功就在不远处，加油"],name: '互联网后期身心1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 10,health: 0,sucess: 15 } },
        { detail: ["坚持就是胜利，成功就在不远处，加油"],name: '互联网后期身心2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 10,health: 0,sucess: 10 } },
        { detail: ["你选择了最稳妥的退出方式，虽然没有上市，但你也已经很成功了！"],name: '互联网后期身心3',from: '互联网后期状态',to: '互联网行业创业失败',properties: { ending: 50,__SHOW_ENDING: 1 } },
        { detail: [],name: '互联网后期政府关系1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: -1000000,wealth: 0,ability: 10,health: 0,sucess: 15 } },
        { detail: [],name: '互联网后期政府关系2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,sucess: 5 } },
        { detail: ["国内上市要经过繁复的申请流程，我们会根据你的综合能力值，公司资产及公司进度综合评定后判定你是否能成功上市"],name: '互联网后期上市选择1',from: '互联网后期状态',to: '互联网后期状态',properties: { shangshi: 1 } },
        { detail: ["在国内借壳上市可谓最容易的方式。"],name: '互联网后期上市选择2',from: '互联网后期状态',to: '互联网后期状态',properties: { shangshi: 2 } },
        { detail: ["国内上市要经过繁复的申请流程，我们会根据你的综合能力值，公司资产及公司进度综合评定后判定你是否能成功上市"],name: '互联网后期上市选择3',from: '互联网后期状态',to: '互联网后期状态',properties: { shangshi: 3 } },
        { detail: ["看来你立志成为下一个华为，下一个哇哈哈。确实，成功不一定要上市。"],name: '互联网后期上市选择4',from: '互联网后期状态',to: '互联网行业创业失败',properties: { ending: 50,__SHOW_ENDING: 1 } },
        { detail: [],name: '互联网后期不能上市1',from: '互联网后期状态',to: '互联网行业创业失败',properties: { ending: 50,__SHOW_ENDING: 1 } },
        { detail: ["恭喜你，你的公司在A股上市成功"],name: '互联网后期国内上市1',from: '互联网后期状态',to: '互联网行业创业失败',properties: { ending: 40,__SHOW_ENDING: 1 } },
        { detail: ["由于申请上市过程出现了一些问题，上市失败了..."],name: '互联网后期国内上市2',from: '互联网后期状态',to: '互联网行业创业失败',properties: { ending: 50,__SHOW_ENDING: 1 } },
        { detail: ["恭喜你，你在A股找了个公司借壳上市成功"],name: '互联网后期借壳上市1',from: '互联网后期状态',to: '互联网行业创业失败',properties: { ending: 40,__SHOW_ENDING: 1 } },
        { detail: ["恭喜你，你的公司赴美上市成功，你在纳斯达克敲响了喜悦的钟声"],name: '互联网后期国外上市1',from: '互联网后期状态',to: '互联网行业创业失败',properties: { ending: 30,__SHOW_ENDING: 1  } },
        { detail: ["由于申请上市过程出现了一些问题，上市失败了..."],name: '互联网后期国外上市2',from: '互联网后期状态',to: '互联网行业创业失败',properties: { ending: 50,__SHOW_ENDING: 1 } },
        { detail: [],name: '互联网后期原团队能力问题1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 500000,wealth: 0,ability: 10,health: -5,sucess: 10 } },
        { detail: [],name: '互联网后期原团队能力问题2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 1000000,wealth: 0,ability: 5,health: 5,sucess: 5 } },
        { detail: [],name: '互联网后期烧钱是否在意1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: -1000000,wealth: 0,ability: 5,health: 0,sucess: 10 } },
        { detail: [],name: '互联网后期烧钱是否在意2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 1000000,wealth: 0,ability: 5,health: 0,sucess: 5 } },
        { detail: [],name: '互联网后期市场占有率下降1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: -2000000,wealth: 0,ability: 10,health: 0,sucess: 10 } },
        { detail: [],name: '互联网后期市场占有率下降2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: -1000000,wealth: 0,ability: 5,health: 0,sucess: 5 } },
        { detail: [],name: '互联网后期市场占有率下降3',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: -500000,wealth: 0,ability: 10,health: 0,sucess: 0 } },
        { detail: [],name: '互联网后期大V的讨伐1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: -1000000,wealth: 0,ability: 0,health: 0,sucess: 5 } },
        { detail: [],name: '互联网后期大V的讨伐2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: -1000000,wealth: 0,ability: 0,health: 0,sucess: 10 } },
        { detail: [],name: '互联网后期员工越来越多1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: -1000000,wealth: 0,ability: 10,health: 0,sucess: 6 } },
        { detail: [],name: '互联网后期员工越来越多2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: -1000000,wealth: 0,ability: 10,health: 0,sucess: 10 } },
        { detail: [],name: '互联网后期董事会质疑运营1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 10,health: 0,sucess: 5 } },
        { detail: [],name: '互联网后期董事会质疑运营2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 5,health: 0,sucess: 10 } },
        { detail: [],name: '互联网后期传统行业商家抗议1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: -1000000,wealth: 0,ability: 5,health: 0,sucess: 5 } },
        { detail: [],name: '互联网后期传统行业商家抗议2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: -2000000,wealth: 0,ability: 10,health: 0,sucess: 10 } },
        { detail: [],name: '互联网后期传统行业商家抗议3',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: -2000000,wealth: 0,ability: 10,health: 0,sucess: 15 } },
        { detail: [],name: '互联网后期产品供应链出问题1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,sucess: 5 } },
        { detail: [],name: '互联网后期产品供应链出问题2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: -1000000,wealth: 0,ability: 0,health: 0,sucess: 15 } },
        { detail: [],name: '互联网后期市面某产品不错1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: -2000000,wealth: 0,ability: 10,health: 0,sucess: 15 } },
        { detail: [],name: '互联网后期市面某产品不错2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: -1000000,wealth: 0,ability: 10,health: 0,sucess: 10 } },
        { detail: [],name: '互联网后期市面某产品不错3',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,sucess: 5 } },
        { detail: [],name: '互联网后期竞争对手价格战1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: -1000000,wealth: 0,ability: 0,health: 0,sucess: 15 } },
        { detail: [],name: '互联网后期竞争对手价格战2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,sucess: 5 } },
        { detail: [],name: '互联网后期战略规划1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 5000000,wealth: 0,ability: 10,health: 0,sucess: 10 } },
        { detail: [],name: '互联网后期战略规划2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 5000000,wealth: 0,ability: 10,health: 0,sucess: 10 } },
        { detail: [],name: '互联网后期战略规划3',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 8000000,wealth: 0,ability: 10,health: 0,sucess: 15 } },
        { detail: [],name: '互联网后期巨头事件1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 2000000,wealth: 0,ability: 0,health: 0,sucess: 0 } },
        { detail: [],name: '互联网后期巨头事件2',from: '互联网后期状态',to: '互联网行业创业失败',properties: { ending: 60,__SHOW_ENDING: 1  } },
        { detail: [],name: '互联网后期巨头事件3',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 5000000,wealth: 0,ability: 0,health: 0,sucess: 5 } },
        { detail: [],name: '互联网后期被并购1',from: '互联网后期状态',to: '互联网行业创业失败',properties: { ending: 70,__SHOW_ENDING: 1 } },
        { detail: [],name: '互联网后期找钱事件1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 10000000,wealth: 1000000,ability: 20,health: 0,sucess: 20 } },
        { detail: [],name: '互联网后期找钱事件2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 5000000,wealth: 500000,ability: 10,health: 0,sucess: 10 } },
        { detail: [],name: '互联网后期找钱事件3',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 8000000,wealth: 800000,ability: 20,health: 0,sucess: 28 } },
        { detail: [],name: '互联网后期找钱事件4',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 4000000,wealth: 400000,ability: 10,health: 0,sucess: 14 } },
    ];


    public static STATES = {
        name: "互联网后期状态",
        displayName: "创业终极阶段",
        properties: { time: 1,state_time: function(properties) { return 1 },fund: function(properties) { return 500000 },sucess: function(properties) { return 5 },health: function(properties) { return 1 },wealth: function(properties) { return 50000 },ability: function(properties) { return 6 }, },
        questions: StartUp2.QUESTIONS,
        initialState: {
            state_time: function(properties) { return -properties.state_time; }
        }
    }


}
