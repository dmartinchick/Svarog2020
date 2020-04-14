$(document).ready(function () {

    //прокурутка по якорям
    $(".navbar-menu").on("click","a", function(e){
        e.preventDefault();
        var id=$(this).attr('href'),
            top=$(id).offset().top;
        $('body, html').animate({scrollTop:top-60},500);
    });
    $(".modal-menu").on("click","a", function(e){
        e.preventDefault();
        var id=$(this).attr('href'),
            top=$(id).offset().top;
		$('body, html').animate({scrollTop:top-60},500);
	});

    //скролл флага
    $(window).scroll(function(){
        var scroll=$(window).scrollTop();
        if (scroll<120){
            $('.navbar-logo').css('transform','translateY('+ (-scroll) +'px)');//TO DO (разобраться как передать переменную в свойства])
        } else{
            $('.navbar-logo').css("transform","translateY(-120px)");
        }
    });
    
    //ink меню
    //cache some jQuery objects
	var modalTrigger = $('.cd-modal-trigger'),
        transitionLayer = $('.cd-transition-layer'),
        transitionBackground = transitionLayer.children(),
        modalWindow = $('.cd-modal');

    var frameProportion = 1.78, //png frame aspect ratio
        frames = 25, //number of png frames
        resize = false;
    //set transitionBackground dimentions
	setLayerDimensions();
	$(window).on('resize', function(){
		if( !resize ) {
			resize = true;
			(!window.requestAnimationFrame) ? setTimeout(setLayerDimensions, 300) : window.requestAnimationFrame(setLayerDimensions);
		}
    });
    //open modal window
	modalTrigger.on('click', function(event){	
		event.preventDefault();
		transitionLayer.addClass('visible opening');
		var delay = ( $('.no-cssanimations').length > 0 ) ? 0 : 600;
		setTimeout(function(){
			modalWindow.addClass('visible');
		}, delay);
    });
    //close modal window
	modalWindow.on('click','.modal-close', function(event){
		event.preventDefault();
		transitionLayer.addClass('closing');
		modalWindow.removeClass('visible');
		transitionBackground.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			transitionLayer.removeClass('closing opening visible');
			transitionBackground.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
		});
    });
    function setLayerDimensions() {
		var windowWidth = $(window).width(),
			windowHeight = $(window).height(),
			layerHeight, layerWidth;

		if( windowWidth/windowHeight > frameProportion ) {
			layerWidth = windowWidth;
			layerHeight = layerWidth/frameProportion;
		} else {
			layerHeight = windowHeight*1.2;
			layerWidth = layerHeight*frameProportion;
		}

		transitionBackground.css({
			'width': layerWidth*frames+'px',
			'height': layerHeight+'px',
		});

		resize = false;
    }
	
	//table accordion
    $('.accordion-header').click(function (e) { 
		e.preventDefault();

		//получение id для аккардион вкладки
		var accID = "#"+$(this).attr('id');

		//открытие аккардион вкладки
		if ($(this).hasClass('active')==true) {
			$(this).removeClass('active');
		} else {
			$('.accordion-header').removeClass('active');
			$('.accordion-header'+accID).addClass('active');
		}

		//сброс tabs-name__items
		$('.tabs-name__items').removeClass('active');
		$('.tabs-name__items:eq(0)').addClass('active');
		$('.tabs-name__items:eq(5)').addClass('active');
		$('.tabs-name__items:eq(12)').addClass('active');
		
		//сброс tabs-content__items
		$('.tabs-content__items').removeClass('active');
		$('.tabs-content__items:eq(0)').addClass('active');
		$('.tabs-content__items:eq(5)').addClass('active');
		$('.tabs-content__items:eq(12)').addClass('active');

		// table accordion tabs
		$('.tabs-name__items').click(function (e) { 
			e.preventDefault();

			//получение id для tabs вкладки
			var tabID = "#"+$(this).attr('id');

			//переключение tabs-name__items
			$('.tabs-name__items').removeClass('active');
			$(this).addClass('active');

			//перключение tabs-content__items
			$('.tabs-content__items').removeClass('active');
			$('.tabs-content__items'+tabID).addClass('active');
		});
	});


	//timline-modal
	$(".modal").each( function(){
		$(this).wrap('<div class="overlay"></div>')
	});
	
	$(".open-modal").on('click', function(e){
		e.preventDefault();
		e.stopImmediatePropagation;
		
		var $this = $(this),
				modal = $($this).data("modal");
		
		$(modal).parents(".overlay").addClass("open");
		setTimeout( function(){
			$(modal).addClass("open");
		}, 350);
		
		$(document).on('click', function(e){
			var target = $(e.target);
			
			if ($(target).hasClass("overlay")){
				$(target).find(".modal").each( function(){
					$(this).removeClass("open");
				});
				setTimeout( function(){
					$(target).removeClass("open");
				}, 350);
			}
			
		});
		
	});
	
	$(".close-modal").on('click', function(e){
		e.preventDefault();
		e.stopImmediatePropagation;
		
		var $this = $(this),
				modal = $($this).data("modal");
		
		$(modal).removeClass("open");
		setTimeout( function(){	
			$(modal).parents(".overlay").removeClass("open");
		}, 350);
		
	});
});