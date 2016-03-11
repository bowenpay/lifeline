var ALL_STATE = [Choices, StartUp, StartUp1, StartUp2];


// 数据开始
// 通用问题
var COMMON_QUESTIONS = Common.QUESTIONS;
// 所有状态
var STATES = [];
ALL_STATE.map(function(item) { STATES.push(item.STATES) });
// 所有事件
var EVENTS = [];
// 加上通用事件
EVENTS.push.apply(EVENTS, Common.EVENTS);
// 加上各个状态下的事件
ALL_STATE.map(function(item) {
    EVENTS.push.apply(EVENTS, item.EVENTS);
}); 

console.log(STATES);
console.log(EVENTS);

var ENDINGS = [
    { condition: { health: 80,wealth: 100,ability: 90,happiness: 90 },result: { title: "人生赢家",desc: "" } },
    { condition: { health: 50,wealth: 50,ability: 50,happiness: 50 },result: { title: "平凡人生",desc: "" } },
    { condition: { health: -100,wealth: -100,ability: -100,happiness: -100 },result: { title: "悲惨人生",desc: "" } }
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
