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

    this.dataObj = options || {
      outer_colors: null,
      inner_colors: null,
      center_text: null,
      def_Color: null,
      list: null
    };
    this.init();
  }

  getRatio() {
    let devicePixelRatio = window.devicePixelRatio || 1
    this.ratio = window.innerWidth > 700 ? devicePixelRatio : 1;
  }

  init() {
    this.outer_colors = this.dataObj.outer_colors || ['#52cc8f', '#5499cc', '#ff6969', '#ffc869', '#b66eff', '#66cb8e', '#c50e18']
    this.inner_colors = this.dataObj.inner_colors || ['#219c4b', '#22559c', '#ff2e2e', '#ff952e', '#7e34fe', '#3b9b4a', '#99080f']
    this.center_text = this.dataObj.center_text || '正确率';
    this.start = 0;
    this.sum = 0;
    this.count = 0;
    this.space = 0;
    this.top = 0;
    this.x = 0;
    this.y = 0;
    this.list = this.dataObj.list || ['正   确', '半   对', '错   误', '待批改', '其它'];
    this.def_Color = this.dataObj.def_Color || '#2c333d'

    this.getRatio();
    this.dataCount();
    const width = window.innerWidth;
    this.canvas.width = width;
    this.canvas.height = width - 130 * this.ratio;
    this.x = width / 3;
    this.y = width / 3;

    this.formatParams(this.outer_colors, this.canvas.width / 4);
    this.formatParams(this.inner_colors, this.canvas.width / 6);
    this.drawCenter()
    this.computeSpace()
    this.drawText(this.outer_colors)
  }

  drawCenter() {
    const x = this.x;
    const y = this.y
    const ctx = this.ctx;
    const r = this.canvas.width / 8;
    this.drawCircle(this.def_Color, 0, 1, r, x, y)

    ctx.font = "" + (28 * this.ratio) + "px Arial";
    ctx.fillStyle = '#fff';
    ctx.textAlign = "center";
    ctx.fillText(this.accuracy, x, y - 10 * this.ratio);

    ctx.font = "" + (22 * this.ratio) + "px Arial";
    ctx.fillText(this.center_text, x, y + 20 * this.ratio);
  }

  drawText(colors) {
    const ctx = this.ctx;
    let hasZero = false;
    this.data.map((item, k) => {
      const i = hasZero ? k - 1 : k
      if (item && item > 0) {
        const color = colors[k] || colors[1]
        const text = this.list[k] || '其它'
        const text_x = this.x * 2
        const text_y = this.y - this.canvas.width / 4 + this.space + i * this.space * 2 + this.top
        console.log(text_y)
        this.drawCircle(color, 0, 1, 8 * this.ratio, text_x, text_y)
        ctx.fillStyle = '#fff';
        ctx.font = "" + (17 * this.ratio) + "px Arial";
        ctx.fillText(text + ' ' + item + '人', text_x + 60 * this.ratio, text_y + 6 * this.ratio)
      } else {
        hasZero = true;
      }
    })
  }

  computeSpace() {
    const h = this.canvas.width / 4 * 2;
    this.space = h / (this.count * 2);
    console.log(this.space)
    if(this.space > 40) {
      this.space = 25;
      this.top = 40;
    }
  }

  formatParams(colors, r) {
    let hasZero = false;

    this.data.map((item, k) => {
      const color = colors[k] || colors[1]
      const end = item / this.sum
      if (item && item > 0) {
        this.drawCircle(color, this.start, this.start + end, r, this.x, this.y)
        this.start += item / this.sum
      } else {
        hasZero = true
      }
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
    this.data = this.data.slice(0, this.list.length)
    this.data.map(item => {
      this.sum += item
      if (item && item > 0) {
        this.count++
      }
    })
  }
}