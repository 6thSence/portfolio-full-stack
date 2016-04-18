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

const sliderOfWorks = function(){
    const works = [
        {
            "id": "001",
            "name": "Сайт школы онлайн образования",
            "url": "#",
            "imgUrl": "./assets/siteSchool.png",
            "imgUrlMin": "./assets/siteSchool_min.png"
        },
        {
            "id": "002",
            "name": "Сайт студии йоги",
            "url": "#",
            "imgUrl": "./assets/siteYoga.png",
            "imgUrlMin": "./assets/siteYoga_min.png"
        },
        {
            "id": "003",
            "name": "Сайт студии мебели",
            "url": "#",
            "imgUrl": "./assets/siteSofa.png",
            "imgUrlMin": "./assets/siteSofa_min.png"
        }
    ];
    const mainPhoto = document.getElementById('mainPhoto');
    const lastPhoto = document.getElementById('lastPhoto');
    const nextPhoto = document.getElementById('nextPhoto');
    const workTitle = document.getElementById('workTitle');
    const siteLink = document.getElementById('site-link');
    const slider = document.getElementById('slider-of-works');

    const init = () => {
        _eventListener();
    }

    const _getPosition = (id) => {
        let position;
        works.forEach((item, i) => {
            if (item.id === id) {
                position = i;
            }
        });
        return position;
    }

    const _lastPhotoChange = () => {
        const id = slider.getAttribute('data-id');
        const i = _getPosition(id);
        const newId = works[i-1] ? works[i-1].id : works[works.length-1].id;

        return _reDrawSlider(newId);
    }

    const _nextPhotoChange = () => {
        const id = slider.getAttribute('data-id');
        const i = _getPosition(id);
        const newId = works[i+1] ? works[i+1].id :works[0].id;

        return _reDrawSlider(newId);
    };

    const _reDrawSlider = (id) => {
        slider.setAttribute('data-id', id);

        works.forEach((item, i) => {
            if (item.id !== id) return false;
            mainPhoto.style.backgroundImage="url("+item.imgUrl+")";
            workTitle.innerHTML = item.name;
            siteLink.setAttribute('href', item.url);

            if (works[i+1]) {
                nextPhoto.style.backgroundImage="url("+works[i+1].imgUrlMin+")";
            } else {
                nextPhoto.style.backgroundImage="url("+works[0].imgUrlMin+")";
            }

            if (works[i-1]) {
                lastPhoto.style.backgroundImage="url("+works[i-1].imgUrlMin+")";
            } else {
                lastPhoto.style.backgroundImage="url("+works[works.length-1].imgUrlMin+")";
            }
        });
    }

    const _eventListener = () => {
        const id = document.getElementById('slider-of-works').getAttribute('data-id');
        _reDrawSlider(id);

        lastPhoto.addEventListener('click', _lastPhotoChange);
        nextPhoto.addEventListener('click', _nextPhotoChange);
    }

    return {
        init
    }
}();

document.getElementById('slider-of-works') && sliderOfWorks.init();