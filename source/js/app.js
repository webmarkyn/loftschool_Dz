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
    var counter = 1,
        duration = 300,
        flag = true;

    var moveSlide = function (container, direction) {
        var items = container.find('.slider__item'),
            activeItem = items.filter('.active'),
            direction = direction == 'down' ? 100 : -100;



        console.log(items.length);

        if (counter >= items.length) {
            counter = 0;
        }
        if(counter <= -1 * items.length) {
            counter = 0;
        }

        var requeItem = items.eq(counter);
        console.log(counter);
        activeItem.animate({
            'top': direction + '%'
        }, duration);

        requeItem.animate({
            'top': '0'
        }, duration, function () {
            activeItem.removeClass('active').css('top', -direction + '%');
            $(this).addClass('active');
            flag = true;
        });
    };

    var activateSlider = function (container, direction) {
        $(container).on('click', function (e) {
            e.preventDefault();

            if(flag == true) {
                flag = false;
                moveSlide($(this), direction);
                console.log($(this).siblings('.js-slider-down'));
                if (direction == 'down') {
                    counter--;
                    moveSlide($(this).siblings('.js-slider-down'), 'down');
                }else {
                    counter++;
                    moveSlide($(this).siblings('.js-slider-up'), 'down');
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
