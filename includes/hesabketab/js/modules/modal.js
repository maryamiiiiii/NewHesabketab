//Payment Section
function addpayment(){    
    var text1=$('select[name="payment_kind"]').find('option:selected').text();
    var text2 = $('select[name="payment_status"]').find('option:selected').text();
    var paymentform = $('form#payment').serializeArray();
    var form_name = "payment";
    var method_name = '0';
    paymentform.push({name: "formname", value:form_name},{name: "methodname", value:method_name});
    $.ajax({
        type:'POST',
        data:paymentform,
        url:"includes/hesabketab/ajax/ajax.php",
        success:function(resp){
            addtotable(paymentform,text1,text2,resp);
            $('#payment').trigger('reset');
            $('#Modalpayment').modal('hide');
        }
    });
}
function addtotable(paymentform,text1,text2,resp){
   $("#tabletools").dataTable().fnDestroy();
    var t = $("#tabletools").DataTable();
    t.row.add(['',text1,paymentform[3].value,text2,paymentform[3].value,paymentform[2].value,'<input type="hidden" value="'+paymentform[0].value+'" name="text1"><input type="hidden" value="'+paymentform[1].value+'" name="text2"><a href="javascript:void(0);" id="" class="badge badge-danger badge-icon"  onclick="removeFunction('+resp+')"><i class="fa fa-times-circle"></i>حذف</a> - <a href="javascript:void(0);" id="" data-toggle="modal" data-target="#Modalpayment" class="badge badge-success badge-icon" onclick="editButton('+resp+')"><i class="fa fa-edit"></i>ویرایش</a>']).draw(false).nodes().to$().attr('id','new'+resp);
}

function editButton(resp){
    $('#Modalpayment').find('button.btn-success').attr('onclick',"editRow("+resp+")");
    $('<input type="hidden" value="'+resp+'" name="up_payment_id">').appendTo('form#payment')
    $('#payment').trigger('reset');
    var text1val = $('tr#new'+resp).find('input[name="text1"]').val();
    var tetx2val = $('tr#new'+resp).find('input[name="text2"]').val();
    var fishnumber = $('tr#new'+resp).find('td').eq(5).text();
    var date = $('tr#new'+resp).find('td').eq(2).text();
    var price = $('tr#new'+resp).find('td').eq(4).text();
    $('#payment_kind').val(text1val);
    $('select[name="payment_status"]').val(tetx2val);
    $('#payment_number').val(fishnumber);
    $('#payment_date').val(date);
    $('#amount').val(price);
}
function editRow(id){
    var text1=$('select[name="payment_kind"]').find('option:selected').text();
    var text2 = $('select[name="payment_status"]').find('option:selected').text();
    var paymentform = $('form#payment').serializeArray();
    var form_name = "payment";
    var method_name = '1';
    paymentform.push({name: "formname", value:form_name},{name: "methodname", value:method_name});
    $.ajax({
        type:'POST',
        data:paymentform,
        url:"includes/hesabketab/ajax/ajax.php",
        success:function(resp){
            //addtotable(paymentform,text1,text2,resp);
            $('tr#new'+id).find('td').eq(1).text(text1);
            $('tr#new'+id).find('td').eq(2).text(paymentform[3].value);
            $('tr#new'+id).find('td').eq(3).text(text2);
            $('tr#new'+id).find('td').eq(4).text(paymentform[3].value);
            $('tr#new'+id).find('td').eq(5).text(paymentform[2].value);
            $('#Modalpayment').modal('hide');
        }
    });
    $('#Modalpayment').find('button.btn-success').attr('onclick',"addpayment()");
    
}
function removeFunction(id){
    var removeId = id;
    var form_name = "payment";
    $.ajax({
        type:'POST',
        data:'removeId='+removeId+"&form_name="+form_name,
        url:"includes/hesabketab/ajax/ajax.php",
        success:function(resp){
            var table = $("#tabletools").DataTable();
            table.rows( '#new'+id ).remove().draw();
        }
    });
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//Contract Section
function addcontract(){
    var contractform = $('form#contract').serializeArray();
    var form_name = "contract";
    var method_name = '0';
    contractform.push({name: "formname", value:form_name},{name: "methodname", value:method_name});
    $.ajax({
        type:'POST',
        data:contractform,
        url:"includes/hesabketab/ajax/ajax.php",
        success:function(resp){
            addcontracttable(contractform,resp);
            $('#Modalcontract').modal('hide');
            //$('#payment').trigger('reset');
        }
    }); 
}
function addcontracttable(contractform,resp){
    $("#contract_table").dataTable().fnDestroy();
    var t = $("#contract_table").DataTable();
    t.row.add(['',contractform[2].value,contractform[3].value,contractform[4].value,contractform[5].value,'<input type="hidden" value="'+contractform[0].value+'" name="text1"><input type="hidden" value="'+contractform[1].value+'" name="text2"><a href="javascript:void(0);" id="" class="badge badge-danger badge-icon"  onclick="removeCont('+resp+')"><i class="fa fa-times-circle"></i>حذف</a> - <a href="javascript:void(0);" id="" data-toggle="modal" data-target="#Modalcontract" class="badge badge-success badge-icon" onclick="editContract('+resp+')"><i class="fa fa-edit"></i>ویرایش</a>']).draw(false).nodes().to$().attr('id','new'+resp);
 }
function editContract(resp){
    $('#Modalcontract').find('button.btn-success').attr('onclick',"editContractRow("+resp+")");
    $('<input type="hidden" name="up_contract_id" value="'+resp+'">').appendTo('form#contract');
    $('#contract').trigger('reset');
    var text1val = $('tr#new'+resp).find('input[name="text1"]').val();
    var tetx2val = $('tr#new'+resp).find('input[name="text2"]').val();
    var agreement_number = $('tr#new'+resp).find('td').eq(3).text();
    var start_date = $('tr#new'+resp).find('td').eq(1).text();
    var end_date  = $('tr#new'+resp).find('td').eq(2).text();
    var agreement_date = $('tr#new'+resp).find('td').eq(4).text();
    $('#contract_type').val(text1val);
    $('#contract_status').val(tetx2val);
    $('#contract_startdate').val(start_date);
    $('#contract_enddate').val(end_date);
    $('#contract_date_agre').val(agreement_date);
    $('#contract_number').val(agreement_number);  
}
function editContractRow(id){
    var contractform = $('form#contract').serializeArray();
    var form_name = "contract";
    var method_name = '1';
    contractform.push({name: "formname", value:form_name},{name: "methodname", value:method_name});
    $.ajax({
        type:'POST',
        data:contractform,
        url:"includes/hesabketab/ajax/ajax.php",
        success:function(resp){
            //addcontracttable(contractform,id);
            $('tr#new'+id).find('td').eq(1).text(contractform[2].value);
            $('tr#new'+id).find('td').eq(2).text(contractform[3].value);
            $('tr#new'+id).find('td').eq(3).text(contractform[5].value);
            $('tr#new'+id).find('td').eq(4).text(contractform[4].value);
            $('#Modalcontract').modal('hide');
        }
    });
    $('#Modalcontract').find('button.btn-success').attr('onclick',"addcontract()");
 }
function removeCont(id){
    var removeId = id;
    var form_name = "contract";
    $.ajax({
        type:'POST',
        data:'removeId='+removeId+"&form_name="+form_name,
        url:"includes/hesabketab/ajax/ajax.php",
        success:function(resp){
            var table = $("#contract_table").DataTable();
            table.rows( '#new'+id ).remove().draw();
        }
    });
 }

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//Call Section call-table
function addcall(){
    var text1=$('select[name="call_type"]').find('option:selected').text();
    var text2 = $('select[name="call_type_sub"]').find('option:selected').text();
    var callform = $('form#call').serializeArray();
    var form_name = "call";
    var method_name = '0';
    callform.push({name: "formname", value:form_name},{name: "methodname", value:method_name});
    $.ajax({
        type:'POST',
        data:callform,
        url:"includes/hesabketab/ajax/ajax.php",
        success:function(resp){
            addtocalltable(callform,text1,text2,resp);
            $('#payment').trigger('reset');
            $('#Modalcall').modal('hide');
        }
    });
}
function addtocalltable(callform,text1,text2,resp){
   $("#call-table").dataTable().fnDestroy();
    var t = $("#call-table").DataTable();
    t.row.add(['',callform[3].value,callform[8].value,callform[2].value,text1,text2,"",'<input type="hidden" value="'+callform[0].value+'" name="text1"><input type="hidden" value="'+callform[1].value+'" name="text2"><a href="javascript:void(0);" id="" class="badge badge-danger badge-icon"  onclick="removeCall('+resp+')"><i class="fa fa-times-circle"></i>حذف</a> - <a href="javascript:void(0);" id="" data-toggle="modal" data-target="#Modalcall" class="badge badge-success badge-icon" onclick="editCall('+resp+')"><i class="fa fa-edit"></i>ویرایش</a>']).draw(false).nodes().to$().attr('id','new'+resp); 
}

function editCall(resp){
    $('#Modalcall').find('button.btn-success').attr('onclick',"editCallRow("+resp+")");
    $('<input name="up_call_id" type="hidden" id="up_call_id" value="'+resp+'">').appendTo('form#call');
    $('#call').trigger('reset');
    var text1val = $('tr#new'+resp).find('input[name="text1"]').val();
    var tetx2val = $('tr#new'+resp).find('input[name="text2"]').val();
    var howCall = $('tr#new'+resp).find('td').eq(3).text();
    var call_date = $('tr#new'+resp).find('td').eq(1).text();
    $('#call_type').val(text1val);
    $('#call_type_sub').val(tetx2val);
    $('#call_answers').val(howCall);
    $('#call_nextdate').val(call_date); 
}

function editCallRow(id){
    var text1=$('select[name="call_type"]').find('option:selected').text();
    var text2 = $('select[name="call_type_sub"]').find('option:selected').text();
    var callform = $('form#call').serializeArray();
    var form_name = "call";
    var method_name = '1';
    callform.push({name: "formname", value:form_name},{name: "methodname", value:method_name});
    $.ajax({
        type:'POST',
        data:callform,
        url:"includes/hesabketab/ajax/ajax.php",
        success:function(resp){
            //addcontracttable(contractform,id);
            $('tr#new'+id).find('td').eq(1).text(callform[3].value);
            $('tr#new'+id).find('td').eq(2).text(callform[8].value);
            $('tr#new'+id).find('td').eq(3).text(callform[2].value);
            $('tr#new'+id).find('td').eq(4).text(callform[0].value);
            $('tr#new'+id).find('td').eq(4).text(text1);
            $('tr#new'+id).find('td').eq(4).text(text2);
            $('#Modalcall').modal('hide');
        }
    });
    $('#Modalcall').find('button.btn-success').attr('onclick',"addcall()");
}
function removeCall(id){

    var removeId = id;
    var form_name = "call";
    $.ajax({
        type:'POST',
        data:'removeId='+removeId+"&form_name="+form_name,
        url:"includes/hesabketab/ajax/ajax.php",
        success:function(resp){
            var table = $("#call-table").DataTable();

            table.rows( '#new'+id ).remove().draw();    
        }
    });
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//sponsor Section
function addpledge(){
    var text1=$('select[name="pledge_type"]').find('option:selected').text();
    var pledgeform = $('form#pledge').serializeArray();
    var form_name = "pledge";
    var method_name = '0';
    pledgeform.push({name: "formname", value:form_name},{name: "methodname", value:method_name});
    $.ajax({
        type:'POST',
        data:pledgeform,
        url:"includes/hesabketab/ajax/ajax.php",
        success:function(resp){
            addpledgetable(pledgeform,text1,resp);
            $('#pledge').trigger('reset');
            $('#Modalpledge').modal('hide');
        }
    });
}

function addpledgetable(pledgeform,text1,resp){
    $("#pledge-table").dataTable().fnDestroy();
    var t = $("#pledge-table").DataTable();
    t.row.add(['',text1,pledgeform[1].value,pledgeform[2].value,pledgeform[7].value,"",'<input type="hidden" value="'+pledgeform[0].value+'" name="text1"><input type="hidden" value="'+pledgeform[1].value+'" name="text2"><a href="javascript:void(0);" id="" class="badge badge-danger badge-icon"  onclick="removePledge('+resp+')"><i class="fa fa-times-circle"></i>حذف</a> - <a href="javascript:void(0);" id="" data-toggle="modal" data-target="#Modalpledge" class="badge badge-success badge-icon" onclick="editPledge('+resp+')"><i class="fa fa-edit"></i>ویرایش</a>']).draw(false).nodes().to$().attr('id','new'+resp);     
}
function editPledge(resp){
    $('#Modalpledge').find('button.btn-success').attr('onclick',"editPledgeRow("+resp+")");
        $('<input name="up_pledge_id" type="hidden" id="up_pledge_id" value="'+resp+'">').appendTo('form#pledge');
    $('#pledge').trigger('reset');
    var text1val = $('tr#new'+resp).find('input[name="text1"]').val();
    var amount_pledge = $('tr#new'+resp).find('td').eq(2).text();
    var number_pledge  = $('tr#new'+resp).find('td').eq(3).text();
    //var date_pledge = $('tr#new'+resp).find('td').eq(4).text();
    
    $('#pledge_type').val(text1val);
    $('#pledge_creditlimit').val(amount_pledge);
    $('#pledge_phone').val(number_pledge); 
}
function editPledgeRow(id){
    var text1=$('select[name="pledge_type"]').find('option:selected').text();
    var pledgeform = $('form#pledge').serializeArray();
    var form_name = "pledge";
    var method_name = '1';
    pledgeform.push({name: "formname", value:form_name},{name: "methodname", value:method_name});
    $.ajax({
        type:'POST',
        data:pledgeform,
        url:"includes/hesabketab/ajax/ajax.php",
        success:function(resp){
            //addcontracttable(contractform,id);
            $('tr#new'+id).find('td').eq(1).text(text1);
            $('tr#new'+id).find('td').eq(2).text(pledgeform[1].value);
            $('tr#new'+id).find('td').eq(3).text(pledgeform[2].value);
            $('tr#new'+id).find('td').eq(4).text(pledgeform[7].value);
            //$('tr#new'+id).find('td').eq(4).text(text1);
            $('#Modalpledge').modal('hide');
        }
    });
    $('#Modalpledge').find('button.btn-success').attr('onclick',"addpledge()"); 
}

function removePledge(id){
    var removeId = id;
    var form_name = "pledge";
    $.ajax({
        type:'POST',
        data:'removeId='+removeId+"&form_name="+form_name,
        url:"includes/hesabketab/ajax/ajax.php",
        success:function(resp){            
            var table = $("#pledge-table").DataTable();
            table.rows( '#new'+id ).remove().draw();
        }
    });
    
}