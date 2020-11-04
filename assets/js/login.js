$(function () {


  //注册点击事件 切换tab
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
    $('#form_login')[0].reset()
    $('#form_reg')[0].reset()
  })

  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
    $('#form_login')[0].reset()
    $('#form_reg')[0].reset()
  })

  var layer = layui.layer // 生成layer对象 之后要调用这个对象下的msg提示框
  // 表单验证 
  layui.form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      var val = $('#form_reg [name=password]').val()
      if (value !== val) {
        // layer.msg('只想弱弱提示');
        return '两次密码不一致哦哦哦哦哦，垃圾'
      }
    }
  })

  //注册账号
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    var uname = $('#form_reg [name=username]').val()
    var pwd = $('#form_reg [name=password]').val()
    $.post('/api/reguser', { username: uname, password: pwd }, function (res) {
      if (res.status !== 0) return layer.msg(res.message, { // msg提示框
        time: 1000
      })
      layer.msg(res.message, {
        time: 1000
      })
      setTimeout(function () {
        $('#link_login').click()
      }, 300)
    })

  })


  // 登录账号

  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.post('/api/login', $('#form_login').serialize(), function (res) {

      if (res.status !== 0) return layer.msg(res.message, { time: 1000 })  // msg提示框
      localStorage.setItem('token', res.token) // 将用户令牌token保存到localStorage中 
      layer.msg(res.message, { time: 700 })


      setTimeout(() => {
        location.href = '/index.html'
      }, 700)
    })
  })

})  