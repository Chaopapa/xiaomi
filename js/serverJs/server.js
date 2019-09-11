// server-banner-start
$(function () {
var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项
    speed:300,
    autoplay : {
      delay:3000
    },
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable :true,
    }
  })   
});     
// server-banner-end

// normal-faq-start
$(function(){
    var tabTitem=$('.self-faq-tabT h3');
    var contitem=$('.self-faq-cont ul');

    tabTitem.each((index,item)=>{
        $(tabTitem[index]).hover(()=>{
            $(tabTitem[index]).addClass('active').siblings().removeClass('active');
            $(contitem[index]).addClass('active').siblings().removeClass('active');
        })
    })
});
// normal-faq-end