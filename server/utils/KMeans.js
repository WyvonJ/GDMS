var exports, kMeans;

kMeans = (function() {
  function kMeans(options) {
    var _ref, _ref1, _ref2, _ref3, _ref4;
    if (options == null) {
      options = {};
    }
    this.K = (_ref = options.K) != null ? _ref : 5;//默认集群数为5
    this.maxIterations = (_ref1 = options.maxIterations) != null ? _ref1 : 100;//最多进行100次迭代
    this.enableConvergenceTest = (_ref2 = options.enableConvergenceTest) != null ? _ref2 : true;//是否打开收敛测试
    this.tolerance = (_ref3 = options.tolerance) != null ? _ref3 : 1e-9;
    this.initialize = (_ref4 = options.initialize) != null ? _ref4 : kMeans.initializeForgy;//是否有初始函数 设置为initializeForgy
  }

  kMeans.prototype.cluster = function(X) {
    var _ref;
    this.X = X;//数据集
    this.prevCentroids = [];//上一次的形心
    this.clusters = [];//集群
    this.currentIteration = 0;//现在的迭代次数
    _ref = [this.X.length, this.X[0].length], this.m = _ref[0], this.n = _ref[1];
    //m为传入数据集长度 n为第一行数据长度
    if ((this.m == null) || (this.n == null) || this.m < this.K || this.n < 1) {//数据集长度需大于K 数据集的第一个数据应大于一
      throw "You must pass more data";
    }
    return this.centroids = this.initialize(this.X, this.K, this.m, this.n);//计算形心点
  };
  kMeans.prototype.step = function() {
    return this.currentIteration++ < this.maxIterations;
  };

  kMeans.prototype.autoCluster = function(X) {
    //自动分组
    var _results;
    this.cluster(X);
    _results = [];
    while (this.step()) {
      this.findClosestCentroids();
      this.moveCentroids();
      if (this.hasConverged()) {
        break;
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  kMeans.initializeForgy = function(X, K, m, n) {
    var k, _i, _results;
    _results = [];
    for (k = _i = 0; 0 <= K ? _i < K : _i > K; k = 0 <= K ? ++_i : --_i) {
      _results.push(X[Math.floor(Math.random() * m)]);//设置初始随机点
      //长度小于一
    }
    return _results;
  };

  kMeans.initializeInRange = function(X, K, m, n) {
    var d, i, k, max, min, x, _i, _j, _k, _l, _len, _len1, _m, _results;
    for (i = _i = 0; 0 <= n ? _i < n : _i > n; i = 0 <= n ? ++_i : --_i) {
      min = Infinity;
    }
    for (i = _j = 0; 0 <= n ? _j < n : _j > n; i = 0 <= n ? ++_j : --_j) {
      max = -Infinity;
    }
    for (_k = 0, _len = X.length; _k < _len; _k++) {
      x = X[_k];
      for (i = _l = 0, _len1 = x.length; _l < _len1; i = ++_l) {
        d = x[i];
        min[i] = Math.min(min[i], d);
        max[i] = Math.max(max[i], d);
      }
    }
    _results = [];
    for (k = _m = 0; 0 <= K ? _m < K : _m > K; k = 0 <= K ? ++_m : --_m) {
      _results.push((function() {
        var _n, _results1;
        _results1 = [];
        for (d = _n = 0; 0 <= n ? _n < n : _n > n; d = 0 <= n ? ++_n : --_n) {
          _results1.push(Math.random() * (max[d] - min[d]) + min[d]);
        }
        return _results1;
      })());
    }
    return _results;
  };

  kMeans.prototype.findClosestCentroids = function() {
    //找到最近的形心点
    var c, cMin, i, j, k, min, r, x, xMin, _i, _j, _k, _len, _len1, _ref, _ref1, _ref2, _results;
    if (this.enableConvergenceTest) {
      this.prevCentroids = (function() {
        var _i, _len, _ref, _results;
        _ref = this.centroids;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          r = _ref[_i];
          _results.push(r.slice(0));//slice(0)返回该数组的一个副本
        }
        return _results;
      }).call(this);
    }
    this.clusters = (function() {
      var _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.K; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push([]);//初始化添加空数组
      }
      return _results;
    }).call(this);
    _ref = this.X;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      x = _ref[i];//_ref就是传入的数据集 i就是做一次遍历
      cMin = 0;
      xMin = Infinity;
      _ref1 = this.centroids;//计算出的形心

      for (j = _j = 0, _len1 = _ref1.length; _j < _len1; j = ++_j) {
        c = _ref1[j];
        min = 0;
        for (k = _k = 0, _ref2 = x.length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; k = 0 <= _ref2 ? ++_k : --_k) {
          //x为数据集第n行 c为形心的某一行
          min += (x[k] - c[k]) * (x[k] - c[k]);
        }
        if (min < xMin) {
          cMin = j;//如果是最近的
          xMin = min;
        }
      }
      _results.push(this.clusters[cMin].push(i));
    }
    return _results;
  };
//移动形心
  kMeans.prototype.moveCentroids = function() {

    var cl, d, i, j, sum, _i, _len, _ref, _results;
    _ref = this.clusters;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      cl = _ref[i];
      if (cl.length < 1) {
        continue;
      }
      _results.push((function() {
        var _j, _k, _len1, _ref1, _results1;
        _results1 = [];
        for (j = _j = 0, _ref1 = this.n; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          sum = 0;
          for (_k = 0, _len1 = cl.length; _k < _len1; _k++) {
            d = cl[_k];
            sum += this.X[d][j];
          }
          _results1.push(this.centroids[i][j] = sum / cl.length);
        }
        return _results1;
        console.log(_results1)
      }).call(this));
    }
    return _results;
  };

  kMeans.prototype.hasConverged = function() {
    //数据已集群完成
    var absDelta, i, j, _i, _j, _ref, _ref1;
    if (!this.enableConvergenceTest) {
      return false;
    }
    for (i = _i = 0, _ref = this.n; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      for (j = _j = 0, _ref1 = this.m; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
        absDelta = Math.abs(this.prevCentroids[i][j] - this.centroids[i][j]);//计算点距
        if (this.tolerance > absDelta) {
          //在允许的范围内则返回true 跳出循环
          return true;
        }
      }
    }
    return false;
  };

  return kMeans;

})();

if (((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) || (typeof exports !== "undefined" && exports !== null)) {
  module.exports = exports = kMeans;
} else {
  window.kMeans = kMeans;
}
