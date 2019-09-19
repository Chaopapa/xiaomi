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
        }, 5);

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
    });

});

$(function () {
    var mySwiper1 = new Swiper('#swiper-index', {
        direction: 'horizontal', // 水平切换选项
        loop: true, // 循环模式选项
        speed: 300,
        autoplay: {
            delay: 3000
        },
        pagination: {
            el: '#swiper-pagination-index',
            clickable: true,
        },
    });
});











$(function () {
    var json1 = [
        { "font1": "骁龙855旗舰处理器", "font2": "年度超旗舰处理器" },
        { "font1": "索尼 4800 万像素三摄", "font2": "年DxOMark DxOMark 拍照评分领先" },
        { "font1": "支持超广角、微距拍摄", "font2": "开启手机摄影非凡视野" },
        { "font1": "小米首款20W无线闪充", "font2": "速度堪比有线快充" },
        { "font1": "全息幻彩玻璃机身", "font2": "手心中的梦幻彩虹光" },
        { "font1": "全曲面轻薄设计", "font2": "怦然心动的好手感" },
        { "font1": "第五代极速屏下指纹", "font2": "快25% 解锁超灵敏" },
        { "font1": "三星 AMOLED 屏幕", "font2": "90.7% 超高屏占比" },
        { "font1": "标配27W 有线快充", "font2": "充满只需 60 分钟" },
        { "font1": "蓝宝石玻璃镜片", "font2": "超硬耐磨，长久保护" }
    ];

    for (var key in json1) {
        $('.section-spec ul')[0].innerHTML += `<li><div class="font1">${json1[key].font1}</div><div class="font2">${json1[key].font2}</div></li>`
    }


});

$(function () {

    window.onscroll = function () {
        var scrollT = $(document).scrollTop();
        var winH = document.documentElement.clientHeight;
        $('.txt').each(function (index, item) {
            if ($(item).offset().top < scrollT + winH) {
                $(item).find('.text-fr').addClass('anima-up');
                $(item).find('.text-fr').each(function (k, t) {
                    let cName = "delay-'+k"
                    $(t).addClass('delay-' + k * 5);
                });
            }

        });

        $('.section-spec ul').each(function (index, item) {
            if ($(item).offset().top < scrollT + winH) {
                $(item).find('li').addClass('anima-up');
                $(item).find('li').each(function (k, t) {
                    let cName = "delay-'+k"
                    $(t).addClass('delay-' + k * 2);
                })
            }
        })
    }

});

$(function () {
    $('.togglebtn .btn').each(function (index, item) {
        $(item).on('click', function () {
            console.log(index);
            $(this).addClass('active').siblings().removeClass('active');
            $('#toggleVideo .item').eq(index).animate({ "opacity": 1 }).siblings().css({ "opacity": 0 });
            $('#toggleVice .item').eq(index).show().siblings().hide();
        });
    });
});

$(function () {
    var mySwiper2 = new Swiper('#swiper-imgs', {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 700,
        allowTouchMove: false,
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 3,
        },
        centeredSlides: true,
        spaceBetween: 5,
        loop: true,
        slidesPerView: 'auto',
        pagination: {
            el: '#swiper-pagination-imgs',
            clickable: true,
        },
        // slidesOffsetBefore : 100,
    });
});

$(function () {
    var mySwiper3 = new Swiper('#swiper-temp', {
        direction: 'horizontal', // 水平切换选项
        loop: true, // 循环模式选项
        speed: 300,
        autoplay: {
            delay: 3000
        },
        pagination: {
            el: '#swiper-pagination-temp',
            clickable: true,
        },
    });
});


$(function () {
    var vidShow = $('.video-wrap .play');
    var vidPlay = $('.mi-popup .play');
    var layer = $('.layer-full');
    var bigVid = $('.mi-popup');
    var close = $('.mi-popup .close');
    var video = document.getElementById('fds');

    vidShow.on('click', function () {
        layer.show();
        bigVid.show();
        video.play();
    });
    close.click(function () {
        layer.hide();
        bigVid.hide();
        video.pause();
    });

    // video.addEventListener('click', function () {

    // });

    // vidPlay.click(function () {
        
    // });
    console.log(vidPlay);
    video.onclick=function(){
        if (video.paused) {
            vidPlay.hide();
        } else {
           
            vidPlay.show(); 
        }
    }
    vidPlay.onclick=function(){
        if (video.paused) {
            vidPlay.hide();
        } else {
           
            vidPlay.show(); 
        }
    }
})