$(function () {

  // 在发起ajax之前会调用此函数
  $.ajaxPrefilter(function (option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url
  })


})