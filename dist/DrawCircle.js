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
    console.log(devicePixelRatio)
    this.ratio = devicePixelRatio * 0.9;
    const w = window.innerWidth;
    if(w <= 320) {
      this.ratio = devicePixelRatio * 1.2
    } else if (w <= 400 && devicePixelRatio < 3) {
      this.ratio = devicePixelRatio * 1.4
    } else if (w >= 600) {
      this.ratio = devicePixelRatio * 2.4
    }
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
    this.space = 30;
    this.list = this.dataObj.list || ['正   确', '半   对', '错   误', '待批改', '其它'];
    this.def_Color = this.dataObj.def_Color || '#2c333d'

    this.dataCount();
    this.getRatio();
    const width = window.innerWidth;
    this.canvas.width = width;
    this.canvas.height = width - 130 ;
    this.x = width / 3 - 10;
    this.y = width / 3;

    this.formatParams(this.outer_colors, this.canvas.width / 4);
    this.formatParams(this.inner_colors, this.canvas.width / 6);
    this.drawCenter()
    this.drawText(this.outer_colors)
  }

  drawCenter() {
    const x = this.x;
    const y = this.y
    const ctx = this.ctx;
    const r = this.canvas.width / 8;
    this.drawCircle(this.def_Color, 0, 1, r, x, y)

    ctx.font = "" + (11 * this.ratio) + "px Arial";
    ctx.fillStyle = '#fff';
    ctx.textAlign = "center";
    ctx.fillText(this.accuracy, x, y - 2 * this.ratio);

    ctx.font = "" + (7 * this.ratio) + "px Arial";
    ctx.fillText(this.center_text, x, y + 8 * this.ratio);
  }

  drawText(colors) {
    const ctx = this.ctx;
    ctx.textAlign = "left";
    let index = 0;
    this.data.map((item, k) => {
      if (item && item > 0) {
        const color = colors[k] || colors[1]
        const text = this.list[k] || '其它'
        const text_x = this.x * 2
        const text_y = this.y - this.canvas.width / 6 + this.space * index++ - 2 * this.ratio
        this.drawCircle(color, 0, 1, 3 * this.ratio, text_x, text_y)
        ctx.fillStyle = '#fff';
        ctx.font = "" + (6 * this.ratio) + "px Arial";
        ctx.fillText(text + '： ' + item + '人', text_x + 5 * this.ratio, text_y + 2 * this.ratio, 100)
      }
    })
  }

  // computeSpace() {
  //   const h = this.canvas.width / 4 * 2;
  //   this.space = h / this.count;
  //   // if(this.space > 40) {
  //   //   this.space = 25;
  //   //   this.top = 40;
  //   // }
  // }

  formatParams(colors, r) {
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