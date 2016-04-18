const stickSidebar = function(){
    const init = () => {
        _eventListener();
    }

    const _eventListener = () => {
        const sidebar = document.getElementById('posts-list');
        const footer =  document.getElementById('footer');
        const header =  document.getElementById('header');
        const heightOfSidebar = sidebar.clientHeight;
        const heightOfHeader = header.clientHeight;

        window.onscroll = function() {
            const isTuchFooter = sidebar.getBoundingClientRect().top+heightOfSidebar > footer.getBoundingClientRect().top;
            const isTuchHeader = header.getBoundingClientRect().top+heightOfHeader-2 < sidebar.getBoundingClientRect().top;

            if (isTuchFooter) {
                sidebar.classList.contains('_fixed') && sidebar.classList.remove('_fixed');
                sidebar.classList.add('_fixBottom');
            } else if (!sidebar.classList.contains('_fixBottom') &&
                sidebar.classList.contains('_fixed')
                && window.pageYOffset < 452) {

                    sidebar.classList.remove('_fixed');

                } else if ( !sidebar.classList.contains('_fixBottom') && window.pageYOffset > 452 ) {

                    sidebar.classList.add('_fixed');

                } else if (sidebar.classList.contains('_fixBottom') && isTuchHeader ) {
                    sidebar.classList.remove('_fixBottom');
                }
            };
    }

    return {
        init
    }
}();

document.getElementById('posts-list') && stickSidebar.init();

const scrollToPost = function(){
    const init = () => {
        _eventListener();
    }

    const _scrollToPost = (e) => {
        const postItems = document.getElementsByClassName('sidebar__post');
        for (let item in postItems) {
            if (postItems.hasOwnProperty(item)) {
                postItems[item].classList.contains('_active') &&
                    postItems[item].classList.remove('_active');
            }
        };
        e.target.classList.add('_active');

        const postId = e.target.getAttribute('data-postId');
        const post = document.getElementById(postId);
        post.scrollIntoView(false);
    }

    const _eventListener = () => {
        const postItems = document.getElementsByClassName('sidebar__post');

        for (let item in postItems) {
            if (postItems.hasOwnProperty(item)) {
                postItems[item].addEventListener('click', _scrollToPost)
            }
        }

    }

    return {
        init
    }
}();

document.getElementById('posts-list') && scrollToPost.init();