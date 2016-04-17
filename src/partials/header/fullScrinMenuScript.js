var showFullScreenMenu = function () {
    const button = document.getElementById('header-button');
    const menu = document.getElementById('fullscreen-menu');

    var _openMenu = function () {
        button.classList.toggle('_clicked');
        menu.classList.toggle('_showen');
    };

    var _eventListeren = function () {
        button.addEventListener('click', _openMenu);
    };

    return {
        init: function () {  return _eventListeren(); }
    }
}();

document.getElementById('header-button') && showFullScreenMenu.init();