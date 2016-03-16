/**
 *
 * 一块钱结局
 *
 */
class YikuaiqianEndings {
    public static ENDINGS = [
        { 
            condition: { ending: 100 },
            result: { 
                title: "迈出第一步也算是一种成功",
                desc: "        显然你的这次尝试是非常失败的，你的创业还没有真正开始就已经结束了。全民创业，万众创新的口号不知道忽悠了多少人走上创业的路，但是创业其实是一件很难的事情，它需要资源，时机，运气和能力都具备才能成功。多提升自我，累计资源，攒好人品，重新来过吧。如果觉得太难了，关注公众号输入【提示】，可以获得一些提示。",           
                weixintitle:"创业那些年，迈出了第一步",
                imageBg: "fail_bg_png"
            } 
        },
        {
            condition: { ending: 99 },
            result: {
                title: "家庭还是创业？这是一个选择",
                desc: "        你在创业和家庭的矛盾中选择了家庭，不能说你的选择对还是错，每个人都有自己的选择。但是，很多成功的创业者其实放弃了很多家庭中的幸福，才得到了自己事业上的成功",
                weixintitle: "创业那些年，迈出了第一步",
                imageBg: "fail_bg_png"
            }
        },
        {
            condition: { ending: 95 },
            result: {
                title: "创业失败，但也有收获",
                desc: "        你已经很努力的将创业持续了两年多，虽然投资人的撤资让你没有能将创业继续下去，可能是因为你的一些选择不是对公司发展最有利的。anyway，你在公司清算中也得到了一定的回报。提高自己，尽量让下一次创业尝试走的更远吧。如果觉得太难了，关注公众号输入【提示】，可以获得一些提示。",
                weixintitle:"创业那些年，赚到第一桶金",
                
                imageBg: "fail_bg_png"
            }
        },
        { 
            condition: { ending: 90 },
            result: { 
                title: "身体才是革命的本钱",
                desc: "        创业需要有强健的体魄，在创业的过程中也需要注意保重身体。如果觉得太难了，关注公众号输入【提示】，可以获得一些提示。",
                weixintitle:"创业那些年，累死累活拼搏",
                
                imageBg: "fangqi_bg_png"
            } 
        },
        { 
            condition: { ending: 80 },
            result: { 
                title: "中途退出，收获颇丰",
                desc: "        你在创业初期选择了退出创业，并得到了一笔不菲的回报————上班族攒十年也攒不到这么多钱。坚持是创业的必备品质，你可能有些缺乏。如果觉得太难了，关注公众号输入【提示】，可以获得一些提示。",
                weixintitle:"创业那些年，走向发家致富",
               
                imageBg: "quit_bg_png"
            } 
        },
        { 
            condition: { ending: 70 },
            result: { 
                title: "公司被收购，实现财富自由",
                desc: "        能被收购其实也算是一种成功啦，在游戏设计中，只有4%的玩家能获得这个结局。你将创业进行到了后期，这本身已经是难得的成就。但是如果你某些问题上作出更棒的选择，说不定会有更好的结果...不论如何，还是祝贺你！关注公众号输入【提示】，可以获得一些提示和解析信息。",
                weixintitle:"创业那些年，身家过亿",
                
                imageBg: "quit_bg_png"
            } 
        },
        { 
            condition: { ending: 60 },
            result: { 
                title: "公司被巨头收购，实现财富自由",
                desc: "        能被巨头收购也算是一种成功啦，在游戏设计中，只有3%的玩家能获得这个结局。你将创业进行到了后期，这本身已经是难得的成就。但是如果你再坚持一下，说不定会有更好的结果...不论如何，还是祝贺你！关注公众号输入【提示】，可以获得一些提示和解析。",
                weixintitle:"创业那些年，身家过亿",
               
                imageBg: "quit_bg_png"
            } 
        },
        { 
            condition: { ending: 50 },
            result: { 
                title: "财富自由的创业者",
                desc: "        根据游戏设计，只有3%的玩家能获得这个结局，你的公司做的很成功，虽然没有上市，但是无论在个人能力，个人财富，公司价值和成功度上，你已经超越了绝大多数人。创业是对综合实力的考验，也许你只是对一两个问题的选择欠妥，但他们影响了你最终的成绩。关注公众号输入【提示】，可以获得一些提示和解析。",
                weixintitle:"创业那些年，走向人生巅峰",
               
                imageBg: "quit_bg_png"
            } 
        },
        { 
            condition: { ending: 40},
            result: { 
                title: "被扒光的股民",
                desc: "        我的钱都被股市里的人骗走了，再见，我再也不会来了",
                weixintitle:"我的钱都被股市里的人骗走了，再见，我再也不会来了",
               
                imageBg: "success_bg_png"
            } 
        },
        {
            condition: { ending: 30 },
            result: {
                title: "爱冒险的人",
                desc: "        常在河边走，哪有不湿鞋。比起卖毒品，还是卖白菜比较踏实",
                weixintitle:"常在河边走，哪有不湿鞋。比起卖毒品，还是卖白菜比较踏实",
               
                imageBg: "quit_bg_png"
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
