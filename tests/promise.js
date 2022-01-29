export default class Promise {
    successFunc = [];
    promises = [];
    done = false;
    error = null;
    resolved = false;
    resolvedData = null;
    rejected = false;
    rejectedData = null;

    then = (fn) => {
        if (this.resolved) {
            fn(this.resolvedData);
        } else {
            this.successFunc.push(fn);
        }
        return this;
    }


    catch = (fn) => {
        return this;
    }

    finally = (fn) => {
        if (this.rejected || this.resolved) {
            fn();
        } else {
            this.finallyFunc = fn;
        }
        return this;
    }

    resolve = (data) => {
        this.done = true;
        this.resolved = true;
        this.resolvedData = data;
        var input = data;
        while (this.successFunc.length) {
            var fn = this.successFunc.pop();
            input = fn(input);
        }
        if (this.finallyFunc) this.finallyFunc();
    };

    reject = (data) => {
        this.done = true;
        this.rejected = true;
        this.rejectedData = data;
        if (this.failFunc) this.failFunc(data);
        this.error = data;
        if (this.finallyFunc) this.finallyFunc();

        return this;
    }

    parallel = (array) => {
        var _this = this;
        function allDone() {
            return _this.promises.every(function (item) {
                return item.task.done;
            })
        }

        function storeItemResult(item, result) {
            for (var r in _this.promises) {
                if (_this.promises[r].task == item) {
                    _this.promises[r].result = result;
                    break;
                }
            }
            if (allDone()) {
                var failed = _this.promises.filter(function (p) { return !!p.task.error });
                if (failed.length) {
                    _this.reject(failed[0].result); // returning only the first error is enough
                }
                else {
                    _this.resolve(_this.promises.map(function (res) { return res.result }));
                }
            }
        }

        setTimeout(function () {
            array.forEach(function (item, index) {
                _this.promises.push({ task: item, index: index });
            });

            array.forEach(function (item) {
                item.then(function (result) {
                    storeItemResult(item, result);
                })
                    .fail(function (error) {
                        storeItemResult(item, error);
                    })
            })
        }, 10);
        return this;
    }
}
