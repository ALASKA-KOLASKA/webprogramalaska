
let animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0){
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(){
        for ( let index = 0; index < animItems.length; index++){
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight; //высота объекта
            const animItemoffset = offset(animItem).top; // координата сверху
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart; //прокрученных пикселей

            if((pageYOffset > (animItemoffset - animItemPoint ) ) && (pageYOffset < (animItemoffset + animItemHeight )*0.85)){
                animItem.classList.add('_active');
                animItem.classList.remove('_noActive')
            } else {
                animItem.classList.remove('_active');
                animItem.classList.add('_noActive');
            }
        }
    }


    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    window.setTimeout(animOnScroll, 300)


}