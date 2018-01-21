//$.fn.dataTable.ext.errMode = 'throw';
$(document).ready(function() {
	var $validator = $("#wizard form").validate({
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
			probarcode: {
 				required: true,
    		      number: true
 			}
	 	},
 		messages: {
 			probarcode: {
 				required: "بارکد محصول را وارد کنید"
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
	//init first wizard
	$('#wizard').bootstrapWizard({
		tabClass: 'bwizard-steps',
		nextSelector: 'a.next',
		previousSelector: 'a.previous',
		firstSelector: null,
		lastSelector: null,
		onNext: function( tab, navigation, index, newindex ) {
			var validated = $('#wizard form').valid();
			if( !validated ) {
				$validator.focusInvalid();
				return false;
			}
			else if  (index == 1){
				  var product_isbn = $('input[name="probarcode"]').val();
                                  $('input[name="barcode_edit"]').val(product_isbn);
                                  modal_exist(product_isbn);
                                  var flag = $('input#flag').val();
                                  if(flag==1) return false;
			}
			else if ( index == 2 ){
  			    manageproduct();	
			}

		},
		onTabClick: function( tab, navigation, index, newindex ) {
			if ( newindex == index + 1 ) {
				return this.onNext( tab, navigation, index, newindex);
			} else if ( newindex > index + 1 ) {
				return false;
			} else {
				return true;
			}
		},
		onTabShow: function( tab, navigation, index ) {
			tab.prevAll().addClass('completed');
			tab.nextAll().removeClass('completed');
			var $total = navigation.find('li').length;
			var $current = index+1;
			// If it's the last tab then hide the last button and show the finish instead
			if($current >= $total) {
				$('#wizard').find('.next').hide();
				$('#wizard').find('.finish').show();
				$('#wizard').find('.finish').removeClass('disabled');
			} else {
				$('#wizard').find('.next').show();
				$('#wizard').find('.finish').hide();
			}
		}
	});

	//wizard is finish
	$('#wizard .finish').click(function() {
		//show message
	});
});


function modal_exist(barcode){
    var product_barcode = barcode;
    return $.ajax({
        async: false,
        global: true,
        type:'POST',
        url:'/includes/hesabketab/ajax/ajax_product.php',
        data:'product_barcode='+product_barcode,
        success:function(resp){
            var flag =0;
            if(resp==1){
                $('input[name="flag"]').val(flag);
                tablebacking(product_barcode);
            }else{
                var data = $.parseJSON(resp);
                $('#product_title').text(data['product_title']);
                $('#product_info').text(data['product_company_id']+'-'+data['product_creator']);
                $('#warehouse_detail_Purchase').val(data['product_price']);
                $('#warehouse_detail_product_id').val(data['product_id']);
                flag =1;
                $('input[name="flag"]').val(flag);
                $('#modal-warehousproduct').modal('toggle');
            }
        }
        
    });
}

function gotowarehouse(){
    var array_form = $('form#gotowarehouse').serializeArray();
    var form_name = "warehouse_detail";
    var method_name = '0';
    array_form.push({name: "formname", value:form_name},{name: "methodname", value:method_name});
    $.ajax({
        type:'POST',
        url:'/includes/hesabketab/ajax/ajax.php',
        data:array_form,
        success:function(resp){
            alert('با موفقیت افزوده شد');
            $('#modal-warehousproduct').modal('hide');
        }
    });
}


function editproduct(){
    var edit_product_isbn = $('input[name="probarcode"]').val();
    $.ajax({
        type:'POST',
        url:'/includes/hesabketab/ajax/ajax_product.php',
        data:'edit_product_isbn='+edit_product_isbn,
        success:function(resp){
            $('#resp_ajax').html(resp);
            $('.elastic').autosize();
            Dropzone.discover();
            
        }
    });	
	$('#edit-back').attr('Onclick','tablebacking('+edit_product_isbn+')');
	$('#edit-back').text('بازگشت');	
}

function manageproduct(){
    var array_form = $('#form_product').serializeArray();
    var form_name = "product";
    var method_name = '0';
    array_form.push({name: "formname", value:form_name},{name: "methodname", value:method_name});
    $.ajax({
        type:'POST',
        url:'/includes/hesabketab/ajax/ajax.php',
        data:array_form,
        success:function(resp){
           $('#lastproductid').val(resp); 
        }
    });
}

$('select#account').attr('onchange','accountdiscount(this.value)');
 function accountdiscount(value_accountid){
     $.ajax({
         type:'POST',
         url:'/includes/hesabketab/ajax/ajax_product.php',
         data:'value_accountid='+value_accountid,
         success:function(resp){
             var data = JSON.parse(resp);
             $('#discountfinall').val(data['account_discount']);
             $('input[name="discountfinall"]').val(data['accountid']);
             var lastid=data['id'];
             $('#last_temp_factor').val(lastid);
             $("#discountforstore").val(data['account_discount']);
             $('input[name="backprice"]').val($('input[name="price_product"]').val());
         }
     });
 }
 
 function submitProduct(){
    var submit_product = $('form#submit_product').serializeArray();
    var form_name = "account";
    var method_name = '0';
    submit_product.push({name: "formname", value:form_name},{name: "methodname", value:method_name});
     $.ajax({
         type:"POST",
         url:'/includes/hesabketab/ajax/ajax.php',
         data:submit_product,
         success:function(resp){
         }
     });
 }
 
 function calculatePay(){
     var backprice = $('#backprice').val();
     var discountfinall = $('#discountfinall').val();
     var backprice = $('#backprice').val();
     var payableprice = backprice-(backprice*discountfinall/100);
     $('#payableprice').val(payableprice);
     $('#payableprice').attr('disabled','disabled');
     var quantityfinall = $('#quantityfinall').val();
     var totalpayable = payableprice*quantityfinall;
     $('#totalpayable').text(totalpayable);
 }
 
 function tablebacking(id){
    var product_isbn = id;
    $.ajax({
        type:'POST',
        url:'/includes/hesabketab/ajax/ajax_product.php',
        data:'product_isbn='+product_isbn,
        success:function(resp){
            $('#resp_ajax').html(resp);
        }
    });
	$('#edit-back').attr('Onclick','editproduct()');
	$('#edit-back').text('ویرایش');	
	
 }
$.fn.dataTable.ext.errMode = 'throw';
function searchOnProduct(){
    var searchOnProduct = $('form#searchOnProduct').serializeArray();
    $.ajax({
        type:"POST",
        url:"/includes/hesabketab/ajax/ajax_product.php",
        data:searchOnProduct,
        success:function(resp){
            var data = $.parseJSON(resp);
            $('#responsive-datatables').dataTable().fnDestroy();
                var t = $('#responsive-datatables').DataTable( {
                    data:data,
                    "columnDefs": [ {
                        "searchable": true,
                        "orderable": true,
                        "targets": 0
                    } ],
                "columns": [
                            { "data": null },
                            { "data": 'product_title' },
                            { "data": 'product_company_id' },
                            { "data": 'product_type' },
                            { "data": 'product_category' },
                            { "data": 'options' }
                        ],
                    "order": [[ 1, 'asc' ]]
                } );

                t.on( 'order.dt search.dt', function () {
                    t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                        //.cell( idx, 0 )
                        cell.innerHTML = i+1;
                    } );
                } ).draw();
                
                    
        }
    });
}


