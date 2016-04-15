var showFullScreenMenu = function () {
    const button = document.getElementById('blog__button');
    const menu = document.getElementById('blog__menu');

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

showFullScreenMenu.init();