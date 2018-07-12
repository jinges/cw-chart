export default class DrawCircle {
  constructor(id, data, accuracy, options) {
    if (!id || !data || !accuracy) {
      alert('id, data, accuracy 为必填参数')
      return;
    }
    this.canvas = document.querySelector(id)
    this.ctx = this.canvas.getContext('2d')
    this.data = data || [];
    this.accuracy = accuracy || 0;

    const default_options = {
      start : 0,
      sum : 0,
      count : 0,
      space : 0,
      top : 0,
      w : window.innerWidth > 400 ? 400 : window.innerWidth,
      x : 0,
      y : 0,
      space : 30,
      outer_colors: ['#FFC869', '#5499CC', '#FF6969', '#52CC8F', '#b66eff', '#c50e18'],
      center_title: '正确率',
      def_color: '#333',
      text_color: '#333',
      list: ['正   确', '半   对', '错   误', '待批改', '其它']
    };
    Object.assign(this, default_options, options)
    console.log(this)
    this.init();
  }

  getRatio() {
    const ctx = this.ctx;
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio || 1;
    this.ratio = devicePixelRatio / backingStoreRatio;
  }

  init() {
    this.dataCount();
    this.getRatio();
    const width = this.w * this.ratio;
    this.canvas.width = width;
    this.canvas.height = width - 130 * this.ratio ;
    this.x = width / 3 - 10 * this.ratio;
    this.y = width / 3;

    this.outCircle(this.outer_colors, this.canvas.width / 4);
    this.drawCircle('rgba(0,0,0,.1)', 0, 1, this.canvas.width / 6, this.x, this.y);
    this.drawCenter()
    this.drawText(this.outer_colors)
  }

  drawCenter() {
    const x = this.x;
    const y = this.y
    const ctx = this.ctx;
    const r = this.canvas.width / 7;
    ctx.globalCompositeOperation = "xor";
    this.drawCircle('#fff', 0, 1, r, x, y)
    ctx.font = "" + (24 * this.ratio) + "px Arial";
    ctx.fillStyle = this.def_color;
    ctx.textAlign = "center";
    ctx.fillText(this.accuracy, x, y - 0 * this.ratio);

    ctx.font = "" + (16 * this.ratio) + "px Arial";
    ctx.fillText(this.center_title, x, y + 20 * this.ratio);
  }

  drawText(colors) {
    const ctx = this.ctx;
    ctx.textAlign = "left";
    let index = 0;
    this.data.map((item, k) => {
      if (item && item > 0) {
        const color = colors[k] || colors[1]
        const text = this.list[k] || '其它'
        const text_x = this.x * 2;
        const text_y = this.y - this.canvas.width / 6 + this.space * this.ratio * index++ - 2 * this.ratio;
        this.drawCircle(color, 0, 1, 8 * this.ratio, text_x, text_y)
        ctx.fillStyle = this.text_color;
        ctx.font = "" + (14 * this.ratio) + "px Arial";
        ctx.fillText(text + '： ' + item + '人', text_x + 20 * this.ratio, text_y + 4 * this.ratio, 100 * this.ratio)
      }
    })
  }

  outCircle(colors, r) {
    this.data.map((item, k) => {
      const color = colors[k] || colors[1]
      const end = item / this.sum

      this.drawCircle(color, this.start, this.start + end, r, this.x, this.y)
      this.start += item / this.sum
    })
  }

  drawCircle(color, start, end, r, x, y) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.moveTo(x, y);
    ctx.arc(x, y, r, Math.PI * 2 * start, Math.PI * 2 * end)
    ctx.fillStyle = color;
    ctx.lineTo(x, y)
    ctx.fill();
    ctx.save();
  }

  dataCount() {
    const newArr = [];
    this.data = this.data.slice(0, this.list.length)
    this.data.map(item => {
      this.sum += item
      if (item && item > 0) {
        this.count++
      }
    })
  }
}