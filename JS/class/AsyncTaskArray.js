import { isFunction, isNullOrUndefined } from "./node_modules/common/js/utils";

/* 
    解决多个异步问题,  在imgUpload有调用
    let tasks = new AsyncTaskArray()
    异步调用时，有几个异步调用几个
    tasks.add()
    异步结束后执行  
    tasks.end()
    一个异步结束。任务数量减掉1
    tasks.check()
*/
export default class AsyncTaskArray {
  _tasksNum;
  _err = { name: "taskList运行错误", message: undefined };

  _callbackFunc = null;

  _callbackParams;

  constructor() {
    this._tasksNum = 0;
    return this;
  }

  set(params) {
    this._callbackParams = params;
    return this;
  }

  end(callback) {
    this._callbackFunc = callback;
    return this;
  }

  check(error) {
    this._tasksNum--;
    this._setErrorMessage(error);
    
    if (this._tasksNum === 0) {
      this._callback();
    }
  }

  add(func) {
    if (func) {
      setTimeout(() => {
        if (isFunction(func)) {
          func();
        }
      }, 10);
    }
    this._tasksNum++;
    return this;
  }

  _setErrorMessage(error) {
    if (isNullOrUndefined(error) === false) {
      if (this._err.message !== null) {
        if (error) {
          this._err.message += "," + error.message;
        }
      } else {
        if (error) {
          this._err.message = error.message;
        }
      }
    }
  }

  _callback() {
    if (!isNullOrUndefined(this._err.message)) {
      if (this._callbackFunc) {
        this._callbackFunc(this._err, this._callbackParams);
      }
    } else {
       
      if (this._callbackFunc) {
        this._callbackFunc(null, this._callbackParams);
      }
    }
  }
}
