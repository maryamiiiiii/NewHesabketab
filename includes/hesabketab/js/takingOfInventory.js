
/*start anbargardani*/
$('.startAnbargardani').click(function (){
    $(this).fadeOut(0);
    $('.mostanadat').fadeOut(0);
    $('.anbargardani').removeClass('hidden');
    $('.addAnbargardani').removeClass('hidden');
    $('.endAnbargardani').removeClass('hidden');
});
var i=1;
$('.addAnbargardani').click(function (){
    i++;
    $('.anbargardani table tbody').append(" <tr>\n\
                        <td><span>"+i+"</span></td>\n\
                        <td><input type='text'></td>\n\
                        <td><input type='text'></td>\n\
                        <td><input type='text'></td>\n\
                        <td><input class='number'' type='text' data-mask='#,##0' data-mask-reverse='true' value=''></td>\n\
                        <td><input type='text'></td>\n\
                        <td><input type='text'></td>\n\
                        <td><input type='text'></td>\n\
                    </tr>\n\
    ")
});





        