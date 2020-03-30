$(document).ready(function () {

    //прокурутка по якорям
    $(".navbar-menu").on("click","a", function(e){
        e.preventDefault();
        var id=$(this).attr('href'),
            top=$(id).offset().top;
        $('body, html').animate({scrollTop:top-60},500);
    });

    //скролл флага
    $(window).scroll(function(){
        var scroll=$(window).scrollTop();
        var logo=0-scroll;
        if (scroll<120){
            $('.navbar-logo').css('transform','translateY('+ logo +'px)');//TO DO (разобраться как передать переменную в свойства])
        } else{
            $('.navbar-logo').css("transform","translateY(-120px)");
        }
    });
});