$(function() {
  // 判断是否是移动端或pc端：
  var system = {
    win: false,
    mac: false,
    xll: false
  };
  //检测平台
  var p = navigator.platform;
  system.win = p.indexOf("Win") == 0;
  system.mac = p.indexOf("Mac") == 0;
  system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
  if (system.win || system.mac || system.xll) {
    //  pc端：
    // 页面福利动画效果：
    $(window).on('scroll', function() {
        var obj = $(document).scrollTop();
        if (obj >= 2000) {
          $('.divs4 .hdr').addClass('active');
        } else {
          $('.divs4 .hdr').removeClass('active');
        }
        if (obj >= 3000) {
          $('.divs5').addClass('active');
        } else {
          $('.divs5').removeClass('active');
        }
      })
      // pc端禁用领取：
    $('#openApp').on('click', function() {
      layer.open({
        content: '该活动暂不支持pc端操作哦，请到移动端进行领取。谢谢',
        scrollbar: false
      });

    })
  } else {
    // 移动端：
    // 页面福利动画效果：
    $(window).on('scroll', function() {
        var obj = $(document).scrollTop();
        console.log(obj)
        if (obj >= 400) {
          $('.divs4 .hdr').addClass('active');
        } else {
          $('.divs4 .hdr').removeClass('active');
        }
        if (obj >= 850) {
          $('.divs5').addClass('active');
        } else {
          $('.divs5').removeClass('active');
        }
      })
      // 点击立即领取时异步交互：
    $('#openApp').on('click', function() {
      if (localStorage.code) {
        window.location.href = "../../success.html"
      } else {
        $.ajax({
          type: "POST",
          url: "http://192.168.1.105:8080/heart/coupon/get?actCode=EtDvIe",
          success: function(msg) {
            var step = msg.data.code;
            if (step == 2) {
              window.location.href = "../../fail.html"
            } else if (step == 0) {
              var code = msg.data.coupon.couponActivityId;
              //window.localStorage.code = msg.data.coupon.code+";" +msg.data.coupon.validEndTime+";" +msg.data.coupon.validStartTime+";"+msg.data.coupon.couponActivityId;
              window.localStorage.code = '{"validStartTime":"' + msg.data.coupon.validStartTime + '","code":"' + msg.data.coupon.code + '","validEndTime":"' + msg.data.coupon.validEndTime + '","couponActivityId":"' + msg.data.coupon.couponActivityId + '"}';
              console.log(window.localStorage.code)
              window.location.href = "../../success.html"
            } else if (step == 1) {
              layer.msg('亲，活动已经结束喽，下次再来吧。', {
                offset: 100,
                shift: 6
              });
            }
          }
        });
      }
    })
  }
  // 判断平台结束：

  // 多媒体播放：
  $('.divs3 .btn').on('click', function() {
      layer.open({
        type: 2,
        title: false,
        area: ['100%', '360px'],
        shade: 1,
        closeBtn: 0,
        shadeClose: true,
        content: 'http://v.qq.com/iframe/player.html?vid=c0340ks4h4b&tiny=0&auto=1'
      });
      layer.msg('点击任意处关闭');
    })
    // 立即领取动画：
  setInterval(function() {
    $('.divs6').toggleClass('show');
  }, 500)

})
