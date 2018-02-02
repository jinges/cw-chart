export default class DrawCircle {
  constructor(id, data) {
    this.canvas = document.querySelector(id)
    this.ctx = this.canvas.getContext('2d')
    this.data = data;
    const width = window.innerWidth;
    this.canvas.width = width;
    this.canvas.height = width;
    this.x = width / 2 - 160;
    this.y = width / 2 - 160
    this.outer_colors = ['#52cc8f', '#5499cc', '#ff6969', '#ffc869']
    this.inner_colors = ['#219c4b', '#22559c', '#ff2e2e', '#ff952e']
    this.start = 0;
    this.count = 0;
    this.x = 0;
    this.y = 0;
    this.arrText = ['正   确', '半   对', '错   误', '待批改']
    this.init();
  }

  init() {

    this.dataCount();
    this.formatParams(this.outer_colors, this.canvas.width / 2 - 260);
    this.formatParams(this.inner_colors, this.canvas.width / 2 - 320);
    this.drawCircle('#2c333d', 0, 1, this.canvas.width / 2 - 360);
    this.drawText(this.outer_colors)
    this.drawCenter()
  }

  drawCenter() {
    const x = this.x;
    const y = this.y
    const ctx = this.ctx;
    this.drawCircle('#2c333d', 0, 1, this.canvas.width / 2 - 360, x, y)
    ctx.font = "76px Arial";
    ctx.fillStyle = '#fff';
    ctx.fillText('45%', x - 64, y - 10);
    ctx.font = "46px Arial";
    ctx.fillText('正确率', x - 60, y + 50);
  }

  drawText(colors) {
    this.data.map((item, k) => {
      const color = colors[k]
      const text = this.arrText[k]
      const text_x = this.x + 340
      const text_y = this.y + k * 100 - 160
      this.drawCircle(color, 0, 1, 16, text_x, text_y)

      this.ctx.font = '36px Arial'
      this.ctx.fillStyle = '#fff'
      this.ctx.fillText(text + ' ' + item + '人', text_x + 40, text_y + 12)
      console.log(text, item, text_x, text_y)
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

