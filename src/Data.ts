/**
 *
 * @author 
 *
 */
// 数据开始
var COMMON_QUESTIONS = [
    {
        question: "结婚吗？",
        detail: [
            '不知不觉，3年已经过去了？',
            '我女朋友很爱我，为我付出了很多',
            '今天我要给他一个惊喜，向他求婚',
        ],
        answers: [
            { answer: "直接去领证",event: "结婚" },
            { answer: "策划一次隆重的求婚",event: "结婚" },
            { answer: "再想想吧",event: "不结婚" }
        ],
        left_times: 1,      // 这个问题可以问几次？
        require: function(properties) {
            if(properties.time > 3) { // 3年后弹出结婚事件
                return 1;
            } else {
                return 3;
            }
        } // 返回1表示必然发生，返回2表示随机发生， 返回3表示不发生
    }
];

var STATES = [
    {
        name: "本科",
        initialState: { 
            state_time: function(properties) { return -properties.state_time }, // state_time 被初始化为0
            state_change_times: 1       // 状态改变次数+1
        },
        properties: { time: 1, state_time:1, health: function(properties) { return 1 },wealth: function(properties) { return -1 },ability: function(properties) { return 1 } },
        questions: [
            {
                question: "本科干嘛呢？",
                detail: [
                    '上大学了，不知道该干些什么？',
                    '有人打游戏，有人泡妹子。。。',
                    '我该干些什么好呢？',
                ],
                answers: [
                    { answer: "本科工作",event: function() { return "本科工作" } },
                    { answer: "本科上课",event: "本科上课" },
                    { answer: "本科打酱油",event: "本科打酱油" }
                ],
                left_times: 1,      // 这个问题可以问几次？
                require: function(properties) {
                    if(properties.state_year > 3) {
                        return 1;
                    } else {
                        return 2;
                    }
                } // 返回1表示必然发生，返回2表示随机发生， 返回3表示不发生
            }
        ]
    },
    {
        name: "职员",
        initialState: {
            state_time: function(properties) { return -properties.state_time },  
            state_change_times: 1
        },
        properties: { time: 1, state_time: 1, health: function(properties) { return 1 },wealth: function(properties) { return -1 },ability: function(properties) { return 1 } },
        questions: [
            {
                question: "选择一种行为？",
                detail: [
                    '工作了，应酬很多？',
                    '但是为了未来，一定要坚持下去。。。',
                    '我选择？',
                ],
                answers: [
                    { answer: "职员加薪",event: "职员加薪" },
                    { answer: "职员升职",event: "职员升职" },
                    { answer: "职员喝酒",event: "职员喝酒" },
                    { answer: "职员辞职",event: "职员辞职" }
                ],
                left_times: 2,
                require: function(properties) { return 1 }
            },
            {
                question: "厌倦工作了吗？",
                detail: [
                    '工作好无聊呀？',
                    '给自己放个假吧。。。'
                ],
                answers: [
                    { answer: "职员无聊",event: "职员加薪" },
                    { answer: "职员放假",event: "职员升职" },
                    { answer: "职员XXX",event: "职员喝酒" },
                    { answer: "职员辞职",event: "职员辞职" }
                ],
                left_times: 1,
                require: function(properties) { return 1 }
            }
        ]
    }
];
var EVENTS = [
    // 通用事件
    {
        name: '结婚',from: '*',to: '',   // from可以是*，表示任意状态，to可以使空，表示不改变状态
        detail: ['结婚，积蓄光光，幸福爆棚','','','', '','',''],
        image: "resource/events/jiehun.jpg",
        properties: { health: 10, wealth: -10, ability: 1, happiness: 10 }
    },
    {
        name: '不结婚',from: '*',to: '',   // from可以是*，表示任意状态，to可以使空，表示不改变状态
        detail: ['选择不结婚，女朋友生气分手了，我很伤心'],
        properties: { health: -10, wealth: 0, ability: 1, happiness: -10 }
    },
    
    //  本科可以做的事情
    {
        name: '本科工作',from: '本科', to: '职员',   // from可以是*，表示任意状态，to可以使空，表示不改变状态
        detail: ['说点什么吧1','说点什么吧2','说点什么吧3'],
        properties: { health: 0,wealth: 1,ability: 1,happiness: 0 }
    },
    {
        name: '本科上课',from: '本科',to: '本科',
        detail: ['说点什么吧1','说点什么吧2','说点什么吧3'],
        properties: { health: 0,wealth: -1,ability: 2,happiness: 0 }
    },
    {
        name: '本科打酱油',from: '本科',to: '本科',
        detail: ['说点什么吧1','说点什么吧2','说点什么吧3'],
        properties: { health: -2,wealth: -10,ability: 10,happiness: 0 }
    },
    //  职员可以做的事情
    {
        name: '职员加薪',from: '职员',to: '职员',
        detail: ['说点什么吧1','说点什么吧2','说点什么吧3'],
        properties: { health: 1,wealth: 10,ability: 1,happiness: 0 }
    },
    {
        name: '职员升职',from: '职员',to: '职员',
        detail: ['说点什么吧1','说点什么吧2','说点什么吧3'],
        properties: { health: 1,wealth: 0,ability: 10,happiness: 0 }
    },
    {
        name: '职员喝酒',from: '职员',to: '职员',
        detail: ['说点什么吧1','说点什么吧2','说点什么吧3'],
        properties: { health: -10,wealth: 2,ability: 0,happiness: 0 }
    },
    {
        name: '职员辞职',from: '职员',to: '本科',
        detail: ['说点什么吧1','说点什么吧2','说点什么吧3'],
        properties: { health: -10,wealth: -10,ability: 10,happiness: 0 }
    }
];

var ENDINGS = [
    { condition: { health: 80,wealth: 100,ability: 90,happiness: 90 },result: { title: "人生赢家",desc: "" } },
    { condition: { health: 50,wealth: 50,ability: 50,happiness: 50 },result: { title: "平凡人生",desc: "" } },
    { condition: { health: -100,wealth: -100,ability: -100,happiness: -100 },result: { title: "你是苦逼的打工者",desc: "结局很不幸，你得了癌症，将不久于人世。结局很不幸，你得了癌症，将不久于人世。结局很不幸，你得了癌症，将不久于人世。" } }
];
// 数据结束


var STATE_CERTAIN = 1; // 必然出现
var STATE_RANDOM = 2; // 随机出现 
var STATE_NOT = 3; // 不出现

class Data {
	public constructor() {
	}
	
	// 当前的状态
    public current = "本科";

    
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
        var questions = this.getCertainQuestions(this.COMMON_QUESTIONS, properties);
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
    public getCertainQuestions(questions, properties) { 
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
    public getRandomQuestions(questions, properties) {
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
