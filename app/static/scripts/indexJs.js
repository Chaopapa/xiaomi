/**
 * 主页JS
 */
$(function() {
    //广告图轮播
    var imgs = $('.banner-carousel img');
    var left = $('.b-left');
    var right = $('.b-right');
    var num = $('.b-num li');
    _carousel(imgs, left, right, num, 6000);
});