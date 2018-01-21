 /* fixed wrapp */
 
 
var min = "-270px", // remember to set in css the same value
        max = "0px";

    $(function() {

      $(".MybtnCustom").click(function() {

        if($(".ok").css("marginRight") === min)
          $(".ok").animate({ marginRight: max });
        else
          $(".ok").animate({ marginRight: min });

      });

    });      