/**
 * 公用JS效果(基于jQuery)
 */
(function() {
    //鼠标放上浮动特效
    /**
     * 单页轮播图效果
     * @param {*图片dom数组} imgs 
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

        }, 120);
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
                $(this.nums[this.index]).removeClass = 'show';
            }
            // this.imgs[this.index].style.zIndex = 1;
            // this.imgs[this.index].style.opacity = 0.1;
            $(this.imgs[this.index]).css({
                'z-index': 1,
                'opacity': 0.1
            });
        } else {
            if (this.nums != null) {
                $(this.nums[this.index]).addClass = 'show';
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

        for (var i = 0; i < this.nums.length; i++) {
            this.nums[i].n = i;
            var _this = this;
            this.nums[i].onclick = function() {
                clearInterval(_this.timer2);
                _this.isDisplay(false, _this.index);
                _this.index = this.n;
                _this.isDisplay(true, _this.index);
                _this.imgMove(_this.imgs[_this.index], 100);
                _this.autoMove();
            }
        }
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
})();