// 公共功能

// 判断是否在某一时间段
// 参数形式: '13:34'
// 首先判断传入的格式是否正确 
// 获得毫秒数相减，判断是否在某一区间
// 抢购中: 1
// 即将开始: 2
// 活动已结束: 3
// 活动未开始: 4
function timeRange(beginTime, endTime, nowTime) {
  let strb = beginTime.split(':');
  let stre = endTime.split(':');
  let strn = nowTime.split(':');

  if (strb.length != 2 || stre.length != 2 || strn.length != 2) {
    console.log('请传入正确的时间格式');
    return false;
  }

  let b = new Date();
  b.setHours(strb[0]);
  b.setMinutes(strb[1]);

  let e = new Date();
  e.setHours(stre[0]);
  e.setMinutes(stre[1]);

  let n = new Date();
  n.setHours(strn[0]);
  n.setMinutes(strn[1]);

  let nTime = n.getTime();
  let bTime = b.getTime();
  let eTime = e.getTime();
  let halfTime = 30 * 60 * 1000;

  // 进行判断 
  if (nTime - bTime > 0 && nTime - eTime < 0) {
    return 1;
  } else if (0 < bTime - nTime && bTime - nTime < halfTime) {
    return 2;
  } else if (eTime - nTime < 0) {
    return 3;
  } else {
    return 4;
  }

}

// 小米秒杀部分
(function () {

  let $tabsHeader = $('.tabsHeader');
  let $secondsKillContent = $('.secondsKillContent');

  // 获取数据, 返回 promise
  function getData() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'get',
        url: '../static/scripts/secondsKillJs/secondsKill.json',
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

  // 传入 json 数据 和 判断字符，返回渲染的字符串
  function renderStr(num, json, i) {
    let tmpBStrNow = ''; // 现在抢购的内容
    let tmpBStrOver = ''; // 抢购结束的内容
    let tmpBStrFuture = ''; // 抢购未开始的内容


    // 当点击事件发生时会进行的判断
    if (num == 1) {
      for (let j = 0; j < json[i].content.length; j++) {
        tmpBStrNow += `
            <li class="clearfix">
            <img src="${json[i].content[j].imgUrl}" class="tabImg fl">
            <div class="tabConWrap fr">
              <h4 class="tit">${json[i].content[j].tit}</h4>
              <span class="intro">${json[i].content[j].intro}</span>
              <p class="price"><span class="nowPrice">${json[i].content[j].nowPrice}元</span><span class="oldPrice">${json[i].content[j].oldPrice}元</span></p>
              <a href="javascript:;" class="now">登录后抢购</a>
            </div>
          </li>`;
      }
    } else if (num == 3) {
      for (let j = 0; j < json[i].content.length; j++) {
        tmpBStrOver += `
            <li class="clearfix">
            <img src="${json[i].content[j].imgUrl}" class="tabImg fl">
            <div class="tabConWrap fr">
              <h4 class="tit">${json[i].content[j].tit}</h4>
              <span class="intro">${json[i].content[j].intro}</span>
              <p class="percent"><span class="percentBar"><i></i></span><span class="percentNum">100%</span></p>
              <p class="price"><span class="nowPrice">${json[i].content[j].nowPrice}元</span><span class="oldPrice">${json[i].content[j].oldPrice}元</span></p>
              <a href="javascript:;" class="over">已结束</a>
            </div>
          </li>`;
      }
    } else if (num == 4) {
      for (let j = 0; j < json[i].content.length; j++) {
        tmpBStrOver += `
            <li class="clearfix">
            <img src="${json[i].content[j].imgUrl}" class="tabImg fl">
            <div class="tabConWrap fr">
              <h4 class="tit">${json[i].content[j].tit}</h4>
              <span class="intro">${json[i].content[j].intro}</span>
              <p class="price"><span class="nowPrice">${json[i].content[j].nowPrice}元</span><span class="oldPrice">${json[i].content[j].oldPrice}元</span></p>
              <a href="javascript:;" class="future">未开始</a>
              <p class="remind">已有<span class="remindNum">33</span>人设置提醒</p>
            </div>
          </li>`;
      }
    }

    return {
      tmpBStrNow,
      tmpBStrOver,
      tmpBStrOver
    }

  }



  // 渲染头部
  getData()
    .then(function (json) {
      let tmpHStr = ''; // 头部的渲染字符串
      let tmpBStrArr = []; // 存放调用函数返回的对象
      let d = new Date();
      let h = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
      let m = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
      let nowTime = `${h}:${m}`;
      for (let i = 0; i < json.length; i++) {

        let e = new Date();
        let startTime = json[i].time;
        let arr1 = startTime.split(':');
        let eH = (parseInt(arr1[0]) + 3) > 9 ? (parseInt(arr1[0]) + 3) : '0' + (parseInt(arr1[0]) + 3);
        let endTime = `${eH}:00`;
        // 进行判断
        let num = timeRange(startTime, endTime, nowTime);

        let tmpInfo = '';
        // 根据返回的数字进行判断 // 正在抢购: 1  即将开始: 2  活动已结束: 3  活动未开始: 4
        switch (num) {
          case 1:
            tmpInfo = '正在抢购';
            break;
          case 2:
            tmpInfo = '即将开始';
            break;
          case 3:
            tmpInfo = '活动已结束';
            break;
          case 4:
            tmpInfo = '活动未开始';
            break;
        }


        // 如果 num 等于 1 ，说明正在抢购，添加类 
        // 显示正在抢购的页面数据，默认是第一个数据的内容
        if (num == 1) {
          tmpHStr += `<li class="now">
          <span class="time">${startTime}</span>
          <span class="info">${tmpInfo}</span>
        </li>`;

        } else {
          tmpHStr += `<li>
      <span class="time">${startTime}</span>
      <span class="info">${tmpInfo}</span>
    </li>`;
        }

        // 存入数组中
        tmpBStrArr.push(renderStr(num, json, i));

      }

      $tabsHeader.html(tmpHStr);
      console.log(tmpBStrArr);

    }, function (err) {
      console.log(err);
    })
    .catch(function (err) {
      console.log(err);
    });



})();