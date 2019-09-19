
window.onload = function () {
    var prod_offT = $('.prodHeader').offset().top;
    var doc = document.documentElement;
    move(doc, prod_offT);
    // console.log();

    //$(document).animate({scrollTop : prod_offT +'px'});

    var timer;
    function move(dom, target) {
        clearInterval(timer);
        if (target < dom.scrollTop) {
            var speed = -5;
        } else {
            var speed = 5;
        }
        timer = setInterval(() => {
            if (Math.abs(target - dom.scrollTop) < Math.abs(speed)) {
                clearInterval(timer);
                dom.scrollTop = target;
            }
            dom.scrollTop = dom.scrollTop + speed;
        }, 20);

    }
    $(document).on('mousewheel', function () {
        // console.log(11);
        clearInterval(timer);
    })
};




$(function () {
    var prod_offT = $('.prodHeader').offset().top;
    var $proH = $('.prodHeader-rela');
    var $par_hide = $('.prodHeader-hide-bar');

    var clone_proH = $('.prodHeader-rela').html();
    $par_hide.html(clone_proH);

    window.addEventListener("scroll", function () {
        var scrollT = document.documentElement.scrollTop;
        if (scrollT >= prod_offT) {
            $par_hide.addClass("bar-fix");
            $par_hide.removeClass('hide');
        }
        if (scrollT < prod_offT) {
            $par_hide.addClass("hide");
            $par_hide.removeClass('bar-fix');
        }
    })

});

$(function () {
    var close = $(".login-notic-close");
    var login_notic = $('.login-notic');

    close.click(function () {
        login_notic.slideUp();
    });
});


$(function () {
    var prodLeftT = $('.prod-mian-left').offset().top;
    var prodRightB = $('.prod-mian-right').offset().top + $('.prod-mian-right').height();

    addEventListener("scroll", function () {
        var scrollT = document.documentElement.scrollTop;
        var winH = $(window).height();
        if (scrollT >= prodLeftT) {
            $('.prod-mian-left').css({
                'position': 'fixed',
                'top': 0,
                'bottom': 0,
                'margin': 'auto'
            })
        }
        else {
            $('.prod-mian-left').css({
                'position': 'relative',
                'margin-top': 0
            })
        }
        if (scrollT >= (prodRightB - winH)) {
            $('.prod-mian-left').css({
                'position': 'relative',
                'margin-top': prodRightB - $('.prod-mian-left').height() - 230
            })

        }
    })
})

$(function () {
    var seckillTime = $('.prod-time-seckillTime');
    var alltime, t1, t2


    if (localStorage.getItem('ttt')) {
        let now = Date.now();
        let ttt = parseInt(localStorage.getItem('ttt'));
        if (now - ttt > 1000 * 60 * 60 * 6) {
            localStorage.removeItem('ttt') ;
            localStorage.removeItem('time2') ;
        }
    } else {
        
        localStorage.setItem('ttt', Date.now());
    }


    if (localStorage.getItem('time2')) {
        t2 = parseInt(localStorage.getItem('time2'));
    } else {
        var d = new Date();
        t1 = d.getTime();
        t2 = t1 + 1000 * 60 * 60 * 6;
        alltime = t2 - t1;
        localStorage.setItem('time2', t2);
    }


    var timer = setInterval(() => {
        t1 = Date.now();
        alltime = t2 - t1;
        var timehour = parseInt(((alltime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        var timeminute = parseInt((alltime % (1000 * 60 * 60)) / (1000 * 60));
        var timesecond = parseInt((alltime % (1000 * 60)) / 1000);

        seckillTime.text(`距结束 ${timehour} 时 ${timeminute} 分 ${timesecond} 秒`)
    }, 1000);
});

$(function () {
    var xm1Item = $('.choose-xm1 li');
    var xm2Item = $('.choose-xm2 li');
    var sliderWrap = $('.sliderWrap');
    var timer;
    var namearr, colorStr = '全息幻彩蓝';

    // 点击选择版本触发事件
    xm1Item.each(function (index, item) {
        let price = parseFloat($(item).find('.spice').text());

        $(item).on('click', function () {
            namearr = $(item).find('.name').text().split('+');
            if (index == 2) {
                $('.prod-time').hide();
                $('.prod-price').find('del').hide();
                $('.prod-flow').show();
                xm2Item.eq(3).show().siblings().hide();
                xm2Item.eq(3).addClass('active');
                $('.pro-list').find('em').text('小米9 全网通版 8GB+256GB 透明版')
                    .next('del').hide().next('span').text(`${price}元`);
                sliderWrap[0].innerHTML = '';
                for (var i = 1; i <= 4; i++) {
                    sliderWrap[0].innerHTML += `<img src="../static/images/prod_view1/pms3_${i}.jpg" alt="">`;
                }
                $('.control-direction').show();
                opcityMove();

            }
            else {
                $('.prod-time').show();
                $('.prod-price').find('del').show();
                $('.prod-flow').hide();
                xm2Item.eq(3).hide().siblings().show();
                $('.pro-list-item').find('.price').text(`${price}元`);
                // xm2Item.eq(0).addClass('active');
                sliderWrap.html(
                    `<img src="../static/images/prod_view1/pms0_1.jpg" alt="">`
                );
                $('.control-direction').hide();
                $('.pro-list-item').find('em').text('小米9 全网通版 ' + namearr[0] + '内存 ' + colorStr + ' ' + namearr[1]);
            }
            totlePrice();
            $('.prod-time-con').find('.price').text(`${price}元`);
            $('.prod-price').find('.price').text(`${price}元`);
            $(item).addClass('active').siblings().removeClass('active');
        });
    });

    // 点击选择颜色触发事件
    xm2Item.each(function (index, item) {
        $(item).click(function () {
            sliderWrap.html(
                `<img src="../static/images/prod_view1/pms${index}_1.jpg" alt="">`
            );
            $(this).addClass('active').siblings().removeClass('active');
            colorStr = $(item).find('.text').text();
            $('.pro-list-item').find('em').text('小米9 全网通版 ' + namearr[0] + '内存 ' + colorStr + ' ' + namearr[1]);
        })
    })


    // 计算总价
    function totlePrice() {
        var proItem = $('.pro-list-item');
        var totle = $('.totle');
        var sum = 0;

        proItem.each(function (index, item) {
            sum += parseInt($(item).find('span').text());
        });

        totle.text(sum);
    }


    $('.serverJs').on('click', 'li', function () {
        $(this).toggleClass('active').siblings().removeClass('active');
        //每次点击将之前添加的清空
        $('.serviceItem').remove();
        //获取用户操作之后每次所选中的服务，进行添加计算
        $('.serverJs .active').each(function(index,item){
            let em=$(item).find('.name').text();
            let price=$(item).find('.price').text();
            $('.totlePrice').before(
                `<li class="pro-list-item clear serviceItem">
                    <em>${em}</em>
                    <span class="price">${price}</span>
                </li>`
            );
        });
        
        totlePrice();
    })


    //产品展示图轮播
    function opcityMove() {
        var imgs = sliderWrap.find('img');
        ($('.default-page')[0]).innerHTML = '';
        for (let i = 0; i < imgs.length; i++) {
            imgs.css('opacity', 0.3);
            ($('.default-page')[0]).innerHTML += '<div class="page-item"></div>';
        }
        $('.control-direction').show();

        var index = 0;
        imgs.eq(index).css('zIndex', 51);
        imgs.eq(index).animate({ "opacity": 1 });
        $('.page-item').eq(index).addClass('active');
        function autoMove() {
            timer = setInterval(() => {
                imgdown();
                index++;
                if (index >= imgs.length) {
                    index = 0;
                }
                imgup();
            }, 2000);
        }

        $('.next').on('click', function () {
            clearInterval(timer);
            imgdown();
            index++;
            if (index >= imgs.length) {
                index = 0;
            }
            imgup();
            autoMove();
        });
        $('.prev').on('click', function () {
            clearInterval(timer);
            imgdown();
            index--;
            if (index <= 0) {
                index = imgs.length - 1;
            }
            imgup();
            autoMove();
        });
        $('.default-page').on('click', '.page-item', function () {
            clearInterval(timer);
            imgdown();
            index = $(this).index();
            imgup();
            autoMove();
        });

        function imgup() {
            imgs.eq(index).css('zIndex', 51);
            imgs.eq(index).animate({ "opacity": 1 });
            $('.page-item').eq(index).addClass('active');
        }
        function imgdown() {
            imgs.eq(index).css({ 'zIndex': 50, "opacity": 0.3 });
            $('.page-item').eq(index).removeClass('active');
        }
    }


});