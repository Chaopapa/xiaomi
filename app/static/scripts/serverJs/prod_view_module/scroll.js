function windowOnload(){
        let prod_offT = $('.prodHeader').offset().top;
        let doc = document.documentElement;
        move(doc, prod_offT);
        // console.log();
    
        //$(document).animate({scrollTop : prod_offT +'px'});
    
        let timer;
        function move(dom, target) {
            clearInterval(timer);
            let speed ;
            if (target < dom.scrollTop) {
                speed = -5;
            } else {
                speed = 5;
            }
            timer = setInterval(() => {
                if (Math.abs(target - dom.scrollTop) < Math.abs(speed)) {
                    clearInterval(timer);
                    dom.scrollTop = target;
                }
                dom.scrollTop = dom.scrollTop + speed;
            }, 20);
    
        }
        $(document).on('mousewheel',()=> {
            // console.log(11);
            clearInterval(timer);
        })
}

export {windowOnload};