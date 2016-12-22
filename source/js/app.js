//Preloader
var preloader = (function(){
    var percentsTotal = 1,
        preloader = $('.preloader');

    var imgPath = $('*').map(function (ndx, element) {
        var background = $(element).css('background-image'),
            img = $(element).is('img'),
            path = '';

        if (background != 'none' && background.indexOf('-gradient') == 0) {
            path = background.replace('url("', '').replace('")', '');
        }

        if (img) {
            path = $(element).attr('src');
        }

        if (path) return path
    });

    var setPercents = function (total, current) {
        var persents = Math.ceil(current / total * 100);

        $('.preloader__percents').text(persents + '%');

        if (persents >= 100) {
            preloader.fadeOut();
        }
    };

    var loadImages = function (images) {

        if (!images.length) preloader.fadeOut();

        images.forEach(function (img, i, images) {
            var fakeImage = $('<img>', {
                attr : {
                    src : img
                }
            });

            fakeImage.on('load error', function () {
                setPercents(images.length, percentsTotal);
                percentsTotal++;
            });
        });
    };

    return {
        init: function () {
            var imgs = imgPath.toArray();
            loadImages(imgs);
        }
    }

}());

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
      var activeContainer;

        sliderInfoContainer.each(
            function (index) {
                if ($(this).css('display') !== 'none') {
                    activeContainer = $(this);
                }
            }
        );


        var items =  activeContainer.find('.slider-info__item'),
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
    preloader.init();
});
