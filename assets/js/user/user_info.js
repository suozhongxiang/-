$(function () {

  form.verify({
    // 判断昵称长度
    nickname: function (val) {
      if (val.length < 2 || val.length > 6) return '昵称只能2~6位'
    }
  })
  getUserInfo()

  // 基本信息修提交行为
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.post('/my/userinfo', $(this).serialize(), function (res) {
      if (res.status !== 0) return layer.msg(res.message, { // msg提示框
        time: 1000
      })
      layer.msg(res.message, { // msg提示框
        time: 1000
      })
      window.parent.getUserInfo()
    })

  })

  // 重置按钮 重新渲染用户基本信息
  $('#btnReset').on('click', function (e) {
    // 阻止了表单的默清空行为
    e.preventDefault()
    getUserInfo()
  })

})
var layer = layui.layer
var form = layui.form

// 获取用户进本信息 并且渲染
function getUserInfo() {

  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {

      if (res.status !== 0) return layer.msg(res.message, { // msg提示框
        time: 1000
      })

      form.val('formUserInfo', res.data)

    }
  })
}
