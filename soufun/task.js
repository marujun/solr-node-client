exports.startTasks = function(paramsArray, otherData, taskFunction, current, count, tasksCallback) {
    console.log("function startTasks: ", current, count);
    if (current >= count) {
        console.log("结束 tasks");
        tasksCallback();
        return;
    } else {
        console.log("开始执行 task: ", current);
        runTask(paramsArray, otherData, taskFunction, current, function(next) {
            exports.startTasks(paramsArray, otherData, taskFunction, next, count, tasksCallback);
        });
    }
};

function runTask(paramsArray, otherData, taskFunction, current, taskCallback) {
    taskFunction(paramsArray[current], otherData, current, function() {
        taskCallback(current + 1);
    });
}

//function task(param, otherData, current, callback) {
//    console.log("function task param: ", param);
//    console.log("function task otherData: ", otherData);
//    console.log("function task current: ", current);
//    callback();
//}
//
//exports.startTasks([1,2,3,4,5,6], "this is the otherData", task, 0, 6, tasksCallback);
//
//function tasksCallback() {
//    console.log("startTasks is ended");
//}