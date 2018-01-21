//------------- tables-ajax.js -------------//
$(document).ready(function() {

	//------------- Sparklines in header stats -------------//
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

	//------------- Ajax table deferred load -------------//
	
        /*table-mostSeller*/
	
        var mostSeller = $('#table-mostSeller').DataTable( {
            "paging": true,
            "scrollCollapse": true,
            "fixedColumns": true,
            "columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": 0
        }],
        "order": [[ 4, 'asc' ]],
        "ajax": "includes/hesabketab/ajax/objects.txt",
		"columns": [
                        { "data": null },
			{ "data": "name" },
			{ "data": "position" },
			{ "data": "office" },
			{ "data": "extn" },
			{ "data": "start_date" },
			{ "data": "salary" },
                        { "data": function (data, type, row, meta) {
                            return '<a href="view/order?' + data.name + '">مشاهده جزئیات</a>';
                            } 
                        }
		],
		"oLanguage": {
		    "sSearch": "",
		    "sLengthMenu": "<span>_MENU_</span>"
		},
		"sDom": "T<'row'<'col-md-6 col-xs-12 'l><'col-md-6 col-xs-12'f>r>t<'row'<'col-md-4 col-xs-12'i><'col-md-8 col-xs-12'p>>"
        
    } );
    
 

        mostSeller.on( 'order.dt search.dt', function () {
        mostSeller.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
      
	
         var sms = $('#table-sms').DataTable( {
            "paging": false,
            "scrollCollapse": true,
            "fixedColumns": true,
            "columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": 0
        }],
        "createdRow": function( row, data, dataIndex )
                    {
                    var alert = data.extn;
                    if (alert==='پرداخت نشده')
                    {
                        
                            $('td:eq(4)', row).html( '<span class="badge badge-danger badge-icon"><i class="fa fa-clock-o" aria-hidden="true"></i><span>پرداخت نشده</span></span>' );
                    }
                     if (alert==='پرداخت شده')
                    {
                            $('td:eq(4)', row).html( '<span class="badge badge-success badge-icon"><i class="fa fa-check" aria-hidden="true"></i><span>پرداخت شده</span></span>' );
                    }
                    if (alert==='رایگان')
                    {
                            $('td:eq(4)', row).html( '<span class="badge badge-info badge-icon"><i class="fa fa-credit-card" aria-hidden="true"></i><span>رایگان</span></span>' );
                    }
        },
        "order": [[ 4, 'asc' ]],
        "ajax": "includes/hesabketab/ajax/objects_1.txt",
		"columns": [
                        { "data": null },
			{ "data": "name" },
			{ "data": "position" },
			{ "data": "office" },
			{ "data": "extn" },
			{ "data": "start_date" },
			{ "data": "salary" },
                        { "data": function (data, type, row, meta) {
                            return '<a class="taiid-sms sms-btn" href="view/order?' + data.name + '"><span class="badge badge-success"><span>تایید</span></span></a><a class="sms-btn rad-sms" href="view/order?' + data.name + '"><span class="badge badge-danger"><span>رد</span></span></a>';
                            } 
                        }
		],
		"oLanguage": {
		    "sSearch": "",
		    "sLengthMenu": "<span>_MENU_</span>"
		},
		"sDom": "T<'row'<'col-md-6 col-xs-12 'l><'col-md-6 col-xs-12'f>r>t<'row'<'col-md-4 col-xs-12'i><'col-md-8 col-xs-12'p>>",
        
    } );
 
        sms.on( 'order.dt search.dt', function () {
        sms.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
       
        
});


