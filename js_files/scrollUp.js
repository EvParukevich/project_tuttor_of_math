function scrollUp (){
    const upScroll = document.querySelector('.upScroll');

    upScroll.onclick = function() {
        window.scrollTo(pageXOffset, 0);
        // после scrollTo возникнет событие "scroll", так что стрелка автоматически скроется
    };
    
    window.addEventListener('scroll', function() {
        upScroll.hidden = (pageYOffset < document.documentElement.clientHeight);
    });
}

export {scrollUp};