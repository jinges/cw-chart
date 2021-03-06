# cw-circle



用于统计学生做题情况，分析正确率，错误率

现在网页中写入一个  ``
 <canvas id="canvas"></canvas>`` 然后再按照下面的步骤操作

![示例图](example.png '示例图')


安装
---

```

 npm install cw-circle

```

参数
---
构造函数 ``DrawCircle`` 有四个参数，前三个``id`` ``data``  ``accuracy``是必填参数，第四个``option``是可选的，可以不传。

```javascript

  //"id", 根据此id来查找dom中的canvas对象， 必填
  id: '#canvas'

  // "data", 要显示的数据集合，每个份额的数量， 必填
  data: [15, 0, 43, 40, 15, 29, 23, 50, 34, 45, 56]

  // "accuracy", 某一个份额所占的比例系数， 必填
  accuracy: '45%'
  // "options" 是可选填的参数，包括 外圈颜色， 右边文字列表， 中间显示文字
  options: {
      //饼状图外圈的颜色列表
      outer_colors: ['#52cc8f', '#5499cc', '#ff6969', '#ffc869'],

      //右边的文字列表
      list: ['正   确', '半   对', '错   误', '待批改'],

      //饼状图中间显示的文字提示语
      center_text: '正确率',

      //默认文字颜色
      def_color: '#2c333d',
      // 右边列表文字颜色
      text_color: '#b3b3b3'
  }

```



示例
---

```javascript
 const data = [15, 0, 43, 40, 15, 29, 23, 50, 34, 45, 56]
  const list = ['正确', '半对', '错误', '待批改', '异常']
  
  new DrawCircle('#canvas', data, '49%', {
    list: list
  })
```

浏览器
---

在浏览器里可以直接引入js库


```javascript
  <script src="./../dist/cw_circle.js"></script>
  <script>
    const data = [15, 0, 43, 40, 15, 29, 23, 50, 34, 45, 56]
    const list = ['正确', '半对', '错误', '待批改', '异常']
    new DrawCircle.default('#canvas', data, '49%', {
      list: list
    })
  </script>
```
