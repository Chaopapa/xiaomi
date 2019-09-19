// server-banner-start
$(function () {
  var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal', // 水平切换选项
    loop: true, // 循环模式选项
    speed: 300,
    autoplay: {
      delay: 3000
    },
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  })
});
// server-banner-end

// normal-faq-start
$(function () {
  var tabTitem = $('.self-faq-tabT h3');
  var contitem = $('.self-faq-cont ul');

  tabTitem.each((index, item) => {
    $(tabTitem[index]).hover(() => {
      $(tabTitem[index]).addClass('active').siblings().removeClass('active');
      $(contitem[index]).addClass('active').siblings().removeClass('active');
    })
  })
});
// normal-faq-end

// contect-us-cont-start
$(function () {
  $('.contect-us-cont li').hover(function () {
    if ($(this).index() == 2) {
      $(this).find('.qr-img').css('display', 'block').siblings().css('display', 'none');
    }
  }, function () {
    if ($(this).index() == 2) {
      $(this).find('.qr-img').css('display', 'none').siblings().css('display', 'inline-block');
    }
  })
})
// contect-us-cont-end

// 图片懒加载

var allImgs = $('img');
window.onscroll = function () {
  imgLoad();
}
function imgLoad(){
  var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
  var winH = document.documentElement.clientHeight;
  allImgs.each(function (index, item) {
    if ($(item).offset().top >= (scrollT + winH)) {
      var imgSrc=$(item).attr('_src');
      $(item).attr('src',imgSrc);
    }
  })
}
imgLoad();