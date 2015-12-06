/**
 * Created by mayaj on 2015-11-05.
 */
$(function () {
    var images = [
        "/dist/imgs/bg_01.jpg"
        ,"/dist/imgs/bg_02.jpg"
        ,"/dist/imgs/bg_03.jpg"
    ];

    var i = 0;
    var j=0;
    function change() {
        if( j > 2) {
            j=0;
        }
        if(i%2 == 0) {
            $('#1st').css({'background-image': 'url('+images[j]+')'});
            $('#1st').animate({opacity: "1"},1000);
            $('#2st').animate({opacity: "0"},1000);
        }else{
            $('#2st').css({'background-image': 'url('+images[j]+')'});
            $('#1st').animate({opacity: "0"},1000);
            $('#2st').animate({opacity: "1"},1000);
        }

        j++;
        i++;
    }

    change();
    setInterval(function() {
        change();
    }, 8000);

    $('section').animate({opacity: "1"}, 1000);

    getCount();
    $("#email").keypress(function(event) {
        if( event.which == 13){
            saveEmil();
        }
    });

    setInterval(function() {
        getCount();
    }, 60000)
});

function saveEmil() {
    var email = $("#email").val();
    var regex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

    if(!email || !regex.test(email)) {
        alert('이메일을 확인해주세요.');
        $("#email").focus();
    } else {
        $.ajax ({
            type: 'post',
            url: "/api/teaser/",
            data: {'email': email},
            success:function(){
                getCount();
                $("#myModal").modal({show: true});
                $("#email").val('');
            },
            error:function(e) {
                console.log(error);
            }
        });
    }
}

function getCount() {
    $.get("/api/teaser/", function(data) {
        $("#count").html(data.count ? data.count : 0);
    });
}