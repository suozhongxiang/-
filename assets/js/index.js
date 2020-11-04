
$(function () {
  getUserInfo() // 获取用户信息

  $('.tuichu').on('click', function () {// 退出功能
    layer.confirm('你真的要退出嘛?', { icon: 3, title: '提示' }, function (index) {
      //do something
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index);
    });

  })




})
// 获取插件的layer对象 后期需要做弹出框
var layer = layui.layer
var form = layui.form
function getUserInfo() {


  // 发起ajax请求 获取用户信息 token判断登录状态
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) return layer.msg(res.message, { // msg提示框
        time: 1000
      })

      renderUserImg(res.data)
    },
    // 通过获取失败或成功都会执行的回调函数来执行防止无token情况下的偷摸登录操作

  })
}


// 渲染用户信息
function renderUserImg(data) {

  // 给要展示的名称赋值
  var name = data.nickname || data.username
  // $('div [lay-filter=formUserInfo]') && form.val('formUserInfo', data)
  $('#welcome').html(`欢迎 ${name}`)
  // 0 '' undefinde null false 布尔值为false
  // 有内容代表有头像 展示头像 隐藏字符头像
  if (data.user_pic) {
    $('.text-avatar').hide()
    $('.layui-nav-img').show()
    $('.layui-nav-img').prop('src', data.user_pic)

  } else {
    $('.layui-nav-img').hide()
    $('.text-avatar').show()
    Nname = name.slice(0, 1)
    $('.text-avatar').html(Nname.toUpperCase())
  }

}

