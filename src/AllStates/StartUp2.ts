/**
 *
 * 互联网后期状态
 *
 */
class StartUp2 {
    public static QUESTIONS = [
        {
            question: "你的公司已经有一定规模了，原有的团队能力已经跟不上了，你要怎么办？",
            answers: [
                { answer: "能力大于一切，辞旧迎新",event: "互联网后期原团队能力问题1" },
                { answer: "老员工更忠诚，应培养和提携",event: "互联网后期原团队能力问题2" },
            ],
            left_times: 1,
            require: function(properties) { return 1; }
        },
        {
            question: "你的公司净利润为负，也就是说还在烧钱，你是否在意？",
            answers: [
                { answer: "不在意，先抢下市场，扩大用户量，不着急赚钱",event: "互联网后期烧钱是否在意1" },
                { answer: "在意，盈利是一切的根本，我要尽快盈利",event: "互联网后期烧钱是否在意2" },
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
            require: function(properties) {
                if(properties.state_time > 4) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "你的企业运营思路受到董事会和投资人的质疑，你会怎么处理？",
            answers: [
                { answer: "啊啊啊啊啊的啊",event: "互联网后期董事会质疑运营1" },
                { answer: "啊啊啊啊啊啊",event: "互联网后期董事会质疑运营2" },
            ],
            left_times: 1,
            require: function(properties) { return 2; }
        },
        {
            question: "你的产品影响了很多传统行业商家的利益，他们集体围住你公司进行抗议，你要怎么平息？",
            answers: [
                { answer: "啊啊啊啊",event: "互联网后期传统行业商家抗议1" },
                { answer: "啊啊啊啊啊啊",event: "互联网后期传统行业商家抗议2" },
            ],
            left_times: 1,
            require: function(properties) { return 2; } 
        },
        {
            question: "公司正开始盈利，恰好你的产品供应链出现了问题，成本变高，你要如何处理盈利与用户反响的关系？",
            answers: [
                { answer: "啊啊啊啊",event: "互联网后期产品供应链出问题1" },
                { answer: "啊啊啊啊啊啊",event: "互联网后期产品供应链出问题2" },
            ],
            left_times: 1,
            require: function(properties) { return 2; }
        },
        {
            question: "你的竞争对手为了跟你抢占市场，跟你打起价格战，是否要放弃盈利，跟竞争对手应战？",
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


    ];

    public static EVENTS = [ 
        //互联网后期状态事件
        { detail: [],name: '互联网后期原团队能力问题1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期原团队能力问题2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期烧钱是否在意1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期烧钱是否在意2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期市场占有率下降1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期市场占有率下降2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期市场占有率下降3',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期大V的讨伐1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期大V的讨伐2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期员工越来越多1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期员工越来越多2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期董事会质疑运营1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期董事会质疑运营2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期传统行业商家抗议1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期传统行业商家抗议2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期产品供应链出问题1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期产品供应链出问题2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期市面某产品不错1',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期市面某产品不错2',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网后期市面某产品不错3',from: '互联网后期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },


    ];

    public static STATES = {
        name: "互联网后期状态",
        properties: { time: 1,state_time: function(properties) { return 1 },fund: function(properties) { return 20000 },success: function(properties) { return 1 },health: function(properties) { return -2 },wealth: function(properties) { return -10000 },ability: function(properties) { return 4 }, },
        questions: StartUp2.QUESTIONS
    }


}
