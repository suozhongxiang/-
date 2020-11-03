$(function () {

  var layer = layui.layer
  var form = layui.form

  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    samePwd: function (val) {
      if ($('#setPwd [name=oldPwd]').val() === val) return '不能和原密码一致哦哦'
    },
    rePwd: function (val) {
      if ($('#setPwd [name=newPwd]').val() !== val) return '两次输入密码不一致哦'

    }
  })
  $('#setPwd').on('submit', function (e) {
    e.preventDefault()
    var newPwd = $('#setPwd [name=newPwd]').val()
    var oldPwd = $('#setPwd [name=oldPwd]').val()
    $.post('/my/updatepwd', { oldPwd: oldPwd, newPwd: newPwd }, function (res) {
      if (res.status !== 0) return layer.msg(res.message, { // msg提示框
        time: 1000
      })
      layer.msg(res.message, { time: 1000 })
      $('#setPwd')[0].reset()
    })
  })


})