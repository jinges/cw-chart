'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DrawCircle = function () {
  function DrawCircle(obj) {
    _classCallCheck(this, DrawCircle);

    if (!obj.id || !obj.data || !obj.accuracy) {
      alert('传入参数有误');
      return;
    }
    this.canvas = document.querySelector(obj.id);
    this.ctx = this.canvas.getContext('2d');
    this.data = obj.data || [];
    this.accuracy = obj.accuracy || 0;
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
      this.outer_colors = ['#52cc8f', '#5499cc', '#ff6969', '#ffc869'];
      this.inner_colors = ['#219c4b', '#22559c', '#ff2e2e', '#ff952e'];
      this.start = 0;
      this.count = 0;
      this.x = 0;
      this.y = 0;
      this.arrText = ['正   确', '半   对', '错   误', '待批改'];

      this.getRatio();
      this.dataCount();
      var width = window.innerWidth;
      this.canvas.width = width;
      this.canvas.height = width - 120;
      this.x = width / 3;
      this.y = width / 3;

      this.formatParams(this.outer_colors, this.canvas.width / 4);
      this.formatParams(this.inner_colors, this.canvas.width / 6);
      this.drawCircle('#2c333d', 0, 1, this.canvas.width / 4);
      this.drawCenter();
      this.drawText(this.outer_colors);
    }
  }, {
    key: 'drawCenter',
    value: function drawCenter() {
      var x = this.x;
      var y = this.y;
      var ctx = this.ctx;
      var r = this.canvas.width / 8;
      this.drawCircle('#2c333d', 0, 1, r, x, y);

      ctx.font = "" + 28 * this.ratio + "px Arial";
      ctx.fillStyle = '#fff';
      ctx.textAlign = "center";
      ctx.fillText(this.accuracy, x, y - 10 * this.ratio);

      ctx.font = "" + 22 * this.ratio + "px Arial";
      ctx.fillText('正确率', x, y + 20 * this.ratio);
    }
  }, {
    key: 'drawText',
    value: function drawText(colors) {
      var _this = this;

      var ctx = this.ctx;
      this.data.map(function (item, k) {
        var color = colors[k];
        var text = _this.arrText[k];
        var text_x = _this.x * 2;
        var text_y = _this.y - _this.canvas.width / 7 + k * 40 * _this.ratio;
        _this.drawCircle(color, 0, 1, 10 * _this.ratio, text_x, text_y);

        ctx.fillStyle = '#fff';
        ctx.font = "" + 18 * _this.ratio + "px Arial";
        ctx.fillText(text + ' ' + item + '人', text_x + 60 * _this.ratio, text_y + 6 * _this.ratio);
      });
    }
  }, {
    key: 'formatParams',
    value: function formatParams(colors, r) {
      var _this2 = this;

      this.data.map(function (item, i) {
        var color = colors[i];
        var end = item / _this2.count;
        _this2.drawCircle(color, _this2.start, _this2.start + end, r, _this2.x, _this2.y);
        _this2.start += item / _this2.count;
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

      this.data.map(function (item) {
        _this3.count += item;
      });
    }
  }]);

  return DrawCircle;
}();

exports.default = DrawCircle;