<?php
include('../../../cfurl.php');
//print_r($_POST);
$account= isset($_POST['account']) ? $_POST['account'] : "";
$document_number = isset($_POST['document_number']) ? $_POST['document_number'] : "";
$warehousing_type = isset($_POST['warehousing_type']) ? $_POST['warehousing_type'] : "";
if($warehousing_type != "" || $document_number!="" || $account!=""){
    function warehousing_type($warehousing_type,$document_number,$account){
        $query = "SELECT warehousing_type,warehousing_number,warehousing_username_reg,warehousing_marketerid FROM nuke_warehousing WHERE ";
        if($warehousing_type ==""){
            $query = $query."1 ";
        }else{
            $query = $query." warehousing_type=$warehousing_type ";
        }
        return document_number($query,$document_number,$account);
    }
    function document_number($query,$document_number,$account){
        if($document_number == ""){
            $query = $query;
        }else{
            $query = $query." AND warehousing_number =$document_number ";
        }
        return account($query,$account);
    }
    function account($query,$account){
        if($account == ""){
            $query = $query;
        }else{
            $query = $query." AND warehousing_username_reg = $account";
        }
        return $query;
    } 
    $sql = warehousing_type($warehousing_type,$document_number,$account);
    $res=Query($sql);
    $rows = array();
    while($row = mysqli_fetch_array($res)){
        $row['options']='<span class="badge badge-info badge-icon"><a href="modules.php?name=Account&amp;op=accoundetails&amp;account_id=22"><i class="fa fa-indent" aria-hidden="true"></i><span>بیشتر</span></a></span>';
        array_push($rows,$row);
    }
    
    echo json_encode($rows);
}

///////////////////////////////////////////////////////////////////////////////
$productisbn=isset($_POST['productisbn']) ? $_POST['productisbn'] : "";
$productauthor = isset($_POST['productauthor']) ? $_POST['productauthor'] : "";
$productpublisher = isset($_POST['productpublisher']) ? $_POST['productpublisher'] : "";
$producttitle = isset($_POST['producttitle']) ? $_POST['producttitle'] : "";
//print_r($_POST);

if($producttitle !="" || $productisbn !="" || $productauthor !="" || $productpublisher!=""){
    function getisbn($productisbn,$productauthor,$productpublisher,$producttitle){
       $query = "SELECT * FROM nuke_booksellers_booklist WHERE";
      if($productisbn ==""){
          $query = $query." 1";
      }else{
          $query .= " isbn='$productisbn'";
      }
      return getauthor($query,$productauthor,$productpublisher,$producttitle);
    }

    function getauthor($query,$productauthor,$productpublisher,$producttitle){
        if($productauthor ==""){
            $query = $query;
        }else{
           $query .= " AND author LIKE '%".$productauthor."%'";
        }
        return getpublisher($query,$productpublisher,$producttitle);
    }

    function getpublisher($query,$productpublisher,$producttitle){
        if($productpublisher == ""){
            $query = $query;
        }else{
            $query .= " AND publisher LIKE '%".$productpublisher."%'";
        }
        return gettitle($query,$producttitle);

    }
    function gettitle($query,$producttitle){
        if($producttitle == ""){
            $query = $query;
        }else{
            $query .= " AND bookname LIKE '%".$producttitle."%'";
        }
        return $query;
    }
    $query = getisbn($productisbn,$productauthor,$productpublisher,$producttitle);
    $res = Query($query);
    $rows=array();
    while($row=mysqli_fetch_array($res)){
        array_push($rows,$row);
    }
    echo json_encode($rows);
}else{
    $modalbcode = isset($_POST['modalbcode']) ? $_POST['modalbcode'] : "";
    $productnameinmodal = isset($_POST['productnameinmodal']) ? $_POST['productnameinmodal'] : "";
    $modalproductprice = isset($_POST['modalproductprice']) ? $_POST['modalproductprice'] : "";
    $numbers = isset($_POST['numbers']) ? $_POST['numbers'] : "";
    $location = isset($_POST['location']) ? $_POST['location'] : "";
    $userinmodal = isset($_POST['userinmodal']) ? $_POST['userinmodal'] : "";
    $acode = isset($_POST['acode']) ? $_POSAT['acode'] : "";
    Query("insert into nuke_book_anbarbook (acode,mkind,bcode,mojodi,price,username)"
            . "VALUES('$acode',1,'$modalbcode','$numbers','$modalproductprice','$userinmodal')");
}
$barcode = isset($_POST['barcode']) ? $_POST['barcode'] : "";
if($barcode !=""){
    //echo "SELECT * FROM nuke_product WHERE product_barcode='".$barcode."'";
    $res=Query("SELECT * FROM nuke_product WHERE product_barcode='".$barcode."'");
    if(mysqli_num_rows($res)>0){
        $row = mysqli_fetch_array($res);
        echo json_encode($row);
    }else{
        echo 1;
    }
}

$productname = isset($_POST['modalsearchproductname']) ? $_POST['modalsearchproductname'] : "";
$productcopmay = isset($_POST['modalsearchcompany']) ? $_POST['modalsearchcompany'] : "";
$producttype = isset($_POST['modalsearchproducttype']) ? $_POST['modalsearchproducttype'] : "";
$category = isset($_POST['modalsearchcategory']) ? $_POST['modalsearchcategory'] : "";
if($productname !="" || $productcopmay != "" || $producttype != "" || $category !="") {
	
    function productnameinmodal($productname,$productcopmay,$producttype,$category){
        $query = "SELECT * FROM nuke_product WHERE ";
        if($productname ==""){
            $query = $query.' 1';
        }else{
            $query = $query." product_title LIKE '%".$productname."%'";
        }
        return productpublisher($query,$productcopmay,$producttype,$category);
    }

    function productpublisher($query,$productcopmay,$producttype,$category){
        if($productcopmay ==""){
            $query = $query;
        }else{
            $query = $query." AND product_creator LIKE '%".$productcopmay."%'";
        }
        return producttype($query,$producttype,$category);
    }
    function producttype($query,$producttype,$category){
        if($producttype == ""){
            $query = $query;
        }else{
            $query = $query." AND product_type=$producttype";
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


$myTableArray = isset($_POST['myTableArray']) ? $_POST['myTableArray']:"";
if($_POST['myTableArray']!=""){
    //print_r($_POST);

    $warehouseInsert = isset($_POST['warehouseInsert']) ? $_POST['warehouseInsert'] : "";
    $account_titleInsert = isset($_POST['account_titleInsert']) ? $_POST['account_titleInsert'] : "";
    $accountInsert = isset($_POST['accountInsert']) ? $_POST['accountInsert'] : "";
    $marketerInsert = isset($_POST['marketerInsert']) ? $_POST['marketerInsert'] :"";
    $warehousing_date = isset($_POST['warehousing_date']) ? $_POST['warehousing_date'] :"";
    $warehouseing_type = isset($_POST['warehouseing_type']) ? $_POST['warehouseing_type'] :"";
    $warehousing_number = isset($_POST['warehousing_number']) ? $_POST['warehousing_number'] :"";
    $username_reg = isset($_POST['username_reg']) ? $_POST['username_reg'] :"";

    $quantity = isset($_POST['quantity']) ? $_POST['quantity'] : "";
    $sumunbook = isset($_POST['sumunbook']) ? $_POST['sumunbook'] : "";
    $off = isset($_POST['off']) ? $_POST['off'] : "";
    $jamekol = isset($_POST['jamekol']) ? $_POST['jamekol'] : "";
    $payable = isset($_POST['payable']) ? $_POST['payable'] : "";
    $totalweight = 0;
    $warehousing_addprice = 0;


    $query = "INSERT INTO nuke_warehousing (warehousing_warehouseid,warehousing_type,warehousing_date,warehousing_number,warehousing_accountid,warehousing_marketerid, warehousing_totalweight, warehousing_totalpurchase, warehousing_totalsale, warehousing_discountprice, warehousing_addprice , warehousing_amount, warehousing_quantity ,warehousing_username_reg,warehousing_datereg,warehousing_time) VALUES('$warehouseInsert','$warehouseing_type','$warehousing_date','$warehousing_number','$accountInsert','$marketerInsert','$totalweight','$sumunbook','$payable','$off','$warehousing_addprice','$jamekol','$quantity','$username_reg','".jdate('Y/m/d')."','".date('H:i')."')";

    
    $id = Lastid ($query);
    
    $data = json_decode($_POST['myTableArray']);
// print_r($data);

    foreach($data as $key=>$val){
        $query = "INSERT INTO nuke_warehouse_detail(warehouse_detail_warehouse_id,warehouse_detail_product_id,warehouse_detail_inventory,warehouse_detail_purchase,warehouse_detail_sales,warehouse_detail_discount)"
                . "VALUES('$id','$val[8]','$val[3]','$val[2]','$val[5]','$val[4]')";
        Query($query);
    }
//    echo $query;
    //for($i=0;i<count($_POST['myTableArray']))
}




    
