/**
 * 公用JS效果(基于jQuery)
 */
(function() {
    //鼠标放上浮动特效
    /**
     * 单页轮播图效果
     * @param {*图片jquery数组} imgs 
     * @param {*左按钮jquery} left 
     * @param {*右按钮jquery} right 
     * @param {*面包屑jquery} nums 
     * @param {*单张间隔} time 
     */
    function Carousel(imgs, left, right, nums, time) {
        this.imgs = imgs;
        this.left = left;
        this.right = right;
        this.nums = nums;
        this.index = 0;
        this.timer1 = null;
        this.timer2 = null;
        this.time = time;
    };
    //图片的切换方式
    Carousel.prototype.imgMove = function(dom, target) {
        var opa = 10;
        clearInterval(this.timer1);
        var _this = this;
        this.timer1 = setInterval(function() {
            if (opa < target) {
                speed = 5;
            } else {
                speed = -5;
            }

            if (Math.abs(target - opa) <= Math.abs(speed)) {
                // dom.style.opacity = target / 100;
                $(dom).css('opacity', target / 100);
                clearInterval(_this.timer1);
                return;
            }
            opa += speed;
            $(dom).css('opacity', opa / 100);

        }, 70);
    };

    //图片自动播放
    Carousel.prototype.autoMove = function() {
        clearInterval(this.timer2);
        var _this = this;
        this.timer2 = setInterval(function() {
            _this.isDisplay(false, _this.index);

            _this.index++;
            if (_this.index >= _this.imgs.length) {
                _this.index = 0;
            }
            _this.isDisplay(true, _this.index);

            _this.imgMove(_this.imgs[_this.index], 100);

        }, this.time);
    };

    Carousel.prototype.isDisplay = function(flag, index) {
        if (!flag) {
            if (this.nums != null) {
                $(this.nums[this.index]).removeClass('c-carousel-show');
            }
            // this.imgs[this.index].style.zIndex = 1;
            // this.imgs[this.index].style.opacity = 0.1;
            $(this.imgs[this.index]).css({
                'z-index': 1,
                'opacity': 0.1
            });
        } else {
            if (this.nums != null) {
                $(this.nums[this.index]).addClass('c-carousel-show');
            }
            $(this.imgs[this.index]).css('z-index', 18);
        }

    };

    Carousel.prototype.carouselFactory = function(imgs, left, right, nums, time) {
        return new Carousel(imgs, left, right, nums, time).init();
    };

    Carousel.prototype.init = function() {
        this.autoMove();
        if (this.nums != null) {
            this.clickNum();
        }
        this.leftClick();
        this.rightClick();
    };
    Carousel.prototype.clickNum = function() {
        var _this = this;
        this.nums.each(function(index, item) {
            item.onclick = function() {
                clearInterval(_this.timer2);
                _this.isDisplay(false, _this.index);
                _this.index = index;
                _this.isDisplay(true, _this.index);
                _this.imgMove(_this.imgs[_this.index], 100);
                _this.autoMove();
            }

        });
    };
    Carousel.prototype.rightClick = function() {
        var _this = this;
        this.right.click(function() {
            clearInterval(_this.timer2);
            _this.isDisplay(false, _this.index);
            _this.index++;
            if (_this.index >= _this.imgs.length) {
                _this.index = 0;
            }
            _this.isDisplay(true, _this.index);

            _this.imgMove(_this.imgs[_this.index], 100);
            _this.autoMove();

        });

    };
    Carousel.prototype.leftClick = function() {
        var _this = this;
        this.left.click(function() {
            clearInterval(_this.timer2);
            _this.isDisplay(false, _this.index);
            _this.index--;
            if (_this.index < 0) {
                _this.index = _this.imgs.length - 1;
            }
            _this.isDisplay(true, _this.index);

            _this.imgMove(_this.imgs[_this.index], 100);
            _this.autoMove();

        });
    };
    window._carousel = Carousel.prototype.carouselFactory;


    /**
     * 鼠标放上收起和折叠效果
     * @param {*目标元素} $target 
     * @param {*展开目标高度} height 
     * @param {*所需时间} time 
     */
    function MouseShow($target, targetHeight, time) {

        this.$target = $target;
        this.targetHeight = targetHeight;
        this.time = time;
        this.timer = null;
        this.nowHeight = 0;
    }
    //对象初始化
    MouseShow.prototype.init = function() {
        this.expand();
        this.collapse();
    }

    //展开
    MouseShow.prototype.expand = function() {
        this.$target.parent().mouseover(function() {
            this.move(this.targetHeight);
        }.bind(this));
    };
    //收起
    MouseShow.prototype.collapse = function() {
        this.$target.parent().mouseout(function() {
            this.move(0);
        }.bind(this));
    };

    //高度移动
    MouseShow.prototype.move = function(targetH) {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            var speed = 5;
            speed = this.nowHeight >= targetH ? speed : (-speed);

            if (Math.abs(speed) >= Math.abs(targetH - this.nowHeight)) {
                this.nowHeight = targetH;
                this.$target.css('height', targetH + 'px');
                clearInterval(this.timer);
                return;
            }

            this.nowHeight -= speed;
            this.$target.css('height', this.nowHeight + 'px');

        }, this.time);
    };

    //高度改变测试用例 OK
    MouseShow.prototype.testMove = function(targetH) {
        this.time = 60;
        this.nowHeight = 100;
        this.move(0);
    };
    //对象工厂
    MouseShow.prototype.mouseShowFactory = function($target, targetHeight, time) {
        return new MouseShow($target, targetHeight, time).init();
    };
    window._mouseShow = MouseShow.prototype.mouseShowFactory;



    //购物车效果 shoppingCart-hover
    function ShoppingCart($target, targetHeight, time) {
        MouseShow.call($target, targetHeight, time);
        this.$target = $target;
        this.targetHeight = targetHeight;
        this.time = time;
        this.timer = null;
        this.nowHeight = 0;

    }
    //继承MouseShow类
    ShoppingCart.prototype = Object.create(MouseShow.prototype);
    //手动指正构造器
    ShoppingCart.prototype.constructor = ShoppingCart;
    ShoppingCart.prototype.expand = function() {
        this.$target.parent().mouseover(function() {
            this.move(this.targetHeight);
            this.$target.prev().addClass('shoppingCart-hover');
        }.bind(this));
    };

    ShoppingCart.prototype.collapse = function() {
            this.$target.parent().mouseout(function() {
                this.move(0);
                this.$target.prev().removeClass('shoppingCart-hover');
            }.bind(this));
        }
        //对象工厂
    ShoppingCart.prototype.shoppingCartFactory = function($target, targetHeight, time) {
        return new ShoppingCart($target, targetHeight, time).init();
    };
    window._shoppingCart = ShoppingCart.prototype.shoppingCartFactory;

    _shoppingCart($('.cart-show'), 80, 20);
    //二维码下载效果
    _mouseShow($('.app-code'), 148, 20);

    /**
     * 写头部展开效果
     */
    var headerExpand = {
        //操作目标
        list: $('.ahn-list'),
        //状态
        status: 'collapse',
        //操作目标
        target: $('.ah-list'),

        //事件初始化
        eventInit: function() {
            this.expandEvent();
            this.collapseEvent();
        },
        //展开事件
        expandEvent: function() {
            //使用事件委托
            var self = this;
            this.list.mouseover(function(event) {
                var target = event.target;
                if ($(target).parent().attr('data-index') < 7) {
                    if (self.status == 'collapse') {
                        console.log('展开');
                        self.expand();
                        self.status = 'expand';
                        // $(self.target).mouseover(function() {
                        //     $(self.target).mouseout(function(e) {
                        //         var toE = event.relatedTarget;
                        //         while (toE) {
                        //             console.log(toE);

                        //             if ($(toE).hasClass('ah-list')) {
                        //                 return;
                        //             }
                        //             toE = toE.parentNode;
                        //         }
                        //         self.collapse();
                        //         self.status = 'collapse';
                        //     });
                        // })
                    }
                    //TODO:ajax请求,tab切换

                } else {
                    console.log('收起');
                    self.collapse();
                    self.status = 'collapse';
                }
            });
        },
        //收起事件
        collapseEvent: function() {
            var self = this;
            this.list.mouseout(function(event) {
                var toE = event.relatedTarget;
                while (toE) {
                    if ($(toE).hasClass('ah-list')) {
                        $(self.target).mouseout(function(e) {

                            var toE = e.relatedTarget;
                            while (toE) {
                                if ($(toE).hasClass('ah-list')) {
                                    return;
                                }
                                toE = toE.parentNode;
                            }
                            console.log(1);
                            self.collapse();
                            self.status = 'collapse';
                        });
                        return;
                    }
                    toE = toE.parentNode;
                }
                self.collapse();
                self.status = 'collapse'
            });
        },

        //展开操作
        expand: function() {
            $(this.target).css('display', 'block');
            $(this.target).addClass('ahl-active');
            $(this.target).removeClass('ahl-up');
            $(this.target).addClass('ahl-down');


        },

        //收起操作
        collapse: function() {
            $(this.target).addClass('ahl-up');
            $(this.target).removeClass('ahl-down');
            $(this.target).removeClass('ahl-active');
            $(this.target).css('display', 'none');
        },

        // //listEvent
        // listEvent: function() {
        //     var self = this;
        //     $(this.target).mouseout(function() {
        //         self.collapse();
        //         self.status = 'collapse';
        //     })
        // }

    };
    headerExpand.eventInit();

})();