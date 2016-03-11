/**
 *
 * 互联网行业中期状态
 *
 */
class StartUp1 {
    public static QUESTIONS = [
        {
            question: "投资人纠缠估值，怎么选呢？",
            detail: [
                '你的公司成功度过了起步的艰难时期',
                '然而很多事情，看上去并没有那么轻松',
                '或许创业中期的挑战会更让你头疼',
                '接踵而至的投资人、战略、市场的问题，就看你怎么应对了',
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
            question: "原投资人要求你的产品快速扩张，做大市场，然而你的资金又有限，该怎么布局？",
            answers: [
                { answer: "把资金都用到扩张上面，进行再融资扩大市场",event: "互联网中期产品快速扩张1" },
                { answer: "慢慢扩张，在其过程中考虑并验证盈利模式",event: "互联网中期产品快速扩张2" },
                { answer: "只考虑稳定的扩张，盈利需要成规模后才打市场",event: "互联网中期产品快速扩张3" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 3 && properties.fund > 1000000) { return 1; }
                else { return 3; }
            }
        },
        {
            question: "用户上涨出现瓶颈，怎么去突破？",
            answers: [
                { answer: "打广告，快速吸引用户",event: "互联网中期用户上涨瓶颈事件1" },
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
            question: "你的某个产品出现了质量问题，用户很不满意，要怎么处理？",
            answers: [
                { answer: "补偿用户，平息众怒",event: "互联网中期用户不满意质量事件1" },
                { answer: "让用户流失吧，不能倒贴",event: "互联网中期用户不满意质量事件2" },
                { answer: "做部分补偿工作即可",event: "互联网中期用户不满意质量事件3" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },
        {
            question: "你的公司运营的不错，但一个新公司发布了一个跟你很类似的产品，你打算怎么应对？",
            answers: [
                { answer: "通过媒体和舆论打压，说他们抄袭",event: "互联网中期应对类似产品事件1" },
                { answer: "做好自己的产品，不怕别人抄袭",event: "互联网中期应对类似产品事件2" },
                { answer: "收购他们的产品和团队",event: "互联网中期应对类似产品事件3" },
            ],
            left_times: 1,
            require: function(properties) { return 2 },
        },
        {
            question: "有几个投资人对你的公司感兴趣，你更倾向于选择哪种类型的投资人呢？",
            answers: [
                { answer: "名气较大的专业投资机构",event: "互联网中期投资人感兴趣事件1" },
                { answer: "便于资源合作的大公司投资部",event: "互联网中期投资人感兴趣事件2" },
                { answer: "能够提供直接资源的个人投资人",event: "互联网中期投资人感兴趣事件3" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.fund > 2000000 && properties.success > 140) { return 1; }
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
            require: function(properties) {
                if(properties.state_time > 8) { return 2; }
                else { return 3; }
            },
        },
        {
            question: "你的产品遭到了竞争对手的舆论抨击和文案打压，要如何处理？",
            answers: [
                { answer: "正面迎战，不怕互撕",event: "互联网中期竞争文案打压事件1" },
                { answer: "不理会，用自己公司运营成绩说话",event: "互联网中期竞争文案打压事件2" },
                { answer: "做好公关工作，用媒体手段和解",event: "互联网中期竞争文案打压事件3" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 8) { return 2; }
                else { return 3; }
            },
        },
        {
            question: "你的公司需要更大的规模扩张，你需要寻求大量资金，你要怎样和投资人打交道？",
            answers: [
                { answer: "去各大路演会场刷脸，做PR工作",event: "互联网中期跟投资人打交道事件1" },
                { answer: "靠熟人介绍，只和赏识自己的投资人接触",event: "互联网中期跟投资人打交道事件2" },
                { answer: "做好产品，相信投资人会蜂拥而至",event: "互联网中期跟投资人打交道事件3" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 5 && properties.fund < 2000000) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "有个投资人对你们的项目感兴趣，但是要你们用现有的资金加速补贴用户，扩大到一定市场规模，他才会投资，是否照做？",
            answers: [
                {
                    answer: "做，早晚都要砸钱扩市场",event: function(properties) {
                        if(Math.random() < 0.2 * properties.ability / 100) {
                            return "互联网中期投资要求补贴事件1";
                        } else {
                            return "互联网中期投资要求补贴事件3";
                        }
                    }
                },
                { answer: "不做，钱都没到位，稳定发展活下去才是关键",event: "互联网中期投资要求补贴事件2" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 7 && properties.success > 60) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "你的某个分支产品前景不错，某大头企业想以高价收购你们的该产品，是否答应？",
            answers: [
                { answer: "答应，我们还有其他布局较深的产品，需要资金才能做大",event: "互联网中期大头企业收产品1" },
                { answer: "不答应，我们完成公司全面战略布局也需要这条产品线",event: "互联网中期大头企业收产品2" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 8 && properties.fund < 5000000 && properties.success > 100) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "长期的奔波和为公司操劳，你感觉身体健康已经大不如以往，你该如何选择？",
            answers: [
                { answer: "事业第一，先把公司做大再说",event: "互联网中期身体出问题事件1" },
                { answer: "进行调整，工作的事兼顾就好",event: "互联网中期身体出问题事件2" },
                { answer: "是时候告别创业，安享人生了",event: "互联网中期身体出问题事件3" },
                { answer: "生活才是人生，把公司交给副总打理",event: "互联网中期身体出问题事件4" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.health < 60) { return 1; }
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
                if(properties.state_fund > 2000000 && properties.success < 100) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "时间过去了五年，你的公司还处于半死不活的状态，你该如何选择？",
            answers: [
                { answer: "坚持就是胜利",event: "互联网中期两年半死不活事件1" },
                { answer: "把公司卖掉，套现走人",event: "互联网中期两年半死不活事件2" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 7 && properties.fund < 3000000) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "由于经营不善，你即将濒临破产",
            answers: [
                { answer: "是时候放弃了，老老实实清算吧",event: "互联网中期濒临破产事件1" },
                {
                    answer: "不放弃，继续找人投资",event: function(properties) {
                        if(Math.random() < 0.1 * properties.ability / 100) {
                            return "互联网中期濒临破产事件2";
                        } else {
                            return "互联网中期濒临破产事件3";
                        }
                    }
                },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 5 && properties.fund < 1500000) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "时间过去了六年，你的公司做的很成功，你该如何选择？",
            answers: [
                { answer: "进入下一阶段",event: "互联网中期六年后进阶事件1" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 11 && properties.fund > 5000000 && properties.success > 150) { return 1; }
                else { return 3; }
            },
        },
        {
            question: "时间过去了六年，你的公司仍没有什么起色，是时候卖掉走人了",
            answers: [
                { answer: "变卖公司，放弃创业",event: "互联网中期六年后放弃创业1" },
            ],
            left_times: 1,
            require: function(properties) {
                if(properties.state_time > 11) { return 1; }
                else { return 3; }
            },
        },

    ];

    public static EVENTS = [         
        
        //互联网行业中期状态
        { detail: [],name: '互联网中期投资人纠缠事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 500000,wealth: 30000,ability: 4,health: 0,success: 4 } },
        { detail: [],name: '互联网中期投资人纠缠事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 200000,wealth: 0,ability: 0,health: 0,success: 2 } },
        { detail: [],name: '互联网中期产品快速扩张1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -200000,wealth: 0,ability: 4,health: 0,success: 8 } },
        { detail: [],name: '互联网中期产品快速扩张2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 100000,wealth: 0,ability: 8,health: 0,success: 5 } },
        { detail: [],name: '互联网中期产品快速扩张3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 200000,wealth: 0,ability: 10,health: 0,success: 3 } },
        { detail: [],name: '互联网中期用户上涨瓶颈事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -200000,wealth: 0,ability: 2,health: 0,success: 8 } },
        { detail: [],name: '互联网中期用户上涨瓶颈事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 10,health: 0,success: 5 } },
        { detail: [],name: '互联网中期用户上涨瓶颈事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 200000,wealth: 0,ability: 6,health: 0,success: 3 } },
        { detail: [],name: '互联网中期增强团队事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -100000,wealth: 0,ability: 0,health: 0,success: 8 } },
        { detail: [],name: '互联网中期增强团队事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 4 } },
        { detail: [],name: '互联网中期增强团队事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -50000,wealth: 0,ability: 0,health: 0,success: 6 } },
        { detail: [],name: '互联网中期增强团队事件4',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 2 } },
        { detail: [],name: '互联网中期商标法庭事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -100000,wealth: -50000,ability: 5,health: 0,success: 2 } },
        { detail: [],name: '互联网中期商标法庭事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -200000,wealth: -100000,ability: 0,health: -4,success: 4 } },
        { detail: [],name: '互联网中期商标法庭事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -300000,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期用户不满意质量事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -300000,wealth: 0,ability: 0,health: 0,success: 4 } },
        { detail: [],name: '互联网中期用户不满意质量事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 3 } },
        { detail: [],name: '互联网中期用户不满意质量事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -100000,wealth: 0,ability: 0,health: 0,success: 2 } },
        { detail: [],name: '互联网中期应对类似产品事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -100000,wealth: 0,ability: 3,health: 0,success: 6 } },
        { detail: [],name: '互联网中期应对类似产品事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 100000,wealth: 30000,ability: 5,health: 0,success: 2 } },
        { detail: [],name: '互联网中期应对类似产品事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -500000,wealth: 0,ability: 0,health: 0,success: 5 } },
        { detail: ["你获得了一笔可观的资金，虽然并没有太多资源帮助，但是你在圈内的名声大噪"],name: '互联网中期投资人感兴趣事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 2000000,wealth: 0,ability: 5,health: 0,success: 10 } },
        { detail: ["你成功拉到了投资，并获得了一批很好的市场资源，或许这对你的业务有所帮助"],name: '互联网中期投资人感兴趣事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 1000000,wealth: 50000,ability: 2,health: 0,success: 5 } },
        { detail: ["你成功获得了投资以及很多第一手的市场资源，更加自由的未来在等着你"],name: '互联网中期投资人感兴趣事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 1500000,wealth: 0,ability: 0,health: 0,success: 15 } },
        { detail: [],name: '互联网中期产品运营不错事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -300000,wealth: 0,ability: 0,health: 0,success: 10 } },
        { detail: [],name: '互联网中期产品运营不错事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 5,health: 0,success: 6 } },
        { detail: [],name: '互联网中期产品运营不错事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 300000,wealth: 0,ability: 2,health: 0,success: 2 } },
        { detail: [],name: '互联网中期竞争文案打压事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -300000,wealth: 0,ability: 2,health: 0,success: 2 } },
        { detail: [],name: '互联网中期竞争文案打压事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 300000,wealth: 0,ability: 0,health: 0,success: 4 } },
        { detail: [],name: '互联网中期竞争文案打压事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -150000,wealth: 0,ability: 4,health: 0,success: 6 } },
        { detail: ["你努力的在各种活动中刷脸，虽然并没得到任何实质性的投资，但还是获得了点名气"],name: '互联网中期跟投资人打交道事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -100000,wealth: 0,ability: 0,health: 0,success: 10 } },
        { detail: ["对你的公司感兴趣的投资人很多，然而精打细算的投资人并没有确定要投钱给你"],name: '互联网中期跟投资人打交道事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 5,health: 0,success: 5 } },
        { detail: ["你决心用产品的盈利模式来说话，可惜目前没有太多投资人对你感兴趣"],name: '互联网中期跟投资人打交道事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 100000,wealth: 0,ability: 10,health: 0,success: 5 } },
        { detail: ["市场扩大，这位投资人很满意，你获得了一笔投资"],name: '互联网中期投资要求补贴事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 500000,wealth: 0,ability: 0,health: 0,success: 5 } },
        { detail: [],name: '互联网中期投资要求补贴事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 200000,wealth: 0,ability: 0,health: 0,success: 3 } },
        { detail: ["市场是扩大了，然而这位投资人并不满意，你还是没拿到投资"],name: '互联网中期投资要求补贴事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -200000,wealth: 0,ability: 0,health: 0,success: 10 } },
        { detail: [],name: '互联网中期大头企业收产品1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 1000000,wealth: 50000,ability: 5,health: 0,success: 0 } },
        { detail: [],name: '互联网中期大头企业收产品2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 200000,wealth: 0,ability: 2,health: 0,success: 10 } },
        { detail: [],name: '互联网中期身体出问题事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 300000,wealth: 0,ability: 0,health: 0,success: 10 } },
        { detail: [],name: '互联网中期身体出问题事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 5,success: 3 } },
        { detail: [],name: '互联网中期身体出问题事件3',from: '互联网行业中期状态',to: '互联网行业创业失败',properties: {ending: 90,__SHOW_ENDING: 1  } },
        { detail: [],name: '互联网中期身体出问题事件4',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -300000,wealth: 0,ability: 0,health: 10,success: 5 } },
        { detail: [],name: '互联网中期做公司PR事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -500000,wealth: 0,ability: 0,health: 0,success: 20 } },
        { detail: [],name: '互联网中期做公司PR事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: -300000,wealth: 0,ability: 0,health: 0,success: 10 } },
        { detail: [],name: '互联网中期做公司PR事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 200000,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: ["你坚信自己能够熬过这段艰难的日子，接下来的决策，你或许该考虑资金的问题了"],name: '互联网中期两年半死不活事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 500000,wealth: 0,ability: 0,health: 0,success: 5 } },
        { detail: [],name: '互联网中期两年半死不活事件2',from: '互联网行业中期状态',to: '互联网行业创业失败',properties: { ending: 15,__SHOW_ENDING: 1 } },
        { detail: [],name: '互联网中期濒临破产事件1',from: '互联网行业中期状态',to: '互联网行业创业失败',properties: { ending: 5,__SHOW_ENDING: 1  } },
        { detail: ["你不懈努力，终于找到了一小笔投资，似乎还能撑一段时间"],name: '互联网中期濒临破产事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { fund: 1000000,wealth: -100000,ability: 0,health: -4,success: 10 } },
        { detail: ["尽管你很努力，然而投资并没那么好找，你还是失败了"],name: '互联网中期濒临破产事件3',from: '互联网行业中期状态',to: '互联网行业创业失败',properties: { ending: 10,__SHOW_ENDING: 1 } },
        { detail: [],name: '互联网中期六年后进阶事件1',from: '互联网行业中期状态',to: '互联网后期状态',properties: { fund: 0,wealth: 0,ability: 0,health: 0,success: 0 } },
        { detail: [],name: '互联网中期六年后放弃创业1',from: '互联网行业中期状态',to: '互联网行业创业失败',properties: { ending: 20,__SHOW_ENDING: 1 } },

    ];

    public static STATES = {
        name: "互联网行业中期状态",
        displayName: "创业中级阶段",
        properties: { time: 1,state_time: function(properties) { return 1 },fund: function(properties) { return 100000 },success: function(properties) { return 2 },health: function(properties) { return -1 },wealth: function(properties) { return 20000 },ability: function(properties) { return 4 }, },
        initialState: {
            state_time: function(properties) { return -properties.state_time },
        },
        questions: StartUp1.QUESTIONS
    }


}
