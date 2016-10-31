$(function() {
  var codes = localStorage.code;
  var  cop= JSON.parse(codes);
  var code=cop.code    //获取到优惠券码
  var activeday = cop.couponActivityId; // 获取优惠天数
  var starttimes = cop.validStartTime; //获取储存到电脑中的开始时间毫秒数
  var endtimes = cop.validEndTime; //获取储存到电脑中的结束时间毫秒数
  var bar = $('#bar').val(code); //把获取到的优惠券码添加到页面中





  var nowtimes = new Date(); //创建日期对象
  var times = nowtimes.getTime(); //获取当前时间的毫秒数
  var nowyear = nowtimes.getFullYear(); //获取当前时间的年
  var nowmonth = nowtimes.getMonth() + 1; //获取当前时间的月
  var nowday = nowtimes.getDate(); //获取当前时间的日
  var startcha = times - starttimes; //当前时间与活动开始时间差
  var endcha = Math.abs(times - endtimes); //当前时间与活动结束时间差
  var startday = Math.ceil(startcha / (24 * 3600 * 1000)); //转化成天数
  var startmonth = Math.floor(startcha / (24 * 3600 * 1000 * 30)); //转化成月
  var startyear = Math.floor(startcha / (24 * 3600 * 1000 * 30 * 12)); //转化成年

  var enday = Math.ceil(endcha / (24 * 3600 * 1000)); //转化成天数
  var endmonth = Math.floor(endcha / (24 * 3600 * 1000 * 30)); //转化成月
  var endyear = Math.floor(endcha / (24 * 3600 * 1000 * 30 * 12)); //转化成年

  var startactiveyear = nowyear + startyear; //活动开始的年
  var startactivemonth = nowmonth + startmonth; //活动开始的月
  var startactiveday = nowday + startday; // 活动开始的日
  var endactiveyear = nowyear + endyear; //活动结束的年
  var endactivemonth = nowmonth + endmonth; //活动结束的月
  var endactiveday = nowday + enday; //活动结束的日



  $('<li>凭本劵可享受' + activeday + '日免费会员</li><li>下载乐只APP，在APP内找到优惠券页输入兑换码即可兑换</li><li>' + startactiveyear + '年' + startactivemonth + '月' + startactiveday + '日' + endactiveyear + '年' + endactivemonth + '月' + endactiveday + '日兑换有效，过期作废</li>').appendTo('.explain');






  //点击复制效果:
  var clipboard = new Clipboard('.all .fuzhi', {
    target: function() {
      return document.querySelector('#bar');
    }
  });

  $('.all .fuzhi').on('click', function() {
    layer.msg('主人，已复制好', {
      offset: 100,
      shift: 6
    });
  })


  window.test = -1;
  // 判断是否处于客户端的位置：
  function connectWebViewJavascriptBridge(callback) {
    console.log("connectWebViewJavascriptBridge");
    if (window.WebViewJavascriptBridge) {
      console.log("WebViewJavascriptBridge");
      return callback(WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
      console.log("WVJBCallbacks egizst");
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'lz://__BRIDGE_LOADED__';
    console.log("lz://__BRIDGE_LOADED__");
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() {
      document.documentElement.removeChild(WVJBIframe)
    }, 0);
  }

  connectWebViewJavascriptBridge(function(bridge) {
    console.log("connectWebViewJavascriptBridge_after");
    bridge.registerHandler("lzfunctionInJs", function(data, responseCallback) {
      test = 0;
      var user = data.data.account;
      var code = localStorage.code;
      if (test == 0) {
        $.ajax({
          url: 'http://192.168.1.105:8080/heart/coupon/exchange',
          data: {
            'account': user,
            'couponCode': code
          },
          type: 'post',
          dataType: 'text',
          success: function(msg) {
            var codes = msg.data.code;
            if (codes == 0) {
              alert('优惠券已下发至您的账户。')
            }
          }
        })
      }
    });
  })






  //点击立即兑换：
  $('.all .suc .duihuan').on('click', function() {
    if (test == -1) {
      //打开（下载）App
      (function openApp() {
        var ua = window.navigator.userAgent.toLowerCase();
        //微信
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.tianyue.magicalwave';
        } else { //非微信浏览器
          if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            var loadDateTime = new Date();
            window.setTimeout(function() {
              var timeOutDateTime = new Date();
              if (timeOutDateTime - loadDateTime < 5000) {
                window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.tianyue.magicalwave"; //ios下载地址
              } else {
                window.close();
              }
            }, 25);
            window.location = "lz://open.com/{'status': 1,'message':'coupon','data':{'code':'xxx','name':'名称'}}";
          } else if (navigator.userAgent.match(/android/i)) {
            var state = null;
            try {
              window.location = "lz://open.com/{'status': 1,'message':'coupon','data':{'code':'xxx','name':'名称'}}";
              setTimeout(function() {
                window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.tianyue.magicalwave"; //android下载地址

              }, 500);
            } catch (e) {}
          }
        }
      })()
    }
  })
})
