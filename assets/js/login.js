$(function () {


  //注册点击事件 切换tab
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
    // $('#form_reg').reset()
    // $('#form_login').reset()
  })
  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
    // $('#form_reg').reset()
    // $('#form_login').reset()
  })

  // 表单验证 
  layui.form.verify({
    uname: [/^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{1,16}$/, '限16个字符，支持中英文、数字、减号或下划线'],
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) return '两次密码不一致哦哦'
    }
  })

  var layer = layui.layer

  //表单的注册事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()

    $.post('/api/reguser', {
      username: $('.reg-box [name=username]').val(),
      password: $('.reg-box [name=password]').val()
    }, function (res) {
      if (res.status == 1) return layer.msg(res.message, { icon: 5 })
      layer.msg(res.message, { icon: 6 })
      $('#link_login').click()

    })
  })

  // 登录
  $('#form_login').on('submit', function (e) {
    e.preventDefault()

    $.post('/api/login', $(this).serialize(), function (res) {
      if (res.status == 1) return layer.msg(res.message, { icon: 5 })
      layer.msg(res.message, { icon: 6 })
      localStorage.setItem('token', res.token)
      location.href = "/index.html"
    })
  })

})