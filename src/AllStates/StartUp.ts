/**
 *
 * 创业状态
 *
 */
class StartUp {
    public static QUESTIONS = [
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
        }, // 返回1表示必然发生，返回2表示随机发生， 返回3表示不发生
    ];

    public static EVENTS = [ //职业规划1阶
        { name: '选择工作1阶',from: '职业规划1阶',to: '选择工作1阶状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
        { name: '考研/留学',from: '职业规划1阶',to: '考研/留学选择状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
        { name: '创业/自由职业',from: '职业规划1阶',to: '创业/自由职业选择状态',properties: { health: 0,wealth: 0,ability: 0,happiness: 0 } },
    ];
    
    public static STATES = {
        name: "职业规划1阶",
        properties: { health: function(properties) { return 1 },wealth: function(properties) { return -1 },ability: function(properties) { return 1 } },
        questions: StartUp.QUESTIONS
    }


}
