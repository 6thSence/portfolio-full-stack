const scrollTop = function () {

    const _scrollTo = (element, to, duration) => {
        if (duration <= 0) return;
        const difference = to - element.scrollTop;
        const perTick = difference / duration * 10;

        setTimeout(() => {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            _scrollTo(element, to, duration - 10);
        }, 10);
    }

    const _scrollTop = () => {
        _scrollTo(document.body, 0, 400);
    };

    const _eventListener = () => {
        document.getElementById('button-scroll-top').addEventListener('click', _scrollTop);
    };

    const init = () => {
        _eventListener();
    }

    return {
        init
    }
}();

document.getElementById('button-scroll-top') && scrollTop.init();
