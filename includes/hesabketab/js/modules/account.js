$(document).ready(function() {

    //------------- Form validation -------------//
    $('.select2').select2();


//	$(".mask-mobile").mask("99999999999");

//	$(".mask-numberformat").mask("(999) 999-9999", { autoclear: false, completed:function(){alert("completed autoclear!");} });
	
	$("#account").validate({
		ignore: null,
		ignore: 'input[type="hidden"]',
		errorPlacement: function( error, element ) {
			var place = element.closest('.input-group');
			if (!place.get(0)) {
				place = element;
			}
			if (place.get(0).type === 'checkbox') {
				place = element.parent();
			}
			if (error.text() !== '') {
				place.after(error);
			}
		},
		errorClass: 'help-block',
		rules: {
			account_title: "required",
			account_status: "required",
			account_kind:   "required",
			account_family: "required",
			account_address: "required",												
		    account_nationalcode: {
		      number: true
		    },
			account_mobile: {
  			  required:true,	
 	  		  minlength: 11,
	  		  maxlength: 11
			},
			account_primarydebit: {
		      number: true,
			  min:0
		    },
			account_primarycredit: {
		      number: true,
			  min:0
		    },
			account_creditlimit: {
		      number: true,
			  min:0
		    },
			account_discount: {
			  range: [1,99]
		    },
		    account_phone: {
			  required:true,	
		      number: true
		    }
		},
		messages: {
            account_title :"عنوان را وارد کنید",
            account_family :"مدیر مسئول را وارد کنید",			
			account_status: "وضعیت را انتخاب کنید",
			account_kind: "نوع همکاری را انتخاب کنید",
			account_mobile: "موبایل را به صورت 09121111111 وارد کنید",
			account_phone: "تلفن را به صورت عددی وارد کنید",
			account_address: "آدرس را وارد کنید"						
		},
		highlight: function( label ) {
			$(label).closest('.form-group').removeClass('has-success').addClass('has-error');
		},
		success: function( label ) {
			$(label).closest('.form-group').removeClass('has-error');
			label.remove();
		},
        submitHandler: function(form) {
               var array_form = $('form#account').serializeArray();
               var form_name = "account";
               var method_name = '0';
               if ( $('#up_account_id').val() > 0)
   	             method_name = '1';

               array_form.push({name: "formname", value:form_name},{name: "methodname", value:method_name});
                          //console.log(array_form);
                          //alert(reg_cos_form);
                          //alert(array_form);
			  $.ajax({
				  type:'POST',
				  url:'includes/hesabketab/ajax/ajax.php',
				  data:array_form,
				  success:function(resp){
                                    //    alert(resp);
					  if(resp >  0 ){
                         swal("ثبت اطلاعات", "اطلاعات با موفقیت ثبت شد", "success");
                         $("#account").trigger('reset');
					  }
					  if(resp=='updated'){
                         swal("ویرایش اطلاعات", "اویرایش طلاعات  با موفقیت انجام شد", "success");
					  }
				  }
			  });			 
        }
		
	});
	
});

