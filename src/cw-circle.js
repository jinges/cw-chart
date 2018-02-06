export default class DrawCircle {


  constructor(obj) {
    if (!obj.id || !obj.data || !obj.accuracy) {
      alert('传入参数有误')
      return;
    }
    this.canvas = document.querySelector(obj.id)
    this.ctx = this.canvas.getContext('2d')
    this.data = obj.data || [];
    this.accuracy = obj.accuracy || 0;
    this.init();
  }

  getRatio() {
    let devicePixelRatio = window.devicePixelRatio || 1
    this.ratio = window.innerWidth > 700 ? devicePixelRatio : 1;
  }

  init() {
    this.outer_colors = ['#52cc8f', '#5499cc', '#ff6969', '#ffc869']
    this.inner_colors = ['#219c4b', '#22559c', '#ff2e2e', '#ff952e']
    this.start = 0;
    this.count = 0;
    this.x = 0;
    this.y = 0;
    this.arrText = ['正   确', '半   对', '错   误', '待批改'];

    this.getRatio();
    this.dataCount();
    const width = window.innerWidth;
    this.canvas.width = width;
    this.canvas.height = width - 120;
    this.x = width / 3;
    this.y = width / 3;

    this.formatParams(this.outer_colors, this.canvas.width / 4);
    this.formatParams(this.inner_colors, this.canvas.width / 6);
    this.drawCircle('#2c333d', 0, 1, this.canvas.width / 4);
    this.drawCenter()
    this.drawText(this.outer_colors)
  }

  drawCenter() {
    const x = this.x;
    const y = this.y
    const ctx = this.ctx;
    const r = this.canvas.width / 8;
    this.drawCircle('#2c333d', 0, 1, r, x, y)

    ctx.font = "" + (28 * this.ratio) + "px Arial";
    ctx.fillStyle = '#fff';
    ctx.textAlign = "center";
    ctx.fillText(this.accuracy, x, y - 10 * this.ratio);

    ctx.font = "" + (22 * this.ratio) + "px Arial";
    ctx.fillText('正确率', x, y + 20 * this.ratio);
  }

  drawText(colors) {
    const ctx = this.ctx;
    this.data.map((item, k) => {
      const color = colors[k]
      const text = this.arrText[k]
      const text_x = this.x * 2
      const text_y = this.y - this.canvas.width / 7 + k * 40 * this.ratio
      this.drawCircle(color, 0, 1, 10 * this.ratio, text_x, text_y)

      ctx.fillStyle = '#fff';
      ctx.font = "" + (18 * this.ratio) + "px Arial";
      ctx.fillText(text + ' ' + item + '人', text_x + 60 * this.ratio, text_y + 6 * this.ratio)
    })
  }

  formatParams(colors, r) {
    this.data.map((item, i) => {
      const color = colors[i]
      const end = item / this.count
      this.drawCircle(color, this.start, this.start + end, r, this.x, this.y)
      this.start += item / this.count
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
    this.data.map(item => {
      this.count += item
    })
  }
}
