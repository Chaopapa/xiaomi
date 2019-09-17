/**
 * 主页JS
 */
$(function() {
    //广告图轮播
    var imgs = $('.banner-carousel img');
    var left = $('.b-left');
    var right = $('.b-right');
    var num = $('.b-num li');
    _carousel(imgs, left, right, num, 6000);

    /**
     * banner图列表效果
     */
    var bannerNavList = {
        target: $('.banner-nav ul'),

        eventInit: function() {
            this.show();
            this.hide();
        },

        show: function() {
            $(this.target).mouseover(function(e) {
                var target = e.target;
                if (target.nodeName == 'A') {
                    $(target).next().css('display', 'block');
                }
            });
        },

        hide: function() {
            var self = this;
            $(this.target).mouseout(function(e) {
                var target = e.target;
                var toE = e.relatedTarget;
                while (toE) {
                    if ($(toE).hasClass('bn-show')) {
                        $(toE).mouseout(function(e) {
                            var toe = e.relatedTarget;
                            var t = e.target;
                            while (toe) {
                                if ($(toe).hasClass('bn-show')) {

                                    return;
                                }
                                toe = toe.parentNode;
                            }
                            if (target.nodeName == 'A') {
                                $(target).next().css('display', 'none');
                            }
                        })
                        return;
                    }
                    toE = toE.parentNode;
                }

                if (target.nodeName == 'A') {
                    $(target).next().css('display', 'none');
                }

            });
        }
    };
    bannerNavList.eventInit();
});