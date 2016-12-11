var myModule = (function () {
    
    //Инициализация модуля
    var init = function () {
        _setUpListners();
    };
    
    //Прослушка событий
    var _setUpListners = function () {
    	_flipElem('authorize', 'flipWrap');
    	_flipElem('backToMain', 'flipWrap');
    }

    // Flip func
    var _flipElem = function(buttonId, containerID) {
    	$('#' + buttonId).on("click", function(e){e.preventDefault();$("#" + containerID).toggleClass("hover");})
    };

    //Публичные методы
    return {
        init: init
    }
})();
myModule.init();