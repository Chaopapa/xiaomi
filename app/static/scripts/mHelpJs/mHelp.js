// 中间轮播图部分
(function () {

  let $swiperWrap = $('.swiperWrap');
  let imgWidth = $('.swiperWrap img').eq(0).width();
  let $imgs = $('.swiperWrap img');
  let timer = null;
  let imgIndex = 1;

  // 首先让图片处于第一张图片的位置，即 imgIndex = 1 的时候
  $swiperWrap.scrollLeft(imgWidth);

  autoMove();

  // 自动轮播
  function autoMove() {
    clearInterval(timer);
    timer = setInterval(function () {
      imgIndex++;
      if (imgIndex >= $imgs.length - 1) {
        // 立马跳到第一张图片的位置，执行到第二张图片的动画
        $swiperWrap.scrollLeft(0);
        imgIndex = 1;
      }
      $swiperWrap.animate({
        scrollLeft: imgIndex * imgWidth
      });
    }, 2000);
  }

})();

// tab 切换部分
// 默认显示第一个元素的内容
// 当点击的时候，显示对应元素的内容
(function () {

  let $tabsHeader = $('.tabsHeader');
  let $tabsBody = $('.tabsBody');

  function getData() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'get',
        url: '../static/scripts/mHelpJs/tabs.json',
        data: 'json',
        success: function (json) {
          resolve(json);
        },
        error: function (err) {
          reject(err);
        }
      });
    });
  }

  getData()
    .then(function (json) {

      let tmpHStr = '';
      let tmpBStr = '';
      for (let i = 0; i < json.length; i++) {
        tmpHStr += `<li>
      <a href="javascript:;">${json[i].title}</a>
    </li>`;
      }
      $tabsHeader.html(tmpHStr);
      // 默认第一个样式为 active
      $tabsHeader.children(':first').addClass('active');

      for (let i = 0; i < json[0].content.length; i++) {
        tmpBStr += `<li>${json[0].content[i]}</li>`;
      }
      // 默认显示第一个选择的内容
      $tabsBody.html(tmpBStr);

    }, function (err) {
      console.log(err);
    })
    .catch(function (err) {
      console.log(err);
    });

  // 当点击的时候，发送请求，切换内容
  $tabsHeader.on('click', 'li', function () {
    $(this).addClass('active').siblings().removeClass('active');
    let index = $(this).index();
    getData()
      .then(function (json) {
        let tmpBStr = '';
        for (let i = 0; i < json[index].content.length; i++) {
          tmpBStr += `<li>${json[index].content[i]}</li>`;
        }
        $tabsBody.html(tmpBStr);

      }, function (err) {
        console.log(err);
      })
      .catch(function (err) {
        console.log(err);
      });
  });


})();