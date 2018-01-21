<?php
include_once('../../../cfurl.php');
//print_r($_POST);
//print_r($_POST);
$title_product = isset($_POST['title_product']) ? $_POST['title_product'] : "";
$author_product = isset($_POST['author_product']) ? $_POST['author_product'] : "";
$product_category = isset($_POST['product_category']) ? $_POST['product_category'] : "";
if($title_product !="" || $author_product!="" || $product_category !=""){
    function title($title_product,$author_product,$product_category){
        $query = "SELECT product_title,product_company_id,product_type,product_category FROM nuke_product WHERE ";
        if($title_product ==""){
            $query = $query.'1';
        }else{
            $query = $query."product_title LIKE '%".$title_product."%'";
        }
        return author($query,$author_product,$product_category);
    }
    function author($query,$author_product,$product_category){
        if($author_product == ""){
            $query = $query;
        }else{
            $query = $query." AND product_creator LIKE '%".$author_product."%'";
        }
        return category($query,$product_category);
    }
    function category($query,$product_category){
        if($product_category == ""){
            $query = $query;
        }else{
            $query = $query." AND product_category= $product_category";
        }
        return $query;
    }
    $query = title($title_product,$author_product,$product_category);
    $sql = $query." LIMIT 0,1000";
    $res = Query($sql);
    $rows=array();
    while($row = mysqli_fetch_array($res)){
        $row['options']='<span class="badge badge-info badge-icon"><a href="modules.php?name=Account&amp;op=accoundetails&amp;account_id=22"><i class="fa fa-indent" aria-hidden="true"></i><span>بیشتر</span></a></span>';
        array_push($row);
        array_push($rows,$row);
    }
    //print_r($rows);
    echo json_encode($rows);
}
$product_barcode = isset($_POST['product_barcode']) ? $_POST['product_barcode'] : "";
if($product_barcode != ""){
    $res = Query("SELECT * FROM nuke_product WHERE product_barcode=$product_barcode");
    if(mysqli_num_rows($res)){
       $row = mysqli_fetch_array($res);
       echo json_encode($row);
    }else{
        echo 1;
    }
}

$value_accountid = isset($_POST['value_accountid']) ? $_POST['value_accountid'] :"";
if($value_accountid !=""){
    $res=Query("SELECT * FROM nuke_warehousing WHERE account_id=$value_accountid");
    $row = mysqli_fetch_array($res);
    $row_id_wareid=array();
    if(mysqli_num_rows($res)>0){
        $row_id_wareid['id']=$row['warehouse_id'];
    }else{
        $row_id_wareid['id']=Lastid("INSERT INTO nuke_users (user_id, name, username, user_email , user_password ,mobile,stustate, permission,user_level) VALUES (NULL, 'family', 'username','useremail' ,'new_password','09368699691',6,'1,2,3,4,5,6,7',-2)");
    }
    $row_id_wareid['account_discount']=accountinfo($value_accountid)->account_discount;
    echo json_encode($row_id_wareid);
}

$product_isbn = isset($_POST['product_isbn']) ? $_POST['product_isbn'] : "";
if($product_isbn !=""){
    $result = Query("SELECT * FROM nuke_booksellers_booklist WHERE isbn = '$product_isbn' ");
    $row = mysqli_fetch_array($result);
    if(mysqli_num_rows($result) >0 ){
        $monthbook = $row['monthbook'];
        $url = "http://164.138.18.205/database/BookImages/";
        $picmain = $url.substr($monthbook,0.,2)."/".strtolower($monthbook).'.jpg';

?>
<div id="take_div">
    <div class="col-lg-4 col-md-4">
        <div >
          <img src="<?php echo $picmain ?>" class="thumbnail img-responsive" alt="">
        </div>
        <div class="col-md-3">
          <img src="<?php echo $picmain ?>" class="thumbnail img-responsive" alt="">                                                              
        </div>
        <div class="col-md-3">
          <img src="<?php echo $picmain ?>" class="thumbnail img-responsive" alt="">                                                              
        </div>
        <div class="col-md-3">
          <img src="<?php echo $picmain ?>" class="thumbnail img-responsive" alt="">                                                              
        </div>
        <div class="col-md-3">
          <img src="<?php echo $picmain ?>" class="thumbnail img-responsive" alt="">                                                              
        </div>
          <div class="col-md-6 pb5"> <a href="#" id="submit" onclick="#" class="btn btn-primary btn-block">مشاهده ویدیو   <span class="fa fa-film"></span></a></div>
          <div class="col-md-6 pb5"> <a href="#" id="submit" onclick="#" class="btn btn-primary btn-block">مشاهده pdf<span class="fa fa-file-pdf-o"></span> </a> </div>
       </div>

        <div class="col-lg-5 col-md-5" >
        <form role="form" id="form_product">
         <table class="table table-striped">
          <thead>
          <tr>
          </tr>
          </thead>
          <tbody>
          <tr>
              <input type="hidden" value="<?php echo $row['isbn'];?>" name="product_barcode">
              <input type="hidden" value="<?php echo $row['monthbook'];?>" name="product_monthbook">        
              <td >نام کتاب :</td>
              <td>
			  <?php echo $row['bookname'];?>
              <input type="hidden" value="<?php echo $row['bookname'];?>" name="product_title">              
              </td>
              
          </tr>
          <tr>
              <td >ناشر :</td>
              <td>
			  <?php echo $row['publisher'];?>
               <input type="hidden" value="<?php echo $row['publisher'];?>" name="product_company_id">              
              </td>

          </tr>
          <tr>
              <td>پدیدآوران :</td>
              <td>
			  <?php echo $row['author'];?>
               <input type="hidden" value="<?php echo $row['author'];?>" name="product_creator">              
              </td>

          </tr>
          <tr>
              <td>موضوع :</td>
              <td>
			  <?php echo $row['kayword'];?>
               <input type="hidden" value="<?php echo $row['kayword'];?>" name="product_kayword">              
              </td>

          </tr>
          <tr>
              <td>تعداد صفحه :</td>
              <td>
			  <?php echo $row['pageno'];?>
               <input type="hidden" value="<?php echo $row['pageno'];?>" name="product_pageno">              
              </td>
          </tr>
          <tr>
              <td>قطع : </td>
              <td>
			  <?php echo $row['qate'];?>
               <input type="hidden" value="<?php echo $row['qate'];?>" name="product_sizetype">              
              </td>
          </tr>
          <tr>
              <td>نوع جلد :</td>
              <td>
			  <?php echo $row['coverkind'];?>
               <input type="hidden" value="<?php echo $row['coverkind'];?>" name="product_coverkind">              
              </td>
          </tr>
          <tr>
              <td>تاریخ نشر :</td>
              <td>
			  <?php echo $row['isudate'];?>
               <input type="hidden" value="<?php echo $row['isudate'];?>" name="product_creatdate">              
              </td>
          </tr>
          <tr>
              <td>نوبت چاپ :</td>
              <td>
			  <?php echo $row['printversion'];?>
               <input type="hidden" value="<?php echo $row['printversion'];?>" name="product_printversioin">              
              </td>
          </tr>
          <tr>
              <td>رده دیویی :</td>
              <td>
			  <?php echo $row['dewe'];?>
               <input type="hidden" value="<?php echo $row['dewe'];?>" name="product_dewe">              
              </td>

          </tr>
          <tr>
              <td>زبان کتاب :</td>
              <td>
			  <?php echo $row['langkind'];?>
               <input type="hidden" value="<?php echo $row['langkind'];?>" name="product_languagetype">              
              </td>

          </tr>

          <tr>
              <td>وزن :</td>
              <td>
			  <?php echo $row['weight'];?>
               <input type="hidden" value="<?php echo $row['weight'];?>" name="product_weight">              
              </td>

          </tr>

          </tbody>
      </table>
        </div>
        <input type="hidden" value="<?php echo $row['price'];?>" name="product_price">
        <textarea name="product_description" style="display:none"><?php echo $row['price'];?></textarea> 
        <div class="col-lg-3 col-md-3">
              <p class="well-product text-justify s12">
              معرفی کوتاه:کتاب حاضر، رمانی انگلیسی است که با زبانی ساده و روان نگاشته شده است. داستان با پرداخت مناسب شخصیت‌ها و توصیف عمیق‌ترین احساسات و افکار آن‌ها و همچنین با بیان دقیق جزئیات صحنه‌ها، نگاشته شده و خواننده را با خود همراه می‌کند. در داستان می‌خوانیم: «زن بیدار شده است، به بالش تکیه داده و کتابچه راهنمای مسافرت کنار تختخوابش را ورق می‌زند. آن‌ها از زندگی‌شان راضی و خوشحال هستند و می‌خواهند برای اولین تعطیلات درست‌وحسابی‌شان، بهترین جا را انتخاب کنند. اما هر کدام از آن‌ها جاهای متفاوتی را برای مسافرت پیشنهاد می‌دهند».
              </p>
          </div>
</form>                                               
</div>
        

<?php
    }else{
        ?>
        <form class="form-horizontal group-border stripped" role="form" id="form_product">
          <div class="col-lg-12 col-md-12" >
            <div class="form-group">
              <div class="col-lg-6 col-md-6">
                <label for="inputEmail4" class="control-label">نام کتاب </label>
                <input class="form-control" id="product_title"  name="product_title">
               </div>        

                <div class="col-lg-6 col-md-6">
                    <label for="input" class="control-label">دسته بندی</label>
                      <?php
                        echo  createSingleSelectbox(220,"product_category",0);
                      ?>
                 </div>      
            </div>
             <div class="form-group">

              <div class="col-lg-6 col-md-6">
                <label for="inputEmail4" class="control-label">پدیدآوران</label>
                <input class="form-control" id="product_creator"  name="product_creator" >
               </div>  
               
                <div class="col-lg-6 col-md-6">
                    <label for="input" class="control-label">ناشر</label>
                      <?php
                        echo  createSingleSelectbox(220,"product_company_id",0);
                      ?>
                 </div>

            </div>

             <div class="form-group">
                <div class="col-lg-3 col-md-3">
                    <label for="input" class="control-label">نوع جلد</label>
                      <?php
                        echo  createSingleSelectbox(277,"product_coverkind",$row['coverkind']);
                      ?>
                 </div>

                <div class="col-lg-3 col-md-3">
                    <label for="input" class="control-label">قطع</label>
                      <?php
                        echo  createSingleSelectbox(245,"product_sizetype",$row['qate']);
                      ?>
                 </div>
                <div class="col-lg-3 col-md-3">
                    <label for="input" class="control-label">زبان</label>
                      <?php
                        echo  createSingleSelectbox(278,"product_languagetype",$row['coverkind']);
                      ?>
                 </div>

                <div class="col-lg-3 col-md-3">
                    <label for="input" class="control-label">دیویی</label>
                    <input class="form-control"  name="product_dewe" id="product_dewe" type="text">
                 </div>
            </div>

             <div class="form-group">
                <div class="col-lg-3 col-md-3">
                    <label for="input" class="control-label">نوبت چاپ</label>
                    <input class="form-control"  name=" product_printversioin" id="product_printversioin" type="text">
                 </div>
                <div class="col-lg-3 col-md-3">
                    <label for="input" class="control-label">تاریخ چاپ</label>
                    <input class="form-control"  name="product_creatdate" id="product_creatdate" type="text">
                 </div>
                <div class="col-lg-3 col-md-3">
                    <label for="input" class="control-label">تعداد صفحه</label>
                    <input class="form-control"  name="product_pageno" id="product_pageno" type="text">
                 </div>
                <div class="col-lg-3 col-md-3">
                    <label for="input" class="control-label">وزن</label>
                    <input class="form-control"  name="product_weight" id="product_weight" type="text">
                </div>                                  
            </div>

             <div class="form-group">

            </div>

         </div>    
          <div class="col-lg-6 col-md-6">
              <div class="form-group">
                  <label class="col-lg-12 col-md-12 control-label" for="">معرفی کوتاه</label>
                  <div class="col-lg-12 col-md-12">
                      <textarea class="form-control elastic" name="product_description" id="product_description" rows="5"  style="overflow: hidden; overflow-wrap: break-word; resize: horizontal; height: 194px;"></textarea>
                  </div>
              </div>
        
          </div>
            </form>
          <div class="col-lg-6 col-md-6">  
              <form action="includes/hesabketab/ajax/upload.php" class="dropzone" method="post" id="dropzonewidget">
                  <input type="hidden" value="addproduct" name="form_name">
                  <input type="hidden" value="<?php echo $product_isbn;?>" name="isbn">
              </form> 
          </div>
     <?php   
    }
}
$edit_product_isbn = isset($_POST['edit_product_isbn']) ? $_POST['edit_product_isbn'] : "";
if($edit_product_isbn !=""){
$result = Query("SELECT * FROM nuke_booksellers_booklist WHERE isbn = '$edit_product_isbn' ");
$row = mysqli_fetch_array($result);
?>
<form class="form-horizontal group-border stripped" role="form" id="form_product">
          <div class="col-lg-12 col-md-12" >
            <div class="form-group">
              <div class="col-lg-6 col-md-6">
                <label for="inputEmail4" class="control-label">نام کتاب </label>
                <input class="form-control" id="product_title"  value="<?php echo $row['bookname'] ?>" name="product_title">
               </div>        

                <div class="col-lg-6 col-md-6">
                    <label for="input" class="control-label">دسته بندی</label>
                      <?php
                        echo  createSingleSelectbox(220,"product_category",0);
                      ?>
                 </div>      
            </div>
             <div class="form-group">

              <div class="col-lg-6 col-md-6">
                <label for="inputEmail4" class="control-label">پدیدآوران</label>
                <input class="form-control" id="product_creator" value="<?php echo $row['author'] ?>"  name="product_creator" >
               </div>  
               
                <div class="col-lg-6 col-md-6">
                    <label for="input" class="control-label">ناشر</label>
                      <?php
                        echo  createSingleSelectbox(220,"product_company_id",$row['pubid']);
                      ?>
                 </div>

            </div>

             <div class="form-group">
                <div class="col-lg-3 col-md-3">
                    <label for="input" class="control-label">نوع جلد</label>
                      <?php
                        echo  createSingleSelectbox(277,"product_coverkind",$row['coverkind']);
                      ?>
                 </div>

                <div class="col-lg-3 col-md-3">
                    <label for="input" class="control-label">قطع</label>
                      <?php
                        echo  createSingleSelectbox(245,"product_sizetype",$row['qate']);
                      ?>
                 </div>
                <div class="col-lg-3 col-md-3">
                    <label for="input" class="control-label">زبان</label>
                      <?php
                        echo  createSingleSelectbox(278,"product_languagetype",$row['coverkind']);
                      ?>
                 </div>

                <div class="col-lg-3 col-md-3">
                    <label for="input" class="control-label">دیویی</label>
                    <input class="form-control"  name="product_dewe" value="<?php echo $row['dewe'] ?>" id="product_dewe" type="text">
                 </div>
            </div>


             <div class="form-group">
                <div class="col-lg-3 col-md-3">
                    <label for="input" class="control-label">نوبت چاپ</label>
                    <input class="form-control" name="product_printversioin"value="<?php echo $row['printversion'] ?>" id="product_printversioin"  type="text">
                 </div>
                <div class="col-lg-3 col-md-3">
                    <label for="input" class="control-label">تاریخ چاپ</label>
                    <input class="form-control" name="product_creatdate" value="<?php echo $row['author'] ?>" id="product_creatdate"  type="text">
                 </div>
                <div class="col-lg-3 col-md-3">
                    <label for="input" class="control-label">تعداد صفحه</label>
                    <input class="form-control"  name="product_pageno" value="<?php echo $row['pageno'] ?>" id="product_pageno" type="text">
                 </div>
                <div class="col-lg-3 col-md-3">
                    <label for="input" class="control-label">وزن</label>
                    <input class="form-control"  name="product_weight" value="<?php echo $row['weight'] ?>" id="product_weight" type="text">
                </div>                                  
            </div>

             <div class="form-group">

            </div>

         </div>    
          <div class="col-lg-6 col-md-6">
              <div class="form-group">
                  <label class="col-lg-12 col-md-12 control-label" for="">معرفی کوتاه</label>
                  <div class="col-lg-12 col-md-12">
                      <textarea class="form-control elastic" name="product_description" id="product_description" rows="5"  style="overflow: hidden; overflow-wrap: break-word; resize: horizontal; height: 194px;"></textarea>
                  </div>
              </div>
       
          </div>                                               
        <input type="hidden" value="<?php echo $row['isbn'];?>" name="product_barcode">
        <input type="hidden" value="<?php echo $row['monthbook'];?>" name="product_monthbook">        
     </form>

        <input type="hidden" value="<?php echo $row['price'];?>" name="product_price">
          <div class="col-lg-6 col-md-6">  
              <form action="includes/hesabketab/ajax/upload.php" class="dropzone" method="post" id="dropzonewidget">
                  <input type="hidden" value="addproduct" name="form_name">
                  <input type="hidden" value="<?php echo $product_isbn;?>" name="product_barcode">
              </form> 
          </div>


                                        
<?php
//themefooterpanel();

}
?>


