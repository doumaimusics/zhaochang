$(function () {
    function getQueryStringByName(name) {
        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    }

    var account = getQueryStringByName("account");
    alert(account)

    var parameter = getQueryStringByName("actCode");
    alert(actCode)

    var codes = window.localStorage.getItem(parameter);
    if (codes == undefined) {
        window.location.href = "http://192.168.1.105:8080/act/" + parameter;
        return;
    }


    var cop = JSON.parse(codes);
    var code = cop.code           //获取到优惠券码

    var activeday = cop.vipDays; // 获取优惠天数
    var starttimes = cop.validStartTime; //获取储存到电脑中的开始时间毫秒数
    var endtimes = cop.validEndTime; //获取储存到电脑中的结束时间毫秒数
    var bar = $('#bar').val(code); //把获取到的优惠券码添加到页面中

    var startDate = new Date();
    var endDate = new Date();

    startDate.setTime(starttimes);
    endDate.setTime(endtimes);



    var startday = startDate.getDate();
    var startmonth = startDate.getMonth() + 1;
    var startyear = startDate.getFullYear();

    var enday = endDate.getDate();
    var endmonth = endDate.getMonth() + 1;
    var endyear = endDate.getFullYear();

    $('<li>凭本劵可享受' + activeday + '日免费会员<><li>下载乐只APP，在APP内找到优惠券页输入兑换码即可兑换<><li>' + startyear + '年' + startmonth + '月' + startday + '日至' + endyear + '年' + endmonth + '月' + enday + '日兑换有效，过期作废<>').appendTo('.explain');



    //点击立即兑换：
   $('.all .suc .duihuan').on('click', function () {


alert(parameter)
               //获取优惠券码：
               function getQueryStringByName(name) {
                   var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
                   if (result == null || result.length < 1) {
                       return "";
                   }
                   return result[1];
               }
               var parameter = getQueryStringByName("actCode");
               var codes = window.localStorage.getItem(parameter);
               var cop = JSON.parse(codes);
               var code = cop.code;
               //获取完成

               if (account == null) {
                   layer.open({
                       content: '请先登录',
                       scrollbar: false
                   });
               } else {
                   $.ajax({
                       url: 'http://192.168.1.105:8080/heart/coupon/exchange',
                       data: {
                           'account': account,
                           'couponCode': code
                       },
                       type: 'post',
                       dataType: 'text',
                       success: function (msg) {
                           var codes = msg.data.code;
                           if (codes == 0) {
                               alert('优惠券已下发至您的账户。')
                           }
                       }
                   })
               }
       //打开（下载）App
       (function openApp() {
           var ua = window.navigator.userAgent.toLowerCase();
           //微信
           if (ua.match(/MicroMessenger/i) == 'micromessenger') {
               window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.tianyue.magicalwave';
           } else { //非微信浏览器
               if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                   var loadDateTime = new Date();
                   window.setTimeout(function () {
                       var timeOutDateTime = new Date();
                       if (timeOutDateTime - loadDateTime < 5000) {
                           window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.tianyue.magicalwave"; //ios下载地址
                       } else {
                           window.close();
                       }
                   }, 25);
                   window.location = "lz://open.com/{'status': 1,'message':'coupon','data':{'code':'xxx','name':'名称'}}";
               } else if (navigator.userAgent.match(/android/i)) {
                   var state = null;
                   try {
                       window.location.href = "lz://open.com/{'status': 1,'message':'coupon','data':{'code':'xxx','name':'名称'}}";
                       setTimeout(function () {
                           window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.tianyue.magicalwave"; //android下载地址

                       }, 500);
                   } catch (e) {
                   }
               }
           }
       })()
           });









})
