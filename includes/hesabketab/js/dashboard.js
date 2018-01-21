//------------- Dashboard.js -------------//
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

	//------------- Animated progressbars on tiles -------------//
	//animate bar only when reach the bottom of screen
	$('.animated-bar .progress-bar').waypoint(function(direction) {
		$(this).progressbar({display_text: 'none'});
	}, { offset: 'bottom-in-view' });
	
	//------------- CounTo for tiles -------------//
	$('.stats-number').countTo({
        speed: 1000,
        refreshInterval: 50
    });

    //------------- Flot charts -------------//


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

	



	//------------- Sparkline in payment received chart -------------//
	$('.spark-payments').sparkline([5,8,10,8,7,12,11,6,13,8,5,8,10,11,7,12,11,6,13], {
		type: 'bar',
		width: '100%',
		height: '20px',
		barColor: '#a8aeb7',
		zeroAxis: false,
	});

	//------------- User satisfaction chart -------------//


////// DELETE this line code  ////////
//
//
	//------------- Montly sales goal chart -------------//
	//var salesProgress = new ProgressBar.Circle('#sales-goal', {
	//    color: '#47a877',
	 //   strokeWidth: 4,
	 //   fill: '#f1fcf7',
	 //   duration: 4000,
	 //   easing: 'bounce'
	//});
	// salesProgress.animate(0.5);


	//------------- New user notifications -------------//
	
    /*
    function capitalise(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}
	setTimeout(function(){ 
		$.ajax({
		  	url: 'http://api.randomuser.me/',
		  	dataType: 'json',
		  	success: function(data){
		    	res = data.results[0].user;
			    $.gritter.add({
					title: capitalise(res.name.first) + ' ' + capitalise(res.name.last),
					text: 'Is come online',
					image: res.picture.thumbnail,
					close_icon: 'l-arrows-remove s16'
				});	
		  	}
		});		
	}, 10000);
        */
       
       


});