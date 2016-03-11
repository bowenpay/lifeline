/**
 *
 * 选择背景状态
 *
 */
class Choices {
    public static QUESTIONS = [
        {
            question: "教育背景",
            detail: [
                '这是一个极其真实的模拟题，',
                '问题将从你开始创业的那一刻开始，时间不停的在走，',
                '随着时间的流逝，你将遇到各种各样的问题，',
                '请结合自身情况，谨慎的选择你的答案。',
                '每个选择都会像蝴蝶效应一样影响着你的未来……',
                '那么，请先选择你想要从什么样的开始创业。',
                '你的教育背景',
            ],
            answers: [
                { answer: "国内/国际名校硕博",event: "教育背景1" },
                { answer: "国内/国际名校本专",event: "教育背景2" },
                { answer: "其他大学硕博",event: "教育背景3" },
                { answer: "其他大学本专",event: "教育背景4" }
            ],
            left_times: 1,
            require: function(properties) { return 1; }
        },
        {
            question: "你的工作经验：",
            answers: [
                { answer: "知名互联网公司工作经验",event: "工作经验1" },
                { answer: "一般互联网公司工作经验",event: "工作经验2" },
                { answer: "非互联网行业工作经验",event: "工作经验3" },
                { answer: "应届毕业生",event: "工作经验4" }
            ],
            left_times: 1,
            require: function(properties) { return 1; }
        },

        {
            question: "你的家庭经济情况？",
            answers: [
                { answer: "非常富裕",event: "家庭经济富裕" },
                { answer: "较富裕",event: "家庭经济较富裕" },
                { answer: "一般",event: "家庭经济一般" },
                { answer: "贫困",event: "家庭经济贫困" },
            ],
            left_times: 1,
            require: function(properties) { return 1; }
        }
    ];

    public static EVENTS = [ //选择背景状态
        { detail: ['好的教育背景意味着更好的敲门砖，在创业融资，招聘等方面都有优势，祝你好运'],name: '教育背景1',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 50,foud: 0,success: 0 } },
        { detail: ['好的教育背景意味着更好的敲门砖，在创业融资，招聘等方面都有优势，祝你好运'],name: '教育背景2',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 45 } },
        { detail: ['好的教育背景意味着更好的敲门砖，在创业融资，招聘等方面都有优势，祝你好运'],name: '教育背景3',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 40 } },
        { detail: ['好的教育背景意味着更好的敲门砖，在创业融资，招聘等方面都有优势，祝你好运'],name: '教育背景4',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 35 } },
        { detail: ['丰富的工作背景让你'],name: '工作经验1',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 50 } },
        { detail: [],name: '工作经验2',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 45 } },
        { detail: [],name: '工作经验3',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 40 } },
        { detail: [],name: '工作经验4',from: '填写背景状态',to: '填写背景状态',properties: { health: 0,wealth: 0,ability: 35 } },
        { detail: ['良好的家庭经济情况让你在创业路上能够承受更大的风险和失败，祝你好运'],name: '家庭经济富裕',from: '填写背景状态',to: '互联网行业初期状态',properties: { health: 100,wealth: 200000,ability: 0,fuyu: 1 } },
        { detail: ['良好的家庭经济情况让你在创业路上能够承受更大的风险和失败，祝你好运'],name: '家庭经济较富裕',from: '填写背景状态',to: '互联网行业初期状态',properties: { health: 100,wealth: 150000,ability: 0 } },
        { detail: ['良好的家庭经济情况让你在创业路上能够承受更大的风险和失败，祝你好运'],name: '家庭经济一般',from: '填写背景状态',to: '互联网行业初期状态',properties: { health: 100,wealth: 100000,ability: 0 } },
        { detail: ['良好的家庭经济情况让你在创业路上能够承受更大的风险和失败，祝你好运'],name: '家庭经济贫困',from: '填写背景状态',to: '互联网行业初期状态',properties: { health: 100,wealth: 50000,ability: 0 } },
    ];

    public static STATES = {
        name: "填写背景状态",
        properties: { fund: function(properties) { return 0 },health: function(properties) { return 0 },success: function(properties) { return 0 },wealth: function(properties) { return 0 },ability: function(properties) { return 0 } },
        questions: Choices.QUESTIONS
    }


}
