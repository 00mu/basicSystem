class HD {
  static PENDING = "pending";
  static RESOLVED = "resolved";
  static REJECTED = "rejected";
  constructor(executor) {
    this.status = HD.PENDING;
    this.value = null;
    this.callbacks = [];
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(value) {
    if (this.status == HD.PENDING) {
      this.status = HD.RESOLVED;
      this.value = value;
      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onFuifilled(value);
        });
      });
    }
  }
  reject(reason) {
    if (this.status === HD.PENDING) {
      this.status = HD.REJECTED;
      this.value = reason;
      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onRejected(reason);
        });
      });
    }
  }
  then(onFuifilled, onRejected) {
    if (typeof onFuifilled !== "function") {
      // then 穿透 new Promise().then().then(resolve, reject)
      onFuifilled = (value) => value;
    }
    if (typeof onRejected !== "function") {
      onRejected = (value) => value;
    }

    // then 的链式调用
    console.log(this.status);
    return new HD((resolve, reject) => {
      // 异步
      if (this.status === HD.PENDING) {
        //  压入数组
        this.callbacks.push({
          onFuifilled: (value) => {
            try {
              let result = onFuifilled(value);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          },
          onRejected: (value) => {
            try {
              let result = onRejected(value);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          },
        });
      }

      if (this.status === HD.RESOLVED) {
        setTimeout(() => {
          try {
            let result = onFuifilled(value);
            // 处理then返回 promise
            if (result instanceof HD) {
              resolve(value);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === HD.REJECTED) {
        setTimeout(() => {
          try {
            let result = onRejected(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }
}
