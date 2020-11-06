$(function () {


  initCate()
  // 初始化富文本编辑器
  initEditor()




  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  // 选择文件按钮
  $('#btnChooseImage').on('click', function () {
    $('#coverFile').click()
  })

  // 展示选择的图片
  $('#coverFile').on('change', function (e) {

    var file = e.target.files[0]
    var newImgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })

  var status = '已发布'

  //转变状态为草稿
  $('#btnSave2').on('click', function (e) {
    e.preventDefalut()
    status = '草稿'
  })

  // 提交表单数据到后台
  $('#form-pub').on('submit', function (e) {
    e.preventDefault()

    var fd = new FormData($('#form-pub')[0])
    fd.append('state', status)
    $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append('cover_img', blob)
        pushWord(fd) //调用请求函数 
        // 跳转到文章页面
        window.parent.document.querySelector('#liebiao').click()
      })






  })


})





var layer = layui.layer
var form = layui.form
// 定义加载文章分类的方法
function initCate() {
  $.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg('初始化文章分类失败！')
      }
      // 调用模板引擎，渲染分类的下拉菜单
      var htmlStr = template('tpl-cate', res)
      $('[name=cate_id]').html(htmlStr)
      // 一定要记得调用 form.render() 方法
      form.render()
    }
  })
}

// 发起请求 推送文章内容
function pushWord(fd) {
  $.ajax({
    method: 'POST',
    url: '/my/article/add',
    data: fd,
    contentType: false,
    processData: false,
    success: (res) => {
      if (res.status !== 0) return layer.msg(res.message, { // msg提示框
        time: 1000
      })
      layer.msg(res.message, { // msg提示框
        time: 1000
      })
    }
  })
}