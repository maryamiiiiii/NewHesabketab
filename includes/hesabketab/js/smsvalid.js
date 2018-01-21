
function checkTextarea(textarea){
    
    if(textarea === ""){
        $('#message_error').html('متن پیامک را پر کنید');
        return false;
    }
    else return true;
}

function calculate(){
    var checkoffer =[];
    var checkbox =[];

    var checkboxid=[];


   var flag = 0;

	var fristsms = $('input[name="fristsms"]').val();

	var chars = $('#message').val().length,
		messages = Math.ceil(chars / 70),
		remaining = messages * 70 - (chars % (messages * 70) || messages * 70);

    $('span#sms_quantity').text(messages);

    $('.check_class:checked').each(function(){
        var id = $(this).attr('id');
        checkboxid.push(id.substr(9,1));
        if(id == 'checkbox-5' && fristsms == 0)
         {
         checkoffer.push($(this).val());
		 }
		else 
         checkbox.push($(this).val());
		 
        flag =1;
		 	
	});



    var sum=0;
    var numbersms = $('span#sms_quantity').text();

    for(var i=0;i<checkbox.length;i++){
        sum +=Number(checkbox[i]);
    }
    var total_cost = 110 * sum*Number(numbersms);

    var sumoffer=0;

    for(var i=0;i<checkoffer.length;i++){
        sumoffer +=Number(checkoffer[i]);
    }
    var total_costoffer = 110 * sumoffer*Number(numbersms);

    $('span#number_first').html(sum);
    $('span#total_cost').html(total_cost);
    $('span#total_costoffer').html( 'تخفیف :'+total_costoffer);

    $('input[name="groups"]').val(checkboxid);


    $('input[name="Amount"]').val(total_cost);
    $('input[name="ResNum"]').val($('input[name="tracking"]').val());

    if(flag == 0) return false;
    else return true;
    //alert(total_cost);
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function checkCheckBox(){
    var checkbox =[];
    $('.check_class:checked').each(function(){
        checkbox.push($(this).val());
    });
    if(checkbox=="") return false;
    else return true;
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
$(document).on('click',"input#check1",function(){
    $('input:checkbox').not(this).prop('checked', this.checked);
});
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
            
$(document).ready(function(){
    var $remaining = $('#remaining'),
        $messages = $remaining.prev();


$('#message').keydown(function(){

        var tlen = $(this).val();
        var fristsms = $('input[name="fristsms"]').val();

        var set = 0;

       if(fristsms == 0)
	    set = 139 ;
       else
	    set = 208;		
        //alert(tlen);

        var chars = $(this).val().length,
            messages = Math.ceil(chars / 70),
            remaining = messages * 70 - (chars % (messages * 70) || messages * 70);
        $('span#sms_quantity').text(messages);
        if(chars===set){
            var remain = parseInt(set-chars);

		   swal("پیامک", "شما بیشتر از دو پیامک نمیتوانید وارد کنید", "warning");

            if(remain <=0){
                $('#message').val((tlen).substr(0,139));
//                return false;
            }
        }
//        if(messages==2){
//            alert(messages);
//            $("textarea").prop('disabled', true);
//        }
        if(remaining ==0 ){
            $remaining.text('/'+69);
        }else{
            $remaining.text('/'+remaining );
        }

    });
});	
	
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
$('.check_class').change(function(){

calculate();
});
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


$('#next-step1').click(function(){	
customValid();
});
$('#next_tab2-li').click(function(){	
customValid();
});
function customValid(){
    if(calculate()=== true){
    var textarea = $('#message').val();
    $('.check_class:checked').each(function(){
        var id=$(this).attr('id');
        var filter_selected_li=$('#chosen_fest').find('li[data-id='+id+']');
        var len=filter_selected_li.length;
        if(len<=0){
            var response = $('label[for="' + this.id + '"]').html();
            $('#chosen_fest').append('<li data-id='+id+'>'+response+'</li>');
        }
        else{
            return;
        }
            
    })

    if(checkTextarea(textarea)=== true && checkCheckBox() === true){
        $('#tab1').removeClass('active');
        $('#tab2').addClass('active');
        $('span#number_next').text($('span#number_first').text()); 
        $('span#sms_quantity_next').text($('span#sms_quantity').text());
        $('span#total_cost_next').text($('span#total_cost').text());
        $('#message_next').text($('#message').val());
        $('span#offer').text($('span#total_cost').text());
        
        $('#next_tab1-li').addClass('completed');
        $('#next_tab2-li').addClass('active');
        $('#next_tab3-li').removeClass('active');
        $('#tab3').removeClass('active');	
    }

}else{
    swal("پیامک", "یکی از گروه ها رو انتخاب کنید", "warning");

}	
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

$('#before-step').click(function(){
    virayesh();
});
$('#next_tab1-li').click(function(){
    virayesh();
});

function virayesh(){
    $('#tab2').removeClass('active');
    $('#tab1').addClass('active');
    $('#chosen_fest').html('');
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

$('#send-testsms').click(function(){
    var message = $('#message_next').text();
    var mobile = $('#testmobile').val();
    $.ajax({
        type:'POST',
        url:'modules/Book_Sellers_panel/madule/project/ajax.php',
        data:'testmobile='+mobile+'&message='+message,
        success:function(resp){
         if(resp == 'success'){
		   swal("ارسال پیامک!", "پیامک تست به شماره "+mobile+" ارسال شد", "success");
        }
    }
    });
	$('#modal-smstest').modal('hide');	
		
});
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


function submitpay(){

 	$("#loading").show();

    var num = $('span#number_next').text();
    var quantity = $('span#sms_quantity_next').text();
    var total_cost = $('span#total_cost_next').text();
    var message = $('#message_next').text();
    var groups = $('#groups').val();
    var shopid = $('span#shopid').text();
    var tracking = $('input#tracking').val();
    $.ajax({
        type:'POST',
        url:'modules/Book_Sellers_panel/madule/project/ajax.php',
        data:'numsms='+num+'&quantity='+quantity+'&total_cost='+total_cost+'&groups='+groups+'&shopid='+shopid+'&message='+message+'&tracking='+tracking,
        success:function(resp){
         if(resp == 'success'){
			  $('#tab2').removeClass('active');
            if(groups == '5'){
              $('#showsuccess').html('<div class="col-md-12 col-lg-12 alert alert-info fade in text-right"> درخواست شما با موفقیت انجام شد بعد از تایید مدیر سایت ارسال خواهد شد</div>')			  
			}
			else
              $('#showsuccess').html('<form method="post" action="https://sep.shaparak.ir/Payment.aspx"><input type="hidden" name="Amount" id="Amount" value="'+total_cost+'" ><input type="hidden" name="MID" value="21123103" ><input type="hidden" name="ResNum" value="'+tracking+'" ><input type="hidden" name="RedirectURL" value="http://www.ketab.ir/modules.php?name=Book_Sellers_panel&op=smspanel"><input type="submit" class="btn btn-success"  value="تایید وپرداخت"></form>');
			  $('#next_tab1-li').addClass('completed');
			  $('#next_tab2-li').addClass('completed');
			  $('#next_tab3-li').addClass('active');
			  $('#tab3').addClass('active');				
             //   alert(resp);
			 
        	$("#loading").hide();			 
        }



          }

    
	});
	
	
}


