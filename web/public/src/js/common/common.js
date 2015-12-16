/**
 * Created by mayaj on 2015-11-09.
 */
jQuery(document).ready(function(){
    $('#headerMenuBtn').click(function() {
        if($('.menu-group').hasClass('menu-show')) {
            $('.menu-group').removeClass('menu-show');
        }else{
            $('.menu-group').addClass('menu-show');
        }
    });

    $('html').click(function(e) {
        if(window.matchMedia("(max-width: 786px)").matches) {
            /* 메뉴가 보일때 */
            if($('.menu-group').hasClass('menu-show')) {
                /* section과 header를 클릭하면 닫아라 */
                if($('.menu-group').has(e.target).length != 1 && $('#headerMenuBtn').has(e.target).length != 1){
                    $('.menu-group').removeClass('menu-show');
                }
            }
        }
    });
});