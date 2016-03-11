/**
 *
 * @author 
 *
 */
// 数据开始
var COMMON_QUESTIONS = [
    {
        question: "处了3年的对象暗示想结婚，你要考虑么？",
        detail: [
            '不知不觉，3年已经过去了',
            '我的恋人很爱我，为我付出了很多',
            '今天他/她很明显的暗示想要一个体面的婚礼，我该如何选择？',
        ],
        answers: [
            { answer: "直接去领证，慢慢再准备喜事",event: "通用事件结婚" },
            { answer: "策划完整的求婚，办喜宴流程，再领证",event: "通用事件结婚策划" },
            { answer: "再等等吧，目前以事业为重，以后再说",event: "通用事件不结婚" }
        ],
        left_times: 1,      // 这个问题可以问几次？
        require: function(properties) {
            if(properties.time > 12) { // 3年后弹出结婚事件
                return 1;
            } else {
                return 3;
            }
        } // 返回1表示必然发生，返回2表示随机发生， 返回3表示不发生
    },
    {
        question: "你得了胃炎，要不要去医院治疗？",
        detail: [
            '你一直在工作的岗位上奔波操劳，',
            '然后你感觉到很明显的胃疼，去医院检查，居然是胃炎，',
            '医院推荐你住院进行治疗，是否接受治疗？',
        ],
        answers: [
            { answer: "住院治疗，工作请假几天",event: "通用事件得胃病事件1" },
            { answer: "不住院，吃药就行，照常工作",event: "通用事件得胃病事件2" },
            { answer: "工作重要，治病的事儿以后再说",event: "通用事件得胃病事件3" },
        ],
        left_times: 1,
        require: function(properties) {
            if(properties.time > 12 && properties.health < 30) {
                return 1;
            } else {
                return 3;
            }
        }
    }
];

var STATES = [
    //填写背景状态
    {
        name: "填写背景状态",
        properties: { health: function(properties) { return 0 },wealth: function(properties) { return 0 },ability: function(properties) { return 0 } },
        questions: [
            {
                question: "你所在的城市情况？",
                detail: [
                    '这是一个极其真实的人生模拟题，',
                    '问题将从你毕业的那一刻开始，时间会不停的在走，',
                    '随着时间的出现，将出现形形色色的问题，',
                    '请结合自身情况，谨慎的选择你的答案。',
                    '每个选择都会像蝴蝶效应一样影响着你的将来……',
                    '看看十年后，你的选择，会带你走向怎样的未来……',
                ],
                answers: [
                    { answer: "一线城市",event: "背景一线城市" },
                    { answer: "二线城市",event: "背景二线城市" },
                    { answer: "三线城市",event: "背景三/四线城市" }
                ],
                left_times: 1,
                require: function(properties) { return 1; }
            },
            {
                question: "你毕业的学校情况？",
                answers: [
                    { answer: "一本",event: "学校一本" },
                    { answer: "二本",event: "学校二本" },
                    { answer: "三本",event: "学校三本" },
                    { answer: "专科",event: "学校专科" }
                ],
                left_times: 1,
                require: function(properties) { return 1; }
            },
            {
                question: "你所学的专业？",
                answers: [
                    { answer: "理工类",event: "专业理工" },
                    { answer: "人文社科",event: "专业人文社科" },
                    { answer: "体育艺术类",event: "专业体育艺术" },
                ],
                left_times: 1,
                require: function(properties) { return 1; }
            },
            {
                question: "你的家庭经济情况？",
                answers: [
                    { answer: "富裕",event: "家庭经济富裕" },
                    { answer: "较富裕",event: "家庭经济较富裕" },
                    { answer: "一般",event: "家庭经济一般" },
                    { answer: "贫困",event: "家庭经济贫困" },
                ],
                left_times: 1,
                require: function(properties) { return 1; }
            }
        ]
    },

    //职业规划1阶状态
    {
        name: "职业规划1阶",
        properties: { health: function(properties) { return 1 },wealth: function(properties) { return -1 },ability: function(properties) { return 1 } },
        questions: [
            {
                question: "你本科就要毕业了，该怎么选择接下来要走的路？",
                detail: [
                    '出身和背景似乎并不影响你对走向社会的向往，',
                    '懵懂的你本科即将毕业，',
                    '接下来的路，你会如何选择？',
                ],
                answers: [
                    { answer: "工作",event: "选择工作1阶" },
                    { answer: "考研/留学",event: "考研/留学" },
                    { answer: "创业/自由职业",event: "创业/自由职业" }
                ],
                left_times: 1,      // 这个问题可以问几次？
                require: function(properties) { return 1; }
            } // 返回1表示必然发生，返回2表示随机发生， 返回3表示不发生
        ]
    },
    
    //选择工作1阶状态
    {
        name: "选择工作1阶状态",
        properties: { health: function(properties) { return 0 },wealth: function(properties) { return 0 },ability: function(properties) { return 0 },happiness: function(properties) { return 0 } },
        questions: [
            {
                question: "走出校门的你，在选择工作的分叉口，你将在何处开始你的第一段事业旅程？",
                answers: [
                    { answer: "国企",event: "国企职员事件" },
                    { answer: "私企",event: "私企职员事件" },
                    { answer: "外企",event: "外企职员事件" },
                ],
                left_times: 1,      // 这个问题可以问几次？
                require: function(properties) {
                    if(properties.state_year > 3) {
                        return 2;
                    } else {
                        return 1;
                    }
                } // 返回1表示必然发生，返回2表示随机发生， 返回3表示不发生
            }
        ]
    },

    // 国企职员状态  连续问题出现 
    {
        name: "国企职员状态",
        properties: { time: 1,state_time: 1,health: function(properties) { return 0 },wealth: function(properties) { return 0 },ability: function(properties) { return 1 },happiness: function(properties) { return 0 } },
        questions: [
            {
                question: "进入职场，你选择租房住，你是要多花钱住的离公司近点？还是选择少花钱离公司远点？",
                answers: [
                    { answer: "住近点",event: "国企职员租房事件1" },
                    { answer: "住远点",event: "国企职员租房事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 1 }
            },

            {
                question: "工作中你和同事有点合不来，是否要缓和关系？",
                detail: [
                    '进入工作，你发现有些事情并非如你所愿',
                    '尤其是你的同事，似乎并不是很乐意和你一起共事。',
                    '你是希望花点精力和同事处好关系？还是只顾好自己？',
                ],
                answers: [
                    { answer: "是，处理关系",event: "国企职员共事事件1" },
                    { answer: "否，顾好自己",event: "国企职员共事事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

            {
                question: "领导交给你一项任务，需要花费你大量精力去完成，是否答应？",
                detail: [
                    '工作的过程中有很多考验',
                    '尤其是来自你领导的任务，更是对能力很直接的考验。',
                    '你是希望接受考验挑战自己？还是量力而行做好本职工作呢？',
                ],
                answers: [
                    { answer: "是，挑战自己",event: "国企职员领导的挑战事件1" },
                    { answer: "否，量力而行",event: "国企职员领导的挑战事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

            {
                question: "工作了一段时间，是否提交升职申请？",
                detail: [
                    '升职申请，是对你的工作能力最直接的考验',
                    '如果能成功升职，你以后的人生必将大放异彩',
                    '在现在的这个阶段，你是否会选择提交升职申请？',
                ],
                answers: [
                    { answer: "是",event: "国企职员提交升职申请事件1" },
                    { answer: "否",event: "国企职员提交升职申请事件2" },
                ],
                left_times: 2,
                require: function(properties) { return 2 }
            },

            {
                question: "你有一个升职的机会，但要对同事不利，是否抓住？",
                answers: [
                    { answer: "是，以自己利益为重",event: "国企职员升职与同事事件1" },
                    { answer: "否，我希望更和谐的进步",event: "国企职员升职与同事事件2" },
                ],
                left_times: 2,
                require: function(properties) { return 2 }
            },

            {
                question: "领导要带你出差，但是你生病了，去不去？",
                answers: [
                    { answer: "去，以工作为重",event: "国企职员生病出差事件1" },
                    { answer: "不去，以健康为重",event: "国企职员生病出差事件2" },
                ],
                left_times: 2,
                require: function(properties) { return 2 }
            },

            {
                question: "家里恰好认识你公司里的某领导，是否要打招呼让领导关照你？",
                answers: [
                    { answer: "是，进步需要更好的人脉",event: "国企职员家人给领导打招呼事件1" },
                    { answer: "否，我希望自己努力来赢得赞赏",event: "国企职员家人给领导打招呼事件2" },
                ],
                left_times: 2,
                require: function(properties) { return 2 }
            },

            {
                question: "在下班的时候，你还有个任务没完成，是否要加班加点做完它？",
                answers: [
                    { answer: "是，必须不懈努力",event: "国企职员加班做任务事件1" },
                    { answer: "否，国企坏境太差没有必要",event: "国企职员加班做任务事件2" },
                ],
                left_times: 2,
                require: function(properties) { return 2 }
            },

            {
                question: "上班时间你看见领导在休息区打台球，要不要和领导过去一起玩？",
                answers: [
                    { answer: "去，趁机拉拢下领导",event: "国企职员领导一起打台球事件1" },
                    { answer: "不去，毕竟上下级关系，不好把控",event: "国企职员领导一起打台球事件2" },
                ],
                left_times: 2,
                require: function(properties) { return 2 }
            },

            {
                question: "在你刚做出了某个工作成果，是否要将此成果交给领导，刻意讨好领导？",
                answers: [
                    { answer: "是，讨好领导",event: "国企职员成果讨好领导事件1" },
                    { answer: "否，自己冠名该成果",event: "国企职员成果讨好领导事件2" },
                ],
                left_times: 2,
                require: function(properties) { return 2 }
            },

            {
                question: "在公司聚会上，你已经不能喝了，领导还要你继续喝，你是否勉强自己继续喝？",
                answers: [
                    { answer: "继续喝，军令如山",event: "国企职员聚会喝酒事件1" },
                    { answer: "委婉表示不能喝了",event: "国企职员聚会喝酒事件2" },
                ],
                left_times: 2,
                require: function(properties) { return 2 }
            },

            {
                question: "你希望有一个健康的体魄，你是否要花钱办健身卡？",
                answers: [
                    { answer: "办卡，好身体能让我更自信，精力更充沛",event: "国企职员健身办卡事件1" },
                    { answer: "等过段时间再说办卡的事儿吧",event: "国企职员健身办卡事件2" },
                    { answer: "不需要办卡，每天楼下跑跑步就好了",event: "国企职员健身办卡事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

        ]
    },

    // 国企干部状态  连续问题出现 
    {
        name: "国企干部状态",
        properties: { time: 1,state_time: function(properties) { return 1 },health: function(properties) { return 0 },wealth: function(properties) { return 0 },ability: function(properties) { return 1 },happiness: function(properties) { return 0 } },
        questions: [

            {
                question: "你刚升职，有很多同级同事不是很待见你，你要如何处理？",
                answers: [
                    { answer: "努力讨好，拉拢人际关系",event: "国企干部同级不待见事件1" },
                    { answer: "做好自己的事，别人让他们说去",event: "国企干部同级不待见事件2" },
                    { answer: "慢慢适应，在工作中保持平常心就好",event: "国企干部同级不待见事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 1 }
            },

            {
                question: "在这个岗位上，工作量比较大，经常加班，你是否能够接受？",
                answers: [
                    { answer: "十分认同加班，完成工作第一",event: "国企干部经常加班态度事件1" },
                    { answer: "加班就加呗，反正耗时间还能拿补贴",event: "国企干部经常加班态度事件2" },
                    { answer: "坚决不加班，高效率才是我所追求的",event: "国企干部经常加班态度事件3" },
                    { answer: "加班也没招，领导的眼睛看着呢",event: "国企干部经常加班态度事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 1 }
            },

            {
                question: "你感觉公司里面有个异性同事可能对你有好感，要不要下班约他/她逛街看电影？",
                answers: [
                    { answer: "约，人生没后悔药",event: "国企干部约异性看电影事件1" },
                    { answer: "不约，保持纯洁同事关系",event: "国企干部约异性看电影事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

            {
                question: "你在工作岗位上一直做得很认真，要不要跟领导提加薪的申请？",
                answers: [
                    { answer: "提，我要我应得的报酬",event: "国企干部提加薪申请事件1" },
                    { answer: "不提，该来的自然会来",event: "国企干部提加薪申请事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

            {
                question: "工作中你和你的下级因某个工作合不来，你要如何处理？",
                answers: [
                    { answer: "更换这个下级同事，调另一个人来",event: "国企干部下级合不来事件1" },
                    { answer: "耐心与他沟通，希望他能按你的要求来做事",event: "国企干部下级合不来事件2" },
                    { answer: "沉默对待，按工作绩效来处理就好",event: "国企干部下级合不来事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

            {
                question: "你有个不太靠谱的朋友想找你的领导承包一个项目，是否帮忙引荐？",
                answers: [
                    { answer: "引荐，有利可图对我才是关键",event: "国企干部引荐朋友项目事件1" },
                    { answer: "不引荐，我自己这关都过不了",event: "国企干部引荐朋友项目事件2" },
                    { answer: "引荐，我觉得这个项目还可以看看",event: "国企干部引荐朋友项目事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

            {
                question: "你发现你的同事都有上班玩游戏看电影的习惯，你是不是要和他们一样？",
                answers: [
                    { answer: "玩啊，反正没工作又没人管",event: "国企干部上班玩游戏事件1" },
                    { answer: "不玩，自己的面子工程在国企最重要",event: "国企干部上班玩游戏事件2" },
                    { answer: "不玩，我是有理想的人，要认真工作和学习",event: "国企干部上班玩游戏事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

            {
                question: "你今晚有个重要的聚会，但下班时你手头的工作任务还差一大截，你会怎么选择？",
                answers: [
                    { answer: "参加聚会，工作晚些做",event: "国企干部聚会和工作事件1" },
                    { answer: "做完工作再去聚会，做不完不去",event: "国企干部聚会和工作事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

            {
                question: "今天身体不太舒服，正好又没有重要工作，不想上班，要不要请假（不扣请假工资）？",
                answers: [
                    { answer: "请假，反正没重要工作，调整状态为主",event: "国企干部身体不适请假事件1" },
                    { answer: "不请，还是要坚持坐在工位上",event: "国企干部身体不适请假事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

            {
                question: "领导来视察你领头的办公室工作，你要怎么表现自己？",
                answers: [
                    { answer: "拿出叱咤风云的范儿，指挥下属干这干那",event: "国企干部领导视察工作事件1" },
                    { answer: "沉默的在工位上做好自己的工作，和往常一样",event: "国企干部领导视察工作事件2" },
                    { answer: "多和领导套近乎，问前问后，请领导指点工作",event: "国企干部领导视察工作事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

        ]
    },

    // 国企中层状态  连续问题出现 
    {
        name: "国企中层状态",
        properties: { time: 1,state_time: function(properties) { return 1 },health: function(properties) { return 0 },wealth: function(properties) { return 0 },ability: function(properties) { return 1 },happiness: function(properties) { return 0 } },
        questions: [

            {
                question: "领导要来视察你主管的部门工作，你要不要提前跟下属打好招呼？",
                answers: [
                    { answer: "提前跟下属打好招呼，配合你的指挥工作",event: "国企中层领导视察工作事件1" },
                    { answer: "不跟下属打招呼，对自己的部门工作有信心",event: "国企中层领导视察工作事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

            {
                question: "公司将外派你去其他小城市工作3个月，环境比较艰苦，要不要积极配合？",
                answers: [
                    { answer: "配合，以服从命令为重",event: "国企中层被外派工作事件1" },
                    { answer: "不配合，留在总部更容易得权",event: "国企中层被外派工作事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

            {
                question: "你的同级同事，在某项工作里面，极度不配合你领导的部门，要怎么办？",
                answers: [
                    { answer: "多做公关工作，送礼等方法解决",event: "国企中层同级不配合部门工作事件1" },
                    { answer: "向上级部门反映此类情况，等待调解",event: "国企中层同级不配合部门工作事件2" },
                    { answer: "私下与该同事沟通，寻求理解",event: "国企中层同级不配合部门工作事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },


        ]
    },


    // 私企职员状态  连续问题出现 
    {
        name: "私企职员状态",
        properties: { time: 1,state_time: 1,health: function(properties) { return 0 },wealth: function(properties) { return 0 },ability: function(properties) { return 1 },happiness: function(properties) { return 0 } },
        questions: [

            {
                question: "你选择租房住，你是要多花钱住的离公司近点？还是选择少花钱离公司远点？",
                answers: [
                    { answer: "住近点",event: "私企职员租房事件1" },
                    { answer: "住远点",event: "私企职员租房事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 1 }
            },

            {
                question: "公司领导，要求你应酬陪酒，要不要去呢？",
                answers: [
                    { answer: "去,关系重要",event: "私企职员领导应酬事件1" },
                    { answer: "不去,不能喝酒",event: "私企职员领导应酬事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

            {
                question: "刚进入这个私企,你发现这个企业文化你暂时接受不了,你会怎么做？",
                answers: [
                    { answer: "努力融入企业，改变自己",event: "私企职员企业文化接受不了事件1" },
                    { answer: "这个工作不适合我，换工作",event: "私企职员企业文化接受不了事件2" },
                    { answer: "忍气吞声，随其自然",event: "私企职员企业文化接受不了事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 1 }
            },

            {
                question: "私企里面同事文化水平参差不齐，性格也形形色色，你要怎么适应？",
                answers: [
                    { answer: "努力表现自己，争取和大家打成一片",event: "私企职员企业适应同事事件1" },
                    { answer: "自顾自的工作，用成绩让大家刮目相看",event: "私企职员企业适应同事事件2" },
                    { answer: "客套就好，不必苛求人际和工作都做好",event: "私企职员企业适应同事事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

            {
                question: "在下班的时候，你还有个任务没完成，是否要加班加点做完它？",
                answers: [
                    { answer: "是，必须不懈努力，争取早日出头",event: "私企职员加班做任务事件1" },
                    { answer: "否，工资照拿，自己还有生活",event: "私企职员加班做任务事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

            {
                question: "你感觉接到了一个有点挑战性的工作，你将用什么态度去应对工作？",
                answers: [
                    { answer: "强烈积极态度，正面面对挑战",event: "私企职员接到挑战事件1" },
                    { answer: "平淡对待，能做什么样算什么样",event: "私企职员接到挑战事件2" },
                    { answer: "消极对待，做力所能及的就好",event: "私企职员接到挑战事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

            {
                question: "你因为某个工作失误，被领导扣了绩效工资，你会有怎样的想法？",
                answers: [
                    { answer: "擅自扣工资是不对的，强烈抗议",event: "私企职员犯错被扣工资事件1" },
                    { answer: "确实是自己的错误，应该扣",event: "私企职员犯错被扣工资事件2" },
                    { answer: "表面上不表示，但内心很不爽",event: "私企职员犯错被扣工资事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

            {
                question: "你希望有一个健康的体魄，你是否要花钱办健身卡？",
                answers: [
                    { answer: "办卡，好身体能让我更自信，精力更充沛",event: "私企职员办健身卡事件1" },
                    { answer: "等过段时间再说办卡的事儿吧",event: "私企职员办健身卡事件2" },
                    { answer: "不需要办卡，每天楼下跑跑步就好了",event: "私企职员办健身卡事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 }
            },

            {
                question: "你有一个升职的机会，但要对同事不利，是否抓住？",
                answers: [
                    { answer: "是，以自己利益为重",event: "私企职员升职与同事事件1" },
                    { answer: "否，我希望更和谐的进步",event: "私企职员升职与同事事件2" },
                ],
                left_times: 2,
                require: function(properties) { return 2 }
            },

            {
                question: "你有一个升职的机会，但要对同事不利，是否抓住？",
                answers: [
                    { answer: "是，以自己利益为重",event: "私企职员升职与同事事件1" },
                    { answer: "否，我希望更和谐的进步",event: "私企职员升职与同事事件2" },
                ],
                left_times: 2,
                require: function(properties) { return 2 }
            },


        ]
    },
    
    //考研/留学选择状态
    {
        name: "考研/留学选择状态",
        properties: { health: function(properties) { return 0 },wealth: function(properties) { return 0 },ability: function(properties) { return 0 },happiness: function(properties) { return 0 } },
        questions: [
            {
                question: "创业/自由职业选择状态问题？",
                detail: [
                    '你坚信知识才是改变人生的最有效方法',
                    '为此，你选择继续你的学业，',
                    '你是要在国内考研，还是出国留学呢？',
                ],
                answers: [
                    { answer: "考研",event: "选择考研事件" },
                    { answer: "出国留学",event: "选择出国留学事件" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            }
        ]
    },
    
    //备战考研状态，连续问题出现
    {
        name: "备战考研状态",
        properties: { time: 1,state_time: 1,state_score: 1,health: function(properties) { return -1 },wealth: function(properties) { return -3000 },ability: function(properties) { return 1 },happiness: function(properties) { return 0 } },
        questions: [
            {
                question: "要参加考研培训班吗？",
                detail: [
                    '你现在正在备战考研，',
                    '你听说某考研培训班的课程不错，',
                    '要花些钱参加考研培训班吗？',
                ],
                answers: [
                    { answer: "参加",event: "备战考研参加培训班事件1" },
                    { answer: "不参加",event: "备战考研参加培训班事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            },
            {
                question: "考研期间有个好朋友从外地来看望你，要不要抽出时间陪他玩？",
                answers: [
                    { answer: "要",event: "备战考研好朋友找你玩事件1" },
                    { answer: "不要",event: "备战考研好朋友找你玩事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "考研太孤单，遇见个喜欢的人，要恋爱吗？",
                answers: [
                    { answer: "恋爱",event: "备战考研谈恋爱事件1" },
                    { answer: "不恋爱",event: "备战考研谈恋爱事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "专业课试卷，报考学院自命题，找不到历年试卷，怎么办？",
                answers: [
                    { answer: "找人买",event: "备战考研买历年试卷事件1" },
                    { answer: "不买",event: "备战考研买历年试卷事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "考研某个科目自测分数总是很低，怎么办？",
                answers: [
                    { answer: "找培训",event: "备战考研自测分数低事件1" },
                    { answer: "自我钻研",event: "备战考研自测分数低事件2" },
                    { answer: "找同学帮忙",event: "备战考研自测分数低事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "明天有考前考研模拟考试，同时有一个重要聚会，怎么选择？",
                answers: [
                    { answer: "参加模拟考试",event: "备战考研有重要聚会事件1" },
                    { answer: "参加聚会",event: "备战考研有重要聚会事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "考研的过程很折磨人，读完研也还是要工作的，要不要放弃考研直接工作？",
                answers: [
                    { answer: "放弃考研直接工作",event: "备战考研是否放弃考研事件1" },
                    {
                        answer: "继续考研",
                        event: function(properties) {
                            if(properties.state_score > 2) { return "备战考研是否放弃考研事件2" }
                            else { return "备战考研是否放弃考研事件1" }
                        }
                    },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.state_time > 3) { return 1; }
                    else { return 3; }
                },
            },
        ]
    },
    
    //读研状态
    {
        name: "读研状态",
        properties: { time: 1,state_time: 1,health: function(properties) { return 0 },wealth: function(properties) { return 3000 },ability: function(properties) { return 1 },happiness: function(properties) { return 0 } },
        questions: [
            {
                question: "选择亲自带学生的年轻导师，还是选择不亲自带学生的知名老导师？",
                detail: [
                    '你已经开始了你的研究生生活',
                    '首先面对的是选导师的问题，你会选择亲自带学生的年轻导师，',
                    '还是选择不亲自带学生的知名老导师？',
                ],
                answers: [
                    { answer: "知名导师",event: "读研选导师事件1" },
                    { answer: "年轻导师",event: "读研选导师事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            },
            {
                question: "你的硕士开题报告不被看好，你该怎么办？",
                answers: [
                    { answer: "认栽",event: "读研开题不被看好事件1" },
                    { answer: "不服，展开辩论",event: "读研开题不被看好事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            },
            {
                question: "你不喜欢导师给你选的科研课题，怎么办？",
                answers: [
                    { answer: "闷头做",event: "读研不喜欢科研课题事件1" },
                    { answer: "请求换题目",event: "读研不喜欢科研课题事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            },
            {
                question: "导师要把经费打你卡里，然后再转给他，这样不合理，你答应吗？",
                answers: [
                    { answer: "答应",event: "读研导师经费转账事件1" },
                    { answer: "不答应",event: "读研导师经费转账事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "有个公派出国的机会，需要答辩，你的老师不在评委里面，你会请老师帮你吗？",
                answers: [
                    { answer: "请",event: "读研请老师帮忙答辩事件1" },
                    { answer: "靠自己",event: "读研请老师帮忙答辩事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "论文不好发表，会怎么办？",
                answers: [
                    { answer: "找人代写代发",event: "读研论文不好发表事件1" },
                    { answer: "自己努力发表",event: "读研论文不好发表事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "导师暗示你要潜规则一下，才能正常毕业，你怎么选？",
                answers: [
                    { answer: "潜一下",event: "读研潜规则事件1" },
                    { answer: "不接受",event: "读研潜规则事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "科研课题太难了，一直没有成果，该怎么办？",
                answers: [
                    { answer: "放弃读研，去工作",event: "读研科研没有成果事件1" },
                    { answer: "坚持下去",event: "读研科研没有成果事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "研究生课题需要出差，报销标准很高，根本用不完，你该怎么办？",
                answers: [
                    { answer: "老老实实用了多少报销多少",event: "读研报销用不完事件1" },
                    { answer: "带朋友一起去玩",event: "读研报销用不完事件2" },
                    { answer: "开假发票报销赚钱",event: "读研报销用不完事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "科研实验数据的结果总是不符合期望，你该怎么办？",
                answers: [
                    { answer: "修改数据来满足期望，尽快毕业",event: "读研实验结果不如愿事件1" },
                    { answer: "尊重科学，重新试验",event: "读研实验结果不如愿事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "你同时被两个老师指导，两个老师总有不同的任务让你应付不过来，你该怎么办？",
                answers: [
                    { answer: "找老师协调下",event: "读研两个老师任务事件1" },
                    { answer: "加班加点，争取完成任务",event: "读研两个老师任务事件2" },
                    { answer: "偷工减料，交差即可",event: "读研两个老师任务事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "老师心情不爽，你正好要作汇报，一个小问题就大发雷霆？",
                answers: [
                    { answer: "批评呗，让老师爽一把",event: "读研汇报老师不爽事件1" },
                    { answer: "去XX妈，老子更不爽",event: "读研汇报老师不爽事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "有个实习的机会，老师又管的比较严，不能出去工作实习之类的，你要偷偷去吗？",
                answers: [
                    { answer: "好机会，去啊",event: "读研偷偷实习事件1" },
                    { answer: "不去了，还是好好科研",event: "读研偷偷实习事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "老师希望你把他作为首要作者，你会怎么办？",
                detail: [
                    '有一天，你突发奇想，做了个非常规的实验，得出个革新性的结果，',
                    '你要发论文，老师希望你把他作为首要作者，',
                    '你会怎么办？',
                ],
                answers: [
                    { answer: "不可以，自己努力的结果",event: "读研革新成果作者事件1" },
                    { answer: "可以啊，老师提供了实验环境",event: "读研革新成果作者事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "终于来到了毕业答辩的时刻，评委对你的毕业答辩提了些不知所云的批评，你是忍着，还是当场与他辩论一番？",
                answers: [
                    { answer: "忍着",event: "读研最终答辩事件1" },
                    { answer: "辩论",event: "读研最终答辩事件2" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.state_time > 11) { return 1; }
                    else { return 3; }
                },
            },

        ]
    },
    
    //出国留学状态
    {
        name: "出国留学状态",
        properties: { time: 1,state_time: function(properties) { return 1 },health: function(properties) { return 0 },wealth: function(properties) { return 0 },ability: function(properties) { return 0 },happiness: function(properties) { return 0 } },
        questions: [
            {
                question: "因为什么，你出国留学？",
                detail: [
                    '你怀着一颗揣测的心来到异国他乡，',
                    '你最终还是选择留学来继续你的学业，',
                    '因为什么，你出国留学？',
                ],
                answers: [
                    { answer: "世界很大我想去外面看看",event: "出国留学原因事件1" },
                    { answer: "要去镀金，提高竞争力",event: "出国留学原因事件2" },
                    { answer: "没什么计划，家人的决定/公派",event: "出国留学原因事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            },
            {
                question: "出国后语言是一个大问题，你怎么去提升语言能力呢？",
                answers: [
                    { answer: "跟当地人交朋友来练习",event: "出国留学提升语言能力事件1" },
                    { answer: "上语言班",event: "出国留学提升语言能力事件2" },
                    { answer: "硬着头皮自学",event: "出国留学提升语言能力事件3" },
                    { answer: "在国外混一年语言还是问题？",event: "出国留学提升语言能力事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            },
            {
                question: "初到国外，我想要？",
                answers: [
                    { answer: "这里太新鲜，什么都想试一下",event: "出国留学初到心理想法事件1" },
                    { answer: "陌生，一切都不熟悉、我就想待着就好了",event: "出国留学初到心理想法事件2" },
                    { answer: "豪情万丈.信心十足、树立很多计划和目标",event: "出国留学初到心理想法事件3" },
                    { answer: "想回家？",event: "出国留学初到心理想法事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            },
            {
                question: "你准备如何融入当地国家的文化习俗当中？",
                answers: [
                    { answer: "强化语言，积极参加社会活动",event: "出国留学融入当地文化事件1" },
                    { answer: "结识当地朋友",event: "出国留学融入当地文化事件2" },
                    { answer: "保持自我，我是中国人",event: "出国留学融入当地文化事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "国外消费高，经济有压力，你如何平衡打工？",
                answers: [
                    { answer: "勤工俭学",event: "出国留学平衡打工事件1" },
                    { answer: "代购、买奶粉",event: "出国留学平衡打工事件2" },
                    { answer: "我是学霸、勤学减工",event: "出国留学平衡打工事件3" },
                    { answer: "我是思聪，不打工",event: "出国留学平衡打工事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "假期将至，两个月时间，你会用来干啥？",
                answers: [
                    { answer: "出国开销大，还是留下打点暑期工，去中餐馆帮帮忙",event: "出国留学假期两个月事件1" },
                    { answer: "学习这么累，好不容易假期，我想去别的国家旅行",event: "出国留学假期两个月事件2" },
                    { answer: "好久没有见到亲人了，回国看看他们",event: "出国留学假期两个月事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "在晚上遇到抢劫，你会怎么办？",
                answers: [
                    { answer: "钱给你，别伤害我，自认倒霉",event: "出国留学遇到抢劫事件1" },
                    { answer: "我一个干十个没问题，敢抢我，我是泰森",event: "出国留学遇到抢劫事件2" },
                    { answer: "钱给他，随后报警，积极配合工作",event: "出国留学遇到抢劫事件3" },
                    { answer: "这种事怎么会碰到我，我几乎不出门",event: "出国留学遇到抢劫事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "一个不是很熟悉的外国同学邀请自己去参加生日party，你怎么办？",
                answers: [
                    { answer: "去",event: "出国留学外国同学邀请参加生日趴事件1" },
                    { answer: "不去",event: "出国留学外国同学邀请参加生日趴事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "遇到外国的帅哥/美女的追求，你会？",
                answers: [
                    { answer: "道不同不，不相为谋，你给我起开",event: "出国留学遇到外国人追求事件1" },
                    { answer: "我有喜欢的人了，你还是起开吧",event: "出国留学遇到外国人追求事件2" },
                    { answer: "帅/漂亮或者是思聪的话，我会考虑",event: "出国留学遇到外国人追求事件3" },
                    { answer: "心跳加快，坦然接受",event: "出国留学遇到外国人追求事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "外出时钱包和护照都被偷走了，顿时心境跌到谷底，该怎么办？",
                answers: [
                    { answer: "自认倒霉，找同学或家人帮忙",event: "出国留学钱包护照被偷事件1" },
                    { answer: "报警，赖在警察局等待支援",event: "出国留学钱包护照被偷事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "出国了，你的感情生活怎么样？",
                answers: [
                    { answer: "我是单身，没有这个问题",event: "出国留学感情生活如何事件1" },
                    { answer: "在国外才找的对象，挺好的",event: "出国留学感情生活如何事件2" },
                    { answer: "异国恋，痛苦中",event: "出国留学感情生活如何事件3" },
                    { answer: "异国恋，依然在一起，对未来有信心",event: "出国留学感情生活如何事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "出国几年，你与国内同学的差别很大，同学们很多已成家立业，你还一无所有，这时你会？",
                answers: [
                    { answer: "感慨万千，非常失落，同时，学业受到影响",event: "出国留学你一无所有事件1" },
                    { answer: "发现现实和理想差别太大，想要马上回国",event: "出国留学你一无所有事件2" },
                    { answer: "坚持自我，相信自己所选的道路是正确的",event: "出国留学你一无所有事件3" },
                    { answer: "我身边的人还没有这样啊",event: "出国留学你一无所有事件4" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.state_time > 7) { return 1; }
                    else { return 3; }
                },
            },
            {
                question: "时间飞逝，转眼间一年时间已过，你在期间主要做什么？",
                answers: [
                    { answer: "努力学习，读万卷书",event: "出国留学一年主要做什么事件1" },
                    { answer: "积极融入国外生活，感受外国文化",event: "出国留学一年主要做什么事件2" },
                    { answer: "利用地理优势代购赚钱",event: "出国留学一年主要做什么事件3" },
                    { answer: "游山玩水，行万里路",event: "出国留学一年主要做什么事件4" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.state_time > 4) { return 1; }
                    else { return 3; }
                },
            },
            {
                question: "出国后，你的朋友圈、社交圈有什么变化？",
                answers: [
                    { answer: "只跟同胞来往，混中国人自己的圈子",event: "出国留学社交圈的变化事件1" },
                    { answer: "有一些外国朋友，但大部分朋友还是中国人",event: "出国留学社交圈的变化事件2" },
                    { answer: "完全融入当地，有了一群国外朋友",event: "出国留学社交圈的变化事件3" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.state_time > 5) { return 1; }
                    else { return 3; }
                },
            },
            {
                question: "毕业后，你决定？",
                answers: [
                    { answer: "留下来，在这个国家找工作",event: "出国留学毕业决定事件1" },
                    { answer: "回国，已经没有什么可留恋的了",event: "出国留学毕业决定事件2" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.state_time > 11) { return 1; }
                    else { return 3; }
                },
            },

        ]
    },
    
    //国外工作状态
    {
        name: "国外工作状态",
        properties: { time: 1,state_time: 1,health: function(properties) { return 0 },wealth: function(properties) { return 0 },ability: function(properties) { return 0 },happiness: function(properties) { return 0 } },
        questions: [
            {
                question: "你会做什么类型的工作？",
                answers: [
                    { answer: "专业对口，能实现自我价值的工作岗位",event: "国外工作选择工作类型事件1" },
                    { answer: "首要考虑工作的城市，工作相关就好",event: "国外工作选择工作类型事件2" },
                    { answer: "赚钱的工作",event: "国外工作选择工作类型事件3" },
                    { answer: "不知道，能做啥就是啥了",event: "国外工作选择工作类型事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            },
            {
                question: "国外工作会跟国外上学有很多不一样的地方，这时你会怎么调整自己达到一个职业状态？",
                answers: [
                    { answer: "尽快调整自己的状态，每天工作之余更多的时间总结工作相关知识",event: "国外工作调整职业状态事件1" },
                    { answer: "向同事请教和学习",event: "国外工作调整职业状态事件2" },
                    { answer: "随工作时间慢慢推移，一切都会熟悉的",event: "国外工作调整职业状态事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            },
            {
                question: "刚开始接受到的工作强度太大，你会怎么对待？",
                answers: [
                    { answer: "这是非常重要的阶段，欣然接受",event: "国外工作开始工作强度太大事件1" },
                    { answer: "和领导商量，寻找合理范围内的工作",event: "国外工作开始工作强度太大事件2" },
                    { answer: "拒绝超出的工作，寻找法律支持",event: "国外工作开始工作强度太大事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            },
            {
                question: "刚开始在国外工作，你的收入还不足以填补的的开销，这时的你会？",
                answers: [
                    { answer: "寻求加班加点，或者兼职，提高额外收入",event: "国外工作开始收入不足事件1" },
                    { answer: "找家人或朋友救助",event: "国外工作开始收入不足事件2" },
                    { answer: "节约开销，没赚这么多就不花这么多",event: "国外工作开始收入不足事件3" },
                    { answer: "我说了，我是思聪",event: "国外工作开始收入不足事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            },
            {
                question: "工作太忙，无暇照顾到家人和感情，你会？",
                answers: [
                    { answer: "工作重要，现在是关键时期，他们会谅解的",event: "国外工作工作太忙事件1" },
                    { answer: "工作不是所有生活，挤出更多的时间和他们联系沟通",event: "国外工作工作太忙事件2" },
                    { answer: "犹豫是不是觉得这里不合适我，想回国了",event: "国外工作工作太忙事件3" },
                    { answer: "我的工作非常轻松，不存在这些因素啊",event: "国外工作工作太忙事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            },
            {
                question: "工作一年，你始终发现自己是个外国人，觉得自己格格不入，你想？",
                answers: [
                    { answer: "可能是经历的还不够，再多工作些时间，习惯习惯就好了",event: "国外工作一年格格不入事件1" },
                    { answer: "一定是我的工作环境有问题，我想换工作",event: "国外工作一年格格不入事件2" },
                    { answer: "这个国家不适合我，我想回去了",event: "国外工作一年格格不入事件3" },
                    { answer: "我觉得融入得很好啊，没有任何问题的",event: "国外工作一年格格不入事件4" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.state_time > 5) { return 1; }
                    else { return 3; }
                },
            },
            {
                question: "工作中和同事的产生了矛盾，你会？",
                answers: [
                    { answer: "有啥直接了当，没有解决不了的问题",event: "国外工作跟同事矛盾事件1" },
                    { answer: "先了解问题的根源，如果是自己的问题，做出道歉和让步",event: "国外工作跟同事矛盾事件2" },
                    { answer: "同事的影响对我挺重要的，现在是关键时期，不管什么先忍着",event: "国外工作跟同事矛盾事件3" },
                    { answer: "随便了，I don’t care",event: "国外工作跟同事矛盾事件4" },
                ],
                left_times: 2,
                require: function(properties) { return 2 },
            },
            {
                question: "工作所在的国家发生了人质劫持事件，你会？",
                answers: [
                    { answer: "一时的动乱，我相信所在国家政府会处理好这些事情",event: "国外工作发生人质劫持事件1" },
                    { answer: "恐慌，每天生活得惶恐不安",event: "国外工作发生人质劫持事件2" },
                    { answer: "对这个国家，社会失望透顶，但是比在国内还是要好一点",event: "国外工作发生人质劫持事件3" },
                    { answer: "失望透顶，决定回国工作",event: "国外工作发生人质劫持事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "在国外，你会多长时间往家里打一次电话？",
                answers: [
                    { answer: "一天一次，经常保持视频微信沟通",event: "国外工作跟家里联系频率事件1" },
                    { answer: "一周一次吧，有什么大部分微信联系",event: "国外工作跟家里联系频率事件2" },
                    { answer: "一个月一次，这样的节奏就够了",event: "国外工作跟家里联系频率事件3" },
                    { answer: "爸妈很忙，没时间顾我，两三个月一次",event: "国外工作跟家里联系频率事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "工作两年，是否产生回国的想法？",
                answers: [
                    { answer: "有的，一直都有，我现在就决定回国了",event: "国外工作两年是否回国事件1" },
                    { answer: "我适应得很好，还不是很强烈",event: "国外工作两年是否回国事件2" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.state_time > 8) { return 1; }
                    else { return 3; }
                },
            },
            {
                question: "国外工作两年，你的工作能力得到很大提升，收入骤涨，这时你会打算？",
                answers: [
                    { answer: "买车，国外没有车真的很不方便",event: "国外工作两年收入提升事件1" },
                    { answer: "买房，决定在这个城市待下去了",event: "国外工作两年收入提升事件2" },
                    { answer: "现在工作还不算很稳定，稳定下来再说吧",event: "国外工作两年收入提升事件3" },
                    { answer: "思聪说了，都不是问题",event: "国外工作两年收入提升事件4" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.state_time > 9) { return 1; }
                    else { return 3; }
                },
            },
            {
                question: "两年过去，你对自己的工作？",
                answers: [
                    { answer: "已经信手拈来，非常熟练，且有巨大提升",event: "国外工作两年对工作态度事件1" },
                    { answer: "不是很喜欢现在的工作，准备寻找更合适自己的工作",event: "国外工作两年对工作态度事件2" },
                    { answer: "还有很多不足的地方，我非常喜欢自己的工作",event: "国外工作两年对工作态度事件3" },
                    { answer: "对工作并不十分热爱，但是也不讨厌，重要的是长期时间长可以拿到绿卡/居留",event: "国外工作两年对工作态度事件4" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.state_time > 10) { return 1; }
                    else { return 3; }
                },
            },
            {
                question: "突然发现邻居很难相处，还经常半夜发出吵闹声，让人无法很好睡眠。你会？",
                answers: [
                    { answer: "找他就事论理",event: "国外工作邻居半夜吵闹事件1" },
                    { answer: "直接报警",event: "国外工作邻居半夜吵闹事件2" },
                    { answer: "朝他家扔酒瓶子",event: "国外工作邻居半夜吵闹事件3" },
                    { answer: "可能这段时间他家里发生了点事，忍过段时间应该就好了",event: "国外工作邻居半夜吵闹事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "国外生活比较孤单，你会？",
                answers: [
                    { answer: "多结识朋友，周末下班之余有兴趣时间",event: "国外工作生活比较孤单事件1" },
                    { answer: "多结识华人同胞，在外有照应",event: "国外工作生活比较孤单事件2" },
                    { answer: "有男/女朋友在，已经拥有全世界",event: "国外工作生活比较孤单事件3" },
                    { answer: "我不觉得孤独啊，我就喜欢自己安静，自由自在",event: "国外工作生活比较孤单事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "父母得了重病，但是工作又非常忙，这时你会？",
                answers: [
                    { answer: "请假抽出，马上飞回去看他们",event: "国外工作父母得重病事件1" },
                    { answer: "先安排好工作，待安排妥当再回去",event: "国外工作父母得重病事件2" },
                    { answer: "先询问父母病情，积极寻找治疗方式，但不回去",event: "国外工作父母得重病事件3" },
                    { answer: "辞职，回国工作，照顾父母",event: "国外工作父母得重病事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "工作这么多年，是否想到要成家？",
                answers: [
                    { answer: "有啊，女朋友也在这边，结婚日程也提上来了",event: "国外工作是否成家事件1" },
                    { answer: "还没有男/女朋友，华人太少了，不知道什么时候才能找到，再说吧，随缘",event: "国外工作是否成家事件2" },
                    { answer: "还没有，外国帅哥/美女也很多，可以试试看",event: "国外工作是否成家事件3" },
                    { answer: "一个人也挺好的，其实我是…",event: "国外工作是否成家事件4" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.state_time > 15) { return 1; }
                    else { return 3; }
                },
            },
            {
                question: "家人在异国，会想他们，你要怎么办呢？",
                answers: [
                    { answer: "拿到绿卡，把他们接过来",event: "国外工作家人怎么处理事件1" },
                    { answer: "他们在家很好，每年回去看几次他们就可以了",event: "国外工作家人怎么处理事件2" },
                    { answer: "我也想他们，但家里还有兄弟姐妹，他们会照顾好他的",event: "国外工作家人怎么处理事件3" },
                    { answer: "我会回去照顾他们的，但是现在还不行",event: "国外工作家人怎么处理事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "工作慢慢稳定下来，你会选择？",
                answers: [
                    { answer: "把父母接过来，和自己一起生活",event: "国外工作慢慢稳定的选择事件1" },
                    { answer: "结婚，和心爱的ta组建自己的家",event: "国外工作慢慢稳定的选择事件2" },
                    { answer: "还没有计划，事业为重",event: "国外工作慢慢稳定的选择事件3" },
                    { answer: "趁年轻，继续多看看，多享受两年自由时光",event: "国外工作慢慢稳定的选择事件4" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.state_time > 18) { return 1; }
                    else { return 3; }
                },
            },
            {
                question: "社区里动物保护协会邀请你加入他们？",
                answers: [
                    { answer: "加入，业余一点时间，为保护环境贡献一点",event: "国外工作社区动物保护协会事件1" },
                    { answer: "不加入，没有那么多精力时间",event: "国外工作社区动物保护协会事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "多年过去，是否真正融入这个国家当中？",
                answers: [
                    { answer: "还可以吧，觉得已经是这里的一份子了",event: "国外工作多年是否融入国家事件1" },
                    { answer: "不是很融合，但是也没有特别多的感受",event: "国外工作多年是否融入国家事件2" },
                    { answer: "依然不是很融合，梦里总梦到家乡的画面",event: "国外工作多年是否融入国家事件3" },
                    { answer: "一点都不融合，我还是个外国人，我决定回国",event: "国外工作多年是否融入国家事件4" },
                ],
                left_times: 3,
                require: function(properties) { return 2 },
            },
            {
                question: "多年过去，你对自己又有了更高的认识，你会更关心？",
                answers: [
                    { answer: "更关心家人了，是他们的爱让我如此幸福",event: "国外工作多年更关心什么事件1" },
                    { answer: "心在事业上，有更多的人方向需要我去指引",event: "国外工作多年更关心什么事件2" },
                    { answer: "生活应当充满乐趣，想看没看过的风景，做没做过的事情，见没见过的人",event: "国外工作多年更关心什么事件3" },
                ],
                left_times: 3,
                require: function(properties) { return 2 },
            },
            {
                question: "出国工作已经几年了，你现在打算？",
                answers: [
                    { answer: "最终还是要离开，回到国内",event: "国外工作几年最终选择事件1" },
                    { answer: "留下来，一直在这里生活下去",event: "国外工作几年最终选择事件2" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.state_time > 21) { return 1; }
                    else { return 3; }
                },
            },

        ]
    },
    
    //创业/自由职业选择状态
    {
        name: "创业/自由职业选择状态",
        properties: { health: function(properties) { return 0 },wealth: function(properties) { return 0 },ability: function(properties) { return 0 },happiness: function(properties) { return 0 } },
        questions: [
            {
                question: "创业/自由职业选择状态问题？",
                detail: [
                    '你选择了一条有挑战性的道路',
                    '或许，这种自由的生活，正是你所向往的',
                    '你是要成立公司来创业呢，还是做自由的兼职？',
                ],
                answers: [
                    { answer: "成立公司",event: "成立公司选择状态" },
                    { answer: "自由兼职",event: "自由兼职选择状态" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            }
        ]
    },
    
    //成立公司选择状态
    {
        name: "成立公司选择状态",
        properties: { health: function(properties) { return 0 },wealth: function(properties) { return 0 },ability: function(properties) { return 0 },happiness: function(properties) { return 0 } },
        questions: [
            {
                question: "你要选哪个行业的公司？",
                detail: [
                    '你决定了成立公司，',
                    '你要选哪个行业的公司？',
                ],
                answers: [
                    { answer: "互联网行业",event: "成立互联网行业公司" },
                    { answer: "餐饮个体行业",event: "成立个体行业公司" },
                    { answer: "贸易类公司",event: "成立贸易类公司" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            }
        ]
    },    

    //互联网行业初期状态，连续问题出现
    {
        name: "互联网行业初期状态",
        properties: { time: 1,state_time: function(properties) { return 1 },fund: function(properties) { return 20000 },success: function(properties) { return 0 },health: function(properties) { return -2 },wealth: function(properties) { return -5000 },ability: function(properties) { return 4 },happiness: function(properties) { return -1 } },
        questions: [
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
                question: "你的启动资金太少，需要找到资金来维持公司运营，那么，怎么去找钱呢？",
                answers: [
                    { answer: "找风投",event: "互联网行业初期找钱事件1" },
                    { answer: "找亲戚朋友投资",event: "互联网行业初期找钱事件2" },
                    { answer: "在网上众筹",event: "互联网行业初期找钱事件3" },
                    { answer: "放弃创业，去工作",event: "互联网行业初期找钱事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
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
                    { answer: "先增加用户量，暂缓盈利",event: "互联网行业初期公司产品反响1" },
                    { answer: "先盈利，再图发展",event: "互联网行业初期产品公司反响事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
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
                    if(properties.success > 12) { return 1; }
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
                    { answer: "放弃创业，去工作",event: "互联网行业初期家人劝放弃事件2" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.happiness < 90) { return 1; }
                    else { return 3; }
                },
            },

            {
                question: "由于长期熬夜，加班加点的工作，你的身体出现了一些问题，你该如何选择？",
                answers: [
                    { answer: "有得必有失，继续坚持创业",event: "互联网行业初期身体出问题事件1" },
                    { answer: "调整作息，锻炼身体，少花一些时间在工作上",event: "互联网行业初期身体出问题事件2" },
                    { answer: "放弃创业，找份轻松的工作",event: "互联网行业初期身体出问题事件3" },
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
                question: "由于你能力超群，一个富二代朋友愿意注资成为你的合伙人，但他什么都不会，你该怎么办？",
                answers: [
                    { answer: "钱最重要，必须接受啊",event: "互联网行业初期富二代朋友加入事件1" },
                    { answer: "人最重要，他进入公司会影响我的决策，不要",event: "互联网行业初期富二代朋友加入事件2" },
                    { answer: "钱和人都重要，只要谈好持股比例和估值即可",event: "互联网行业初期富二代朋友加入事件3" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.success > 16) { return 1; }
                    else { return 3; }
                },
            },

            {
                question: "时间过去了两年，你的公司没有什么起色，放弃似乎是唯一的选择了。",
                answers: [
                    { answer: "放弃创业，重新选择",event: "互联网行业初期两年后放弃事件" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.state_time > 7 && properties.fund < 1000000) { return 1; }
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
                question: "你因为创业太忙没有时间陪女（男）朋友，导致你们经常吵架，怎么办？",
                answers: [
                    { answer: "事业高于一切，不行就先分手吧",event: "互联网行业初期对象吵架事件1" },
                    { answer: "我要事业爱情兼顾",event: "互联网行业初期对象吵架事件2" },
                    { answer: "爱情重要，多抽时间陪陪他（她）吧",event: "互联网行业初期对象吵架事件3" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.happiness < 70) { return 1; }
                    else { return 3; }
                },
            },
            {
                question: "创业失败。",
                answers: [
                    { answer: "由于资金链断裂，你的公司倒闭了",event: "互联网行业初期创业失败事件1" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.state_time > 2 && properties.fund < 5) { return 1; }
                    else { return 3; }
                },
            },

            {
                question: "初期的公司财务怎么处理？",
                answers: [
                    { answer: "交给代理财务公司去做",event: "互联网行业初期财务问题事件1" },
                    { answer: "自己招会计和出纳",event: "互联网行业初期财务问题事件2" },
                    { answer: "自己做",event: "互联网行业初期财务问题事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            },

            {
                question: "你的公司规模还很小，办公场地怎么解决？",
                answers: [
                    { answer: "租写字楼，有利于招聘和PR",event: "互联网行业初期办公场地事件1" },
                    { answer: "租民房，节省资金又能在一起办公",event: "互联网行业初期办公场地事件2" },
                    { answer: "进驻创业咖啡厅，租工位",event: "互联网行业初期办公场地事件3" },
                    { answer: "大家在家办公，线上交流",event: "互联网行业初期办公场地事件4" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            },
            {
                question: "你和你的合伙人怎么分配股权？",
                answers: [
                    { answer: "我是领头人，我占大头",event: "互联网行业初期股权问题事件1" },
                    { answer: "大家平分",event: "互联网行业初期股权问题事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
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
                    if(properties.state_time > 11 && properties.success > 50) { return 1; }
                    else { return 3; }
                },
            },

        ]
    },    
    
    //互联网行业中期状态
    {
        name: "互联网行业中期状态",
        properties: { time: 1,state_time: 1,health: function(properties) { return 0 },wealth: function(properties) { return 0 },ability: function(properties) { return 0 },happiness: function(properties) { return 0 } },
        questions: [
            {
                question: "在进行下一轮融资的时候，由于公司估值问题与投资人纠缠了很久，该怎么选择？",
                answers: [
                    { answer: "必须谈到合适的价格，哪怕再纠缠半年也无所谓",event: "互联网中期投资人纠缠事件1" },
                    { answer: "时间就是财富，为了达成合作可降低估值",event: "互联网中期投资人纠缠事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
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
                question: "对于一个互联网公司，人才是最重要的，在这个阶段怎么去增强团队？",
                answers: [
                    { answer: "找猎头",event: "互联网中期增强团队事件1" },
                    { answer: "朋友介绍",event: "互联网中期增强团队事件2" },
                    { answer: "自己去创投圈找",event: "互联网中期增强团队事件3" },
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
                    if(properties.wealth < 30000) { return 1; }
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
                question: "对于公司或产品的PR(public relations,公共关系)，你怎么看？",
                answers: [
                    { answer: "PR很重要，要花大功夫去做",event: "互联网中期做公司PR事件1" },
                    { answer: "PR重要但不必要，做的一般般就行",event: "互联网中期做公司PR事件2" },
                    { answer: "PR可有可无",event: "互联网中期做公司PR事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "时间过去了三年，你的公司还处于半死不活的状态，你改如何选择？",
                answers: [
                    { answer: "坚持就是胜利",event: "互联网中期三年后半死不活事件1" },
                    { answer: "把公司卖掉，套现走人",event: "互联网中期三年后半死不活事件2" },
                    { answer: "直接关门，重新开始",event: "互联网中期三年后半死不活事件3" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.state_time > 12 && properties.wealth < 2000000) { return 1; }
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

        ]
    },    
    
    //互联网后期状态
    {
        name: "互联网后期状态",
        properties: { time: 1,state_time: 1,health: function(properties) { return 0 },wealth: function(properties) { return 0 },ability: function(properties) { return 0 },happiness: function(properties) { return 0 } },
        questions: [
            {
                question: "你的公司已经有一定规模了，原有的团队能力已经跟不上了，你要怎么办？",
                detail: [
                    '你的公司现在已经具备了一定的规模，',
                    '原有的团队能力已经跟不上了，',
                    '你要怎么办？',
                ],
                answers: [
                    { answer: "能力大于一切，辞旧迎新",event: "互联网后期原团队能力跟不上事件1" },
                    { answer: "老员工更忠诚，应培养和提携",event: "互联网后期原团队能力跟不上事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            },
            {
                question: "你的公司净利润为负，也就是说还在烧钱，你是否在意？",
                answers: [
                    { answer: "不在意，只要有用户，不着急赚钱",event: "互联网后期继续烧钱事件1" },
                    { answer: "在意，盈利是一切的根本，我要尽快盈利",event: "互联网后期继续烧钱事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 1 },
            },
            {
                question: "对于公司或产品的PR(public relations,公共关系)，你怎么看？",
                answers: [
                    { answer: "PR很重要，要花大功夫去做",event: "互联网后期做公司PR事件1" },
                    { answer: "PR重要但不必要，做的一般般就行",event: "互联网后期做公司PR事件2" },
                    { answer: "PR可有可无",event: "互联网后期做公司PR事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "公司的创新能力枯竭，你的市场占有率逐步下跌，改怎么办？",
                answers: [
                    { answer: "增加创新投入，收购创业公司",event: "互联网后期占有率下降事件1" },
                    { answer: "增加广告投入，重新夺回市场",event: "互联网后期占有率下降事件2" },
                    { answer: "精益求精，把自身的产品做到极致以赢回用户",event: "互联网后期占有率下降事件3" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },
            {
                question: "经过你的不懈努力，公司已经成为业内知名的互联网企业，关于未来发展如何选择？",
                answers: [
                    { answer: "国内上市",event: "互联网后期未来发展事件1" },
                    { answer: "去美股上市",event: "互联网后期未来发展事件2" },
                    { answer: "寻求并购",event: "互联网后期未来发展事件3" },
                    { answer: "不上市",event: "互联网后期未来发展事件4" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.wealth > 20000000) { return 1; }
                    else { return 3; }
                },
            },
            {
                question: "你的公司规模得到了极大的提升，一切井然有序。你怎么计划未来的生活？",
                answers: [
                    { answer: "退休，享受生活",event: "互联网后期计划生活事件1" },
                    { answer: "出国游学，环游世界",event: "互联网后期计划生活事件2" },
                    { answer: "还没上市，不算成功，我要继续努力",event: "互联网后期计划生活事件3" },
                ],
                left_times: 1,
                require: function(properties) {
                    if(properties.wealth > 10000000) { return 1; }
                    else { return 3; }
                },
            },
            {
                question: "你的公司由于丑闻出现公关危机，一群大V在微博上讨伐你，该怎么办？",
                answers: [
                    { answer: "绝不认错，雇佣水军，扳倒舆论",event: "互联网后期大V讨伐事件1" },
                    { answer: "诚意道歉，严查错乱，挽回用户",event: "互联网后期大V讨伐事件2" },
                ],
                left_times: 1,
                require: function(properties) { return 2 },
            },

        ]
    },

];
var EVENTS = [

    //  填写背景状态
    { name: '背景一线城市',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 50,happiness: 0 } },
    { name: '背景二线城市',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 40,happiness: 0 } },
    { name: '背景三/四线城市',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 30,happiness: 0 } },
    { name: '学校一本',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 50,happiness: 0 } },
    { name: '学校二本',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 40,happiness: 0 } },
    { name: '学校三本',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 30,happiness: 0 } },
    { name: '学校专科',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 20,happiness: 0 } },
    { name: '专业理工',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '专业人文社科',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '专业体育艺术',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '家庭经济富裕',from: '填写背景状态',to: '职业规划1阶',properties: { health: 100,wealth: 200000,ability: 0,happiness: 100 } },
    { name: '家庭经济较富裕',from: '填写背景状态',to: '职业规划1阶',properties: { health: 100,wealth: 150000,ability: 0,happiness: 100 } },
    { name: '家庭经济一般',from: '填写背景状态',to: '职业规划1阶',properties: { health: 100,wealth: 100000,ability: 0,happiness: 100 } },
    { name: '家庭经济贫困',from: '填写背景状态',to: '职业规划1阶',properties: { health: 100,wealth: 50000,ability: 0,happiness: 100 } },


    //  职业规划1阶
    { name: '选择工作1阶',from: '职业规划1阶',to: '选择工作1阶状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '考研/留学',from: '职业规划1阶',to: '考研/留学选择状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '创业/自由职业',from: '职业规划1阶',to: '创业/自由职业选择状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },


    //工作选择事件
    { name: '国企职员事件',from: '选择工作1阶状态',to: '国企职员状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '私企职员事件',from: '选择工作1阶状态',to: '私企职员状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '外企职员事件',from: '选择工作1阶状态',to: '外企职员状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    

    //  国企职员事件
    { name: '国企职员租房事件1',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: 0,ability: 2,happiness: 0 } },
    { name: '国企职员租房事件2',from: '国企职员状态',to: '国企职员状态',properties: { health: 1,wealth: 3000,ability: 0,happiness: 0 } },
    { name: '国企职员共事事件1',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: 2,ability: 0,happiness: 0 } },
    { name: '国企职员共事事件2',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: -10,ability: 10,happiness: 0 } },
    { name: '国企职员领导的挑战事件1',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: 2,ability: 0,happiness: 0 } },
    { name: '国企职员领导的挑战事件2',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: -10,ability: 10,happiness: 0 } },
    { name: '国企职员提交升职申请事件1',from: '国企职员状态',to: '国企干部状态',properties: { health: 0,wealth: 2,ability: 0,happiness: 0 } },
    { name: '国企职员提交升职申请事件2',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: -10,ability: 10,happiness: 0 } },
    { name: '国企职员升职与同事事件1',from: '国企职员状态',to: '国企干部状态',properties: { health: 0,wealth: -10,ability: 10,happiness: 0 } },
    { name: '国企职员升职与同事事件2',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: -10,ability: 10,happiness: 0 } },
    { name: '国企职员生病出差事件1',from: '国企职员状态',to: '国企职员状态',properties: { health: -2,wealth: 1000,ability: 5,happiness: 0 } },
    { name: '国企职员生病出差事件2',from: '国企职员状态',to: '国企职员状态',properties: { health: 1,wealth: -500,ability: 0,happiness: 0 } },
    { name: '国企职员家人给领导打招呼事件1',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: 1000,ability: 1,happiness: 2 } },
    { name: '国企职员家人给领导打招呼事件2',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: -500,ability: 3,happiness: 0 } },
    { name: '国企职员加班做任务事件1',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: 0,ability: 2,happiness: 0 } },
    { name: '国企职员加班做任务事件2',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: 0,ability: 2,happiness: 0 } },
    { name: '国企职员领导一起打台球事件1',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: 0,ability: 2,happiness: 0 } },
    { name: '国企职员领导一起打台球事件2',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: 0,ability: 2,happiness: 0 } },
    { name: '国企职员成果讨好领导事件1',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: 0,ability: 2,happiness: 0 } },
    { name: '国企职员成果讨好领导事件2',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: 0,ability: 2,happiness: 0 } },
    { name: '国企职员聚会喝酒事件1',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: 0,ability: 2,happiness: 0 } },
    { name: '国企职员聚会喝酒事件2',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: 0,ability: 2,happiness: 0 } },
    { name: '国企职员健身办卡事件1',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: 0,ability: 2,happiness: 0 } },
    { name: '国企职员健身办卡事件2',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: 0,ability: 2,happiness: 0 } },
    { name: '国企职员健身办卡事件3',from: '国企职员状态',to: '国企职员状态',properties: { health: 0,wealth: 0,ability: 2,happiness: 0 } },

    //国企干部事件 
    { name: '国企干部租房事件1',from: '国企干部状态',to: '国企干部状态',properties: { health: 1,wealth: 10,ability: 1,happiness: 0 } },
    { name: '国企干部租房事件2',from: '国企干部状态',to: '国企干部状态',properties: { health: 1,wealth: 0,ability: 10,happiness: 0 } },
    { name: '国企干部共事事件1',from: '国企干部状态',to: '国企干部状态',properties: { health: -10,wealth: 2,ability: 0,happiness: 0 } },
    { name: '国企干部共事事件2',from: '国企干部状态',to: '国企干部状态',properties: { health: -10,wealth: -10,ability: 10,happiness: 0 } },
    { name: '国企干部领导的挑战事件1',from: '国企干部状态',to: '国企干部状态',properties: { health: -10,wealth: 2,ability: 0,happiness: 0 } },
    { name: '国企干部领导的挑战事件2',from: '国企干部状态',to: '国企干部状态',properties: { health: -10,wealth: -10,ability: 10,happiness: 0 } },
    { name: '国企干部提交升职申请事件1',from: '国企干部状态',to: '国企领导状态',properties: { health: -10,wealth: 2,ability: 0,happiness: 0 } },
    { name: '国企干部提交升职申请事件2',from: '国企干部状态',to: '国企干部状态',properties: { health: -10,wealth: -10,ability: 10,happiness: 0 } },
 

    //  考研/留学选择状态事件
    { name: '选择考研事件',from: '考研/留学选择状态',to: '备战考研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '选择出国留学事件',from: '考研/留学选择状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
 


    //  备战考研状态事件
    { name: '备战考研参加培训班事件1',from: '备战考研状态',to: '备战考研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '备战考研参加培训班事件2',from: '备战考研状态',to: '备战考研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '备战考研好朋友找你玩事件1',from: '备战考研状态',to: '备战考研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '备战考研好朋友找你玩事件2',from: '备战考研状态',to: '备战考研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '备战考研谈恋爱事件1',from: '备战考研状态',to: '备战考研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '备战考研谈恋爱事件2',from: '备战考研状态',to: '备战考研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '备战考研买历年试卷事件1',from: '备战考研状态',to: '备战考研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '备战考研买历年试卷事件2',from: '备战考研状态',to: '备战考研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '备战考研自测分数低事件1',from: '备战考研状态',to: '备战考研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '备战考研自测分数低事件2',from: '备战考研状态',to: '备战考研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '备战考研自测分数低事件3',from: '备战考研状态',to: '备战考研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '备战考研有重要聚会事件1',from: '备战考研状态',to: '备战考研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '备战考研有重要聚会事件2',from: '备战考研状态',to: '备战考研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '备战考研是否放弃考研事件1',from: '备战考研状态',to: '选择工作1阶状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '备战考研是否放弃考研事件2',from: '备战考研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } }, 

    //  读研状态事件
    { name: '读研选导师事件1',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研选导师事件2',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研开题不被看好事件1',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研开题不被看好事件2',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研不喜欢科研课题事件1',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研不喜欢科研课题事件2',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研导师经费转账事件1',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研导师经费转账事件2',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研请老师帮忙答辩事件1',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研请老师帮忙答辩事件2',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研论文不好发表事件1',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研论文不好发表事件2',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研潜规则事件1',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研潜规则事件2',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研科研没有成果事件1',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研科研没有成果事件2',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研报销用不完事件1',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研报销用不完事件2',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研报销用不完事件3',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研实验结果不如愿事件1',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研实验结果不如愿事件2',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研两个老师任务事件1',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研两个老师任务事件2',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研两个老师任务事件3',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研汇报老师不爽事件1',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研汇报老师不爽事件2',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研革新成果作者事件1',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研革新成果作者事件2',from: '读研状态',to: '读研状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研最终答辩事件1',from: '读研状态',to: '选择工作1阶状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '读研最终答辩事件2',from: '读研状态',to: '选择工作1阶状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },

    //  出国留学状态事件
    { name: '出国留学原因事件1',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学原因事件2',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学原因事件3',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学提升语言能力事件1',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学提升语言能力事件2',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学提升语言能力事件3',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学提升语言能力事件4',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学初到心理想法事件1',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学初到心理想法事件2',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学初到心理想法事件3',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学初到心理想法事件4',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学融入当地文化事件1',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学融入当地文化事件2',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学融入当地文化事件3',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学平衡打工事件1',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学平衡打工事件2',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学平衡打工事件3',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学平衡打工事件4',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学假期两个月事件1',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学假期两个月事件2',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学假期两个月事件3',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学遇到抢劫事件1',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学遇到抢劫事件2',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学遇到抢劫事件3',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学遇到抢劫事件4',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学外国同学邀请参加生日趴事件1',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学外国同学邀请参加生日趴事件2',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学遇到外国人追求事件1',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学遇到外国人追求事件2',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学遇到外国人追求事件3',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学遇到外国人追求事件4',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学钱包护照被偷事件1',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学钱包护照被偷事件2',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学感情生活如何事件1',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学感情生活如何事件2',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学感情生活如何事件3',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学感情生活如何事件4',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学你一无所有事件1',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学你一无所有事件2',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学你一无所有事件3',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学你一无所有事件4',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学一年主要做什么事件1',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学一年主要做什么事件2',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学一年主要做什么事件3',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学一年主要做什么事件4',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学社交圈的变化事件1',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学社交圈的变化事件2',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学社交圈的变化事件3',from: '出国留学状态',to: '出国留学状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学毕业决定事件1',from: '出国留学状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '出国留学毕业决定事件2',from: '出国留学状态',to: '选择工作1阶状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
 

    //  国外工作状态事件
    { name: '国外工作选择工作类型事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作选择工作类型事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作选择工作类型事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作选择工作类型事件4',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作调整职业状态事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作调整职业状态事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作调整职业状态事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作开始工作强度太大事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作开始工作强度太大事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作开始工作强度太大事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作开始收入不足事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作开始收入不足事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作开始收入不足事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作开始收入不足事件4',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作工作太忙事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作工作太忙事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作工作太忙事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作工作太忙事件4',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作一年格格不入事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作一年格格不入事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作一年格格不入事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作一年格格不入事件4',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作跟同事矛盾事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作跟同事矛盾事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作跟同事矛盾事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作跟同事矛盾事件4',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作发生人质劫持事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作发生人质劫持事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作发生人质劫持事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作发生人质劫持事件4',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作跟家里联系频率事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作跟家里联系频率事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作跟家里联系频率事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作跟家里联系频率事件4',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作两年是否回国事件1',from: '国外工作状态',to: '选择工作1阶状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作两年是否回国事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作两年收入提升事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作两年收入提升事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作两年收入提升事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作两年收入提升事件4',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作两年对工作态度事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作两年对工作态度事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作两年对工作态度事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作两年对工作态度事件4',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作邻居半夜吵闹事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作邻居半夜吵闹事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作邻居半夜吵闹事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作邻居半夜吵闹事件4',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作生活比较孤单事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作生活比较孤单事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作生活比较孤单事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作生活比较孤单事件4',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作父母得重病事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作父母得重病事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作父母得重病事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作父母得重病事件4',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作是否成家事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作是否成家事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作是否成家事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作是否成家事件4',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作家人怎么处理事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作家人怎么处理事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作家人怎么处理事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作家人怎么处理事件4',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作慢慢稳定的选择事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作慢慢稳定的选择事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作慢慢稳定的选择事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作慢慢稳定的选择事件4',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作社区动物保护协会事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作社区动物保护协会事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作多年是否融入国家事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作多年是否融入国家事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作多年是否融入国家事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作多年是否融入国家事件4',from: '国外工作状态',to: '选择工作1阶状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作多年更关心什么事件1',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作多年更关心什么事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作多年更关心什么事件3',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作几年最终选择事件1',from: '国外工作状态',to: '选择工作1阶状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '国外工作几年最终选择事件2',from: '国外工作状态',to: '国外工作状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
 
   
    //  创业/自由职业选择事件
    { name: '成立公司选择状态',from: '创业/自由职业选择状态',to: '成立公司选择状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '自由兼职选择状态',from: '创业/自由职业选择状态',to: '自由兼职状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },

    //成立公司选择状态
    { name: '成立互联网行业公司',from: '成立公司选择状态',to: '互联网行业初期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '成立个体行业公司',from: '成立公司选择状态',to: '个体行业公司初期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '贸易类公司',from: '成立公司选择状态',to: '贸易类公司初期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },

    //互联网行业初期状态
    { detail: [],name: '互联网行业初期找合伙人事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 200000,wealth: 0,happiness: 1,ability: 1,health: 0,success: 4 } },
    { detail: [],name: '互联网行业初期找合伙人事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 200000,wealth: 0,happiness: 0,ability: 1,health: 0,success: 2 } },
    { detail: [],name: '互联网行业初期找合伙人事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 200000,wealth: 0,happiness: 0,ability: 0,health: 0,success: 2 } },
    { detail: [],name: '互联网行业初期找钱事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 500000,wealth: 50000,happiness: 2,ability: 4,health: 0,success: 10 } },
    { detail: [],name: '互联网行业初期找钱事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 300000,wealth: 30000,happiness: 2,ability: 3,health: 0,success: 8 } },
    { detail: [],name: '互联网行业初期找钱事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 200000,wealth: 20000,happiness: 1,ability: 2,health: 0,success: 6 } },
    { detail: [],name: '互联网行业初期找钱事件4',from: '互联网行业初期状态',to: '选择工作1阶状态',properties: { fund: 0,wealth: 0,happiness: -1,ability: 0,health: 0,success: 0 } },
    { detail: [],name: '互联网行业初期找种子用户事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -100000,wealth: 0,happiness: 0,ability: 1,health: 0,success: 4 } },
    { detail: [],name: '互联网行业初期找种子用户事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -50000,wealth: 0,happiness: 0,ability: 2,health: -1,success: 2 } },
    { detail: [],name: '互联网行业初期找种子用户事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 0,happiness: 0,ability: 1,health: 0,success: 1 } },
    { detail: [],name: '互联网行业初期招人方式事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -80000,wealth: 0,happiness: 0,ability: 0,health: 0,success: 4 } },
    { detail: [],name: '互联网行业初期招人方式事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -40000,wealth: 0,happiness: 1,ability: 1,health: 0,success: 3 } },
    { detail: [],name: '互联网行业初期招人方式事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 0,happiness: 1,ability: 2,health: 0,success: 2 } },
    { detail: [],name: '互联网行业初期招人方式事件4',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,happiness: 0,ability: 1,health: 0,success: 1 } },
    { detail: [],name: '互联网行业初期公司产品反响1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -80000,wealth: 0,happiness: 2,ability: 4,health: 0,success: 4 } },
    { detail: [],name: '互联网行业初期公司产品反响2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 50000,happiness: 0,ability: 2,health: 0,success: 1 } },
    { detail: [],name: '互联网行业初期投资人感兴趣事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 1000000,wealth: 0,happiness: 5,ability: 5,health: 0,success: 20 } },
    { detail: [],name: '互联网行业初期投资人感兴趣事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 1500000,wealth: 0,happiness: 3,ability: 3,health: 0,success: 16 } },
    { detail: [],name: '互联网行业初期投资人感兴趣事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 2000000,wealth: 0,happiness: 1,ability: 1,health: 0,success: 12 } },
    { detail: [],name: '互联网行业初期产品上线运营事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -80000,wealth: 0,happiness: -1,ability: 2,health: 0,success: 6 } },
    { detail: [],name: '互联网行业初期产品上线运营事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -40000,wealth: 0,happiness: 0,ability: 0,health: 0,success: 2 } },
    { detail: [],name: '互联网行业初期产品上线运营事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 50000,happiness: 1,ability: 0,health: 1,success: -2 } },
    { detail: [],name: '互联网行业初期家人劝放弃事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 20000,wealth: 0,happiness: -2,ability: 5,health: -2,success: 0 } },
    { detail: [],name: '互联网行业初期家人劝放弃事件2',from: '互联网行业初期状态',to: '选择工作1阶状态',properties: { fund: 0,wealth: 0,happiness: -4,ability: -5,health: 2,success: 0 } },
    { detail: [],name: '互联网行业初期身体出问题事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 40000,wealth: 0,happiness: 0,ability: 2,health: -2,success: 4 } },
    { detail: [],name: '互联网行业初期身体出问题事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 20000,wealth: 0,happiness: 2,ability: -2,health: 2,success: 2 } },
    { detail: [],name: '互联网行业初期身体出问题事件3',from: '互联网行业初期状态',to: '选择工作1阶状态',properties: { fund: 0,wealth: 0,happiness: -4,ability: -5,health: 5,success: 0 } },
    { detail: [],name: '互联网行业初期身体出问题事件4',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,happiness: 2,ability: -5,health: 5,success: 1 } },
    { detail: [],name: '互联网行业初期陪客户赌博事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 40000,wealth: 0,happiness: -3,ability: 2,health: -2,success: 2 } },
    { detail: [],name: '互联网行业初期陪客户赌博事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 0,happiness: 2,ability: 1,health: 1,success: 0 } },
    { detail: [],name: '互联网行业初期做公司PR事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -80000,wealth: 0,happiness: 4,ability: 4,health: -2,success: 4 } },
    { detail: [],name: '互联网行业初期做公司PR事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -40000,wealth: 0,happiness: 2,ability: 2,health: -1,success: 2 } },
    { detail: [],name: '互联网行业初期做公司PR事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,happiness: -1,ability: -1,health: 1,success: 0 } },
    { detail: [],name: '互联网行业初期两年后放弃事件',from: '互联网行业初期状态',to: '职业规划1阶',properties: { fund: 0,wealth: 50000,happiness: 3,ability: -5,health: 3,success: 0 } },
    { detail: [],name: '互联网行业初期富二代朋友加入事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 200000,wealth: 0,happiness: -2,ability: 0,health: 0,success: -4 } },
    { detail: [],name: '互联网行业初期富二代朋友加入事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,happiness: 2,ability: 4,health: 0,success: 2 } },
    { detail: [],name: '互联网行业初期富二代朋友加入事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 100000,wealth: 0,happiness: 0,ability: 2,health: 0,success: 0 } },
    { detail: [],name: '互联网行业初期两年后做的不错事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 100000,wealth: 0,happiness: 5,ability: 5,health: -2,success: 4 } },
    { detail: [],name: '互联网行业初期两年后做的不错事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 500000,happiness: 5,ability: -5,health: 4,success: 0 } },
    { detail: [],name: '互联网行业初期两年后做的不错事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 500000,happiness: 5,ability: -5,health: 4,success: 0 } },
    { detail: [],name: '互联网行业初期对象吵架事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,happiness: -4,ability: 4,health: -2,success: 4 } },
    { detail: [],name: '互联网行业初期对象吵架事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,happiness: -2,ability: 2,health: -4,success: 2 } },
    { detail: [],name: '互联网行业初期对象吵架事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,happiness: 0,ability: -2,health: 0,success: 0 } },
    { detail: [],name: '互联网行业初期创业失败事件1',from: '互联网行业初期状态',to: '职业规划1阶',properties: { fund: 0,wealth: 0,happiness: -4,ability: -5,health: 0,success: 0 } },
    { detail: [],name: '互联网行业初期财务问题事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 0,happiness: 0,ability: 0,health: 0,success: 2 } },
    { detail: [],name: '互联网行业初期财务问题事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -60000,wealth: 0,happiness: 0,ability: 0,health: 0,success: 4 } },
    { detail: [],name: '互联网行业初期财务问题事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,happiness: -2,ability: 4,health: -2,success: 0 } },
    { detail: [],name: '互联网行业初期办公场地事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -80000,wealth: 0,happiness: 2,ability: 4,health: 1,success: 3 } },
    { detail: [],name: '互联网行业初期办公场地事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -60000,wealth: 0,happiness: 1,ability: 3,health: 1,success: 2 } },
    { detail: [],name: '互联网行业初期办公场地事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -40000,wealth: 0,happiness: 1,ability: 2,health: 1,success: 2 } },
    { detail: [],name: '互联网行业初期办公场地事件4',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 0,happiness: 0,ability: 1,health: 1,success: 1 } },
    { detail: [],name: '互联网行业初期股权问题事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,happiness: 1,ability: 4,health: 0,success: 2 } },
    { detail: [],name: '互联网行业初期股权问题事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,happiness: 2,ability: 2,health: 0,success: -2 } },
    { detail: [],name: '互联网行业初期合伙人吵架事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -40000,wealth: 0,happiness: -2,ability: -2,health: -2,success: -4 } },
    { detail: [],name: '互联网行业初期合伙人吵架事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,happiness: 2,ability: 2,health: -2,success: 4 } },
    { detail: [],name: '互联网行业初期合伙人吵架事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: 0,wealth: 0,happiness: 0,ability: 0,health: -1,success: 0 } },
    { detail: [],name: '互联网行业初期员工能力不够事件1',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -40000,wealth: 0,happiness: 0,ability: 4,health: 0,success: 4 } },
    { detail: [],name: '互联网行业初期员工能力不够事件2',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 0,happiness: 0,ability: 0,health: 0,success: 2 } },
    { detail: [],name: '互联网行业初期员工能力不够事件3',from: '互联网行业初期状态',to: '互联网行业初期状态',properties: { fund: -20000,wealth: 0,happiness: 0,ability: 0,health: 0,success: 0 } },
    { detail: [],name: '互联网行业初期进入下一阶段事件',from: '互联网行业初期状态',to: '互联网行业中期状态',properties: { fund: 0,wealth: 500000,happiness: 4,ability: 4,health: 2,success: 4 } },
 
    //互联网行业中期状态
    { detail: [],name: '互联网中期投资人纠缠事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期投资人纠缠事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期用户上涨瓶颈事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期用户上涨瓶颈事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期用户上涨瓶颈事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期增强团队事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期增强团队事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期增强团队事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期增强团队事件4',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期商标法庭事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期商标法庭事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期商标法庭事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期应对类似产品事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期应对类似产品事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期应对类似产品事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期投资人感兴趣事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期投资人感兴趣事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期投资人感兴趣事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期启动资金太少事件1',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期启动资金太少事件2',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期启动资金太少事件3',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { detail: [],name: '互联网中期启动资金太少事件4',from: '互联网行业中期状态',to: '互联网行业中期状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    
    //通用事件
    { name: '通用事件结婚',from: '*',to: '',properties: { married: 1,health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '通用事件结婚策划',from: '*',to: '',properties: { married: 1,health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '通用事件不结婚',from: '*',to: '',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    { name: '通用事件得胃病事件1',from: '*',to: '',properties: { health: 30,wealth: 0,ability: 0,happiness: 0 } },
    { name: '通用事件得胃病事件2',from: '*',to: '',properties: { health: 30,wealth: 0,ability: 0,happiness: 0 } },
    { name: '通用事件得胃病事件3',from: '*',to: '',properties: { health: 30,wealth: 0,ability: 0,happiness: 0 } },

];

var ENDINGS = [
    { condition: { health: 80,wealth: 100,ability: 90,happiness: 90 },result: { title: "人生赢家",desc: "生活中，你能有强大的能力。给你一本《如来神掌》你绝对能走上人生的巅峰。生活中，你能有强大的能力。给你一本《如来神掌》你绝对能走上人生的巅峰。" } },
    { condition: { health: 50,wealth: 50,ability: 50,happiness: 50 },result: { title: "平凡人生",desc: "生活中，你能有强大的能力。给你一本《如来神掌》你绝对能走上人生的巅峰。生活中，你能有强大的能力。给你一本《如来神掌》你绝对能走上人生的巅峰。对能走上人生的巅峰。给你一本《如来神掌》你绝对能走上人生的巅峰。生活中，你能有强大的能力。给你一本《如来神掌》你绝对能走上人生的巅峰。给你一本《如来神掌》你绝对能走上人生的巅峰。生活中，你能有强大的能力。给你一本《如来神掌》你绝对能走上人生的巅峰。给你一本《如来神掌》你绝对能走上人生的巅峰。生活中，你能有强大的能力。给你一本《如来神掌》你绝对能走上人生的巅峰。给你一本《如来神掌》你绝对能走上人生的巅峰。生活中，你能有强大的能力。给你一本《如来神掌》你绝对能走上人生的巅峰。" } },
    { condition: { health: -100,wealth: -100,ability: -100,happiness: -100 },result: { title: "悲惨人生",desc: "生活中，你能有强大的能力。给你一本《如来神掌》你绝对能走上人生的巅峰。生活中，你能有强大的能力。给你一本《如来神掌》你绝" } }
];
// 数据结束


var STATE_CERTAIN = 1; // 必然出现
var STATE_RANDOM = 2; // 随机出现 
var STATE_NOT = 3; // 不出现

class Data {
    public constructor() {
    }
	
    // 当前的状态
    public current = "填写背景状态";

    
    // 通用问题
    public COMMON_QUESTIONS = COMMON_QUESTIONS;
	
    // 所有状态， 和状态下对应的问题
    public STATES = STATES;
    
    /**
     * 将状态表示成字典形式
     */
    public getStatesMap(states) {
        var map = {};
        for(var index in states) {
            var state = states[index];
            map[state.name] = state;
        }
        return map;
    }    
    // 状态的字典表示形式
    public STATES_MAP = this.getStatesMap(this.STATES);
    /**
     * 获取当前状态下对属性的改变函数
     */
    public getStatesProperties() {
        return this.STATES_MAP[this.current].properties;
    }
    /**
     * 获取当前状态下的初始化函数
     */
    public getStatesInitialState() {
        return this.STATES_MAP[this.current].initialState;
    }
    
    /**
     * 在当前状态下获取一个问题
     */
    public getQuestion(properties) {
        var res = null;
        // 1. 获取通用必然事件
        var questions = this.getCertainQuestions(this.COMMON_QUESTIONS,properties);
        if(questions.length > 0) {
            return questions[0];
        } 
        // 2. 获取状态必然事件
        var state_questions = this.STATES_MAP[this.current].questions
        questions = this.getCertainQuestions(state_questions,properties);
        if(questions.length > 0) {
            return questions[0];
        } 
        // 3. 获取通用和状态随机事件, 如果没有，返回null
        questions = this.getRandomQuestions(this.COMMON_QUESTIONS,properties);
        var questions2 = this.getRandomQuestions(state_questions,properties);
        questions.push.apply(questions,questions2);
        res = this.randomOne(questions);
        return res;
    }
    
    /**
     * 从数组中随机选取一个item
     */
    public randomOne(arr) {
        if(arr.length < 0) {
            return null;
        } else {
            return arr[Math.floor(Math.random() * arr.length)];
        }
    }
    /**
     * 获取必然事件
     */
    public getCertainQuestions(questions,properties) { 
        // 按顺序找到第一个必然事件，立即返回
        var res = [];
        for(var index in questions) {
            var q = questions[index];
            if(q.left_times > 0) {
                if(q.require) {
                    var func = q.require;
                    var ret = func(properties);
                    if(ret == STATE_CERTAIN) {
                        return [q];
                    }
                }
            }
        }

        return res;
    }
    /**
     * 获取随机事件
     */
    public getRandomQuestions(questions,properties) {
        var res = [];

        for(var index in questions) {
            var q = questions[index];
            if(q.left_times > 0) {
                if(q.require) {
                    var func = q.require;
                    var ret = func(properties);
                    if(ret == STATE_RANDOM) {
                        res.push(q);
                    }
                } else {
                    res.push(q);
                }
            }
        }

        return res;
    }    

    /**
     * 所有事件
     */
    public EVENTS = EVENTS;
    /**
     * 将Events转换成字典形式
     */
    public getEventsMap(events) {
        var map = {};
        for(var index in events) {
            var event = events[index];
            map[event.name] = event;
        }
        return map;
    }
    // 事件的字典表示形式
    public EVENTS_MAP = this.getEventsMap(this.EVENTS);
    
    /**
     * 所有结局
     */
    public ENDINGS = ENDINGS;
    
    /** 
     * 根据用户当前的属性，获取结局
     */
    public getMyEnding(properties) {
        var endings = this.ENDINGS;
        for(var index in endings) {
            var ending = endings[index];
            var conds = ending.condition;
            var isPass = true;
            for(var k in conds) {
                if(properties[k] < conds[k]) {
                    isPass = false;
                    break;
                }
            }
            if(isPass) {
                return ending;
            }
        }
    }


}
