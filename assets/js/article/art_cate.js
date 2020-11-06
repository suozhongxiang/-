$(function () {
  getWord()

  // 添加新增功能 
  var index = null
  $('#btnAddCate').on('click', function () {
    index = layer.open({
      type: 1,
      title: '添加类别',
      area: ['500px', '250px']
      , content: $('#dialog-add').html()
    })
  })


  // 通过事件委托方式 给新增按钮添加事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()


    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message, { // msg提示框
          time: 1000
        })
        layer.msg(res.message, {
          time: 1000
        })
        layer.close(index)
        getWord()
      }
    })

  })

  // 删除文章
  $('body').on('click', '#removeB', function () {

    var id = $(this).attr('data-Id')
    layer.confirm('确定要删除嘛', { icon: 3, title: '提示' }, function (index) {

      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id, // 这里的id 是一个参数 需要拼接形式
        success: function (res) {
          if (res.status !== 0) return layer.msg(res.message, { // msg提示框
            time: 1000
          })
          layer.msg(res.message, {
            time: 1000
          })
          getWord()
        }
      })
      layer.close(index)
    })

  })
})

//编辑文章
var index2 = null
var id = null
// 打开弹出层 渲染原有数据
$('body').on('click', '#setB', function () {

  id = $(this).siblings().attr('data-id')
  index2 = layer.open({
    type: 1,
    title: '修改类别',
    area: ['500px', '250px']
    // content设置 弹出框内容  $('#dialog-set').html()放在一个script标签中保存
    , content: $('#dialog-set').html()
  })
  $.get('/my/article/cates/' + id, function (res) {
    form.val('form-set', res.data)
  })


})

// submit事件 提交信息到服务器
$('body').on('submit', '#form-set', function (e) {

  e.preventDefault()

  $.ajax({
    method: 'POST',
    url: '/my/article/updatecate',
    data: $(this).serialize(),
    success: function (res) {
      if (res.status !== 0) return layer.msg(res.message, { // msg提示框
        time: 1000
      })
      layer.msg(res.message, {
        time: 1000
      })
      layer.close(index2)
      getWord()

    }
  })
})

// 重置按钮 事件委托
$('body').on('click', '#resetB', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'GET',
    url: '/my/article/cates/' + id,
    success: function (res) {
      // 使用 form.val将请求回来的数据渲染到界面上
      form.val('form-set', res.data)
    }

  })

})
var layer = layui.layer
var form = layui.form

// 请求现有文章数据 渲染

function getWord() {


  $.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success: function (res) {
      var hhtml = template('tpl-table', res)
      console.log(res.data);
      $('tbody').html(hhtml)
    }

  })
}