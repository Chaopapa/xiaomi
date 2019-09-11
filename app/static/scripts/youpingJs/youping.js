// 公共

//  z-headerWrap S

// 经过 m-rules 的时候显示 m-clause-con
function showClause() {
  $('.m-rules').on('mouseover', function () {
    $('.m-clause-con').show()
  })
  $('.m-rules').on('mouseout', function () {
    $('.m-clause-con').hide()
  })
}
showClause()

// z-headerWrap E

// z-navWrap S

// 当点击 searchIpt 的时候 border-bottom 颜色变成 #845f3f
function changeColor() {
  $('.searchIpt').on('focus', function () {
    $('.search_form').css('border-color', '#845f3f')
  })
  $('.searchIpt').on('blur', function () {
    $('.search_form').css('border-color', '#efefef')
  })
}
changeColor()

// z-navWrap E

// z-bannerWrap S

// navList 动态渲染
renderNavList()
// hoverNavList()

function renderNavList() {
  let conItem = []
  let h3Item = []
  let tmpStr = ''
  let $navListUl = $('.navListUl')


  // 这里形成了回调地狱，需要改进，后面用 promise 改进
  // 请求 conItem 数据 地址相对于网页而来
  $.ajax({
    url: '../static/scripts/youpingJs/conItem.json',
    type: 'get',
    dataType: 'json',
    success: function (json) {
      conItem = json
      // console.log(conItem);

      // 请求 h3Item 数据
      $.ajax({
        url: '../static/scripts/youpingJs/h3Item.json',
        type: 'get',
        dataType: 'json',
        success: function (json) {
          h3Item = json
          // console.log(h3Item);
          // 遍历数组中的元素，动态渲染
          for (let i = 0, len = h3Item.length; i < len; i++) {
            tmpStr += `<li class="listItem">
                          <h3 class="h3Item">
                            <a href="#">${h3Item[i].firstA}</a>
                            <span>/</span>
                            <a href="#">${h3Item[i].secondA}</a>
                          </h3><div class="conItem">`
            for (let j = 0, length = conItem.length; j < length; j++) {
              tmpStr += `
                        <h5>${conItem[j].title}</h5> <ul class="clearfix">`
              for (let c = 0, lengt = conItem[j].listItem.length; c < lengt; c++) {
                tmpStr += `
                  <li>
                    <img src="${conItem[j].listItem[c].imgUrl}" alt="">
                    <span>${conItem[j].listItem[c].spanCon}</span>
                  </li>`
              }
              tmpStr += `</ul>
              `
            }
            tmpStr += `</div></li>`
          }

          console.log(tmpStr);
          $navListUl.html(tmpStr)

        },
        error: function (code) {
          console.log(code)
        }
      })


    },
    error: function (code) {
      console.log(code)
    }


  })

}

// function hoverNavList() {
//   let $navListUl = $('.navListUl')
//   // 注册委托事件
//   $navListUl.on('')
// }

// z-bannerWrap E