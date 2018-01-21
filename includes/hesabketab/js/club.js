function reg_club(){
    var club_form = $('#club_form').serialize();
    //alert(club_form);
    $.ajax({
        type:'POST',
        url:'modules/Book_Sellers_panel/club_ajax.php',
        data:club_form,
        success:function(resp){
            alert(resp);
        }
    });
}


