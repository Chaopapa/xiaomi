// 公共
// 'use strict'

//  z-headerWrap S

// 经过 m-rules 的时候显示 m-clause-con
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

// banner 轮播图
(function () {

  // 先获取元素
  let $main = $('.main');
  let $imgs = $('.imgs img');
  let $left = $('.left');
  let $right = $('.right');
  let $lis = $('.nums li');
  let img1W = $imgs.eq(0).width();
  let imgIndex = 1; // 默认从第一张开始
  let numIndex = 0; // imgIndex 比 numIndex + 1
  let timer1 = null;

  // 首先图片会停留在第一张
  $main[0].scrollLeft = img1W;
  $lis.eq(0).addClass('now');

  // 自动轮播
  autoMove();

  function autoMove() {
    clearInterval(timer1);
    timer1 = setInterval(function () {
      imgIndex++;
      if (imgIndex >= $imgs.length) {
        imgIndex = 2;
      }

      numIndex++;
      if (numIndex >= $lis.length) {
        numIndex = 0;
      }

      $lis.eq(numIndex).addClass('now').siblings().removeClass('now');
      // $main[0].scrollLeft = img1W * imgIndex;
      $main.animate({
        scrollLeft: img1W * imgIndex
      }, 10, 'swing');

    }, 3000)
  }

  // 左箭头点击
  $left.click(function () {
    clearInterval(timer1);

    imgIndex--;
    if (imgIndex < 0) {
      imgIndex = $imgs.length - 3;
    }

    numIndex--;
    if (numIndex < 0) {
      numIndex = $lis.length - 1;
    }

    $lis.eq(numIndex).addClass('now').siblings().removeClass('now');
    $main.animate({
      scrollLeft: img1W * imgIndex
    }, 10, 'swing');

    autoMove();
  })

  // 右箭头点击
  $right.click(function () {
    clearInterval(timer1);

    imgIndex++;
    if (imgIndex >= $imgs.length) {
      imgIndex = 2;
    }

    numIndex++;
    if (numIndex >= $lis.length) {
      numIndex = 0;
    }

    $lis.eq(numIndex).addClass('now').siblings().removeClass('now');
    $main.animate({
      scrollLeft: img1W * imgIndex
    }, 10, 'swing');

    autoMove();
  })

  // 点击小圆点切换
  $lis.click(function () {

    clearInterval(timer1);

    numIndex = $(this).index();
    imgIndex = numIndex + 1;

    $lis.eq(numIndex).addClass('now').siblings().removeClass('now');
    $main.animate({
      scrollLeft: img1W * imgIndex
    }, 10, 'swing');

    autoMove();

  })

})();


// z-bannerWrap E

// 每日新品
// z-newPro S

// z-newPro E

// 小米众筹
// z-crowdFunding S

// z-crowdFunding E 


// 限时抢购
// Z-timeLimited S
// 限时抢购倒计时
// 封装个倒计时函数：
// 第一个时间对象: 现在的时间
// 第二个时间对象：现在的时间 + 5 小时
// 两个时间倒计时，每隔一秒动态渲染到页面上

// 设置个倒计时，每隔固定时间(暂定 5 小时，调用一次倒计时函数)

// 天: 24 * 60 * 60 * 1000
// 小时: 60 * 60 * 1000
// 分钟: 60 * 1000
// 秒: 1000
// 毫秒: 1

// 这里本来应该存进 cookie 中去 或 localStorage 中，等待写

(function () {

  // 获取页面上的元素
  let $hour = $('.hours');
  let $minutes = $('.minutes');
  let $seconds = $('.seconds');

  let expectedHour = 5; // 存放倒计时时长
  let timer = null; // 定时器

  countdown(expectedHour); // 调用倒计时

  // 倒计时函数
  function countdown(expectedHour) {
    let startDate = new Date().getTime(); // 开始时间
    let endDate = new Date(startDate + expectedHour * 60 * 60 * 1000).getTime(); // 结束时间

    // 设置一个定时器，每秒都去获取
    clearInterval(timer);
    timer = setInterval(function () {

      let nowDate = new Date()
      let nowDateTime = nowDate.getTime(); // 每秒的时间

      let intervalTime = endDate - nowDateTime; // 间隔时间

      if (intervalTime >= 0) {

        let hours = parseInt(intervalTime / (60 * 60 * 1000)); // 小时
        let minutes = parseInt((intervalTime - (hours * 60 * 60 * 1000)) / (60 * 1000)); // 分钟
        let seconds = 60 - nowDate.getSeconds(); // 秒钟

        hours = hours > 9 ? hours : '0' + hours;
        minutes = minutes > 9 ? minutes : '0' + minutes;
        seconds = seconds > 9 ? seconds : '0' + seconds;

        $hour.text(hours);
        $minutes.text(minutes);
        $seconds.text(seconds);

      } else {
        clearInterval(timer);
      }

    }, 1000);
  }
})();


// 动态渲染列表  点击时候的样式还有些问题，暂时先这样吧

function drawContent() {
  let $mainBox = $('.mainBox');
  // let $imgsBox = $('.imgsBox');
  // let $leftT = $('.leftT');
  // let $rightT = $('.rightT');
  // let sroLeft = 0;
  // let jsonUrl = '';

  for (let i = 0; i < $mainBox.length; i++) {
    // 获取 $mainBox 上的自定义属性，判断 url
    let type = $mainBox.eq(i).attr('data-type');

    // 相当于是路由分配
    switch (type) {
      case 'timeLimited':
        jsonUrl = '../static/scripts/youpingJs/timeItem.json';
        getData(jsonUrl, $mainBox.eq(i));
        break;
      case 'newPro':
        jsonUrl = '../static/scripts/youpingJs/newPro.json';
        getData2(jsonUrl, $mainBox.eq(i));
        break;
      case 'hot':
        jsonUrl = '../static/scripts/youpingJs/hotItem.json';
        getData2(jsonUrl, $mainBox.eq(i));
        break;
      case 'advice':
        jsonUrl = '../static/scripts/youpingJs/advice.json';
        getData(jsonUrl, $mainBox.eq(i));
        break;
    }
  }


  // 限时抢购类型的路由
  function getData(jsonUrl, dom) {

    let $imgsBox = dom.children('.imgsBox');
    let $leftT = dom.parent().children('.leftT');
    let $rightT = dom.parent().children('.rightT');
    let sroLeft = 0;

    if (sroLeft == 0) {
      $leftT.mouseenter(function () {
        $(this).css('background-position', '0 -1924px'); // 默认左边是不会显示可点击的图片的
      })
    }

    // 发送 ajax 请求获取数据
    $.ajax({
      type: 'get',
      url: jsonUrl,
      dataType: 'json',
      success: function (json) {
        let tmpStr = '';
        for (let i = 0; i < json.length; i++) {
          tmpStr += ` <li class="timeItem">
        <img src="${json[i].imgUrl}" alt="" class="conImg">
        <div class="con">
          <h6 class="tit">${json[i].tit}</h6>
          <p class="nowPrice">${json[i].nowPrice}<i class="oldPrice">${json[i].oldPrice}</i></p>
        </div>
      </li>`;
        }
        $imgsBox.html(tmpStr); // 动态渲染到页面上

        // 点击左右按钮，每次偏移 timeItem 的长度为 270 px
        // 点击左边，每次 $main 的 scrollLeft - 270
        // 当 scrollLeft 为 0 时，禁止点击，显示蒙层 / return false
        // 点击右边，每次 $main 的 scrollLeft + 270
        // 当 scrollLeft 为 最大长度时(json.length * 270) 时，禁止点击，显示蒙层 return false

        $leftT.click(function () {
          // 先判断，再减 
          if (sroLeft == 0) {
            $leftT.mouseenter(function () {
              $(this).css('background-position', '0 -1798px'); // 不是 0 则显示可点击
            });
            return false;
          }
          sroLeft -= 270;
          dom.animate({
            scrollLeft: sroLeft
          });
        });


        $rightT.click(function () {

          $leftT.mouseenter(function () {
            $(this).css('background-position', '0 -1798px'); // 不是 0 则显示可点击
          });
          $leftT.mouseout(function () {
            $(this).css('background-position', '0 -1924px'); // 不是 0 则显示可点击
          });

          // 先判断，再加
          if (sroLeft == (json.length - 4) * 270) {
            $rightT.css('background-position', '0 -1840px');
            return false;
          }
          sroLeft += 270;
          dom.animate({
            scrollLeft: sroLeft
          });
        });

      },
      error: function (err) {
        console.log(err);
      }
    });

  }


  function getData2(jsonUrl, dom) {

    let $imgsBox = dom.children('.imgsBox');
    let $leftT = dom.parent().children('.leftT');
    let $rightT = dom.parent().children('.rightT');
    let sroLeft = 0;

    if (sroLeft == 0) {
      $leftT.mouseenter(function () {
        $(this).css('background-position', '0 -1924px'); // 默认左边是不会显示可点击的图片的
      })
    }

    // 发送 ajax 请求获取数据
    $.ajax({
      type: 'get',
      url: jsonUrl,
      dataType: 'json',
      success: function (json) {
        let tmpStr = '';
        for (let i = 0; i < json.length; i++) {
          tmpStr += `  <li class="timeItem">
          <img src="${json[i].imgUrl}" alt="" class="conImg">
          <div class="con">
            <h6 class="tit">${json[i].tit}</h6>
            <p class="into">${json[i].into}</p>
            <p class="nowPrice">${json[i].price}</p>
          </div>
        </li>`;
        }
        $imgsBox.html(tmpStr); // 动态渲染到页面上

        // 点击左右按钮，每次偏移 timeItem 的长度为 270 px
        // 点击左边，每次 $main 的 scrollLeft - 270
        // 当 scrollLeft 为 0 时，禁止点击，显示蒙层 / return false
        // 点击右边，每次 $main 的 scrollLeft + 270
        // 当 scrollLeft 为 最大长度时(json.length * 270) 时，禁止点击，显示蒙层 return false

        $leftT.click(function () {
          // 先判断，再减 
          if (sroLeft == 0) {
            $leftT.mouseenter(function () {
              $(this).css('background-position', '0 -1798px'); // 不是 0 则显示可点击
            });
            return false;
          }
          sroLeft -= 270;
          dom.animate({
            scrollLeft: sroLeft
          });
        });


        $rightT.click(function () {

          $leftT.mouseenter(function () {
            $(this).css('background-position', '0 -1798px'); // 不是 0 则显示可点击
          });
          $leftT.mouseout(function () {
            $(this).css('background-position', '0 -1924px'); // 不是 0 则显示可点击
          });

          // 先判断，再加
          if (sroLeft == (json.length - 4) * 270) {
            $rightT.css('background-position', '0 -1840px');
            return false;
          }
          sroLeft += 270;
          dom.animate({
            scrollLeft: sroLeft
          });
        });

      },
      error: function (err) {
        console.log(err);
      }
    });

  }

}

drawContent();

// Z-timeLimited E

// 每日新品
// Z-newPro S
// 以上渲染过
// Z-newPro E

// Z-hot S
// 以上渲染过
// Z-hot E

// Z-advice S
// 以上渲染过
// Z-advice E

/* Z-footer S */
// 底部栏
/* Z-footer E */

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