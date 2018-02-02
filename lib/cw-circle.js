'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DrawCircle = function () {
  function DrawCircle(id, data) {
    _classCallCheck(this, DrawCircle);

    this.canvas = document.querySelector(id);
    this.data = data;

    this.init();
  }

  _createClass(DrawCircle, [{
    key: 'init',
    value: function init() {
      this.ctx = this.canvas.getContext('2d');
      this.outer_colors = ['#52cc8f', '#5499cc', '#ff6969', '#ffc869'];
      this.inner_colors = ['#219c4b', '#22559c', '#ff2e2e', '#ff952e'];
      this.start = 0;
      this.arrText = ['正   确', '半   对', '错   误', '待批改'];

      this.dataCount();
      this.formatParams(outer_colors, this.canvas.width / 2 - 260);
      this.formatParams(inner_colors, this.canvas.width / 2 - 320);
      this.drawCircle('#2c333d', 0, 1, this.canvas.width / 2 - 360);
      this.drawText(outer_colors);
    }
  }, {
    key: 'drawText',
    value: function drawText(colors) {
      var _this = this;

      this.data.map(function (item, k) {
        var color = colors[k];
        var text = _this.arrText[k];
        var text_x = _this.x + 40;
        var text_y = _this.y + i * 100 + 12;
        _this.drawCircle(color, 0, 1, 16, _this.x + 300, _this.y - 160);

        _this.ctx.font = '36px Arial';
        _this.ctx.fillStyle = '#fff';
        _this.fillText(text + ' ' + item + '人', text_x, text_y);
      });
    }
  }, {
    key: 'formatParams',
    value: function formatParams(colors, r) {
      var _this2 = this;

      this.data.map(function (item, i) {
        var color = colors[i];
        _this2.drawCircle(color, _this2.start, _this2.start + item / _this2.count, r, _this2.x, _this2.y);
        _this2.start += item / _this2.count;
      });
    }
  }, {
    key: 'drawCircle',
    value: function drawCircle(color, start, end, r, x, y) {
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