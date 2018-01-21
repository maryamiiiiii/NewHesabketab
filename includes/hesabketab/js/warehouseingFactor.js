/*select item*/
$('select#creditCard').on('change', function() {
    var vali=this.value;
    $('#selectLabel span.txt').text(vali);
})


/*change bookrun svg*/
$('.btnbookrunModal').click(function (){
    $('i.bookrunIcon').toggleClass('fa-bookrun fa-bookrunW');
});

/*validate*/

/*!

 =========================================================
 * Bootstrap Wizard - v1.1.1
 =========================================================
 
 * Product Page: https://www.creative-tim.com/product/bootstrap-wizard
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/bootstrap-wizard/blob/master/LICENSE.md)
 
 =========================================================
 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// Get Shit Done Kit Bootstrap Wizard Functions

searchVisible = 0;
transparent = true;

$(document).ready(function(){

    /*  Activate the tooltips      */
    $('[rel="tooltip"]').tooltip();

    // Code for the Validator
    var $validator = $('#signupForm').validate({
            ignore: ":hidden:not(.selectpicker)"
,
		  rules: {
				proweight: {
					required: true,
                                        number:true,
					maxlength: 5,
					minlength:1,
					min:1,
					max:20000,
				},
				provalue: {
					required: true,
                                        number:true,
					minlength: 3,
				},
			  
                  prodes: {
					required: true,
					minlength: 3,
				},
                                userInfo:{
					required: true,
					minlength: 3,
					number:false,
					
				},
                                phone: {
					required: true,
                                        number:true,
					minlength: 11
				},
                                userMobile: {
					required: true,
                                        number:true,
					minlength: 11
				},
                                state:"required",
                                "city":"required",
                                tel:{
					required: true,
					number: true,
					minlength:6
                                        
				},
                                postalCode: {
					required: true,
                                        number:true,
					minlength: 10
				},
                                address:"required",
                                
                                
                               postkind:"required",
                                paykind:"required",
                                
                                
			},
		
		 hiddenHandler: {
			 required:true,
			 
			 
		 },
                        
			messages: {
				proweight: {
					required: "لطفا وزن را وارد کنید",
                                        number:"وزن باید به عدد باشد",
					minlength: "وزن باید عددی بین 0 تا 20000 باشد",
					maxlength:"وزن باید عددی بین 0 تا 20000 باشد",
					min:"حداقل مقدار وزن باید بیشتر از 1 گرم باشد",
					max:"حداکثر مقدار وزن 20000 گرم میباشد"
				},
				provalue: {
					required: "لطفا ارزش مرسوله را وارد کنید",
                                        number:"لطفا به عدد وارد کنید",
					minlength: "حداقل باید 3 رقم باشد"
				},
                                prodes: "لطفا محتویات مرسوله را وارد کنید",
                                userInfo: {
					required: "لطفا نام و نام خانوادگی را وارد کنید",
                                        number:"لطفا حروف وارد کنید",
					minlength: "حداقل باید 3 حرف باشد",
		
				},
                                phone: {
					required: "لطفا شماره تلفن ثابت را وارد کنید",
                                        number:"تلفن فقط شامل اعداد می شود",
					minlength: "تلفن باید شامل ۱۱ عدد باشد"
				},
                                userMobile: {
					required: "لطفا شماره تلفن همراه را وارد کنید",
                                        number:"شماره موبایل فقط شامل اعداد می شود",
					minlength: "شماره موبایل باید شامل ۱۱ عدد باشد"
				},
                                 state: "لطفا استان را انتخاب کنید",
                                "city": "لطفا شهرستان را انتخاب کنید",
                                tel: {
					required: "لطفا شماره تلفن ثابت خود را وارد کنید",
                                        number:"شماره تلفن فقط شامل اعداد می شود",
					minlength: "شماره تلفن حداقل باید شامل 6 رقم باشد"
				},
                                postalCode: {
                                        required: "لطفا کدپستی را وارد کنید",
					minlength: "کدپستی باید شامل ۱۰ عدد باشد",
                                        number:"کدپستی فقط شامل اعداد می شود"
                                },
				postkind: {
                                        required: "لطفا نوع ارسال مرسوله را انتخاب کنید",
					
                                },
				paykind: {
                                        required: "لطفا نوع پرداخت را انتخاب کنید",
					
                                },
				
				
                                address: "لطفا آدرس  را وارد کنید",
				
								hiddenHandler:"لطفا بر روی یکی از گزینه های موجود کلیک کنید"
                                
                                
                                
                                
                                
			},
		errorPlacement: function(error, element) 
        {
            if ( element.is(":radio") ) 
            {
                error.appendTo( element.parents('.input-group') );
            }
            else 
            { // This is the default behavior 
                error.insertAfter( element );
            }
         }
	});

     // Wizard Initialization
  	$('.wizard-card').bootstrapWizard({
        'tabClass': 'nav nav-pills',
        'nextSelector': '.btn-next',
        'previousSelector': '.btn-previous',

        onNext: function(tab, navigation, index) {
        	var $valid = $('.wizard-card form').valid();
        	if(!$valid) {
        		$validator.focusInvalid();
        		return false;
        	}
			else{
				hideMyIntro();
				getAllInputs();
			}
        },

        onInit : function(tab, navigation, index){

          //check number of tabs and fill the entire row
          var $total = navigation.find('li').length;
          $width = 100/$total;
          var $wizard = navigation.closest('.wizard-card');

          $display_width = $(document).width();

          if($display_width < 600 && $total > 3){
              $width = 50;
          }

           navigation.find('li').css('width',$width + '%');
           $first_li = navigation.find('li:first-child a').html();
           $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
           $('.wizard-card .wizard-navigation').append($moving_div);
           refreshAnimation($wizard, index);
           $('.moving-tab').css('transition','transform 0s');
       },

        onTabClick : function(tab, navigation, index){
            var $valid = $('.wizard-card form').valid();

            if(!$valid){
                return false;
            } 
			else {
				getAllInputs();
				hideMyIntro();
                return true;
				
            }
        },

        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index+1;

            var $wizard = navigation.closest('.wizard-card');

            // If it's the last tab then hide the last button and show the finish instead
            if($current >= $total) {
                $($wizard).find('.btn-next').hide();
                $($wizard).find('.btn-finish').show();
            } else {
                $($wizard).find('.btn-next').show();
                $($wizard).find('.btn-finish').hide();
            }

            button_text = navigation.find('li:nth-child(' + $current + ') a').html();

            setTimeout(function(){
                $('.moving-tab').text(button_text);
            }, 150);

            var checkbox = $('.footer-checkbox');

            if( !index == 0 ){
                $(checkbox).css({
                    'opacity':'0',
                    'visibility':'hidden',
                    'position':'absolute'
                });
            } else {
                $(checkbox).css({
                    'opacity':'1',
                    'visibility':'visible'
                });
            }

            refreshAnimation($wizard, index);
        }
  	});


    // Prepare the preview for profile picture
    $("#wizard-picture").change(function(){
        readURL(this);
    });

    $('[data-toggle="wizard-radio"]').click(function(){
        wizard = $(this).closest('.wizard-card');
        wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
        $(this).addClass('active');
        $(wizard).find('[type="radio"]').removeAttr('checked');
        $(this).find('[type="radio"]').attr('checked','true');
    });

    $('[data-toggle="wizard-checkbox"]').click(function(){
        if( $(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).find('[type="checkbox"]').removeAttr('checked');
        } else {
            $(this).addClass('active');
            $(this).find('[type="checkbox"]').attr('checked','true');
        }
    });

    $('.set-full-height').css('height', 'auto');

});



 //Function to show image before upload

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$(window).resize(function(){
    $('.wizard-card').each(function(){
        $wizard = $(this);
        index = $wizard.bootstrapWizard('currentIndex');
        refreshAnimation($wizard, index);

        $('.moving-tab').css({
            'transition': 'transform 0s'
        });
    });
});

function refreshAnimation($wizard, index){
    total_steps = $wizard.find('li').length;
    move_distance = $wizard.width() / total_steps;
    step_width = move_distance;
    move_distance *= index;

    $wizard.find('.moving-tab').css('width', step_width);
    $('.moving-tab').css({
        'transform':'translate3d(' + move_distance + 'px, 0, 0)',
        'transition': 'all 0.3s ease-out'

    });
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};
function getAllInputs(){
        var signupForm = $("form#signupForm").serializeArray();
        var array={};
        for(var i=0;i<signupForm.length;i++){
           array[signupForm[i]['name']]=signupForm[i]['value']; 
        }
        $('.weight_label').text(array['proweight']);
        $('.userinfo_label').text(array['userInfo']);
		$('.postalcode_label').text(array['postalCode']);
		$('.address_label').text(array['address']);
		$('.tel_label').text(array['tel']);
		$('.mobile_label').text(array['userMobile']);
		$('.provalue_label').text(array['provalue']);
		$('.prodes_label').text(array['prodes']);
		$('.city_label').text(array['city']);
		$('.state_label').text(array['state']);
		$('.paykind_label').text(array['paykind']);
		$('.postkind_label').text(array['postkind']);
    };


 function hideMyIntro(){
		 var activeOne = $('.mystep-li2').hasClass('active');
		 if ( activeOne = true ) {
			 
    		$('.helper').hide();
			
		}
		 
		 else{
			 $('.helper').show();
		 }
		 
	 };
