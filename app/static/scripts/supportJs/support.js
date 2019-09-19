(function () {

  // 公共js

  // 图片的点击部分
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

      let scrollT = $mainWrap.scrollTop(); // 获取当前元素滚动条的 scrollTop

      index = $(this).index();

      // 需要判断 index 比之前的更

      if (index <= lis.length - 4) {
        $mainWrap.animate({
          scrollTop: scrollT - imgH
        });
      }

      if (index >= 3) {
        $mainWrap.animate({
          scrollTop: scrollT + imgH
        });
      }


      $(this).addClass('show').siblings().removeClass('show');
      let src = $(this).children('img').eq(0).attr('src');
      $showImg.attr('src', src);

    });

    // 点击上下按钮 
    // 如果点击上按钮，$mainWrap 使用 animation 方法向上移动一个图片的距离
    // 如果点击下按钮, $mainWrap 使用 animation 方法向下移动一个图片的距离
    // 判断，如果滚动条的 scrollTop 为 0 不移动
    // 判断，如果滚动条的 screenTop >= imgsWrap 的长度，则不移动

    // 点击上箭头
    $top.click(function () {

      let scrollT = $mainWrap.scrollTop(); // 获取当前元素滚动条的 scrollTop

      index--;
      if (index <= 0) {
        index = 0;
      }

      lis.eq(index).addClass('show').siblings().removeClass('show');

      if (index <= lis.length - 4) {
        $mainWrap.animate({
          scrollTop: scrollT - imgH
        });
      }

    });

    // 点击下箭头
    $bottom.click(function () {

      let scrollT = $mainWrap.scrollTop(); // 获取当前元素滚动条的 scrollTop

      index++;
      if (index >= lis.length - 1) {
        index = lis.length - 1;
      }

      lis.eq(index).addClass('show').siblings().removeClass('show');

      if (index >= 3) {
        $mainWrap.animate({
          scrollTop: scrollT + imgH
        });
      }

    });

  })();

  // 数量的点击事件
  (function () {
    // 点击数量 + 1
    let $reduce = $('.num .reduce');
    let $number = $('.num .number');
    let $add = $('.num .add');
    let num = $number.val(); // 保存 数量 的值
    let sum = 1000; // 假设商品的总库存是 1000

    $reduce.click(function () {
      num--;
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
      num++;
      if (num > sum) {
        num == sum;
        alert('库存不足');
        return false;
      }
      $number.val(num);
    });

  })();

  // 型号的点击事件
  (function () {
    let $white = $('.model .white');
    let $black = $('.model .black');

    // 当点击的时候改变边框颜色
    $white.click(function () {
      $(this).css('border', '1px solid #5f2f07');
      $black.css('border', '1px solid #e4e4e4');
    });

    $black.click(function () {
      $(this).css('border', '1px solid #5f2f07');
      $white.css('border', '1px solid #e4e4e4');
    });

  })();

  // 有品页面的 js
  // 经过 m-rules 的时候显示 m-clause-con
  (function () {
    function showClause() {
      $('.m-rules').on('mouseover', function () {
        $('.m-clause-con').show();
      });
      $('.m-rules').on('mouseout', function () {
        $('.m-clause-con').hide();
      });
    }
    showClause();

    // z-headerWrap E

    // z-navWrap S

    // 当点击 searchIpt 的时候 border-bottom 颜色变成 #845f3f
    function changeColor() {
      $('.searchIpt').on('focus', function () {
        $('.search_form').css('border-color', '#845f3f');
      });
      $('.searchIpt').on('blur', function () {
        $('.search_form').css('border-color', '#efefef');
      });
    }
    changeColor();

    // 关键字搜索
    (function () {

      // 当点击了搜索框，输入文字时，发送 ajax 请求，当有匹配的元素中,增加到 ul 中
      //   百度关键词：
      // url地址:http://suggestion.baidu.com/su

      // -----请求参数-----
      //    cb      回调函数
      //    wd      关键词

      // -----返回数据-----
      // JSON返回示例：
      // {
      //    q: "123",
      //    p: false,
      //    s: [
      //       0: "12306"
      //       1: "12306铁路客户服务中心"
      //       2: "12306火车票网上订票官网"
      //       3: "12333"
      //       4: "12333社保查询网"
      //       5: "12306验证码识别"
      //       6: "123网址之家"
      //       7: "12345"
      //       8: "123456hd"
      //       9: "12308"
      //    ]
      // }

      let $input = $('.search_form .searchIpt');
      let $searchKeyCon = $('.searchCon .searchKeyCon');

      $input.keyup(function () {

        let value = $input.val();

        if (value == '') {
          $searchKeyCon.css('display', 'none');
          return false;
        }

        // 当输入框 输入时
        // 发送 ajax 获取到数据，动态添加到 searchKeyCon 中，再显示 searchKeyCon
        $.ajax({
          type: 'get',
          url: 'http://suggestion.baidu.com/su',
          dataType: 'jsonp',
          jsonp: 'cb',
          jsonpCallback: 'myCallback',
          timeout: 4000,
          data: `wd=${value}`,
          success: function (json) {
            let tmpStr = '';
            // 如果没有关键字
            if (json.s.length == 0) {
              console.log(1)
              // 不能直接写在页面上，不然会被覆盖
              tmpStr += `<li class="noData">小主，暂无数据哦 ~</li>`;
            } else {
              for (let i = 0; i < json.s.length; i++) {
                tmpStr += `<li>${json.s[i]}</li>`;
              }
            }

            $searchKeyCon.html(tmpStr);
            $searchKeyCon.css('display', 'block');

          },
          error: function (err) {
            console.log(err);
          }
        });

      });





    })();

    // 当滚动到一定高度时,z-navWrap 板块变成了粘性定位
    $(window).scroll(function (e) {
      let $navWrap = $('.z-navWrap');
      let $classify = $('.classify')
      let scrollT = $(this).scrollTop();
      if (scrollT > 484) { // 临界值元素会闪烁
        $navWrap.addClass('stickyWrap');
        $classify.css('display', 'block');
      } else {
        $navWrap.removeClass('stickyWrap');
        $classify.css('display', 'none');
      }
    });
    // z-navWrap E

    // z-bannerWrap S

    // navList 动态渲染
    renderNavList();

    function renderNavList() {
      let conItem = [];
      let h3Item = [];
      let tmpStr = '';
      let $navListUl = $('.navListUl');


      // 这里形成了回调地狱，需要改进，后面用 promise 改进
      // 请求 conItem 数据 地址相对于网页而来
      $.ajax({
        url: '../static/scripts/youpingJs/conItem.json',
        type: 'get',
        dataType: 'json',
        success: function (json) {
          conItem = json;
          // console.log(conItem);

          // 请求 h3Item 数据
          $.ajax({
            url: '../static/scripts/youpingJs/h3Item.json',
            type: 'get',
            dataType: 'json',
            success: function (json) {
              h3Item = json;
              // console.log(h3Item);
              // 遍历数组中的元素，动态渲染
              for (let i = 0, len = h3Item.length; i < len; i++) {
                tmpStr += `<li class="listItem">
                          <h3 class="h3Item">
                            <a href="#">${h3Item[i].firstA}</a>
                            <span>/</span>
                            <a href="#">${h3Item[i].secondA}</a>
                          </h3><div class="conItem">`;
                for (let j = 0, length = conItem.length; j < length; j++) {
                  tmpStr += `
                        <h5>${conItem[j].title}</h5> <ul class="clearfix">`;
                  for (let c = 0, lengt = conItem[j].listItem.length; c < lengt; c++) {
                    tmpStr += `
                  <li>
                    <img src="${conItem[j].listItem[c].imgUrl}" alt="">
                    <span>${conItem[j].listItem[c].spanCon}</span>
                  </li>`;
                  }
                  tmpStr += `</ul>
              `;
                }
                tmpStr += `</div></li>`;
              }

              // console.log(tmpStr);
              $navListUl.html(tmpStr);

            },
            error: function (code) {
              console.log(code);
            }
          })
        },
        error: function (code) {
          // console.log(code);
        }


      });

    }
  })();

  // Z-sideBar S

  (function () {

    // 点击回到顶部： 一： 锚点链接 二： 定时器

    // 点击回到顶部的时候，获取当前页面的滚动条
    // 设置一个定时器，每次减去多少，知道页面的 scrollTop 等于 0 清除定时器
    // 直接使用动画了，不封装函数了
    // 注意: 使用 html, 不要使用 document 和 window ，也不要使用 body

    let timer; // 设置定时器
    let $toTop = $('.toTop');

    $toTop.click(function () {
      if ($('html').scrollTop() <= 0) {
        return false;
      }
      $('html').animate({
        scrollTop: 0
      });
    });

  })();

  // Z-sideBar E

})();