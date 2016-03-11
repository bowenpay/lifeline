/**
 *
 * 互联网中期状态
 *
 */
class StartUp1 {
    public static QUESTIONS = [
        {
            question: "投资人纠缠估值，怎么选呢？",
            detail: [
                '在进行下一轮融资的时候，由于公司估值问题于投资人纠缠了很久，该怎么选择？',
            ],
            answers: [
                { answer: "必须谈到合适的价格，哪怕再纠缠半年也无所谓",event: "互联网中期投资人纠缠事件1" },
                { answer: "时间就是财富，为了达成合作可降低估值",event: "互联网中期投资人纠缠事件2" },
            ],
            left_times: 1,
            require: function(properties) { return 1 },
        },
        {
            question: "投资人要求你的产品快速扩张，做大市场，然而你的资金又有限，该怎么办？",
            answers: [
                { answer: "把资金都用到扩张上面，进行再融资扩大市场",event: "互联网中期产品快速扩张1" },
                { answer: "慢慢扩张，在其过程中考虑并验证盈利模式",event: "互联网中期产品快速扩张2" },
                { answer: "只考虑稳定的扩张，盈利需要成规模后才打市场",event: "互联网中期产品快速扩张3" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 3 && properties.fund > 1000000) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "用户上涨出现瓶颈，怎么去突破？",
            answers: [
                { answer: "网上买流量，打广告",event: "互联网中期用户上涨瓶颈事件1" },
                { answer: "用心做好产品，用户自然会来",event: "互联网中期用户上涨瓶颈事件2" },
                { answer: "重新做需求分析，改变战术",event: "互联网中期用户上涨瓶颈事件3" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },
        {
            question: "你的公司已经小有规模，但仍需快速扩张，在这个阶段如何快速增强团队？",
            answers: [
                { answer: "找猎头",event: "互联网中期增强团队事件1" },
                { answer: "朋友介绍",event: "互联网中期增强团队事件2" },
                { answer: "自己去创业圈找",event: "互联网中期增强团队事件3" },
                { answer: "网上发布岗位",event: "互联网中期增强团队事件4" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },
        {
            question: "某公司因为一个商标注册的事情将你告上法庭，你该如何处理？",
            answers: [
                { answer: "寻求调解，不要把事闹大",event: "互联网中期商标法庭事件1" },
                { answer: "敢告我？来战个痛快",event: "互联网中期商标法庭事件2" },
                { answer: "还能怎么办，法庭说了算啊",event: "互联网中期商标法庭事件3" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },
        {
            question: "你的公司运营的不错，但一个新公司发布了一个跟你很类似的产品，你打算怎么应对？",
            answers: [
                { answer: "通过媒体和舆论打压，说他们抄袭",event: "互联网中期应对类似产品事件1" },
                { answer: "做好自己的产品，不怕别人抄袭",event: "互联网中期应对类似产品事件2" },
                { answer: "寻求合并",event: "互联网中期应对类似产品事件3" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },
        {
            question: "有几个投资人对你的公司感兴趣，你更倾向于选择哪种类型的投资人呢？",
            answers: [
                { answer: "专业的投资机构",event: "互联网中期投资人感兴趣事件1" },
                { answer: "大公司的投资部门",event: "互联网中期投资人感兴趣事件2" },
                { answer: "土豪老板",event: "互联网中期投资人感兴趣事件3" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.wealth > 5000000) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "你的启动资金太少，需要找到资金来维持公司运营，那么，怎么去找钱呢？",
            answers: [
                { answer: "找风投",event: "互联网中期启动资金太少事件1" },
                { answer: "找亲戚朋友投资",event: "互联网中期启动资金太少事件2" },
                { answer: "在网上众筹",event: "互联网中期启动资金太少事件件3" },
                { answer: "放弃创业，去工作",event: "互联网中期启动资金太少事件4" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.fund < 30000) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "产品运营的不错，在公司战略中你会选择？",
            answers: [
                { answer: "补贴用户，快速扩张，不考虑盈利",event: "互联网中期产品运营不错事件1" },
                { answer: "自然增长，静观其变",event: "互联网中期产品运营不错事件2" },
                { answer: "细水长流，快速盈利",event: "互联网中期产品运营不错事件3" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },
        {
            question: "你在创业的时候，遇上一段经济困难期，朋友父母都劝你放弃创业好好上班，你怎么办？",
            answers: [
                { answer: "继续创业",event: "互联网中期家人劝放弃事件1" },
                { answer: "放弃创业，去工作",event: "互联网中期家人劝放弃事件2" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.happiness < 90) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "你的公司需要更大的规模扩张，你需要寻求大量资金，你要怎样和投资人打交道？",
            answers: [
                { answer: "去各大路演会场刷脸，做PR工作",event: "互联网中期三年后半死不活事件1" },
                { answer: "靠熟人介绍，只和赏识自己的投资人接触",event: "互联网中期三年后半死不活事件2" },
                { answer: "做好产品，相信投资人会蜂拥而至",event: "互联网中期三年后半死不活事件2" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 7 && properties.fund < 2000000) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "由于长期熬夜，加班加点的工作，你的身体出现了一些问题，你该如何选择？",
            answers: [
                { answer: "有得必有失，继续坚持创业",event: "互联网中期身体出问题事件1" },
                { answer: "调整作息，锻炼身体，少花一些时间在工作上",event: "互联网中期身体出问题事件2" },
                { answer: "放弃创业，找份轻松的工作",event: "互联网中期身体出问题事件3" },
                { answer: "给自己放一个假，公司的事让合伙人盯着",event: "互联网中期身体出问题事件4" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.health < 80) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "出于公众形象问题，你的投资人建议你做好公司或产品的PR(public relations,公共关系)，你怎么看？",
            answers: [
                { answer: "现阶段的PR很重要，拿出一部分资金去做",event: "互联网中期做公司PR事件1" },
                { answer: "PR重要但不必要，做的一般般就行",event: "互联网中期做公司PR事件2" },
                { answer: "现有的资源太有限，不要把精力放在PR上",event: "互联网中期做公司PR事件3" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.success < 50) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "时间过去了三年，你的公司还处于半死不活的状态，你改如何选择？",
            answers: [
                { answer: "坚持就是胜利",event: "互联网中期三年后半死不活事件1" },
                { answer: "把公司卖掉，套现走人",event: "互联网中期三年后半死不活事件2" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 12 && properties.fund < 2000000) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "由于经营不善，你破产了",
            answers: [
                { answer: "是时候放弃了，老老实实去上班吧",event: "互联网中期破产事件1" },
                { answer: "不放弃，继续找人投资",event: "互联网中期破产事件2" },
                { answer: "先工作两年积攒一些经验和资源再重新开始",event: "互联网中期破产事件3" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.wealth < 100000) { return 1; }
                else { return 3; }
            },
        },

    ];

    public static EVENTS = [ 
        
        //互联网行业中期状态
        { detail: [],name: '互联网中期投资人纠缠事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期投资人纠缠事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期用户上涨瓶颈事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期用户上涨瓶颈事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期用户上涨瓶颈事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期增强团队事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期增强团队事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期增强团队事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期增强团队事件4',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期商标法庭事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期商标法庭事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期商标法庭事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期应对类似产品事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期应对类似产品事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期应对类似产品事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期投资人感兴趣事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期投资人感兴趣事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期投资人感兴趣事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期启动资金太少事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期启动资金太少事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期启动资金太少事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期启动资金太少事件4',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
    ];

    public static STATES = {
        name: "互联网中期状态",
        properties: { time: 1,state_time: function(properties) { return 1 },fund: function(properties) { return 20000 },success: function(properties) { return 1 },health: function(properties) { return -2 },wealth: function(properties) { return -10000 },ability: function(properties) { return 4 }, },
        questions: StartUp1.QUESTIONS 
    }


}
