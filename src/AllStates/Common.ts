/**
 *
 * 通用事件
 *
 */
class Common {
    public static QUESTIONS = [
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
                    return 3; 
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
                    return 3;
                } else {
                    return 3;
                }
            }
        }
    ];
    
    public static EVENTS = [
        { name: '通用事件结婚',from: '*',to: '',properties: { married: 1,health: 0,wealth: 0,ability: 0,happiness: 0 } },
        { name: '通用事件结婚策划',from: '*',to: '',properties: { married: 1,health: 0,wealth: 0,ability: 0,happiness: 0 } },
        { name: '通用事件不结婚',from: '*',to: '',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
        { name: '通用事件得胃病事件1',from: '*',to: '',properties: { health: 30,wealth: 0,ability: 0,happiness: 0 } },
        { name: '通用事件得胃病事件2',from: '*',to: '',properties: { health: 30,wealth: 0,ability: 0,happiness: 0 } },
        { name: '通用事件得胃病事件3',from: '*',to: '',properties: { health: 30,wealth: 0,ability: 0,happiness: 0 } },
    ];

	
}
