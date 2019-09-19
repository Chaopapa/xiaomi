<?php
//防止乱码
header("Content-type:text/json;charset=utf8");
// // 关闭错误报告
error_reporting(0);
//获取数据库连接
$link = mysql_connect('localhost','root','');

//设置编码
mysql_query('set names utf8');

//选择数据库
mysql_query('use xiaomi');

$name = $_POST['name'];
$pwd = $_POST['pwd'];
$sql = "select * from xiaomi_user where username='$name' and password='$pwd'";

$result = mysql_query($sql);

//获取影响的行数
$num = mysql_affected_rows();

if($num>0){
    while($row = mysql_fetch_assoc($result)){
       echo json_encode($row,JSON_UNESCAPED_UNICODE);
    }

}else{
    // var $rows
    // echo json_encode($rows,JSON_UNESCAPED_UNICODE)
    echo 0;
}




?>