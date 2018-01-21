function checkoutproduct(){
    var productisbn = $('input[name="productisbn"]').val();
    $.ajax({
        type:'post',
        url:'modules/Book_Sellers_panel/ajax_product.php',
        data:'productisbn='+productisbn,
        success:function(resp){
            alert(resp);
            if(resp == 0){
                alert('موجود نیست');
                $('#whatis').val(0);
                $('#producttitle').val("");
                $('#author').val("");
                $('#publisher').val("");
                $('#pagenumber').val("");
                $('#ghat').val("");
                $('#price').val("");
                $('#coverkind').val("");
                $('#doe').val("");
                $('#pulishdate').val("");
                $('#productid').val("");
                $('#instock').val("");
            }else{
                var data = JSON.parse(resp);
                //alert(data['author']);
                alert(data['salecount']);
                $('#producttitle').val(data['bookname']);
                $('#author').val(data['author']);
                $('#publisher').val(data['publisher']);
                $('#pagenumber').val(data['pageno']);
                $('#ghat').val(data['qate']);
                $('#price').val(data['price']);
                $('#coverkind').val(data['coverkind']);
                $('#doe').val(data['dewayid']);
                $('#instock').val(data['salecount']);
                $('#pulishdate').val(data['isudate']);
                $('#whatis').val(1);
                $('#productid').val(data['bcode']);
                //$('#img').val(data['']);
            }
        }
    });
}

function productdetails(){
    var form = $('form#productdetails').serialize();
    var whatis = $('#whatis').val();
    //alert(form);
    $.ajax({
        type:'post',
        url:'modules/Book_Sellers_panel/ajax_product.php',
        data:form+'&whatis='+whatis,
        success:function(resp){
            alert(resp);
            if(resp==1){
                alert('محصول اضافه شذ');
            }else if(resp==2){
                alert('محصول آپدیت شذ');
            }
        }
    });
}


