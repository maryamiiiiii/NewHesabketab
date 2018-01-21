function ProfileCustom(tag){
    if(tag==='editPersonalDetails'){
        $("form#editPersonalDetails").find('.editPD').fadeOut(100);
    $("form#editPersonalDetails").find('.changePD').show(100);         
    $("form#editPersonalDetails").find('input').fadeIn(100);
    $("form#editPersonalDetails").validate({
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
        birthDate: "required",
        email:{
            required: true,
            email:true
        },
        mobileNumber: {
            required: true,
            number:true,
            maxlength: 11,
            minlength:11
        }
    },
    messages: {
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
        birthDate: "لطفا تاریخ تولد را وارد کنید",
        email:{
            required: "لطفا ایمیل را وارد کنید",
            email:"لطفا یک ایمیل معتبر  وارد کنید"
        },
        mobileNumber: {
            required: "لطفا شماره موبایل را وارد کنید",
            number:" شماره موبایل فقط شامل اعداد می باشد",
            maxlength: " شماره موبایل شامل 11 عدد می باشد",
            minlength:" شماره موبایل شامل 11 عدد می باشد"
        }

    },
    highlight: function( label ) {
            $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    success: function( label ) {
            $(label).closest('.form-group').removeClass('has-error');
            label.remove();
    },
    submitHandler: function(form) {
        $.ajax({
            url: 'other.php',
            data:  $(form).serialize(),
            dataType: 'json'
        });
        return false;
    }
    });
    }
    if(tag==='editMarketDetails'){
        $("form#editMarketDetails").find('.editPD').fadeOut(100);
        $("form#editMarketDetails").find('.changePD').show(100);         
        $("form#editMarketDetails").find('input').fadeIn(100);
        $("form#editMarketDetails").find('textarea').fadeIn(100);
            $("form#editMarketDetails").validate({
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
             phone:{
                required: true,
                number:true
            },
            ostan:"required",
            shahr:"required",
            message:"required",
            lng:"required",
            lat:"required"
        },
        groups: {
             allcheck: "lat lng"
        },
        messages: {
            phone:{
                required: "لطفا شماره تلفن را وارد کنید",
                number:"شماره تلفن فقط شامل اعداد می شود"
            },                                
            ostan: "لطفا استان را انتخاب کنید",
            shahr: "لطفا شهرستان را انتخاب کنید",
            message: "لطفا متن پیام  را وارد کنید",
            lng:"لطفا آدرس را روی نقشه مشخص کنید",
            lat:"لطفا آدرس را روی نقشه مشخص کنید"            
        },

        highlight: function( label ) {
                $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function( label ) {
                $(label).closest('.form-group').removeClass('has-error');
                label.remove();
        }
});
        }
    if(tag==='editBankDetails'){
        $("form#editBankDetails").find('.editPD').fadeOut(100);
        $("form#editBankDetails").find('.changePD').show(100);         
        $("form#editBankDetails").find('input').fadeIn(100);
        $("form#editBankDetails").validate({
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
            bankName: "required",
            cardNumber: {
                    required: true,
                    number:true
                },
            shebaNumber:{
                required: true
            }
        },
        messages: {
            bankName: "لطفا نام بانک را وارد کنید",
            cardNumber:{
                required: "لطفا شماره کارت را وارد کنید",
                number:"شماره کارت فقط شامل اعداد می شود"
            },
            shebaNumber:{
                required: "لطفا شماره شبا را وارد کنید"
            }
        },

        highlight: function( label ) {
                $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function( label ) {
                $(label).closest('.form-group').removeClass('has-error');
                label.remove();
        }
});
        }
    if(tag==='editSendMadarek'){
    $(".remove").click(function(){
        $(this).parent(".pip").remove();
    });
    $(".remove").fadeIn(100);
    $("form#editSendMadarek").find('.editPD').fadeOut(100);
    $("form#editSendMadarek").find('.changePD').show(100);         
    $("form#editSendMadarek").find('input').fadeIn(100);
    $("form#editSendMadarek").validate({
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
        MelliCardpic:{
            required: true,
               accept: "png|jpe?g|gif",
               filesize: 50000 
        },
       JavazeKasbpic:{
            required: true,
               accept: "png|jpe?g|gif",
               filesize: 50000 
        },
       OtherPic:{
            required: true,
               accept: "png|jpe?g|gif",
               filesize: 50000 
        }
    },
    messages: {
        MelliCardpic:"تصویر کارت ملی را آپلود کنید،فرمت های JPG و GIF و PNG قابل قبول هستند و حجم فایل باید کمتر از 500 کیلوبایت باشد",
        JavazeKasbpic:"تصویرجواز کسب را آپلود کنید،فرمت های JPG و GIF و PNG قابل قبول هستند و حجم فایل باید کمتر از 500 کیلوبایت باشد",
        OtherPic:"تصویر مدرک را آپلود کنید،فرمت های JPG و GIF و PNG قابل قبول هستند و حجم فایل باید کمتر از 500 کیلوبایت باشد"            
    },

    highlight: function( label ) {
            $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    success: function( label ) {
            $(label).closest('.form-group').removeClass('has-error');
            label.remove();
    }
});
    }
}