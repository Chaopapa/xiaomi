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

  // 数量的点击事件
  (function() {
    // 点击数量 + 1
    let $reduce = $('.num .reduce');
    let $number = $('.num .number');
    let $add = $('.num .add');
    let num = $number.val(); // 保存 数量 的值
    let sum = 1000; // 假设商品的总库存是 1000

    $reduce.click(function () {
      num --;
      // 当数量为 1 的时候，减法的颜色恢复
      if (num == 1) {
        $reduce.css('color', '#ddd');
      }
      if (num <= 0) {
        $reduce.css('cursor', 'not-allowed');
        num == 1;
        return false;
      }
      $number.val(num);
    });

    $add.click(function () {
      // 当数量不为 1 的时候，减法的颜色变成可点击的颜色
      $reduce.css('color', '#5f2f07');
      num ++;
      if (num > sum) {
        num == sum;
        alert('库存不足');
        return false;
      }
      $number.val(num);
    });

  })();

  // 型号的点击事件
  (function() {
    let $white =$('.model .white');
    let $black =$('.model .black');

    // 当点击的时候改变边框颜色
    $white.click(function() {
      $(this).css('border', '1px solid #5f2f07');
      $black.css('border','1px solid #e4e4e4');
    });

    $black.click(function() {
      $(this).css('border', '1px solid #5f2f07');
      $white.css('border','1px solid #e4e4e4');
    });

  })();

})();