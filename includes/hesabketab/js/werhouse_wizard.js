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
    var $validator = $('.wizard-card form').validate({
            ignore: ":hidden:not(.selectpicker)"
,
		  rules: {
				mobileNumber: {
                                    required: true,
                                    number:true,
                                    maxlength: 11,
                                    minlength:11
				},
                                codeSabt: "required",
                                name: "required",
                                marketName: "required",
                                fatherName: "required",
				parvanehKasb: {
					required: true,
                                        number:true
                                    },
                                codeMelli: {
					required: true,
                                        number:true,
					minlength: 10
				},
                                bankName: "required",
                                inventoryDate: "required",
                                cardNumber: {
					required: true,
                                        number:true
                                    },
                                email:{
                                    required: true,
                                    email:true
                                },
                                shebaNumber:{
                                    required: true,
                                    number:true
                                },
                                phone:{
                                    required: true,
                                    number:true
                                },
                                werhouseName:"required",
                                shahr:"required",
                                address:"required",
                                lng:"required",
                                lat:"required",
                                 MelliCardpic:{
                                     required: true,
                                        accept: "png|jpe?g|gif",
                                        filesize: 500000 
                                 },
                                JavazeKasbpic:{
                                     required: true,
                                        accept: "png|jpe?g|gif",
                                        filesize: 500000 
                                 },
                                OtherPic:{
                                     required: true,
                                        accept: "png|jpe?g|gif",
                                        filesize: 500000 
                                 }
			},
                        groups: {
                             latlng: "lat lng"
                        },
    
			messages: {
				mobileNumber: {
                                    required: "لطفا شماره موبایل را وارد کنید",
                                    number:" شماره موبایل فقط شامل اعداد می باشد",
                                    maxlength: " شماره موبایل شامل 11 عدد می باشد",
                                    minlength:" شماره موبایل شامل 11 عدد می باشد"
				},
                                codeSabt:"لطفا کد ارسال شده به موبایلتان را وارد کنید",
                                name: "لطفا نام و نام خانوادگی را وارد کنید",
                                marketName: "لطفا نام فروشگاه را وارد کنید",
                                fatherName: "لطفا نام پدر را وارد کنید",
				parvanehKasb: {
                                    required: "لطفا شماره پروانه کسب را وارد کنید",
                                    number:"شماره پروانه کسب فقط شامل اعداد می شود"
                                },
                                codeMelli: {
                                    required: "لطفا کدملی را وارد کنید",
                                    number:"کد ملی فقط شامل اعداد می شود",
                                    minlength: "کدملی باید شامل ۱۰ عدد باشد"
				},
                                bankName: "لطفا نام بانک را وارد کنید",
                                inventoryDate: "لطفا تاریخ انبارگردانی را وارد کنید",
                                cardNumber:{
                                    required: "لطفا شماره کارت را وارد کنید",
                                    number:"شماره کارت فقط شامل اعداد می شود"
                                },
                                email:{
                                    required: "لطفا ایمیل را وارد کنید",
                                    email:"لطفا یک ایمیل معتبر  وارد کنید"
                                },
                                shebaNumber:{
                                    required: "لطفا شماره شبا را وارد کنید",
                                    number:"شماره شبا فقط شامل اعداد می شود"
                                },
                                phone:{
                                    required: "لطفا شماره تلفن را وارد کنید",
                                    number:"شماره تلفن فقط شامل اعداد می شود"
                                },                                
                                werhouseName: "لطفا انبار را انتخاب کنید",
                                shahr: "لطفا شهرستان را انتخاب کنید",
                                address: "لطفا آدرس  را وارد کنید",
                                lng:"لطفا آدرس را روی نقشه مشخص کنید",
                                lat:"لطفا آدرس را روی نقشه مشخص کنید",
                                MelliCardpic:"تصویر کارت ملی را آپلود کنید،فرمت های JPG و GIF و PNG قابل قبول هستند و حجم فایل باید کمتر از 500 کیلوبایت باشد",
                                JavazeKasbpic:"تصویرجواز کسب را آپلود کنید،فرمت های JPG و GIF و PNG قابل قبول هستند و حجم فایل باید کمتر از 500 کیلوبایت باشد",
                                OtherPic:"تصویر مدرک را آپلود کنید،فرمت های JPG و GIF و PNG قابل قبول هستند و حجم فایل باید کمتر از 500 کیلوبایت باشد"                            }
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
            } else {
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
                initialize();
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

$.validator.addMethod('filesize', function(value, element, param) {
    // param = size (en bytes) 
    // element = element to validate (<input>)
    // value = value of the element (file name)
    return this.optional(element) || (element.files[0].size <= param) 
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


/*for insert value*/
function getAllInputs(){
        var signupForm = $("form#signupForm").serializeArray();
        var array={};
        for(var i=0;i<signupForm.length;i++){
           array[signupForm[i]['name']]=signupForm[i]['value']; 
        }
        var inputtext=array['werhouseName'];
        $('.spanInput').text(inputtext);
        $('.spanInput').val(inputtext);
        var inputtext2=array['inventoryDate'];
        $('.spanInput2').text(inputtext2);
        $('.spanInput2').val(inputtext2);
        
    };
    
    
                     /*maps script*/
function initialize() {
    var myLatlng = new google.maps.LatLng(35.6891975,51.388973599999986);
  var mapProp = {
    center:myLatlng,
    zoom:13,
    mapTypeId:google.maps.MapTypeId.ROADMAP
      
  };
  var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!',
      draggable:true  
  });
    document.getElementById('lat').value= "";
    document.getElementById('lng').value= "";
    // marker drag event
    google.maps.event.addListener(marker,'drag',function(event) {
        document.getElementById('lat').value = event.latLng.lat();
        document.getElementById('lng').value = event.latLng.lng();
    });

    //marker drag event end
    google.maps.event.addListener(marker,'dragend',function(event) {
        document.getElementById('lat').value = event.latLng.lat();
        document.getElementById('lng').value = event.latLng.lng();
        
        
        //alert("lat=>"+event.latLng.lat());
        //alert("long=>"+event.latLng.lng());
    });
}