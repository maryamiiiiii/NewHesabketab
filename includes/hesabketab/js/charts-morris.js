//------------- charts-morris.js -------------//
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

	//------------- Morris charts -------------//
	//define chart colours first
	var chartColours = {
		gray: '#bac3d2',
		teal: '#43aea8',
		blue: '#60b1cc',
		red: '#df6a78',
		orange: '#cfa448',
		gray_lighter: '#e8ecf1',
		gray_light: '#777777',
		gridColor: '#bfbfbf'
	}

	//convert the object to array for flot use
	var chartColoursArr = Object.keys(chartColours).map(function (key) {return chartColours[key]});

	//------------- Line chart -------------//
	var day_data = [
		{"period": "2014-10-01", "Sales": 560, "PayPal": 300},
		{"period": "2014-10-02", "Sales": 340, "PayPal": 276},
		{"period": "2014-10-03", "Sales": 326, "PayPal": 189},
		{"period": "2014-10-04", "Sales": 730, "PayPal": 314},
		{"period": "2014-10-05", "Sales": 145, "PayPal": 140},
		{"period": "2014-10-06", "Sales": 190, "PayPal": 135},
		{"period": "2014-10-07", "Sales": 459, "PayPal": 356},
		{"period": "2014-10-08", "Sales": 567, "PayPal": 501},
		{"period": "2014-10-09", "Sales": 345, "PayPal": 203},
		{"period": "2014-10-10", "Sales": 800, "PayPal": 560}
	];
	

	
	
	//------------- Donut chart -------------//
	Morris.Donut({
		element: 'morris-donut',
		data: [
			{value: 70, label: 'Desing'},
			{value: 15, label: 'Coding'},
			{value: 10, label: 'SEO'},
			{value: 5, label: 'Other'}
		],
		formatter: function (x) { return x + "%"},
		colors: chartColoursArr,
		resize: true
	});
	
});