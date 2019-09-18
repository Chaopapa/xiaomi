/**
 * 主页JS
 */
$(function() {
    //html添加位置选择


    //加载主要渲染内容
    var loadMain = {
        afterNode: $('mobile'),
        //初始化
        init: function() {
            this.loadData();
        },

        //获取数据
        loadData: function() {
            var self = this;
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: '../static/api/indexApi/main.json',
                cache: false,
                success: function(data) {
                    var text = '';
                    $.each(data, function(index, item) {
                        var $box = $('<div class="cm-product other-product"><div>');

                        var $banner = $('<div class="cmp-banner"<a href=""><img src="' + data.banner + '" alt=" "> </a></div>');
                        var $nav = $('<div class="pro-nav"><ul class="pro-nav-list"><li>' + data.moreDesc[0] + '</li> <li>' + data.moreDesc[1] + '</li></ul></div>');
                        var $main_title = $('  <h3 class="c-main-title ">' + data.main_title + '</h3>');
                        var $content = $(' <div class="cmp-content"></div>');
                        var $ad = $(' <div class="cmpc-ad"><img src="../static/images/c_products/jdb01.jpg" alt=""><img src="../static/images/c_products/jdb01.jpg" alt=""></div>');
                        var $list = $('<div class="cmpc-goodsList"><ul class="clearfix"></ul></div>');
                        for (var i = 0; i < 8; i++) {

                        }



                    })
                }
            });
        },

        //渲染页面
        rendering: function(data) {

        },

        //添加盒子
        addBox: function() {

        }

    }
    loadMain.init();

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

    /**
     * 小米闪购轮播图
     */
    var flashCarousel = {
        //轮播外层嵌套
        c: $('.f-carousel'),
        //内容盒子
        box: $('.fc-goodsBox'),
        //向左
        left: $('.f-ctr-left'),
        //向右
        right: $('.f-ctr-right'),
        //滚动条左卷距离
        toLeft: 0,
        //数据长度
        dataL: 0,
        //初始化化
        init: function() {
            this.loadData();
            this.autoMove();
            this.lastGoods();
            this.nextGoods();
        },
        //定时器
        timer: null,
        //加载数据,x渲染页面
        loadData: function() {
            var self = this;
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: '../static/api/indexApi/flashGoods.json',
                cache: false,
                success: function(data) {
                    var text = '';
                    self.dataL = data.length;

                    $.each(data, function(index, item) {
                        text += ' <div class="fcg-goods">' +
                            '<img src="' + item.picture + '" alt="">' +
                            '<div class="fcg-g-title">' + item.title + '</div>' +
                            '<div class="fcg-g-desc">' + item.desc + '</div>' +
                            '<p><span>' + item.nowPrice + '</span>元<del>' + item.beforePrice + '</del></p>' +
                            '</div>'
                    });
                    self.box.html(text);
                }
            })
        },

        //轮播图自动移动
        autoMove: function() {
            clearInterval(this.timer);
            this.timer = setInterval(function() {
                this.toLeft += (this.c.width() + 14);
                if (this.toLeft > (this.c.width() + 14) * (this.dataL / 4 - 1)) {
                    this.toLeft = 0;
                    this.c.scrollLeft(0);
                    return;
                }

                this.c.scrollLeft(this.toLeft);

            }.bind(this), 5000);

        },
        //向左滚动
        lastGoods: function() {
            this.left.click(function() {
                clearInterval(this.timer);
                this.toLeft -= (this.c.width() + 14);
                if (this.toLeft < 0) {
                    this.toLeft = (this.c.width() + 14) * (this.dataL / 4 - 1);
                }
                this.c.scrollLeft(this.toLeft);
                this.autoMove();
            }.bind(this));

        },
        //向右滚动
        nextGoods: function() {
            this.right.click(function() {
                clearInterval(this.timer);
                this.toLeft += (this.c.width() + 14);
                if (this.toLeft > (this.c.width() + 14) * (this.dataL / 4 - 1)) {
                    this.toLeft = 0;
                }
                this.c.scrollLeft(this.toLeft);
                this.autoMove();
            }.bind(this));
        }


    }
    flashCarousel.init();
});