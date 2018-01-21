    
        //------------- User satisfaction chart -------------//
	//var customerProgress = new ProgressBar.Circle('#customer-exp', {
	 //   color: '#50a875',
	 //   strokeWidth: 4,
	//   fill: '#f2fcf7',
	 //   duration: 7000,
	//    easing: 'bounce',
		
	//});
	//customerProgress.animate(0.4); 
       
          
        //------------- User satisfaction chart -------------//
	//var customerProgress = new ProgressBar.Circle('#customer-exp1', {
	//    color: '#cfc51e',
	//    strokeWidth: 4,
	//    fill: '#fefcf0',
	//    duration: 7000,
	//    easing: 'bounce'
	//});
	//customerProgress.animate(0.8);
//
  
        //------------- User satisfaction chart -------------//
	//var customerProgress = new ProgressBar.Circle('#customer-exp2', {
	 //   color: '#e62f2d',
	//    strokeWidth: 4,
	//    fill: '#fbedee',
	//    duration: 7000,
	//    easing: 'bounce'
	//});
	//customerProgress.animate(1);
        
        
        
        
        //-- bookshelf pages --//
        $('.slider-box').click(function (){
                $('.slider-box').removeClass('book-tilted');
                $('.slider-box').find('div').removeClass('book-green');
                $(this).addClass('book-tilted');
                $('.book',this).addClass('book-green');
            });
            $('.book').hover(function(){
               $(this).addClass('bookss');

            },function (){
                $(this).removeClass('bookss');
            } );
            
            
            
            
  /*add image in bookshelf*/
  
    $('#shelfs .panel-body').each(function(){
           if($(this).find('.percent').text() == 0){
               $(this).find('.img-cover').addClass('img0');
           }else if($(this).find('.percent').text() <480){
               $(this).find('.img-cover').addClass('img1');
           }else if($(this).find('.percent').text() <= 500){
               $(this).find('.img-cover').addClass('img2');
           }else{
               $(this).find('.img-cover').addClass('img3');
           }
       });
       
       
      /*ekhtare takmile zarfiat*/
        $('.rowBookshelf').each(function(){
        var bookNum=$(this).find('.slider-box').length;
            if(bookNum >= 20 && bookNum <= 30){
                $(this).find('.bookshelf-bottom span.alertbookshelf').addClass('warningBookshelf').text('ظرفیت این قفسه رو به اتمام است');
                
            }else if(bookNum > 30){
                $(this).find('.bookshelf-bottom span.alertbookshelf').addClass('takmil-zarfiat').text('ظرفیت این قفسه  به اتمام رسیده است');
                $(this).find('.bookshelf-bottom a.closeShelf').removeAttr("onclick").addClass('disabled').text('این قفسه بسته است');
                $(this).find('.book-addnew').fadeOut(0);
           }
        });
        function takmilZarfiat(tag){
        var thistag=$(tag);
            var r= confirm("آیا از بستن قفسه مطمن هستید؟!");
            if(r===true){
                thistag.parents('.rowBookshelf').find('.bookshelf-bottom span.alertbookshelf').addClass('takmil-zarfiat').text('ظرفیت این قفسه  به اتمام رسیده است');
            thistag.parents('.rowBookshelf').find('.book-addnew').fadeOut(0);
            }
        }
        function virayesheZarfiat(tag){
        var thistag=$(tag);
            var r= confirm("آیا از ویرایش این قفسه مطمن هستید؟!");
            if(r===true){
                thistag.parents('.rowBookshelf').find('.bookshelf-bottom span.alertbookshelf').removeClass('takmil-zarfiat').addClass('warningBookshelf').text('ظرفیت این قفسه  رو به اتمام است');
            thistag.parents('.rowBookshelf').find('.book-addnew').fadeIn(0);
            }
        }
       
       
       /*show addbookshelf and slick slider bookshelf*/
      function addbookshelf(){
           $('#shelfs').fadeOut(0);
            $('#addShelfs').fadeIn(100);
            $(".regular").slick({
              dots: false,
              rtl: true,
              infinite: false,
              slidesToShow: 20,
              slidesToScroll: 20,
              autoplay: false,
        autoplaySpeed: 1500,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 10,
              slidesToScroll: 10,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
            });
       }
                        
function chainSelect(current, target){
  var value1 = $(current).on('change', function(){
    if($(this).find(':selected').val() !== ''){
            var trgt=$(target);
            
      trgt.removeAttr('disabled');
      
      var value = $(this).find(':selected').text();
    }else{
      trgt.prop('disabled', 'disabled').val(null);
    }
  return value;
  });
  return value1;
 
}


warehouseSelect = chainSelect('select#warehouseSelect', '#categorySelect');
categorySelect = chainSelect('select#categorySelect', '#subcategorySelect');


NumberOf=chainSelect('select#shelfRow', '#NumberOf');
cat=chainSelect('#NumberOf', '#cat');
submit2=chainSelect('select#cat', '#submit2');


$('#categorySelect').on('change', function() {
    $('#shelfs').fadeIn();
    $('#addShelfs').fadeOut();
    
});


$('#submit2').click(function(){
	var catName = $('#categorySelect option:selected').text();
  $('#shelfs').append('<div class="col-lg-4 col-md-12 col-sm-12 col-xs-12"><div class="panel panel-default plain shelfs"><div class="panel-heading"><h4 class="panel-title"> <i class="fa fa-bullseye" aria-hidden="true"></i> '+ catName +' <a href="#" data-target="#myBookshelfModa2" data-toggle="modal" class="identifyingClass" data-id="2"> <i class="fa fa-cog pull-left ml30" aria-hidden="true"></i> </a></h4><div class="panel-controls panel-controls-left"><a href="#" class="toggle panel-minimize"><i class="fa fa-angle-up"></i></a><a href="#" class="panel-close"><i class="fa fa-times"></i></a></div></div><div class="panel-body" onclick="addbookshelf();"><div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><div class="img-cover img0"> </div></div><div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 p0"><div class="text-center"><div id="customer-exp1" class="custom-progressbar yellow"><div class="percent s28 mtm30 strong">0<span></span></div><div class="description s16 color-yellow-custom m0 strong">محصول موجود</div><svg viewBox="0 0 100 100"><path d="M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96" stroke="#cfc51e" stroke-width="4" fill="#fefcf0" style="stroke-dasharray: 301.635, 301.635; stroke-dashoffset: 302;"></path></svg></div></div></div></div></div></div>');
   $('#myBookshelfModal').modal('toggle');

  
});


/*multi select*/
$('select.choice').click(function (){
    $('.elements').toggle(0);

});
$("a").not("[data-toggle='collapse']").click(function() {
        var txt=$(this).text();
        $('.choice option').text(txt);
        $('.elements').fadeOut(0);
    });
    $("a[data-toggle='collapse']").click(function() {
        var txt=$(this).find('i').toggleClass('fa-plus fa-minus')();
    });
    
    /*send id to modal*/
    $(function () {
        $(".identifyingClass").click(function () {
            var my_id_value = $(this).data('id');
            $("#myBookshelfModalLabe2 .numberOfShelf").text(my_id_value);
        });
    });
    
    
   /*modal tab*/ 
        $(".tab-3-table input").prop("disabled", true);
	$(".tab-3-table select").prop("disabled", true);
	$(".tab-3-table").css("opacity",0.2);
	
	$( ".newWarehouse-btn" ).click(function() {
	
  		$('.tab-3-table').css("display","none");
		$('.newWarehouse').css("display","block");
		$('.title-tab').css("display","none")
});



	/*add book in shelf*/
        var rowId;
        var thisparentadd;
        var thisparent
        var pLeft=100;
        $('.book-addnew').click(function(){
           thisparent= $(this).parents('.bookshelf');
           thisparentadd=$(this).parents('.bookshelf .slick-list .slick-track');
           rowId=thisparent.attr('data-bookshelfid');           
        })
        $('#AddBookInShelf').click(function(){
            thisparentadd.prepend('<div class="slider-box slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" tabindex="0" style="width: 48px;">\n\
                              <div class="book" data-toggle="modal" data-target="#myModal7">\n\
                                <h2>کتاب جدید 1</h2>\n\
                              </div>\n\
                            </div>');
            var x=thisparentadd.outerWidth();
            x=x+50;
            thisparentadd.outerWidth(x);
            
        })
        
        
        
    $(document).on('mouseenter', ".iffyTip", function() {
     var $this = $(this);
     if(this.offsetWidth < this.scrollWidth && !$this.attr('title')) {
          $this.tooltip({
               title: $this.text(),
               placement: "bottom"
          });
          $this.tooltip('show');
     }
});