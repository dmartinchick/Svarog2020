$(document).ready(function () {

    //прокурутка по якорям
    $(".navbar-menu").on("click","a", function(e){
        e.preventDefault();
        var id=$(this).attr('href'),
            top=$(id).offset().top;
        $('body, html').animate({scrollTop:top-60},500);
    });
});