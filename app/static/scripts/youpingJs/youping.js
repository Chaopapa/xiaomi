// 公共
// 'use strict'

//  z-headerWrap S

// 经过 m-rules 的时候显示 m-clause-con
function showClause() {
  $('.m-rules').on('mouseover', function () {
    $('.m-clause-con').show();
  })
  $('.m-rules').on('mouseout', function () {
    $('.m-clause-con').hide();
  })
}
showClause();

// z-headerWrap E

// z-navWrap S

// 当点击 searchIpt 的时候 border-bottom 颜色变成 #845f3f
function changeColor() {
  $('.searchIpt').on('focus', function () {
    $('.search_form').css('border-color', '#845f3f');
  })
  $('.searchIpt').on('blur', function () {
    $('.search_form').css('border-color', '#efefef');
  })
}
changeColor();

// 当滚动到一定高度时,z-navWrap 板块变成了粘性定位
$(window).scroll(function(e) {
  let $navWrap = $('.z-navWrap');
  let $classify = $('.classify')
  let scrollT = $(this).scrollTop();
  if (scrollT > 484) { // 临界值元素会闪烁
    $navWrap.addClass('stickyWrap'); 
    $classify.css('display', 'block');
  }else {
    $navWrap.removeClass('stickyWrap');
  }
})
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


  })

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
  let numIndex = 0;// imgIndex 比 numIndex + 1
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
  $left.click(function() {
    clearInterval(timer1);
    
    imgIndex --;
    if (imgIndex < 0) {
      imgIndex = $imgs.length -3;
    }

    numIndex --;
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
    $right.click(function() {
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
    $lis.click(function() {

      clearInterval(timer1);

      numIndex = $(this).index();
      imgIndex = numIndex + 1;

      $lis.eq(numIndex).addClass('now').siblings().removeClass('now');
      $main.animate({
        scrollLeft: img1W * imgIndex
      }, 10, 'swing');

      autoMove();
      
    })

})()


// z-bannerWrap E

// z-newPro S

// z-newPro E

// z-crowdFunding S

  


// z-crowdFunding E 

