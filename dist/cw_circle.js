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
        _classCallCheck(this, DrawCircle);

        if (!id || !data || !accuracy) {
          alert('id, data, accuracy 为必填参数');
          return;
        }
        this.canvas = document.querySelector(id);
        this.ctx = this.canvas.getContext('2d');
        this.data = data || [];
        this.accuracy = accuracy || 0;

        this.dataObj = options || {
          outer_colors: null,
          inner_colors: null,
          center_text: null,
          def_Color: null,
          list: null
        };
        this.init();
      }

      _createClass(DrawCircle, [{
        key: 'getRatio',
        value: function getRatio() {
          var devicePixelRatio = window.devicePixelRatio || 1;
          this.ratio = window.innerWidth > 700 ? devicePixelRatio : 1;
        }
      }, {
        key: 'init',
        value: function init() {
          this.outer_colors = this.dataObj.outer_colors || ['#52cc8f', '#5499cc', '#ff6969', '#ffc869', '#b66eff', '#66cb8e', '#c50e18'];
          this.inner_colors = this.dataObj.inner_colors || ['#219c4b', '#22559c', '#ff2e2e', '#ff952e', '#7e34fe', '#3b9b4a', '#99080f'];
          this.center_text = this.dataObj.center_text || '正确率';
          this.start = 0;
          this.sum = 0;
          this.count = 0;
          this.space = 0;
          this.top = 0;
          this.x = 0;
          this.y = 0;
          this.list = this.dataObj.list || ['正   确', '半   对', '错   误', '待批改', '其它'];
          this.def_Color = this.dataObj.def_Color || '#2c333d';

          this.getRatio();
          this.dataCount();
          var width = window.innerWidth;
          this.canvas.width = width;
          this.canvas.height = width - 130 * this.ratio;
          this.x = width / 3;
          this.y = width / 3;

          this.formatParams(this.outer_colors, this.canvas.width / 4);
          this.formatParams(this.inner_colors, this.canvas.width / 6);
          this.drawCenter();
          this.computeSpace();
          this.drawText(this.outer_colors);
        }
      }, {
        key: 'drawCenter',
        value: function drawCenter() {
          var x = this.x;
          var y = this.y;
          var ctx = this.ctx;
          var r = this.canvas.width / 8;
          this.drawCircle(this.def_Color, 0, 1, r, x, y);

          ctx.font = "" + 28 * this.ratio + "px Arial";
          ctx.fillStyle = '#fff';
          ctx.textAlign = "center";
          ctx.fillText(this.accuracy, x, y - 10 * this.ratio);

          ctx.font = "" + 22 * this.ratio + "px Arial";
          ctx.fillText(this.center_text, x, y + 20 * this.ratio);
        }
      }, {
        key: 'drawText',
        value: function drawText(colors) {
          var _this = this;

          var ctx = this.ctx;
          var hasZero = false;
          this.data.map(function (item, k) {
            var i = hasZero ? k - 1 : k;
            if (item && item > 0) {
              var color = colors[k] || colors[1];
              var text = _this.list[k] || '其它';
              var text_x = _this.x * 2;
              var text_y = _this.y - _this.canvas.width / 4 + _this.space + i * _this.space * 2 + _this.top;
              console.log(text_y);
              _this.drawCircle(color, 0, 1, 8 * _this.ratio, text_x, text_y);
              ctx.fillStyle = '#fff';
              ctx.font = "" + 17 * _this.ratio + "px Arial";
              ctx.fillText(text + ' ' + item + '人', text_x + 60 * _this.ratio, text_y + 6 * _this.ratio);
            } else {
              hasZero = true;
            }
          });
        }
      }, {
        key: 'computeSpace',
        value: function computeSpace() {
          var h = this.canvas.width / 4 * 2;
          this.space = h / (this.count * 2);
          console.log(this.space);
          if (this.space > 40) {
            this.space = 25;
            this.top = 40;
          }
        }
      }, {
        key: 'formatParams',
        value: function formatParams(colors, r) {
          var _this2 = this;

          var hasZero = false;

          this.data.map(function (item, k) {
            var color = colors[k] || colors[1];
            var end = item / _this2.sum;
            if (item && item > 0) {
              _this2.drawCircle(color, _this2.start, _this2.start + end, r, _this2.x, _this2.y);
              _this2.start += item / _this2.sum;
            } else {
              hasZero = true;
            }
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