function Search(){
    var searchwarehouse = $('form#warehousesearch').serialize();
        $.ajax({
        type:'POST',
        url:'modules/Book_Sellers_panel/ajax_warehouse.php',
        data:searchwarehouse,
        success:function(resp){
            alert(resp);
            var data = JSON.parse(resp);
            var array=[];
            for(var i=0;i<data.length;i++){
                array[i] =[data[i]['isbn'],data[i]['bookname'],data[i]['publisher'],data[i]['author'],data[i]['price'],data[i]['dewe'],'<a id="add_book_warehouse" data-toggle="modal" data-id="'+data[i]['bcode']+'" onclick="passdata('+data[i]['bcode']+','+data[i]['price']+')" data-bookname="'+data[i]['bookname']+'" data-target="#modal-style2" href="javascript:void(0)">add</a>'];
            }
            $("#table-object").dataTable().fnDestroy();
            $('#table-object').DataTable( {
                bDestroy: true,
                data: array,
                 retrieve:true,
                columns: [
                    { title: "شابک" },
                    { title: "نام کتاب" },
                    { title: "انتشارات" },
                    { title: "نویسنده" },
                    { title: "قیمت" },
                    { title: "دیویی" },
                    {title :"افزودن"}
                ]
            } );
        }
    });
}

function passdata(id,price,bookname){
    //alert(id);
    var addbookname = $('a[data-id="'+id+'"]').attr('data-bookname');
    var booknameinModal = $('#productnameinmodal').val(addbookname);
    var priceinModal = $('#modalproductpric').val(price);
    var idinModal = $('#modalbcode').val(id);
}
function insertaddedproduct(){
    var insertaddeddata  = $('form#addproducttowarehouse').serialize();
    //alert(insertaddeddata);
    $.ajax({
        type:'POST',
        url:'modules/Book_Sellers_panel/ajax_warehouse.php',
        data:insertaddeddata,
        success:function(resp){
            alert(resp);
        }
    });
}



