<?php
include_once('../../../cfurl.php');

$account_title = isset($_POST['account_title']) ? $_POST['account_title'] : "";
$mobilenumber = isset($_POST['mobilenumber']) ? $_POST['mobilenumber'] : "";
$account_businesstype = isset($_POST['account_businesstype']) ? $_POST['account_businesstype'] : "";
$description = isset($_POST['description']) ? $_POST['description'] : "";
$options = isset($_POST['options']) ? $_POST['options'] : "";
$storeisbn = isset($_POST['storeisbn']) ? $_POST['storeisbn'] : "";
$table_object_length = isset($_POST['table-object_length']) ? $_POST['table-object_length'] : "";
$myTableArray = isset($_POST["myTableArray"]) ? $_POST["myTableArray"] : "";
if($storeisbn !="" && $table_object_length == "" && $myTableArray ==""){
    $res = Query("SELECT * FROM entity_product WHERE product_barcode=$storeisbn");
    $row = mysqli_fetch_array($res);
    //echo $storeisbn;
    echo json_encode($row);
}
if($account_title !="" && $table_object_length !=""){
    $quantity = isset($_POST['quantity']) ? $_POST['quantity'] : "";
    $weight = isset($_POST['weight']) ? $_POST['weight'] : "";
    $sumunbook = isset($_POST['sumunbook']) ? $_POST['sumunbook'] : "" ;
    $off = isset($_POST['off']) ? $_POST['off'] : "";
    $othercosts = isset($_POST['othercosts']) ? $_POST['othercosts'] : "";
    $jamekol = isset($_POST['jamekol']) ? $_POST['jamekol'] : "";
    $myTableArray = isset($_POST["myTableArray"]) ? $_POST["myTableArray"] : "";
    $datatable = json_decode($myTableArray);
    //print_r($datatable);
    $query = "INSERT INTO nuke_order(order_status,order_type,order_customer_id,order_warehousing_id,order_date,order_time,order_totalweight,order_totalprice,order_discountprice,order_addprice,order_amount,order_numbook,order_customer_family,order_customer_mobile)"
            . "VALUES('1','1','1','','".jdate('Y/m/d')."','".date('H:i')."','1000','$sumunbook','$off','$othercosts','$jamekol','$quantity','$account_title','$mobilenumber')";

    $last_id = Lastid($query);
    //echo $last_id;
    //print_r($myTableArray);
    $data = json_decode($myTableArray);
    // print_r($data);
    foreach($data as $key=>$val){
         $sql = "INSERT INTO nuke_order_detail(order_id,order_detail_barcode,order_detail_value,order_detail_price,order_detail_totalprice,order_detail_amount,order_detail_discount)"
                . "VALUES($last_id,'$val[8]','$val[7]','$val[3]','0','$val[5]','$val[4]')";
	  Query($sql);
    }
        
}

$productname = isset($_POST['modalsearchproductname']) ? $_POST['modalsearchproductname'] : "";
$productcopmay = isset($_POST['modalsearchcompany']) ? $_POST['modalsearchcompany'] : "";
$producttype = isset($_POST['modalsearchproducttype']) ? $_POST['modalsearchproducttype'] : "";
$category = isset($_POST['modalsearchcategory']) ? $_POST['modalsearchcategory'] : "";
if($productname !="" || $productcopmay != "" || $producttype != "" || $category !="") {
	
function productnameinmodal($productname,$productcopmay,$producttype,$category){
    $query = "SELECT * FROM nuke_booksellers_booklist WHERE ";
    if($productname ==""){
        $query = $query.' 1';
    }else{
        $query = $query." bookname LIKE '%".$productname."%'";
    }
    return productpublisher($query,$productcopmay,$producttype,$category);
}

function productpublisher($query,$productcopmay,$producttype,$category){
    if($productcopmay ==""){
        $query = $query;
    }else{
        $query = $query." AND publisher LIKE '%".$productcopmay."%'";
    }
    return producttype($query,$producttype,$category);
}
function producttype($query,$producttype,$category){
    if($producttype == ""){
        $query = $query;
    }else{
        $query = $query." AND pageno=$producttype";
    }
    return category($query,$category);
}

function category($query,$category){
    if($category == ""){
        $query = $query;
    }else{
        $query = $query." AND monthbook=$category";
    }
    return $query;
}
$sql = productnameinmodal($productname,$productcopmay,$producttype,$category);
$sql .= "limit 0,100";
$result = Query($sql);
$rows = array();
while($row = mysqli_fetch_array($result)){
    array_push($rows,$row);
}
echo json_encode($rows);
}

$discountcode = isset($_POST['discountcode']) ? $_POST['discountcode'] : "";
if($discountcode !=""){
    echo "40000";
}
$giftTaker = isset($_POST['giftTaker']) ? $_POST['giftTaker'] : "";
$numbertaker=isset($_POST['numbertaker']) ? $_POST['numbertaker'] : "";
$kindofOff= isset($_POST['kindofOff']) ? $_POST['kindofOff'] : "";
if($giftTaker !="" || $numbertaker !="" || $kindofOff!=""){
    echo $numbertaker."/".$kindofOff;
}
//print_r($_POST);
//print_r($_POST);
$order_tracking = isset($_POST['order_tracking']) ? $_POST['order_tracking'] : "";
$order_costumer = isset($_POST['order_title_product']) ? $_POST['order_title_product'] :"";
$order_start_date = isset($_POST['order_start_date']) ? $_POST['order_start_date'] : "";
$order_end_date = isset($_POST['order_end_date']) ? $_POST['order_end_date'] : "";
$order_mobile = isset($_POST['order_mobile']) ? $_POST['order_mobile'] : "";
if($order_tracking !="" || $order_costumer!="" || $order_start_date!="" || $order_end_date!="" || $order_mobile!=""){
    function order_tracking($order_tracking,$order_costumer,$order_start_date,$order_end_date,$order_mobile){
        $query = "SELECT order_date,order_time,order_customer_family,order_customer_mobile,order_totalsale,order_discountprice,order_addprice,order_amount,order_numbook FROM nuke_order WHERE ";
        if($order_tracking == ""){
            $query = $query." 1";
        }else{
            $query =$query." order_tracking=$order_tracking";
        }
        //return $query;
        return order_title_product($query,$order_costumer,$order_start_date,$order_end_date,$order_mobile);
    }
    function order_title_product($query,$order_costumer,$order_start_date,$order_end_date,$order_mobile){
        if($order_costumer == ""){
            $query = $query;
        }else{
            $query = $query." AND order_customer_family LIKE '%".$order_costumer."%'";
        }
        return order_start_end_date($query,$order_start_date,$order_end_date,$order_mobile);
    }
    function order_start_end_date($query,$order_start_date,$order_end_date,$order_mobile){
        if($order_start_date == "" && $order_end_date ==""){
            $query = $query;
        }elseif($order_start_date != "" && $order_end_date ==""){
            $query = $query." AND order_date='$order_start_date'";
        }elseif($order_start_date != "" && $order_end_date ==""){
            $query = $query." AND order_date='$order_end_date'";
        }else{
            $query = $query." AND order_date BETWEEN '$order_start_date' AND '$order_end_date'";
        }
        return order_mobile($query,$order_mobile);
    }
    function order_mobile($query,$order_mobile){
        if($order_mobile ==""){
            $query = $query;
        }else{
            $query =$query." AND order_customer_mobile='$order_mobile'";
        }
        return $query;
    }
    $sql = order_tracking($order_tracking,$order_costumer,$order_start_date,$order_end_date,$order_mobile);
    $res = Query($sql);
    $rows = array();
    while($row=mysqli_fetch_array($res)){
        $row['options'] = '<a href="#">saeed sargazi</a>';
        array_push($rows,$row);
    }
    echo json_encode($rows);
}

