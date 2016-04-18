var showFullScreenMenu = function () {
    const button = document.getElementById('header-button');
    const menu = document.getElementById('fullscreen-menu');
    const header = document.getElementById('header');

    var _openMenu = function () {
        button.classList.toggle('_clicked');
        menu.classList.toggle('_showen');

        if (header.classList.contains('_blog')) {
            header.classList.remove('_blog');
            header.classList.add('_un-blog');
        } else if (header.classList.contains('_un-blog')) {
            header.classList.remove('_un-blog');
            header.classList.add('_blog');
        }
    };

    var _eventListeren = function () {
        button.addEventListener('click', _openMenu);
    };

    return {
        init: function () {  return _eventListeren(); }
    }
}();

document.getElementById('header-button') && showFullScreenMenu.init();