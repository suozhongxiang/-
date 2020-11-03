$(function () {

  var layer = layui.layer
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