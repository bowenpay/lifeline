/**
 *
 * 创业状态
 *
 */
class StartUpFail {
    public static QUESTIONS = [];
    public static EVENTS = [];

    public static STATES = {
        name: "互联网行业创业失败",
        displayName: "创业结束",
        properties: { },
        questions: StartUp.QUESTIONS,
        initialState: {
            state_time: function(properties) { return -properties.state_time; }
        }
    }


}
