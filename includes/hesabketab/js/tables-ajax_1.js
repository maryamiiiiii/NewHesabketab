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
	
        var mostSeller = $('#table-mostSeller2').DataTable( {
            "paging": true,
            "scrollCollapse": true,
            "fixedColumns": true,
            "columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": 0
        }],
        /*"order": [[ 4, 'asc' ]],*/
        "ajax": "includes/hesabketab/ajax/objects_2.txt",
		"columns": [
                        { "data": null },
			{ "data": "kalaCode" },
			{ "data": "bookName" },
			{ "data": "chap" },
			{ "data": "writer" },
			{ "data": "nasher" },
			{ "data": "number" , "defaultContent": '<input type="number" min="1" value="1" class="form-control mw80" name="quantity" placeholder="تعداد">'},
                        
                        { "data": "gheimat" },
			{ "data": "takhfif" },
			{ "data": "jam" },
                        { "data": function (data, type, row, meta) {
                            return '<a class="badge badge-danger badge-icon icon-delete"><i class="fa fa-times-circle"></i></a>';
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
      
	
        
        
/*sum of tedade forosh*/
function arrayoftabledata (){
    var dd={};
    var counter=0;
    var jam={};
    var gheimat={};
    /*sum all books price*/
        var sumGheimatbooks=0;
        mostSeller.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
        var tableData = this.data(); 
        jam[counter]=parseInt(tableData.jam);
        gheimat[counter]=parseInt(tableData.gheimat);
        sumGheimatbooks+=jam[counter];
        counter++;
        });
        $('#sumGheimatbooks').text(sumGheimatbooks);
        
    /*sum number all books*/
        var myData=mostSeller.$('input').serializeArray();
            var sumVal=0;
            for(var i=0;i<myData.length;i++){
            dd[i] =parseInt(myData[i]['value']); 
            sumVal+=dd[i];
            $('#SumTedad').text(sumVal);
        }
        var sumJD={};
        for(i=0;i<counter;i++){
            sumJD[i]=gheimat[i]*dd[i];
            
        }
    
    }
    setTimeout(arrayoftabledata,200);
    
    /*change number every book*/
        $("#table-mostSeller2").on('change',"input[type='number']",function(e){
         arrayoftabledata ();
});
   
    
});


