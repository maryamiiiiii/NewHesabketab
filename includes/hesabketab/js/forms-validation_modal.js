//------------- forms-validation.js -------------//
/*$(document).ready(function() {*/

/*//------------- Sparklines in header stats -------------//
$('#spark-visitors').sparkline([5,8,10,8,7,12,11,6,13,8,5,8,10,11,7,12,11,6,13,8], {
        type: 'bar',
        width: '100%',
        height: '20px',
        barColor: '#dfe2e7',
        zeroAxis: false,
});

$('#spark-templateviews').sparkline([12,11,6,13,8,5,8,10,12,11,6,13,8,5,8,10,12,11,6,13,8,5,8], {
        type: 'bar',
        width: '100%',
        height: '20px',
        barColor: '#dfe2e7',
        zeroAxis: false,
});

$('#spark-sales').sparkline([19,18,20,17,20,18,22,24,23,19,18,20,17,20,18,22,24,23,19,18,20,17], {
        type: 'bar',
        width: '100%',
        height: '20px',
        barColor: '#dfe2e7',
        zeroAxis: false,
});

//------------- Select 2 -------------//
$('.select2').select2({placeholder: 'Select state'});

//------------- File input styling -------------//
$(":file").not('.unstyled').filestyle();*/


function onMyClick(){

    $("#validate").validate({
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
                    email: {
                            required: true,
                            email: true
                    },
                    select2: "required",
                    password: {
                            required: true,
                            minlength: 5
                    },
                    textarea: {
                            required: true,
                            minlength: 10
                    },
                    maxLenght: {
                            required: true,
                            maxlength: 10
                    },
                    rangelenght: {
                  required: true,
                  rangelength: [10, 20]
                },
                url: {
                  required: true,
                  url: true
                },
                range: {
                  required: true,
                  range: [5, 10]
                },
                minval: {
                  required: true,
                  min: 13
                },
                maxval: {
                  required: true,
                  max: 13
                },
                date: {
                  required: true,
                  date: true
                },
                number: {
                  required: true,
                  number: true
                },
                digits: {
                  required: true,
                  digits: true
                },
                ccard: {
                  required: true,
                  creditcard: true
                },
                    agree: "required"
            },
                    productname:"required",

                    proType:"required",

                    publisherName:"required",

                    authorName:"required",

            messages: {
                    password: {
                            required: "Please provide a password",
                            minlength: "Your password must be at least 5 characters long"
                    },
                    agree: "Please accept our policy",
                    textarea: "Write some info for you",
                    select2: "Please select something",
                    productname:"لطفا نام محصول خود را وارد نمایید",
                    proType:"لطفا نوع محصول خود را مشخص کنید",
                    publisherName:"لطفا نام ناشر محصول را وارد نمایید",
                    authorName:"لطفا نام پدیدآورندگان محصول را وارد کنید",
            },
            highlight: function( label ) {
                    $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            success: function( label ) {
                    $(label).closest('.form-group').removeClass('has-error');
                    label.remove();
            }
    });
    $("#newProValidate").validate({
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
            proNumber: {
                    required: true,

            },
            proPrice: {
                    required: true,

            },
            proDiscount: {
                    required: true,

            },
            proCorridors: {
                    required: true,

            },
            proShelf: {
                    required: true,

            },
            proRow: {
                    required: true,

            },
    },
            messages: {
            proNumber: {
                    required: "تعداد را وارد کنید",

            },
                            proPrice: {
                    required: "قیمت را وارد کنید",

            },
                    proDiscount: {
                    required: "حداقل مقدار 0 می باشد",


            },
                    proCorridors: {
                    required:"شماره راهرو را وارد کنید",

            },
                    proShelf: {
                    required:" شماره قفسه را وارد کنید",

            },
                    proRow: {
                    required:" شماره ردیف را وارد کنید",

            },
                            },
            highlight: function( label ) {
            $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    success: function( label ) {
            $(label).closest('.form-group').removeClass('has-error');
            label.remove();
    }
    });

    $("#myModal1Form").validate({
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
                    productName: "required",
                    category: "required",
                    typeProduct: "required",
                    brand: "required"
            },
            messages: {
                productName:"لطفا نام محصول را وارد کنید",
                category:"لطفا دسته بندی را وارد کنید",
                typeProduct:"لطفا نوع محصول را وارد کنید",
                brand:"لطفا نام برند را وارد کنید"
            },
            highlight: function( label ) {
                    $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            success: function( label ) {
                    $(label).closest('.form-group').removeClass('has-error');
                    label.remove();
            }
    });
    $("#myModal2Form").validate({
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
                    groupName:"required"
            },
            messages: {
                groupName:"لطفا نام گروه را وارد کنید"
            },
            highlight: function( label ) {
                    $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            success: function( label ) {
                    $(label).closest('.form-group').removeClass('has-error');
                    label.remove();
            }
    });
    $("#myModal3Form").validate({
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
                  userName: "required",
                  mobile: {
                                  required: true,
                                  number:true,
                                  minlength: 11
                          },
                  email: {
                          required: true,
                          email:true
                  },
                  codeMelli: {
                          required: true,
                          number:true,
                          minlength: 10
                  },
                  birthDate: "required",
                  group: "required"
          },
          messages: {
              userName:"لطفا نام و نام خانوادگی را وارد کنید",
              mobile: {
                      required: "لطفا تلفن همراه را وارد کنید",
                      number:"شماره موبایل فقط شامل اعداد می شود",
                      minlength: "شماره موبایل باید شامل ۱۱ عدد باشد"
              },
              email:{
                      required: "لطفا ایمیل را وارد کنید",
                      email:"لطفا یک ایمیل معتبر وارد کنید"
              },
              codeMelli: {
                      required: "لطفا کدملی را وارد کنید",
                      number:"کد ملی فقط شامل اعداد می شود",
                      minlength: "کدملی باید شامل ۱۰ عدد باشد"
              },
              birthDate:"لطفا تاریخ تولد را وارد کنید",
              group:"لطفا یک گروه را وارد کنید"
          },
          highlight: function( label ) {
                  $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
          },
          success: function( label ) {
                  $(label).closest('.form-group').removeClass('has-error');
                  label.remove();
          }
    });
    $("#myModal4Form").validate({
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
                    entesharatName: "required",
                    modirName: "required",
                    emailAddress: {
                            required: true,
                            email:true
                    }
            },
            messages: {
                entesharatName:"لطفا نام انتشارات را وارد کنید",
                modirName:"لطفا نام مدیر مسئول را وارد کنید",
                emailAddress:{
                        required: "لطفا ایمیل را وارد کنید",
                        email:"لطفا یک ایمیل معتبر وارد کنید"
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
    $("#myModal5Form").validate({
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
                code: "required" 
        },
        messages: {
            code:"لطفا کد تخفیف را وارد کنید"
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

		
		