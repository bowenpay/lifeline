/**
 *
 * 一块钱结局
 *
 */
class YikuaiqianEndings {
    public static ENDINGS = [
        { 
            condition: { ending: 50 },
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
               
                imageBg: "chenggong_png"
            } 
        },
        { 
            condition: { ending: 40},
            result: { 
                title: "被扒光的股民",
                desc: "        我的钱都被股市里的人骗走了，再见，我再也不会来了",
                weixintitle:"我的钱都被股市里的人骗走了，再见，我再也不会来了",
               
                imageBg: "chaogu_png"
            } 
        },
        {
            condition: { ending: 30 },
            result: {
                title: "爱冒险的人",
                desc: "        常在河边走，哪有不湿鞋。比起卖毒品，还是卖白菜比较踏实",
                weixintitle:"常在河边走，哪有不湿鞋。比起卖毒品，还是卖白菜比较踏实",
               
                imageBg: "dupin_png"
            }
        },
        {
            condition: { ending: 20 },
            result: {
                title: "电影里都是骗人的",
                desc: "        电影里都是骗人的，你不可能，是我的王子.... ",
                weixintitle:"电影里都是骗人的，你不可能，是我的王子.... ",
              
                imageBg: "qiangjie_png"
            }
        },
        {
            condition: { ending: 10 },
            result: {
                title: "败家子",
                desc: "        勤劳才能致富，不要把希望寄托在虚无缥缈的彩票上",
                weixintitle:"勤劳才能致富，不要把希望寄托在虚无缥缈的彩票上",
              
                imageBg: "caipiao_png"
            }
        },
    ];  
}
