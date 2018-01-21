 $('#inventoryDate').pDatepicker({
        initialValue:false,
        observer: true,
        format: 'YYYY/MM/DD'
    });

    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    $('.currentDate').pDatepicker({
        format: "YYYY/MM/DD",
        todayHighlight: true,
        startDate: today,
        endDate: end,
        autoclose: true
    });
$('.currentDate').pDatepicker('setDate', today);