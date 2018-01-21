$("form#addWarehouseForm").validate({
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
        titleProduct: "required",
        masul: "required",
        shelfType: "required",
        mobile: {
                required: true,
                number:true
            }
    },
    messages: {
        titleProduct: "لطفا عنوان را وارد کنید",
        masul: "لطفا نام مسئول را وارد کنید",
        shelfType: "لطفا نوع قفسه را انتخاب کنید",
        mobile: {
            required: "لطفا شماره موبایل را وارد کنید",
            number:"شماره موبایل فقط شامل اعداد می شود"
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