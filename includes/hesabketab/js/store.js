function searchinstore(){
    var storeisbn = $('#storeisbn').val();
    $.ajax({
        type:'POST',
        url:'modules/Book_Sellers_panel/ajax_store.php',
        data:'storeisbn='+storeisbn,
        success:function(resp){
            var data = JSON.parse(resp);
            $("#table-object").dataTable().fnDestroy();
            var t = $("#table-object").DataTable();
            if($('tr').find($('td:first')).text()!=data['isbn']){
                t.row.add([data['isbn'],data['bookname'],'<input type="number" onchange="totalFuncation(this.value,'+data['price']+','+data['bcode']+')" id="costnum" data-bcode = "'+data['bcode']+'" value="1">',data['price'],data['price'],'<a href="javascript:void(0);" id="'+data['bcode']+'" onclick="removeFunction('+data['bcode']+','+data['price']+')">حذف</a>']).draw(false).nodes().to$().attr('id','new'+data['bcode']);
                $(this).attr('id',data['bcode']);
                totalFuncation($('#costnum').val(),data['price'],data['bcode']);
            }else{ 
                totalFuncation($('#costnum').val(),data['price'],data['bcode']);
                alert('exists');
            }
            
        }
        
    });
}
function totalFuncation(value,price,bcode){
    $('tr#new'+bcode).find('td').eq(4).text(value*price);
    var array = [];
    $('tr').each(function(){
      array.push($(this).find('td').eq(4).text());  
    });
    var sum=0
    for(var i=0;i<array.length;i++){
        sum +=Number(array[i]);
    }
   $('#jamekol').val(sum);
}

function removeFunction(deletebcode,price){
    var x= $('tr#new'+deletebcode).find('input').val();
    $('tr#new'+deletebcode).remove();
    totalFuncation(x,price,deletebcode);
}

function submitdata(){
   //var table = $('#table-object');
   
   $('input[type="number"]').val();
    var fnamelname = $('#fnamelname').val();
    var mobile = $('#mobilenumber').val();
    var table = $("#table-object");
    var td0 =[];
    var td1=[];
    var td2=[];
    var td3=[];
    var td4=[];
    var td5=[];
    $("#table-object tr").each(function(){
       td0.push($(this).find('td').eq(0).text()); 
       td1.push($(this).find('td').eq(1).text());
       td2.push($(this).find('td').eq(2).find('input').val());
       td3.push($(this).find('td').eq(3).text());
       td4.push($(this).find('td').eq(4).text());
       td5.push($(this).find('td').eq(5).text());
    });
    table.removeClass('table-striped');
    $('input[type="number"]').attr('disabled','disabled');
    $('#inputone').hide();
    $('#inputtow').hide();
    $('#inputtree').hide();
    var table_printable = '<table  class="table table-bordered">\n\
                            <thead>\n\
                                <tr>\n\
                                    <th>ردیف</th><th>نام و نام خانوادگی</th><th>موبایل</th><th>شابک کتاب</th><th>نام کتاب</th><th>تعداد</th><th>قیمت</th><th>جمع کل</th>\n\
                                </tr>\n\
                            </thead>\n\
                            <tbody id="storetable">';
                            var sum =0;
                            for(var i=1;i<td0.length;i++){
                              table_printable +='<tr><td>'+i+'</td><td>'+fnamelname+'</td><td>'+mobile+'</td><td>'+td0[i]+'</td><td>'+td1[i]+'</td><td>'+td2[i]+'</td><td>'+td3[i]+'</td><td>'+td4[i]+'</td></tr>';
                              sum += Number(td4[i]);
                            }
                            
    table_printable += '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td>جمع کل</td><td>'+sum+'</td></tr></tbody></table>';
    $('#printabletable').html(table_printable);
    $("#table-object_wrapper").hide();
    $('input#jamekol').hide();
    $("#submit").hide();
    
}

