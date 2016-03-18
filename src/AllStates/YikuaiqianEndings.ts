/**
 *
 * 一块钱结局
 *
 */
class YikuaiqianEndings {
    public static ENDINGS = [


        { 
            condition: { ending: 110 },
            result: { 
                title: "机不逢时",
                desc: function(p) { 
                    var res = "        你从1元钱起家，用了" + p.time + "天，成功赚到了1千万。虽然你做手机失败而心灰意冷，但要知道，大部分人都不如你呢！不信就分享给他们试一下吧~";
                    return res;
                },
                weixintitle: function(p) {
                    var res = "从1元钱到1千万，我用了" + p.time + "天，你呢？";
                    return res;
                },
               
                imageBg: "yumishouji_png"
            } 
        },

        { 
            condition: { ending: 100 },
            result: { 
                title: "战争之王二世",
                desc: function(p) { 
                    var res = "        你从1元钱起家，用了" + p.time + "天，成功赚到了30亿！现在的你已经十分出色了！作为优秀的战争之王，怎能不高调一下呢？快去分享，跟朋友炫耀炫耀吧！";
                    return res;
                },
                weixintitle: function(p) {
                    var res = "从1元钱到5亿，成为战争之王，我用了" + p.time + "天，你呢？";
                    return res;
                },
               
                imageBg: "zhanzhengzhiwang_png"
            } 
        },

        { 
            condition: { ending: 90 },
            result: { 
                title: "跻身名流",
                desc: function(p) { 
                    var res = "        你从1元钱起家，用了" + p.time + "天，成功赚到了5亿！凭借自己的努力起家，最终跻身名流的你，是不是要邀请你的朋友一起加入你的游戏呢？";
                    return res;
                },
                weixintitle: function(p) {
                    var res = "从1元钱到5亿，跻身名流，我用了" + p.time + "天，你呢？";
                    return res;
                },
               
                imageBg: "haidishengyan_png"
            } 
        },

        { 
            condition: { ending: 80 },
            result: { 
                title: "赚钱机器",
                desc: function(p) { 
                    var res = "        你从1元钱起家，用了" + p.time + "天，成功赚到了1亿！你已经是个不折不扣的赚钱机器了，该让你的好友们一起围观你的成就了，快去分享吧！";
                    return res;
                },
                weixintitle: function(p) {
                    var res = "从1元钱到5亿，变身赚钱机器，我用了" + p.time + "天，你呢？";
                    return res;
                },
               
                imageBg: "fangdichan_png"
            } 
        },

        { 
            condition: { ending: 70 },
            result: { 
                title: "没有金刚钻别揽瓷器活",
                desc:  "        尽管进了监牢，你从1元钱走到今天的成绩依然不可磨灭！再尝试几次，你一定能够达成自己的梦想，并在好友面前炫耀！",
                weixintitle:"我从1元钱起家，离1亿只差一步了，你呢？",
               
                imageBg: "beizhua_png"
            } 
        },

        { 
            condition: { ending: 60 },
            result: { 
                title: "曾有过梦想",
                desc:  "        失败乃成功之母，Anyway，你从1元钱做到今天的成绩依然让你感到瞩目。万民创业的日子不是那么好混的！换条路多尝试几次，你离1个亿不远了！",
                weixintitle:"我从1元钱起家，离1亿只差一步了，你呢？",
               
                imageBg: "hulianwang_png"
            } 
        },

        { 
            condition: { ending: 50 },
            result: { 
                title: "下得一手好棋",
                desc: function(p) { 
                    var res = "        你从1元钱起家，用了" + p.time + "天，成功赚到1千万。跑路后的你依然过着潇洒的生活，想知道你的朋友是否还不如你？分享给他们试一试吧！";
                    return res;
                },
                weixintitle: function(p) {
                    var res = "从1元钱到1千万，我用了" + p.time + "天，你呢？";
                    return res;
                },
               
                imageBg: "P2Ppaolu_png"
            } 
        },

        { 
            condition: { ending: 40},
            result: { 
                title: "接盘侠",
                desc: "        你投身股票市场，赔掉了大半的财富。或许，你当初应该选别的路？试着再来一次吧！",
                weixintitle:"我从1元钱起家，离1亿只差一步了，你呢？",
               
                imageBg: "chaogu_png"
            } 
        },

        {
            condition: { ending: 30 },
            result: {
                title: "河边湿了鞋",
                desc: "        常在河边走，哪有不湿鞋。建议你换条出路再来一次，1元钱到1个亿其实并不远！",
                weixintitle:"我从1元钱起家，差点就挣到了1个亿，你呢？",
               
                imageBg: "beizhua_png"
            }
        },

        {
            condition: { ending: 20 },
            result: {
                title: "装X不成进监狱",
                desc: "        电影里都是骗人的，你在监狱里遗憾的思考，如果能再来一次选择的机会，该有多好！多试几次游戏，1元钱到1个亿没那么难！ ",
                weixintitle:"我从1元钱起家，差点就挣到了1个亿，你呢？",
              
                imageBg: "beizhua_png"
            }
        },

        {
            condition: { ending: 10 },
            result: {
                title: "天命难违",
                desc: "        彩票没中，说明你脸太黑了！当然，如果不想勤劳致富，就多试几次，万一中了呢？",
                weixintitle:"我从1元钱起家，差点就挣到了1个亿，你呢？",
              
                imageBg: "caipiao_png"
            }
        },

    ];  
}
