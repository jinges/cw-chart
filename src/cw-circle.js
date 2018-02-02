
export default class DrawCircle {
  constructor(id, data) {
    this.canvas = document.querySelector(id)
    this.data = data;

    this.init();
  }

  init() {
    this.ctx = this.canvas.getContext('2d')
    this.outer_colors = ['#52cc8f', '#5499cc', '#ff6969', '#ffc869']
    this.inner_colors = ['#219c4b', '#22559c', '#ff2e2e', '#ff952e']
    this.start = 0;
    this.arrText = ['正   确', '半   对', '错   误', '待批改']

    this.dataCount();
    this.formatParams(outer_colors, this.canvas.width / 2 - 260);
    this.formatParams(inner_colors, this.canvas.width / 2 - 320);
    this.drawCircle('#2c333d', 0, 1, this.canvas.width / 2 - 360);
    this.drawText(outer_colors)
  }

  drawText(colors) {
    this.data.map((item, k) => {
      const color = colors[k]
      const text = this.arrText[k]
      const text_x = this.x + 40
      const text_y = this.y + i * 100 + 12
      this.drawCircle(color, 0, 1, 16, this.x + 300, this.y - 160)
      
      this.ctx.font = '36px Arial'
      this.ctx.fillStyle = '#fff'
      this.fillText(text+ ' ' + item + '人', text_x, text_y)
    })
  }

  formatParams(colors, r) {
    this.data.map((item, i) => {
      const color = colors[i]
      this.drawCircle(color, this.start, this.start + item / this.count, r, this.x, this.y)
      this.start += item / this.count
    })
  }

  drawCircle(color, start, end, r, x, y) {
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

