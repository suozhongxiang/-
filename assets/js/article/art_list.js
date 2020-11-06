$(function () {
  // 定义过滤器 美化时间显示样式  
  template.defaults.imports.dataFormat = function (val) {
    var date = new Date(val)

    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()

    var h = bulign(date.getHours())
    var min = bulign(date.getMinutes())
    var s = bulign(date.getSeconds())
    return y + '-' + m + '-' + d + '  ' + h + ':' + min + ':' + s



  }
  // 时间补零函数
  function bulign(date) {
    return date > 10 ? date : '0' + date
  }

  // 新建一个对象q用来存放分页数据
  var q = {
    pagenum: 1,//	显示哪一页码值
    pagesize: 2,//每页显示多少条数据
    cate_id: '',//	文章分类的 Id 默认空字符串 显示所有
    state: ''//发布状态 默认空字符串 显示所有
  }

  // 页面初始化
  initTbale(q)
  WordCate()

  // 筛选按钮效果
  $('#form-search').on('submit', function (e) {
    e.preventDefault()
    // 改变q对象的值 添加用户筛选的值
    q.cate_id = $('[name=cate_id]').val()
    q.state = $('[name=state]').val()
    initTbale(q) // 渲染页面
  })

  // 删除按钮
  $('tbody').on('click', '.btn-delete', function () {
    // 获取当前表格中的个数 
    var index = $('tbody tr').length
    // 如果 小于等于1 表示这一页没有了 需要转到上一页
    if (index <= 1) q.pagenum = q.pagenum > 1 ? q.pagenum - 1 : q.pagenum

    // 获取当前索引便于删除
    var id = $(this).attr('data-id')

    $.ajax({
      method: 'GET',
      url: '/my/article/delete/' + id,
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message, { // msg提示框
          time: 1000
        })
        initTbale(q)
      }


    })

  })


  $('tbody').on('click', '.setBB', function () {
    layer.open({
      title: '编辑文章',
      type: 1,
      content: $('#setF').html(),
      area: ['500px', '300px']
    });
  })
})

var layer = layui.layer
var form = layui.form
var laypage = layui.laypage

// 请求表格中的数据 渲染 请求数据赋值
function initTbale(q) {
  $.get('/my/article/list', q, function (res) {
    if (res.status !== 0) return layer.msg(res.message, { // msg提示框
      time: 1000
    })

    // 渲染分页
    renderPage(res.total, q)
    var hht = template('tpl-table', res)
    $('tbody').html(hht)
  })

}

// 初始化文章分类筛选 调用接口 赋值
function WordCate() {
  $.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success: function (res) {
      if (res.status !== 0) return layer.msg(res.message, { // msg提示框
        time: 1000
      })
      var htt = template('tpl-cate', res)
      $('[name=cate_id]').html(htt)
      // 因为异步的 调用渲染时 下来框早都加载好了 
      form.render() // 利用这个方法 再次渲染一遍
    }
  })

}


// 分页函数
function renderPage(sum, q) {

  // 使用ui插件中的laypage方法 渲染出分页按钮
  laypage.render({
    elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
    curr: q.pagenum, //默认显示显示那一页
    count: sum, //数据总数，从服务端得到
    limit: q.pagesize,//每页显示的条数
    limits: [2, 5, 10],//选择项
    // 排版格式
    layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
    // jump回调函数 点击分页后 做的操作
    jump: function (obj, first) {
      //obj.curr obj.limit 为当前最新的页码和每页显示的数据
      q.pagenum = obj.curr
      q.pagesize = obj.limit
      // 重新赋值给q  再次调用 initTbale(q)
      if (!first) {// 只要不是第一次点击  才会触发 防止递归
        initTbale(q)
      }
    }
  })


}