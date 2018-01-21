$(document).ready(function() {
  var warehouseingform = $("#warehouseingform").show();
         warehouseingform.validate({
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
			account: "required",
			warehouse: "required",			
		},
		messages: {
			account: "تامین کننده را انتخاب کنید",
			warehouse: "انبار را انتخاب کنید"
			
		},
		highlight: function( label ) {
			$(label).closest('.form-group').removeClass('has-success').addClass('has-error');
		},
		success: function( label ) {
			$(label).closest('.form-group').removeClass('has-error');
			label.remove();
	      }

	});

});
$( document ).ready(function() {
  $( "#barcode" ).focus();
});

$.fn.dataTable.ext.errMode = 'throw';

$('#barcode').keypress(function(event){
var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13')
	{
            $('#search').click();
	  //searchinstore();
          return false;
	}
});




function searchinstore(){
	var validated = $('#warehouseingform').valid();
	if( !validated ) {
		warehouseingform.focusInvalid();
		return false;
	}

    var barcode = $('input[name="barcode"]').val();
    var discountforstore = $('#discountforstore').val();
    var td0_array=[];
    var flag =0;
    $('#table-object tr').each(function(){
        td0_array.push($(this).find($('td')).eq(0).text());
        if($(this).find($('td')).eq(0).text()==barcode){
            var id = $(this).attr('id');
            flag=1;
            editModal(id.substr(3,10));
        }
    });
    if(flag ==0){
        $.ajax({
            type:'POST',
            url:'includes/hesabketab/ajax/ajax_warehouse.php',
            data:'barcode='+barcode,
            success:function(resp){
                var data = JSON.parse(resp);
                if(resp !=1){
                    modalcontent(data);
                    $('#warehouse_detail_discount').val(discountforstore);
                }else{
                    $('#probarcode').val(barcode);
                    $('#modal-addproduct').modal('toggle');
                    $('#discountfinall').val(discountforstore);
                    $("#checkbarcode").trigger('click');
                }
            }
        });
        deleteinputs();
        $('input[name="barcode"]').val('');

    }
}
function modalcontent(data){

 year = data['product_monthbook'].substr(0,2); 
$('#submit_warehouse_info').attr('onclick','tablewarehouse()');
    $('#bookname_warehouse').text(data['product_title']);
    $('#imgproduct_warehouse').html('<img class="img-responsive" src="http://164.138.18.205/database/BookImages/'+year+'/'+data['product_monthbook']+'.jpg" >');    
    $('#author_publisher_warehouse').text(data['product_company_id']+'-'+data['product_creator']);
    $('#product_id').val(data['product_id']);
    $('#product_barcode').val(data['product_barcode']);
    $('#modal-warehousproduct').modal('toggle');  
}
function calculateWarehouse(){
    var warehouse_detail_Purchase = $('#warehouse_detail_Purchase').val();
    var warehouse_detail_discount = $('#warehouse_detail_discount').val();
    $("#warehouse_detail_sales").val(warehouse_detail_Purchase-(warehouse_detail_Purchase*warehouse_detail_discount/100));
    
    $("#warehouse_detail_sales").attr('disabled','disabled');
}

function tablewarehouse2(){

    var edit_barcode = $('#probarcode').val();
    var product_title = $('input[name="product_title"]').val();
    var product_company_id = $('input[name="product_company_id"]').val();
    var product_creator = $('input[name="product_creator"]').val();
    var quantityfinall = $('#quantityfinall').val();
    var backprice = $('#backprice').val();
    var discountfinall = $('#discountfinall').val();
    var payableprice = $('#payableprice').val();
    var warehouse_detail_coridor = $('input[name="warehouse_detail_coridor"]').val();
    var warehouse_detail_row = $('input[name="warehouse_detail_row"]').val();
    var warehouse_detail_shelf = $('input[name="warehouse_detail_shelf"]').val();
    var lastproductid = $('#lastproductid').val();
    var array = [];
    array.push(quantityfinall);
    array.push(backprice);
    array.push(discountfinall);
    array.push(payableprice);
    array.push(warehouse_detail_coridor);
    array.push(warehouse_detail_row);
    array.push(warehouse_detail_shelf);
    array.push(lastproductid);
    array.push(edit_barcode);
    array.push(product_title + ' / ' + product_company_id + ' / ' + product_creator);
    addtotable(array);
    arrayoftabledata();
    $('div#modal-addproduct').modal('hide');

    $("#submit_product").trigger('reset');
    $('#resp_ajax').html('');
    $('.bwizard-steps').find("a[href*='tab1']").trigger('click');
    
}
function tablewarehouse(){
    var arrayofinputs = [];

    $('div[name="modal"]').each(function(){
        arrayofinputs.push($(this).find('input').val());
    });
     var bookname =  $("#bookname_warehouse").text();    
     var publisher =  $("#author_publisher_warehouse").text();  

    arrayofinputs.push(bookname + ' / ' + publisher );
    
    addtotable(arrayofinputs);
    arrayoftabledata();
    
    $('div#modal-warehousproduct').modal('hide');
}

function addtotable(array){
    $("#table-object").dataTable().fnDestroy();
    var t = $("#table-object").DataTable();
    if($('#table-object tr').find($('td')).eq(0).text()!=array[8]){
        var totalprice = array[0]*array[3];
        t.row.add([array[8],array[9],array[1],array[0],array[2],array[3],totalprice,'<a href="javascript:void(0);"  class="badge badge-danger badge-icon" onclick="deleterow('+array[7]+',0)"><i class="fa fa-times-circle"></i>حذف</a> - <a href="javascript:void(0);"  class="badge badge-warning badge-icon" onclick="editModal('+array[7]+')"><i class="fa fa-edit"></i>ویرایش</a>']).draw(false).nodes().to$().attr('id','new'+array[7]);
        $(this).attr('id',array[7]);
    }else{ 
        $(this).attr('id');
        alert('exist');
    }
}
function deleterow(deletebcode,price){
    var x= $('tr#new'+deletebcode).find('input').val();
//    $('tr#new'+deletebcode).remove();
    var table = $("#table-object").DataTable();
    table.rows( '#new'+deletebcode ).remove().draw();
    arrayoftabledata();
    totalFuncation(x,price,deletebcode);
}

function editModal(id){
    $('#warehouse_detail_inventory').val($('tr#new'+id).find('td').eq(3).text()) ;
    $('#warehouse_detail_Purchase').val($('tr#new'+id).find('td').eq(2).text()) ;
    $('#warehouse_detail_discount').val($('tr#new'+id).find('td').eq(4).text()) ;
    $('#warehouse_detail_sales').val($('tr#new'+id).find('td').eq(5).text()) ;
    $('#warehouse_detail_coridor').val("") ;
    $('#warehouse_detail_shelf').val("") ;
    $('#warehouse_detail_row').val('') ;
    $("#warehouse_detail_sales").attr('disabled','disabled');
    $("#submit_warehouse_info").attr('onclick','edit_row_table('+id+')');
    $('#modal-warehousproduct').modal('toggle');
}
function edit_row_table(id){
   $('tr#new'+id).find('td').eq(3).text($('#warehouse_detail_inventory').val());
   $('tr#new'+id).find('td').eq(2).text($('#warehouse_detail_Purchase').val());
   $('tr#new'+id).find('td').eq(4).text($('#warehouse_detail_discount').val());
   $('tr#new'+id).find('td').eq(5).text($('#warehouse_detail_sales').val());
   $('tr#new'+id).find('td').eq(6).text($('#warehouse_detail_sales').val()*$('#warehouse_detail_inventory').val()) ;
   arrayoftabledata();
   $('#modal-warehousproduct').modal('hide');
}

function Modal_Search(){
	
    var modalsearchproducttype = $('#modalsearchproducttype').val();
    var modalsearchproductname = $('#modalsearchproductname').val();
    var modalsearchcompany = $('#modalsearchcompany').val();
    var modalsearchcategory = $('#modalsearchcategory').val();
    $.ajax({
        type:'POST',
        url:'/includes/hesabketab/ajax/ajax_warehouse.php',
        data:'modalsearchproducttype='+modalsearchproducttype+'&modalsearchproductname='+modalsearchproductname+'&modalsearchcompany='+modalsearchcompany+'&modalsearchcategory='+modalsearchcategory,
        success:function(resp){
            var data = JSON.parse(resp);
            var html_search="";
             $.each(data, function(i, item) {
                var X = data[i]['product_title'].slice(0,15);
                var P = data[i]['product_company_id'].slice(0,10);
                var A = data[i]['product_creator'].slice(0,10);
                var description = X+'-'+P+'-'+A;
                html_search += '<div class="row well text-center"><input type="hidden" name="product_title'+data[i]['product_id']+'" value="'+data[i]['product_title']+'">\n\
                    <input type="hidden" name="product_id'+data[i]['product_id']+'" value="'+data[i]['product_id']+'"><div class="col-md-1">\n\
                        <div class="img-box">\n\
                            <input type="hidden" name="product_company_id'+data[i]['product_id']+'" value="'+data[i]['product_company_id']+'"><img src="http://164.138.18.205/database/BookImages/94/94221124.jpg"  width="50" class="img-respansive" alt="بوکرانشهر الکترونیک">\n\
                        </div>\n\
                    </div>\n\
                    <div class="col-md-10 pull-right">\n\
                        <input type="hidden" name="product_barcode'+data[i]['product_id']+'" value="'+data[i]['product_barcode']+'"><p>نام کتاب:'+data[i]['product_title']+'</p>\n\
                        <input type="hidden" name="product_creator'+data[i]['product_id']+'" value="'+data[i]['product_creator']+'"><p>ناشر :'+data[i]['product_company_id']+'</p>\n\
                    </div>\n\
                    <div class="col-md-1 ">\n\
                        <input type="hidden" name="product_title'+data[i]['product_id']+'" value="'+data[i]['product_title']+'"><a href="#" class="btn btn-success" data-toggle="modal" onclick="second_modal('+data[i]['product_id']+');" >انتخاب</a>\n\
                    </div>\n\
                </div>';
            });
            $('div#search_result').html(html_search);
//            $('#modal-searchporduct').hide();
        }
    });
}
function second_modal(id){
    $('#modal-searchporduct').modal('hide');
    $('#modal-warehousproduct').modal('toggle');
    $('#bookname_warehouse').text($('input[name="product_title'+id+'"]').val());
    $('#author_publisher_warehouse').text($('input[name="product_creator'+id+'"]').val()+'-'+$('input[name="product_company_id'+id+'"]').val());
    $('#product_id').val($('input[name="product_id'+id+'"]').val());
    $('#product_barcode').val($('input[name="product_barcode'+id+'"]').val());
    $('input[name="product_creator'+id+'"]').val();
    $('input[name="product_title'+id+'"]').val();
    
}
function deleteinputs(){
    $('div.modal-dialog :input').val('');
}
 
function arrayoftabledata(){
    var myTableArray = [];

    $("table#table-object tr").each(function() {
        var arrayOfThisRow = [];
        var tableData = $(this).find('td');
        if (tableData.length > 0) {
            tableData.each(function() { arrayOfThisRow.push($(this).text()); });
            myTableArray.push(arrayOfThisRow);
        }
    });
    var sumBack=0;
    var sumQuantity = 0;
    var sumDis = 0;
    var payable = 0;
    var sumofsum =0;
    for(var i=0;i<myTableArray.length;i++){
        sumBack += Number(myTableArray[i][2]);
        sumQuantity += Number(myTableArray[i][3]);
        sumDis += Number(myTableArray[i][2]-myTableArray[i][5]);
        payable += Number(myTableArray[i][5]);
        sumofsum += Number(myTableArray[i][6]);
    }
    $('span#quantity').text(sumQuantity);
    $('#sumunbook').text(sumBack);
    $('#off').text(sumDis);
    $('#payable').text(payable)
    $('#jamekol').text(sumofsum);
}



function submitdata(){
    $('.hided_panel').hide();
    $('.show_factor').css('display','block');
    var warehouseInsert = $('#warehouse').val();
    var accountInsert = $('#account').val();
    var marketerInsert = $('#marketer').val();
    var warehousing_date = $('#warehousing_date').val();
    var warehouseing_type = $('#warehouseing_type').val();
    var warehousing_number = $('#warehousing_number').val();    
    var username_reg = $('#username_reg').val();

    var myTableArray = [];
    
    $("table#table-object tr").each(function() {
        var arrayOfThisRow = [];
        var tableData = $(this).find('td');
        if (tableData.length > 0) {
            tableData.each(function() {
                arrayOfThisRow.push($(this).text()); 
            });
            var trId = $(this).attr('id').substr(3);
            arrayOfThisRow.push(trId);
            myTableArray.push(arrayOfThisRow);

        }
    });
    var quantity = $('#quantity').text();
    var sumunbook = $('#sumunbook').text();
    var off = $('#off').text();
    var payable = $('#payable').text();
    var jamekol = $('span#jamekol').text();
    var totalweight = $('span#totalweight').text();
    $.ajax({
        type:"POST",
        url:"/includes/hesabketab/ajax/ajax_warehouse.php",
        data:"warehouseInsert="+warehouseInsert+"&accountInsert="+accountInsert+"&marketerInsert="+marketerInsert+"&myTableArray="+JSON.stringify(myTableArray)+"&quantity="+quantity+"&sumunbook="+sumunbook+"&off="+off+"&payable="+payable+"&jamekol="+jamekol+"&warehousing_date="+warehousing_date+"&totalweight="+totalweight+"&warehouseing_type="+warehouseing_type+"&warehousing_number="+warehousing_number+"&username_reg="+username_reg,
        success:function(resp){
		// alert(resp);
            //alert(JSON.stringify(myTableArray));
            $('div#add_table_to_pringPage').html($('table#table-object'));
            $('div#add_table_to_pringPage').find('table#table-object tr').each(function(){
                $(this).find("td:last").remove();
            });
            $('div#add_table_to_pringPage').find('table#table-object tr').find('th:last').remove();
            
            var t = '<tfoot><tr id=""><th colspan="6" class="text-right"> تعداد کل:</th><th class="text-center">'+quantity+'</th>';
                t += '</tr><tr><th colspan="6" class="text-right">جمع پشت جلد:</th><th class="text-center">'+sumunbook+'</th></tr>';
                t += '<tr><th colspan="6" class="text-right">تخفیف:</th><th class="text-center" id="off_th">'+off+'</th></tr>';
                t += '<tr><th colspan="6" class="text-right">مجموع قابل پرداخت:</th><th class="text-center">'+jamekol+'</th></tr>';
                t += '</tfoot>';
            $('div#add_table_to_pringPage').find('table#table-object').append(t);
            $('#factor_costumername').text($('#account').find(":selected").text());
            $("#fator_inputdate").text(warehousing_date);
            $("#fator_inputnumber").text(warehousing_number);		
            $("#factor_print").attr('onclick',"window.open('modules.php?name=Stor_Book&amp;file=printshop&amp;buycode=$buycode','','width=600,height=800')");
        }
    });
}


function sendtoWarehousetable(){
    var form_fromListing = $('#submit_product').serialize();
    
}

function searchInWarehousing(){
    var searchInWarehousing = $('form#searchInWarehousing').serializeArray();
    //alert(searchInWarehousing);
    $.ajax({
        type:"POST",
        url:"/includes/hesabketab/ajax/ajax_warehouse.php",
        data:searchInWarehousing,
        success:function(resp){
            //alert(resp);
            var data = $.parseJSON(resp);
            //alert(data['options']);
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
                            { "data": 'warehousing_type' },
                            { "data": 'warehousing_number' },
                            { "data": 'warehousing_username_reg' },
                            { "data": 'warehousing_marketerid' },
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
//                
                    
        }
    });
}
