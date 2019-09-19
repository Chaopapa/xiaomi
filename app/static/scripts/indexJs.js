/**
 * 主页JS
 */
$(function() {
    //html添加位置选择


    //加载主要渲染内容
    var loadMain = {

        beforeNode: $('.video'),
        //数据
        itemArr: [],
        //初始化
        init: function() {
            this.loadData();
            this.tabChange();
        },

        //获取数据渲染页面
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
                        self.itemArr.push(item);
                        var $box = $('<div class="cm-product other-product"><div>');
                        //头部广告图
                        var $banner = $('<div class="cmp-banner"<a href=""><img src="' + item.banner + '" alt=" "> </a></div>');
                        //标题切换
                        var $nav = $('<div class="pro-nav"><ul class="pro-nav-list" data-index="' + item.data_index + '"><li class="c-active" cls="' + item.className + '" nav-title="' + item.nav_title[0] + '">' + item.moreDesc[0] +
                            '</li> <li  cls="' + item.className + '" nav-title="' + item.nav_title[1] + '">' + item.moreDesc[1] + '</li></ul></div>');
                        var $main_title = $('  <h3 class="c-main-title">' + item.main_title + '</h3>');
                        //主要要内容
                        var $content = $(' <div class="cmp-content"></div>');
                        //小广告图
                        var $ad = $(' <div class="cmpc-ad"><img src="' + item.ad[0] + '" alt=""><img src="' + item.ad[1] + '" alt=""></div>');
                        var $listBox = $('<div class="cmpc-goodsList ' + item.className + '"></div>');
                        var $list = $('<ul class="clearfix "></ul>');
                        $listBox.append($list);
                        $content.append($ad);
                        $content.append($listBox);
                        self.renderingData(item, $list, 0);

                        $box.append($banner);
                        $box.append($nav);
                        $box.append($main_title);
                        $box.append($content);


                        self.beforeNode.before($box);


                    });
                }
            });
        },


        renderingData: function(item, $list, index) {
            $list.html('');
            for (var i = 0; i < 8; i++) {
                var $li = null;
                if (i == 7) {
                    $li = $('<li class="gl-last">' +
                        '<div class="gl-li-up gl-li">' +
                        '<div class="gll-desc">' +
                        item.lastDesc[index] +
                        '</div>' +
                        '<p class="price">' + item.lastPrice[index] + '</p>' +
                        '<div class="gll-img">' +
                        '<img src="' + item.lastPic[index] + '" alt="">' +
                        '</div>' +
                        '</div>' +
                        '<div class="gl-li-bottom gl-li">' +
                        '<div class="more">' +
                        '浏览更多' +
                        '<p>' + item.moreDesc[index] + '</p>' +
                        '</div>' +
                        '<div class="gll-img">' +
                        '</div>' +
                        '</div>' +
                        '</li>')
                } else {
                    $li = $('<li>' +
                        '<a href="">' +
                        '<div class="goods-pic">' +
                        '<img src="' + item.pic[index] + '" alt="">' +
                        '</div>' +
                        '<h3 class="goods-title">' + item.title[index] +
                        '</h3>' +
                        '<p class="desc">' + item.desc[index] + '</p>' +
                        '<p class="price">' + item.price[index] + '</p>' +
                        '</a>' +
                        '</li>')
                }
                $list.append($li);
            }
        },
        //tab切换
        tabChange: function() {

            $('.c-main').on('mouseover', '.pro-nav .pro-nav-list li', function(e) {
                var target = e.target;
                if (target.nodeName == 'LI') {
                    var index = $(target).attr('nav-title');
                    var itemIndex = $(target).parent().attr('data-index');

                    var item = this.itemArr[itemIndex];
                    //目标类名
                    var targetClass = $(target).attr('cls');
                    //获取对应类名列表
                    var $list = $('.' + targetClass + ' ul');
                    this.renderingData(item, $list, index);

                    //去除兄弟元素的样式类，并给自己加上
                    $(target).addClass("c-active");
                    $(target).siblings().removeClass('c-active');
                }
            }.bind(this));

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