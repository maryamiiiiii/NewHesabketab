
function CheckMeliCode(meli_code)
{
	var subSplit = meli_code.substr(0, 5);

    if (meli_code.length == 10)
        {
			if (subSplit == '77756')
     {
           return true;
     }
       else if (
			
			meli_code == '1111111111' ||
                meli_code == '0000000000' ||
                meli_code == '2222222222' ||
                meli_code == '3333333333' ||
                meli_code == '4444444444' ||
                meli_code == '5555555555' ||
                meli_code == '6666666666' ||
                meli_code == '7777777777' ||
                meli_code == '8888888888' ||
                meli_code == '9999999999' ||
                meli_code == '0123456789'
                )
            {
                $('#nationalcode_validation').html('كد ملي صحيح نمي باشد');
                 $('#nationalcode_validation').addClass("alert-danger");
                 $('.next_but').attr('disabled','disabled');
                return false;
            }
         
    
            c = parseInt(meli_code.charAt(9));
            n = parseInt(meli_code.charAt(0)) * 10 +
                parseInt(meli_code.charAt(1)) * 9 +
                parseInt(meli_code.charAt(2)) * 8 +
                parseInt(meli_code.charAt(3)) * 7 +
                parseInt(meli_code.charAt(4)) * 6 +
                parseInt(meli_code.charAt(5)) * 5 +
                parseInt(meli_code.charAt(6)) * 4 +
                parseInt(meli_code.charAt(7)) * 3 +
                parseInt(meli_code.charAt(8)) * 2;
            r = n - parseInt(n / 11) * 11;
            if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r))
            {
				
              $('#nationalcode_validation').html('');
              $('#nationalcode_validation').removeClass("alert-danger");
              
               return true;
            }
            else
              { 
                $('#nationalcode_validation').html('ŁŲÆ Ł…Ł„Ł ŲµŲ­ŁŲ­ Ł†Ł…Ł ŲØŲ§Ų´ŲÆ');
                 $('#nationalcode_validation').addClass("alert-danger");
                 $('.next_but').attr('disabled','disabled');
                return false;

            }
    }
    else
    {
        $('#nationalcode_validation').addClass("alert-danger");
        $('#nationalcode_validation').html('كد ملي صحيح نمي باشد');
        $('.next_but').attr('disabled','disabled');
         return false;       
    }
}


function MobileValidation(mobile){
    if(mobile==""){
		$('#error_mobile_group').addClass('has-error');
        $('span#error_mobile').html('موبایل اجباری می باشد');
        return false;
    }
    else if(!Number(mobile))
    {
		$('#error_mobile_group').addClass('has-error');
        $('span#error_mobile').html('باید عدد باشد');
        return false;
    }else if (mobile.length < 11 || mobile.length > 11){
		$('#error_mobile_group').addClass('has-error');
        $('span#error_mobile').html('باید 11 رقم باشد');
        return false;
    }else if(mobile.charAt(0)!=0 || mobile.charAt(1)!=9){
		$('#error_mobile_group').addClass('has-error');
        $('span#error_mobile').html('باید با صفر شروع شود  و یا 9 ندارد');
        return false;
    }else
      {
		$('#error_mobile_group').addClass('has-success');
        $('span#error_mobile').html('');
   	     return true;
	  }
}


function scanNationalcode(nationalcode){
          if(CheckMeliCode(nationalcode)==true){
             $('#nationalcode_validation').hide();
                $('.next_but').removeAttr('disabled');
                $('input#fname_lname').removeAttr('disabled');
                $('input#mobile').removeAttr('disabled');
                $('#mobile').val('');
                $('#fname_lname').val('');

				

             $("#loading").show();

                $.ajax({
                    type:'POST',
                    url:'modules/Book_Sellers_panel/madule/project/ajax.php',
                    data:'nationalcode='+nationalcode,
                    success:function(resp){ 
//                     alert(resp);

                        if(resp =='null'){
							/*
                            var html_fname_lname = "";pp
                            $('#credit_first').html(' اعتبار  این شخص: 200000 ریال می باشد');
                            $('#credit_first').removeClass('alert-danger');							
                            $('#credit_first').addClass('alert alert-success');
                            html_fname_lname += '<input class="form-control" name="firstname" value="" id="fname_lname" type="text" required><span id="error_fname" class="help-block"></span>';
                            $('#fnamelname').html(html_fname_lname);
                            var mobile_e = "";
                            mobile_e += '<input class="form-control" name="mobile"  id="mobile" type="text" required="required"><span id="error_mobile" class="help-block"></span><input name="credit" id="credit_input" value="200000" type="hidden">';
                            $('#mobile_e').html(mobile_e);
							$('input#fname_lname').focus();
							*/
                            $('.next_but').attr('disabled','disabled');
                            $('input#fname_lname').attr('disabled','disabled');
                            $('input#mobile').attr('disabled','disabled');
                            $('#credit_first').html('این شخص عضو باشگاه کتاب خوانی نمی باشد');
                            $('#credit_first').removeClass('alert-success');
                            $('#credit_first').addClass('alert alert-danger');

                        }
                        else if(resp==='false'){
                            $('.next_but').attr('disabled','disabled');
                            $('input#fname_lname').attr('disabled','disabled');
                            $('#credit_first').html('اعتبار این شخص تمام شده است');
                            $('#credit_first').removeClass('alert-success');
                            $('#credit_first').addClass('alert alert-danger');
							
                            $('input#mobile').attr('disabled','disabled');
                        }
                        else{
						
                            var row_sum = JSON.parse(resp);
                            var data = row_sum['row'];
                            var credit = row_sum['sumdiscountprice']; 
                            $('#credit_first').html('اعتبار  این شخص:'+credit+'ریال می باشد');
                            $('#credit_first').removeClass('alert-danger');
                            $('#credit_first').addClass('alert alert-success');
							
                              var html_fname_lname = "";
                              html_fname_lname += '<input class="form-control" value = "'+data['family']+'" name="firstname" value="" id="fname_lname" type="text" ><span id="error_fname" class="help-block"></span>';
                              $('#fnamelname').html(html_fname_lname);
                              var mobile_e = "";
                              mobile_e += '<input class="form-control"  name="mobile" value="'+data['mobile']+'"  id="mobile" type="text" ><span id="error_mobile" class="help-block"></span><input name="offer" id="offer_input" value="'+data['offer']+'" type="hidden"><input name="credit" id="credit_input" value="'+credit+'" type="hidden">';
                              $('#mobile_e').html(mobile_e);  
                              $('input#fname_lname').focus();							  
                        }

                $("#loading").hide();

                    }
                });

			}

            else{
				  $('#nationalcode_validation').show();
				  $('.next_but').attr('disabled','disabled');
				  $('input#fname_lname').attr('disabled','disabled');
				  $('input#mobile').attr('disabled','disabled');
			}
}



function fnamelnameValidation(fnamelname){
    if(fnamelname===""){
		$('#error_fnamelname_group').addClass('has-error');
        $('span#error_fname').html('نام و نام خانوادگی را وارد کنید');
        return false;
    }else {
		$('#error_fnamelname_group').addClass('has-success');
        $('span#error_fname').html('');
	 return true;
	}
}
        $(document).on('keyup','#nationalcode',function(event){
//            alert('xxx');
            
			var nationalcode = $(this).val();
            var keycode = (event.keyCode ? event.keyCode : event.which);
//            alert(CheckMeliCode(nationalcode))

             scanNationalcode(nationalcode);

        });


$(document).on('click','.next_but',function(){
        var codemeli = $('#nationalcode').val();
        var mobile = $('#mobile').val();
        var fnamelname = $('#fname_lname').val();
        var credit_input =$('#credit_input').val(); 
       if (MobileValidation(mobile) === true
               && CheckMeliCode(codemeli)===true
               && fnamelnameValidation(fnamelname)===true)
       {
            $.ajax({
                data:'mobile='+mobile,
                type:'POST',
                    url:'modules/Book_Sellers_panel/madule/project/ajax.php',
                success:function(resp){
                    // alert(resp);
	                 if(resp=='null'){
                   		$('#error_mobile_group').removeClass('has-success');
                   		$('#error_mobile_group').addClass('has-error');
					    $('#error_mobile').html('برای این موبایل 3 فاکتور ثبت شده');
                    }else{
             		    $('#error_mobile').html('');

                        $('#tab1').removeClass('active');
                        $('#next_tab1-li').addClass('completed');
                        $('#next_tab2-li').addClass('active');
                        $('#tab2').addClass('active');

                        $('#codemeli_next').html(codemeli);
                        $('span#name_next').html(fnamelname);
                        $('span#mobile_next').html(mobile);
                        $('span#usercredit').html(credit_input);
                    }
                }
            });              
        }
    });    
    
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    $('#isbn').keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
    var isbn=$('#isbn').val();
    isbn=isbn.replace(/\-/g,'');

    if(keycode == '13')
  	{


if(!Number(isbn)){
      swal("شابک!", "شابک را عدد وارد کنید", "warning");
       
    }else if (isbn.length===10 || isbn.length===13){    
	  $("#loading").show();

        $.ajax({
            type:'POST',
            url: 'modules/Book_Sellers_panel/madule/project/ajax.php',
            data:'isbn='+isbn,
            success:function(resp){
                var data = JSON.parse(resp);
                var  html_table = "";
				if(resp=='null'){
                   $('#table_fromIsbn').html('<div class="alert alert-danger"> شابک یافت نشد </div>');
                   $("#loading").hide();
                }
                if(data['status'] == 2 || data['status'] == 3){
                     html_table += '<div class="alert alert-danger">این کتاب شامل طرح نمی باشد</div>';
                     $("#loading").hide();
                }else{
                html_table += '<table class="table table-bordered">\n\
                                <thead>\n\
                                    <tr>\n\
                                        <th class="per50">نام کتاب</th>\n\
                                            <th class="per15">ناشر</th>\n\
                                        <th class="per20">نویسنده</th>\n\
                                        <th class="per15">مبلغ</th>\n\
                                            <th >تخفیف فروشگاه</th>\n\
                                            <th >تعداد</th>\n\
                                            <th ></th>\n\
                                             </tr>\n\
                                            </thead>\n\
                                            <tbody>\n\
                                                <tr>\n\
                                                \n\<input id="bookid" type="hidden" value="'+data['bcode']+'"><input id="status" type="hidden" value="'+data['status']+'"><input id="isbn" type="hidden" value="'+data['isbn']+'">\n\
                                            <td><input id="bookname" type="hidden" value="'+data['bookname']+'">'+data['bookname']+'</td>\n\
                                        <td><input id="publisher" type="hidden" value="'+data['publisher']+'">'+data['publisher']+'</td>\n\
                                    <td><input id="author" type="hidden" value="'+data['author']+'">'+data['author']+'</td>\n\
                                    <td><input type="text" id="price" name="price" value="'+data['price']+'" size="8" max="8"></td>\n\
                                        \n\<td><input type="text" id="discountshop" name="discountshop" value="0"  size="5" maxlength="2" ></td>\n\
                                            \n\<td>\n\
                                                <select id="number">\n\
                                            \n\<option value="1">1</option>\n\
                                            \n\<option value="2">2</option>\n\
                                                \n\</select>\n\
                                            \n\</td>\n\
                                        \n\<td>\n\
                                    <a href="javascript:void(0);" id="add_table2" class="btn btn-success btn-sm">افزودن</a>\n\
                                </td>\n\
                            </tr></tbody></table>';
                   $("#loading").hide();
                }
                $('#table_fromIsbn').html(html_table);
            }
        });
    
	}
	 else{
		   swal("شابک!", "شابک باید 10 یا 13 رقم باشد", "warning");
		 }
	
	}

     });

    $('#reg_isbn').click(function(){
        var isbn=$('#isbn').val();
        isbn=isbn.replace(/\-/g,'');
		
	
	if(!Number(isbn)){
      swal("شابک!", "شابک را عدد وارد کنید", "warning");
       
    }else if (isbn.length===10 || isbn.length===13){    

	   $("#loading").show();
    	
        $.ajax({
            type:'POST',
            url: 'modules/Book_Sellers_panel/madule/project/ajax.php',
            data:'isbn='+isbn,
            success:function(resp){
                var data = JSON.parse(resp);
                var  html_table = "";
				if(resp=='null'){
                   $('#table_fromIsbn').html('<div class="alert alert-danger"> شابک یافت نشد </div>');
                   $("#loading").hide();
                }
                if(data['status'] == 2 || data['status'] == 3){
                     html_table += '<div class="alert alert-danger">این کتاب شامل طرح نمی باشد</div>';
                    $("#loading").hide();
	            }else{
                html_table += '<table class="table table-bordered">\n\
                                <thead>\n\
                                    <tr>\n\
                                        <th class="per50">نام کتاب</th>\n\
                                            <th class="per15">ناشر</th>\n\
                                        <th class="per20">نویسنده</th>\n\
                                        <th class="per15">مبلغ</th>\n\
                                            <th >تخفیف فروشگاه</th>\n\
                                            <th >تعداد</th>\n\
                                            <th ></th>\n\
                                             </tr>\n\
                                            </thead>\n\
                                            <tbody>\n\
                                                <tr>\n\
                                                \n\<input id="bookid" type="hidden" value="'+data['bcode']+'"><input id="status" type="hidden" value="'+data['status']+'"><input id="isbn" type="hidden" value="'+data['isbn']+'">\n\
                                            <td><input id="bookname" type="hidden" value="'+data['bookname']+'">'+data['bookname']+'</td>\n\
                                        <td><input id="publisher" type="hidden" value="'+data['publisher']+'">'+data['publisher']+'</td>\n\
                                    <td><input id="author" type="hidden" value="'+data['author']+'">'+data['author']+'</td>\n\
                                    <td><input type="text" id="price" name="price" value="'+data['price']+'" size="8" max="8"></td>\n\
                                        \n\<td><input type="text" id="discountshop" name="discountshop" value="0"  size="5" maxlength="2" ></td>\n\
                                            \n\<td>\n\
                                                <select id="number">\n\
                                            \n\<option value="1">1</option>\n\
                                            \n\<option value="2">2</option>\n\
                                                \n\</select>\n\
                                            \n\</td>\n\
                                        \n\<td>\n\
                                    <a href="javascript:void(0);" id="add_table2" class="btn btn-success btn-sm">افزودن</a>\n\
                                </td>\n\
                            </tr></tbody></table>';
  
                    $("#loading").hide();
                }
                $('#table_fromIsbn').html(html_table);
            }
        });
		
		
	}
	 else{
		   swal("شابک!", "شابک باید 10 یا 13 رقم باشد", "warning");
		 }
		
    });
    
    
    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    //add to table 2 from isbn
    function CalTotlas(){
        var totalnum = [];
        var totalp = [];
        var totaldiscountshop= [];  
        var totaldiscount= [];          
        var totalamount= [];           
        $('#table2 tr').each(function(){
            var num = $(this).find('.S').text();
            var totalprice = $(this).find('.totalprice').text();  
            var discountshop = $(this).find('.discountshop').text(); 
            var discount = $(this).find('.discount').text();              
            var amount = $(this).find('.amount').text();              

              totalnum.push(Number(num));
              totalp.push(Number(totalprice));            
              totaldiscountshop.push(Number(totalprice) * Number(discountshop) / 100);
              totaldiscount.push(Number(totalprice) * Number(discount) / 100);
              totalamount.push(Number(amount));                 
        });

        var sumnum = 0;
        var sumtotal = 0;
        var sumtotaldiscountshop = 0; 
        var sumtototalamount = 0;  
        var sumtotaldiscount = 0;          
        for(var i=0;i<totalnum.length;i++){
            sumnum +=totalnum[i];
            sumtotal +=totalp[i];   
            sumtotaldiscountshop +=totaldiscountshop[i];   
            sumtototalamount +=totalamount[i];     
            sumtotaldiscount +=totaldiscount[i];               
        } 

        var credit = $('#usercredit').text();
        if( Number(credit) < sumtotaldiscount){
            //alert(sumtotaldiscount -  Number(credit));
         //   var reminder = sumtotaldiscount -  Number(credit);
            //sumtotaldiscount+= reminder;
          //  if (sumtotaldiscount > 200000)
           //  {
			  sumtotaldiscount = credit; 
			  sumtototalamount = sumtotal- sumtotaldiscountshop- sumtotaldiscount;
			// }
	       
		   swal("اتمام اعتبار!", "اعتبار این شخص به پایان رسیده", "warning");
		   
        }
//        alert(sumtotaldiscount);
        $('span#tnumber').html(Math.round(sumnum));
        $('span#totalpricetop').html(Math.round(sumtotal));
        $('span#tdiscountshop').html(Math.round(sumtotaldiscountshop));
        $('span#totaldiscount').html(Math.round(sumtotaldiscount));
        $('span#tamount').html(Math.round(sumtototalamount));
    }
    
    $(document).on('click','#add_table2',function(){


      var  offerperson = $('html, body').find( "input[name='offer']" ).val();		
      var  approvedparty = $('html, body').find( "input[name='approvedparty']" ).val();		
	   
       var bookid = $('#bookid').val();
       var bookname = $('#bookname').val();
       var publisher = $('#publisher').val();
       var isbn = $('#isbn').val();       
       var author = $('#author').val();
       var price = $('#price').val();
       var discountshop = $('#discountshop').val();

		if(discountshop == '')
  		 discountshop = 0;
		 
		if(discountshop > 10)
        {
  		 discountshop = 10;		 
		  swal("تخفیف فروشگاه", "تخفیف فروشگاه نمی تواند بیشتر از 10% باشد", "warning");

		}

       var status = $('#status').val();

        if(status==1)
        {
         discount=25;
        }
        else
         {   
         discount = 20;
         }

        if(offerperson > 0 && offerperson != '')
	     {   
          discount = offerperson;
         }
	    
        if(approvedparty == 1)
		{
     
		  discountshop =Number(discountshop) + Number(discount) /2;
		  discount = discount /2 ;
		
		}
      
		// alert(discount); 
       var discount_level = Number($('span#totaldiscount').text());
       var credit = Number($('#usercredit').text());
//      if(discount_level >= credit) 
      // {
      //   discount = 0;
      // }   

       var number = $('#number').val();
       var valuebook =$('#number-'+bookid).text();
       var no =$('#no-'+bookid).text();       
         i += Number(no);
        var N = Number(number);
        var V = Number(valuebook);
        var S = N+V;


       var i=1;
       var discountpayshop = (S * (price* discountshop)/100);
       var discountpay = (S * (price* discount)/100);       
       var total_price = S * price; 
       var amount = total_price-discountpayshop-discountpay;
       var html_table2 = "";
       if (S > 2){
		   swal("تعداد کتاب", "از هر کتاب فقط دو جلد می توانید انتخاب کنید", "warning");
			
            return false;
        }
        else if(S === 2 && V !=0)
        {
            html_table2 = '<td ></td>\n\
                            <td>'+isbn+'</td>\n\
                            <td>'+bookname+'/'+publisher+'/'+author+'</td>\n\
                            <td>'+price+'</td>\n\
                            <td><div id="number-'+bookid+'" class="S" data-number="'+S+'">'+S+'</div></td>\n\
                            <td class="totalprice">'+total_price+'</td>\n\
                            \n\<td class="discountshop">'+discountshop+'</td>\n\
                            \n\<td class="discount">'+discount+'</td>\n\
                            \n\<td class="amount">'+amount+'</td>\n\
                            \n\<td id="delete"><i class="fa fa-remove color-red"></i></td>\n\
                            ';
            $('#tr-'+bookid).html(html_table2);
//            return false;
        }
        else if( V==0)
        {
//            alert(N);
            html_table2 = '<tr id="tr-'+bookid+'">\n\
                            <td></td>\n\
                            <td>'+isbn+'</td>\n\
                            <td>'+bookname+'/'+publisher+'/'+author+'</td>\n\
                            <td class="price">'+price+'</td>\n\
                            <td><div id="number-'+bookid+'" class="S" data-number="'+N+'">'+N+'</div></td>\n\
                            <td class="totalprice">'+total_price+'</td>\n\
                            \n\<td class="discountshop">'+discountshop+'</td>\n\
                            \n\<td class="discount">'+discount+'</td>\n\
                            \n\<td class="amount">'+amount+'</td>\n\
                            \n\<td id="delete"><i class="fa fa-remove color-red"></i></td>\n\
                            </tr>';
            $('#table2').append(html_table2);
        }
        CalTotlas();
       $('#isbn').val('');
	   $('#isbn').focus();
	   $('#table_fromIsbn').html('');

    });

    
    $(document).on('click','#delete',function(){
        $(this).parent().remove();
        CalTotlas();
    });
    
    //var total = $('span#usercredittop').text();
    
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
$(document).on('click','.btn_data',function(){
	
	

    $("#loading").show();
    var nationalcode = $('span#codemeli_next').text();
    var fname_lename = $('span#name_next').text();
    var mobile = $('span#mobile_next').text();
    var tnumber = $('span#tnumber').text();
    var totalpricetop = $('span#totalpricetop').text();
    var tdiscountshop = $('span#tdiscountshop').text();
    var totaldiscount = $('span#totaldiscount').text();
    var shopid = $('span#shopid').text();
    var tamount = $('span#tamount').text();
	
//    alert(nationalcode);
    var myTableArray = [];
    var customerinfo = [];

	$('a.btn_data').attr('disabled','disabled');

    $("#table2 tr").each(function() {
        var arrayOfThisRow = [];
        var tableData = $(this).find('td');
        if (tableData.length > 0) {
            tableData.each(function() { arrayOfThisRow.push($(this).text()); });
            myTableArray.push(arrayOfThisRow);
        }
    });
 
    customerinfo.push(nationalcode);
    customerinfo.push(fname_lename);
    customerinfo.push(mobile);
    customerinfo.push(tnumber);
     customerinfo.push(totalpricetop);
     customerinfo.push(tdiscountshop);
     customerinfo.push(totaldiscount);
     customerinfo.push(tamount);
     customerinfo.push(shopid);

     
    $.ajax({
        type:'POST',
        url:'modules/Book_Sellers_panel/madule/project/ajax.php',
        data:{ myTableArray: myTableArray , customerinfo: customerinfo },
         success:function(resp){
         //  alert(resp);
            $('#tab2').removeClass('active');
            $('#next_tab2-li').addClass('completed');
            $('#next_tab3-li').addClass('active');
            $('#tab3').addClass('active');
            
            $('#table_prerecips').html($('table#table_details'));
            $('#orderinfoshow').html($('#orderinfo'));
            $('#printfactor').html($('<a id="print" target="_blank"  class="btn btn-success pull-right" href="modules.php?name=Book_Sellers_panel&file=printshop&sid='+resp+'">چاپ</a>'));
                
				
				
            $("#loading").hide();


        }
        
    });
});



function printDiv(divName) {
     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
}

//$(function() {
//    $("#print").click(function() {
//        window.print('#table_details');
//    });
//});