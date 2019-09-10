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

// z-navWrap E