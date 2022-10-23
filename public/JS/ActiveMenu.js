(function shineLinks(id){
    try{
        let el=document.querySelectorAll('.menu__link')
        let url=document.location.href;
        for (let i=0; i < el.length; i++){
            if (url == el[i].href){
                el[i].classList.add('menu__item_active');
            }
        }
    }catch(e){}
})();