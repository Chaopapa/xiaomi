(function () {

  // 公共js

  // 点击图片部分，跟官网不太一样，有时间再改
  (function () {
    // 商品支持部分
    // 当点击图片容器的 li 时，获取到图片的 src，赋值给显示图片的 src
    // 并且给点击的 li 添加 类，其他兄弟都移除类

    let $imgsWrap = $('.imgsWrap');
    let $showImg = $('.showImg img');
    let $mainWrap = $('.mainWrap');
    let $top = $('.top');
    let $bottom = $('.bottom');
    let imgH = $('.imgsWrap li img').eq(0).width();
    let lis = $('.imgsWrap li');
    let index = 0; // 保存当前选中的 li

    // 事件委托，点击图片
    $imgsWrap.on('click', 'li', function () {

      $(this).addClass('show').siblings().removeClass('show');
      let src = $(this).children('img').eq(0).attr('src');
      $showImg.attr('src', src);

      index = $(this).index();

    });

    // 点击上下按钮 
    // 如果点击上按钮，$mainWrap 使用 animation 方法向上移动一个图片的距离
    // 如果点击下按钮, $mainWrap 使用 animation 方法向下移动一个图片的距离
    // 判断，如果滚动条的 scrollTop 为 0 不移动
    // 判断，如果滚动条的 screenTop >= imgsWrap 的长度，则不移动

    $top.click(function () {

      let scrollT = $mainWrap.scrollTop(); // 获取当前元素滚动条的 scrollTop

      $mainWrap.animate({
        scrollTop: scrollT - imgH
      });

      index--;
      if (index <= 0) {
        index = 0;
      }

      lis.eq(index).addClass('show').siblings().removeClass('show');

    });

    $bottom.click(function () {

      let scrollT = $mainWrap.scrollTop(); // 获取当前元素滚动条的 scrollTop

      $mainWrap.animate({
        scrollTop: scrollT + imgH
      });

      index++;
      if (index >= lis.length - 1) {
        index = lis.length - 1;
      }

      lis.eq(index).addClass('show').siblings().removeClass('show');

    });

  })();

  

})();