//FLIPPER
var flipper = (function() {
    var flipFunc = function(buttonId, containerID){
        $('#' + buttonId).on('click', function(e){e.preventDefault();$('#' + containerID).toggleClass('hover');});

    };
    return {
        init: function () {
            flipFunc('authorize', 'flipWrap');
            flipFunc('backToMain', 'flipWrap');
        }
    }
}());
//FLIPPER END

//SLIDER
var slider = (function () {
    var counter = 0,
        duration = 300,
        sliderPreviewContainer = $('.works__current-slide'),
        sliderInfoContainer = $('.works__slide-info'),
        flag = true;

    var moveSlide = function (container, direction) {
        var items = container.find('.slider-nav__item'),
            activeItem = items.filter('.active'),
            animDirection = direction == 'down' ? 100 : -100;




        if (counter >= items.length) {
            counter = 0;
        }
        if (counter == -1) {
            counter = 3;
        }



        var requeItem = items.eq(counter);


        activeItem.animate({
            'top': animDirection + '%'
        }, duration);

        requeItem.animate({
            'top': '0'
        }, duration, function () {
            activeItem.removeClass('active').css('top', -animDirection + '%');
            $(this).addClass('active');
            flag = true;
        });
    };

    var moveSlidePreview = function () {
        var items = sliderPreviewContainer.find('.current-slide__item'),
            activeItem = items.filter('.active'),
            requeItem = items.eq(counter);

        activeItem.animate({
            'left': '-200%'
        }, duration);

        requeItem.animate({
            'left': '0'
        }, duration, function () {
            activeItem.removeClass('active').css('left', '100%');
            $(this).addClass('active');
        })
    };

    var moveSlideinfo = function () {
      var items =  sliderInfoContainer.find('.slider-info__item'),
          activeItem = items.filter('.active'),
          requeItem = items.eq(counter);

        activeItem.animate({
            'left': '-150%'
        }, duration);

        requeItem.animate({
            'left': '0'
        }, duration, function () {
            activeItem.removeClass('active').css('left', '150%');
            $(this).addClass('active');
        })
    };

    var activateSlider = function (container, direction) {
        $(container).on('click', function (e) {
            e.preventDefault();

            if(flag == true) {
                flag = false;
                if (direction == 'down') {
                    counter--;
                    moveSlide($(this).siblings('.js-slider-up'), 'up');
                    moveSlide($(this), direction);
                    moveSlidePreview();
                    moveSlideinfo();
                }else {
                    counter++;
                    moveSlide($(this).siblings('.js-slider-down'), 'down');
                    moveSlide($(this), direction);
                    moveSlidePreview();
                    moveSlideinfo();
                }
            }
        })
    };

    //PUBLIC
    return {
        init: function () {
            activateSlider('.js-slider-down', 'down');
            activateSlider('.js-slider-up', 'up');
        }
    }
}());
//SLIDER END

//Init
$(function () {
    slider.init();
    flipper.init();
});
