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
   
}