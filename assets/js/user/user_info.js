$(function () {
  var layer = layui.layer

  initUserInfo()

  $('#btnReset').on('click', function (e) {
    e.preventDefault() //阻止默认行为
    initUserInfo() // 再次将数据渲染进去
  })

  $('#resetForm').on('submit', function (e) {
    e.preventDefault() // 阻止表单的默认提交行为

    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message, { // msg提示框
          time: 1000
        })
        layer.msg(res.message, { // msg提示框
          time: 1000
        })
        initUserInfo()
        window.parent.getUserInfo()
      }
    })

  })
})
var form = layui.form
function initUserInfo() {

  $.ajax({
    method: "GET",
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) return layer.msg(res.message, { // msg提示框
        time: 1000
      })
      form.val('formUserInfo', res.data)
    }
  })


}