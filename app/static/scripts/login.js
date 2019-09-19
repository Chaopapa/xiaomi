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
            });
        }
    }
    loginTab.bindEvent();
    console.log($('#name'));
    //表单提交改为ajax请求
    var login = {
        target: $('.n-l form'),
        getIn: function() {
            var self = this;
            this.target.submit(function(e) {
                e.preventDefault();
                $.ajax({
                    type: "post",
                    url: "../static/api/loginApi/login.php",
                    dataType: 'json',
                    data: {
                        "name": $('#name').val(),
                        "pwd": $('#password').val()
                    },
                    cache: false,
                    complete: function(data) {
                        var json = data.responseText;
                        console.log(json);
                        if (JSON.parse(json)) {
                            json = JSON.parse(json);
                            console.log(json);
                            self.setCookie('nickName', json.nickName);
                            window.location.href = "./mi.html";
                        } else {
                            alert('用户名或密码错误');
                            $('#name').val('');
                            $('#password').val('');
                        }
                    }
                });
            }.bind(this));

        },
        //设置cookie
        setCookie: function(key, value, day) {
            var d = new Date();
            if (day) {
                d.setDate(d.getDate() + day);
                document.cookie = key + "=" + value + " ;expires=" + d;
            } else {
                document.cookie = key + "=" + value;
            }
        }


    }
    login.getIn();

})