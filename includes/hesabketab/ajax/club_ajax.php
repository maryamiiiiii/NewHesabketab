<?php
$dbserver = 'localhost';
$dbname='admin_ketab';
$dbusername = 'uasfajhf';
$dbpassword='cHa2s_12';
include("jdf.php");
function Query ($query)
{
    global $dbserver,$dbname,$dbusername,$dbpassword;
    $con=  mysqli_connect("$dbserver", "$dbusername", "$dbpassword", "$dbname");
    mysqli_set_charset( $con, 'utf8' );
    if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
    $select = mysqli_select_db($con, "$dbname");
    $result = mysqli_query($con, $query);
            	mysqli_insert_id($con); 
    return $result ;
}
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
$clubfnamelname = isset($_POST['clubfnamelname']) ? $_POST['clubfnamelname'] : "";
$clubmobilenumber = isset($_POST['clubmobilenumber']) ? $_POST['clubmobilenumber'] : "";
$clubemail = isset($_POST['clubemail']) ? $_POST['clubemail'] : "";
$clubphone = isset($_POST['clubphone']) ? $_POST['clubphone'] : "";
$clubfav = isset($_POST['clubfav']) ? $_POST['clubfav'] : "";
$clubaddress = isset($_POST['clubaddress']) ? $_POST['clubaddress'] : "";
$clubbirthday = isset($_POST['birthday']) ? $_POST['birthday'] : "";
Query("INSERT INTO nuke_book_club(nuke_book_club_fnamelname,nuke_book_club_mobile,nuke_book_club_birthday,nuke_book_club_email,nuke_book_club_phone,nuke_book_club_fav,nuke_book_club_address)"
        . "VALUES('$clubfnamelname','$clubmobilenumber','$clubbirthday','$clubemail','$clubphone','$clubfav','$clubaddress')");


