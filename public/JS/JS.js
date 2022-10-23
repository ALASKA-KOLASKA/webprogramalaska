var before_loadtime = new Date().getTime();
(window.onload = function (){
    let aftr_loadtime = new Date().getTime();
    let count = (aftr_loadtime - before_loadtime)/1000;
    document.getElementById('demo').textContent = "Load time client: " +   String(count) + document.getElementById('demo').textContent;
})()