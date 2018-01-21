$(document).ready(function() {

	$('.select2').select2({placeholder: 'Select state'});

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
    var storeisbn = $('#barcode').val();
    //alert(storeisbn);
    $.ajax({
        type:'POST',
        url:'includes/hesabketab/ajax/ajax_store.php',
        data:'storeisbn='+storeisbn,
        success:function(resp){
            //alert(resp);
            var data = JSON.parse(resp);
            var description = data['product_title']+"-"+data['product_creator']+"-"+data['product_company_id'];
            addtotable(data['product_id'],data['product_barcode'],data['warehouse_detail_sales'],description);
            $('#barcode').val('');
            $( "#barcode" ).focus();
        }
        
    });
}
function totalFuncation(value,price,bcode,discount){
    $('tr#new'+bcode).find('td').eq(5).text(value*(price-(price*discount/100)));
    var othercosts = $('#othercosts').val();
    var array = [];
    var numbers = [];
    var back = [];
    var offrow = [];
    $('#table-object tr').each(function(){
        array.push($(this).find('td').eq(5).text());  
        if($(this).find('input[type="number"]').length){
            numbers.push($(this).find('input[type="number"]').val());
            offrow.push($(this).find('input[type="number"]').val()*(Number($(this).find('td').eq(3).text())*Number($(this).find('td').eq(4).text())/100));

        }
        back.push($(this).find('td').eq(3).text());
    });
    var sum=0;
    var sumnumbers =0;
    var backsum =0;
    var offsum=0;
    for(var j=0;j<numbers.length;j++){
        sumnumbers += Number(numbers[j]);
        offsum += Number(offrow[j]);
    }
    for(var i=0;i<array.length;i++){
        sum +=Number(array[i]);
        backsum +=Number(back[i]);
    }
    
    var sumandOther = sum + othercosts;
    //alert(back);
    $('#off').text(offsum);
    $('#sumunbook').text(backsum);
//   $('#jamekol').text(sumandOther);
   $('#quantity').text(sumnumbers);
 offimpact(othercosts);
}
function gift(bcode,price){
    $('tr#new'+bcode).find('td').eq(4).text(100);
    var discount = 100;
    var value=$('tr#new'+bcode).find('input[type="number"]').val();
    totalFuncation(value,price,bcode,discount);
    //alert('x');
}
function offimpact(value){
    var sumunbook2 = $('#sumunbook').text();
    
    var off = $('#off').text();
   // alert(Number(sumunbook2)-Number(off));
    $('#jamekol').text(Number(sumunbook2)-Number(off)+Number(value));
}
function removeFunction(deletebcode,price){
    var x= $('tr#new'+deletebcode).find('input').val();
    $('tr#new'+deletebcode).remove();
    totalFuncation(x,price,deletebcode);
}


function Modal_Search(){
	
    var modalsearchproducttype = $('#modalsearchproducttype').val();
    var modalsearchproductname = $('#modalsearchproductname').val();
    var modalsearchcompany = $('#modalsearchcompany').val();
    var modalsearchcategory = $('#modalsearchcategory').val();
    $.ajax({
        type:'POST',
        url:'/includes/hesabketab/ajax/ajax_store.php',
        data:'modalsearchproducttype='+modalsearchproducttype+'&modalsearchproductname='+modalsearchproductname+'&modalsearchcompany='+modalsearchcompany+'&modalsearchcategory='+modalsearchcategory,
        success:function(resp){
            var data = JSON.parse(resp);
            var html_search="";
            for(var i =0;i<data.length;i++){
                var X = data[i]['bookname'].slice(0,15);
                var P = data[i]['publisher'].slice(0,10);
                var A = data[i]['author'].slice(0,10);
                var description = X+'-'+P+'-'+A;
                html_search += '<div class="row well text-center">\n\
                    <div class="col-md-1">\n\
                        <div class="img-box">\n\
                            <img src="http://164.138.18.205/database/BookImages/94/94221124.jpg"  width="50" class="img-respansive" alt="بوکرانشهر الکترونیک">\n\
                        </div>\n\
                    </div>\n\
                    <div class="col-md-10 pull-right">\n\
                        <p>نام کتاب:'+data[i]['bookname']+'</p>\n\
                        <p>ناشر :'+data[i]['publisher']+'</p>\n\
                    </div>\n\
                    <div class="col-md-1 ">\n\
                        <a href="#" class="btn btn-success" onClick="addtotable('+data[i]['bcode']+','+data[i]['isbn']+','+data[i]['price']+',\''+description+'\');" data-dismiss="modal">انتخاب</a>\n\
                    </div>\n\
                </div>';
            }
            $('div#search_result').html(html_search);
//            $('#modal-searchporduct').hide();
        }
    });
}


function addtotable(bcode,isbn,price,description){
    $("#table-object").dataTable().fnDestroy();
    var t = $("#table-object").DataTable();
    var discount = 0;
    var totalprice = price-(price*discount/100);
    if($('tr').find($('td:first')).text()!=isbn){
        t.row.add([isbn,description,'<input type="hidden" value="'+bcode+'"><input type="number" onchange="totalFuncation(this.value,'+price+','+bcode+','+discount+')" id="costnum" data-bcode = "'+bcode+'" value="1">',price,discount,totalprice,'<a href="javascript:void(0);" id="'+bcode+'" class="badge badge-danger badge-icon" onclick="removeFunction('+bcode+','+price+')"><i class="fa fa-times-circle"></i>حذف</a> - <a href="javascript:void(0);" id="'+bcode+'" class="badge badge-success badge-icon" onclick="gift('+bcode+','+price+')"><i class="fa fa-gift"></i>هدیه</a>']).draw(false).nodes().to$().attr('id','new'+bcode);
        $(this).attr('id',bcode);
        totalFuncation($('#costnum').val(),price,bcode,discount);
    }else{ 
        totalFuncation($('#costnum').val(),price,bcode,discount);
        alert('exists');
    }
}

function checkdiscountcode(){
    var discountcode = $('#discountcode').val();
    $.ajax({
        type:'POST',
        url:"/includes/hesabketab/ajax/ajax_store.php",
        data:'discountcode='+discountcode,
        success:function(resp){
            //alert(resp);
            if($('#table-object').find('tr').find('input[type="number"]').length > 0){
                var off_num1 = $('#off').text();
                var othercosts = $('#othercosts').val();
                var total_off = Number(off_num1)+Number(resp);
                $('#off').text(total_off);
            }else{
                alert('please select a product by ISBN or manually');
            }
             offimpact(othercosts);
        }
    });
}

function submitdata(status){
    $('.hided_panel').hide();
    $('.show_factor').css('display','block');
    var serializeforfactor = $('form#warehousesearch').serialize();
    var myTableArray = [];

    $("table#table-object tr").each(function() {
        var arrayOfThisRow = [];
        var tableData = $(this).find('td');
        if (tableData.length > 0) {
            tableData.each(function() { arrayOfThisRow.push($(this).text()); });
            tableData.find('input[type="number"]').each(function(){arrayOfThisRow.push($(this).val());});
            tableData.find('input[type="hidden"]').each(function(){arrayOfThisRow.push($(this).val());});
            myTableArray.push(arrayOfThisRow);
        }
    });
   // alert(myTableArray);
    var quantity = $('#quantity').text();
    var weight = $('#weight').text();
    var sumunbook = $('#sumunbook').text();
    var off = $('#off').text();
    var othercosts = $('#othercosts').val();
    var jamekol = $('span#jamekol').text();
    //alert(othercosts)
    $.ajax({
        type:"POST",
        url:"/includes/hesabketab/ajax/ajax_store.php",
        data:serializeforfactor+"&myTableArray="+JSON.stringify(myTableArray)+"&quantity="+quantity+"&weight="+weight+"&sumunbook="+sumunbook+"&off="+off+"&othercosts="+othercosts+"&jamekol="+jamekol+"&status_print="+status,
        success:function(resp){
            //alert(resp);
            $('div#add_table_to_pringPage').html($('table#table-object'));
            $('div#add_table_to_pringPage').find('table#table-object tr').each(function(){
                $(this).find("td:last").remove();
                var numbers = $(this).find('input[type="number"]').val();
                $(this).find('input[type="number"]').remove();
                $(this).find('td').eq(2).text(numbers);
            });
            $('div#add_table_to_pringPage').find('table#table-object tr').find('th:last').remove();
            var t = '<tfoot><tr id=""><th colspan="5" class="text-right"> تعداد کل:</th><th class="text-center">'+quantity+'</th>';
                t += '</tr><tr><th colspan="5" class="text-right">جمع پشت جلد:</th><th class="text-center">'+sumunbook+'</th></tr>';
                t += '<tr><th colspan="5" class="text-right">تخفیف:</th><th class="text-center" id="off_th">'+off+'</th></tr>';
                t += '<tr><th colspan="5" class="text-right">مجموع قابل پرداخت:</th><th class="text-center">'+jamekol+'</th></tr>';
                t += '</tfoot>';
            $('div#add_table_to_pringPage').find('table#table-object').append(t);
            $('#factor_costumername').text($("#account_title").val());
            $("#fator_mobile").text($("#mobilenumber").val());
            $("#factor_tedad").text(quantity);
            $('#factor_total').text(sumunbook);
            $("#factor_off").text(off);
            $("#factor_othercosts").text(othercosts);
            $("#factor_jamekol").text(jamekol);
            $("#factor_print").attr('onclick',"window.open('modules.php?name=Stor_Book&amp;file=printshop&amp;buycode=$buycode','','width=600,height=800')");
        }
    });
}

function giftData(){
    $('#giftTaker').text($('#factor_costumername').text());
    $('#numbertaker').text($('#fator_mobile').text());
    $("#modal-style3").modal('toggle');
}
function sendGiftData(){
     var giftTaker = $('#giftTaker').text();
     var numbertaker =  $('#numbertaker').text();
     var kindofOff = $('#kindofOff').val();
     alert(giftTaker);
     $.ajax({
         type:'POST',
         url:'includes/hesabketab/ajax/ajax_store.php',
         data:'giftTaker='+giftTaker+'&numbertaker='+numbertaker+'&kindofOff='+kindofOff,
         success:function(resp){
             alert(resp);
         }
     });
}

function searchOnOrder(){
    var searchOnOrders = $('#searchOnOrders').serializeArray();
    //alert(searchOnOrders);
    $.ajax({
        type:'POST',
        url:'includes/hesabketab/ajax/ajax_store.php',
        data:searchOnOrders,
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
                            { "data": 'order_date' },
                            { "data": 'order_time' },
                            { "data": 'order_customer_family' },
                            { "data": 'order_customer_mobile' },
                            { "data": 'order_totalsale' },
                            { "data": 'order_discountprice' },
                            { "data": 'order_addprice' },
                            { "data": 'order_amount' },
                            { "data": 'order_numbook' },
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