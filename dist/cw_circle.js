(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.DrawCircle = mod.exports;
  }
})(this, function (exports) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports);
      global.DrawCircle = mod.exports;
    }
  })(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    var DrawCircle = function () {
      function DrawCircle(id, data, accuracy, options) {
        var _default_options;

        _classCallCheck(this, DrawCircle);

        if (!id || !data || !accuracy) {
          alert('id, data, accuracy 为必填参数');
          return;
        }
        this.canvas = document.querySelector(id);
        this.ctx = this.canvas.getContext('2d');
        this.data = data || [];
        this.accuracy = accuracy || 0;

        var default_options = (_default_options = {
          start: 0,
          sum: 0,
          count: 0,
          space: 0,
          top: 0,
          w: window.innerWidth > 400 ? 400 : window.innerWidth,
          x: 0,
          y: 0
        }, _defineProperty(_default_options, 'space', 30), _defineProperty(_default_options, 'outer_colors', ['#FFC869', '#5499CC', '#FF6969', '#52CC8F', '#b66eff', '#c50e18']), _defineProperty(_default_options, 'center_title', '正确率'), _defineProperty(_default_options, 'def_color', '#333'), _defineProperty(_default_options, 'text_color', '#333'), _defineProperty(_default_options, 'list', ['正   确', '半   对', '错   误', '待批改', '其它']), _default_options);
        Object.assign(this, default_options, options);
        console.log(this);
        this.init();
      }

      _createClass(DrawCircle, [{
        key: 'getRatio',
        value: function getRatio() {
          var ctx = this.ctx;
          var devicePixelRatio = window.devicePixelRatio || 1;
          var backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
          this.ratio = devicePixelRatio / backingStoreRatio;
        }
      }, {
        key: 'init',
        value: function init() {
          this.dataCount();
          this.getRatio();
          var width = this.w * this.ratio;
          this.canvas.width = width;
          this.canvas.height = width - 130 * this.ratio;
          this.x = width / 3 - 10 * this.ratio;
          this.y = width / 3;

          this.outCircle(this.outer_colors, this.canvas.width / 4);
          this.drawCircle('rgba(0,0,0,.1)', 0, 1, this.canvas.width / 6, this.x, this.y);
          this.drawCenter();
          this.drawText(this.outer_colors);
        }
      }, {
        key: 'drawCenter',
        value: function drawCenter() {
          var x = this.x;
          var y = this.y;
          var ctx = this.ctx;
          var r = this.canvas.width / 7;
          ctx.globalCompositeOperation = "xor";
          this.drawCircle('#fff', 0, 1, r, x, y);
          ctx.font = "" + 24 * this.ratio + "px Arial";
          ctx.fillStyle = this.def_color;
          ctx.textAlign = "center";
          ctx.fillText(this.accuracy, x, y - 0 * this.ratio);

          ctx.font = "" + 16 * this.ratio + "px Arial";
          ctx.fillText(this.center_title, x, y + 20 * this.ratio);
        }
      }, {
        key: 'drawText',
        value: function drawText(colors) {
          var _this = this;

          var ctx = this.ctx;
          ctx.textAlign = "left";
          var index = 0;
          this.data.map(function (item, k) {
            if (item && item > 0) {
              var color = colors[k] || colors[1];
              var text = _this.list[k] || '其它';
              var text_x = _this.x * 2;
              var text_y = _this.y - _this.canvas.width / 6 + _this.space * _this.ratio * index++ - 2 * _this.ratio;
              _this.drawCircle(color, 0, 1, 8 * _this.ratio, text_x, text_y);
              ctx.fillStyle = _this.text_color;
              ctx.font = "" + 14 * _this.ratio + "px Arial";
              ctx.fillText(text + '： ' + item + '人', text_x + 20 * _this.ratio, text_y + 4 * _this.ratio, 100 * _this.ratio);
            }
          });
        }
      }, {
        key: 'outCircle',
        value: function outCircle(colors, r) {
          var _this2 = this;

          this.data.map(function (item, k) {
            var color = colors[k] || colors[1];
            var end = item / _this2.sum;

            _this2.drawCircle(color, _this2.start, _this2.start + end, r, _this2.x, _this2.y);
            _this2.start += item / _this2.sum;
          });
        }
      }, {
        key: 'drawCircle',
        value: function drawCircle(color, start, end, r, x, y) {
          var ctx = this.ctx;
          ctx.beginPath();
          ctx.lineWidth = 0;
          ctx.moveTo(x, y);
          ctx.arc(x, y, r, Math.PI * 2 * start, Math.PI * 2 * end);
          ctx.fillStyle = color;
          ctx.lineTo(x, y);
          ctx.fill();
          ctx.save();
        }
      }, {
        key: 'dataCount',
        value: function dataCount() {
          var _this3 = this;

          var newArr = [];
          this.data = this.data.slice(0, this.list.length);
          this.data.map(function (item) {
            _this3.sum += item;
            if (item && item > 0) {
              _this3.count++;
            }
          });
        }
      }]);

      return DrawCircle;
    }();

    exports.default = DrawCircle;
  });
});