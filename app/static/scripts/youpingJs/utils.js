// 查找 cookie

function getCookie(key) {
  let arr1 = document.cookie.split(';');
  for(let i = 0; i < arr1.length; i ++) {
    let arr2 = arr1[i].split('=');
    if (arr2[0] == key) {
      return unescape(arr2[1]);
    }
  }
  return '';
}

// 设置 cookie
function setCookie(key, val, hours) {
  if (hours) {
    let d = new Date();
    d.setHours(d.getHours() + hours);
    document.cookie = `${key}=${escape(val)};expires=${d}`;
  }else {
    document.cookie = `${key}=${escape(val)}`;
  }
}

// 删除 cookie
function deleteCookie(key) {
  setCookie(key, '123', -10);
}
