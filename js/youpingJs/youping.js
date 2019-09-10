// 公共

//  z-headerWrap S

// 经过 m-rules 的时候显示 m-clause-con
function showClause() {
  $('.m-rules').on('mouseover', function() {
    $('.m-clause-con').show()
  })
  $('.m-rules').on('mouseout', function() {
    $('.m-clause-con').hide()
  })
}
showClause()

// z-headerWrap E

// z-navWrap S

// 当点击 searchIpt 的时候 border-bottom 颜色变成 #845f3f
function changeColor() {
  $('.searchIpt').on('focus',function() {
    $('.search_form').css('border-color', '#845f3f')
  })
  $('.searchIpt').on('blur',function() {
    $('.search_form').css('border-color', '#efefef')
  })
}
changeColor()

// z-navWrap E

// z-bannerWrap S
// z-bannerWrap E

