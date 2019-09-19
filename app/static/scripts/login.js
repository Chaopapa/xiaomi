/**
 * 登录页js
 */
$(function() {
    //登录模式tab切换
    var loginTab = {
        target: $('.login-main-form-tab'),
        //绑定点击事件
        bindEvent: function() {
            this.target.click(function(e) {
                var t = e.target;
                if (t.nodeName == "A") {
                    $(t).addClass('nav-active');
                    $(t).siblings().removeClass('nav-active');
                    var cls = $(t).attr('cls');
                    if (cls == "number-login") {
                        $('.n-l').addClass('l-show');
                        $('.c-l').removeClass('l-show');
                    } else {
                        $('.n-l').removeClass('l-show');
                        $('.c-l').addClass('l-show');
                    }
                }
            })
        }
    }
    loginTab.bindEvent();
})