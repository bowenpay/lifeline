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
                title: "成功的商人",
                desc: function(p) { 
                    var res = "        你用了" + p.time + "天，成功赚到 " + p.money + "元";
                    return res;
                },
                weixintitle: function(p) {
                    var res = "我用了" + p.time + "天，成功赚到 " + p.money + "元";
                    return res;
                },
               
                imageBg: "yumishouji_png"
            } 
        },

        { 
            condition: { ending: 100 },
            result: { 
                title: "成功的商人",
                desc: function(p) { 
                    var res = "        你用了" + p.time + "天，成功赚到 " + p.money + "元";
                    return res;
                },
                weixintitle: function(p) {
                    var res = "我用了" + p.time + "天，成功赚到 " + p.money + "元";
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
                    var res = "        你用了" + p.time + "天，成功赚到 " + p.money + "元";
                    return res;
                },
                weixintitle: function(p) {
                    var res = "我用了" + p.time + "天，成功赚到 " + p.money + "元";
                    return res;
                },
               
                imageBg: "haidishengyan_png"
            } 
        },

        { 
            condition: { ending: 80 },
            result: { 
                title: "成功的商人",
                desc: function(p) { 
                    var res = "        你用了" + p.time + "天，成功赚到 " + p.money + "元";
                    return res;
                },
                weixintitle: function(p) {
                    var res = "我用了" + p.time + "天，成功赚到 " + p.money + "元";
                    return res;
                },
               
                imageBg: "fangdichan_png"
            } 
        },

        { 
            condition: { ending: 70 },
            result: { 
                title: "成功的商人",
                desc: function(p) { 
                    var res = "        你用了" + p.time + "天，成功赚到 " + p.money + "元";
                    return res;
                },
                weixintitle: function(p) {
                    var res = "我用了" + p.time + "天，成功赚到 " + p.money + "元";
                    return res;
                },
               
                imageBg: "beizhua_png"
            } 
        },

        { 
            condition: { ending: 60 },
            result: { 
                title: "成功的商人",
                desc: function(p) { 
                    var res = "        你用了" + p.time + "天，成功赚到 " + p.money + "元";
                    return res;
                },
                weixintitle: function(p) {
                    var res = "我用了" + p.time + "天，成功赚到 " + p.money + "元";
                    return res;
                },
               
                imageBg: "hulianwang_png"
            } 
        },

        { 
            condition: { ending: 50 },
            result: { 
                title: "下得一手好棋",
                desc: function(p) { 
                    var res = "        你用了" + p.time + "天，成功赚到 " + p.money + "元";
                    return res;
                },
                weixintitle: function(p) {
                    var res = "我用了" + p.time + "天，成功赚到一千万，你呢？";
                    return res;
                },
               
                imageBg: "P2Ppaolu_png"
            } 
        },

        { 
            condition: { ending: 40},
            result: { 
                title: "接盘侠",
                desc: "        我的钱都被股市里的人骗走了，再见，我再也不会来了",
                weixintitle:"我的钱都被股市里的人骗走了，再见，我再也不会来了",
               
                imageBg: "chaogu_png"
            } 
        },

        {
            condition: { ending: 30 },
            result: {
                title: "河边湿了鞋",
                desc: "        常在河边走，哪有不湿鞋。比起卖毒品，还是卖白菜比较踏实",
                weixintitle:"常在河边走，哪有不湿鞋。比起卖毒品，还是卖白菜比较踏实",
               
                imageBg: "beizhua_png"
            }
        },

        {
            condition: { ending: 20 },
            result: {
                title: "装X不成进监狱",
                desc: "        电影里都是骗人的，你不可能，是我的王子.... ",
                weixintitle:"电影里都是骗人的，你不可能，是我的王子.... ",
              
                imageBg: "beizhua_png"
            }
        },

        {
            condition: { ending: 10 },
            result: {
                title: "天命难违",
                desc: "        勤劳才能致富，不要把希望寄托在虚无缥缈的彩票上",
                weixintitle:"离500万只差一步了，你呢？",
              
                imageBg: "caipiao_png"
            }
        },

    ];  
}
