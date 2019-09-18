(function() {

  // 公共js

  // 商品支持部分
  // 当点击图片容器的 li 时，获取到图片的 src，赋值给显示图片的 src
  // 并且给点击的 li 添加 类，其他兄弟都移除类

  let $imgsWrap = $('.imgsWrap');
  let $showImg = $('.showImg img');
  $imgsWrap.on('click', 'li', function () {

    $(this).addClass('.show').siblings().removeClass('.show');
    let src = $(this).children('img').eq(0).attr('src');
    

  });


})();