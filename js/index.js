addEventListener('load',function(){
    let canvas = document.querySelector('canvas');
    let aline=new Palette(canvas);
    let button = document.querySelectorAll('.shape>li');
    let jiao = document.querySelector('.none');
    let button2 = document.querySelectorAll('.style>li');
    let button0 = document.querySelectorAll('.option>li');
    button0.forEach(element=>{
        element.onclick=function(){
            let type = element.id;
            button2.forEach(ele=>{ele.classList.remove('red')});
            button.forEach(ele=>{ele.classList.remove('red')});
            if(element.className!='styles'){
                button0.forEach(ele=>{ele.classList.remove('red')});
                this.classList.add('red');
                aline[type]();
            }
        }
    });
    button.forEach(element=>{
        element.onclick=function(){
            let type = element.id;
            button2[0].classList.remove('red');
            button2[2].classList.add('red');
            button0.forEach(ele=>{ele.classList.remove('red')});
            if(element.className!='duo'&& element.className!='none'){
                jiao.style.display='none';
            }
            if(element.className=='duo'){
                jiao.style.display='block';
            }
            if(element.className!='none'){
                let color = document.querySelector('.styles>.col').value;
                button.forEach(ele=>{ele.classList.remove('red')});
                this.classList.add('red');
                if(!color){
                    aline[type]();
                }
                if(color){
                    aline[type](color);
                }
                button2[0].onclick=function(){
                    let flag = true;
                    aline[type](color,flag);
                    button2.forEach(ele=>{ele.classList.remove('red')});
                    this.classList.add('red');
                }
                button2[2].onclick=function(){
                    let flag = false;
                    aline[type](color,flag);
                    button2.forEach(ele=>{ele.classList.remove('red')});
                    this.classList.add('red');
                }
            }
        }
    });
    button2.forEach(element=>{
        element.onclick=function(){
            button0.forEach(ele=>{ele.classList.remove('red')});
            if(element.className == 'styles'){
                button.forEach(ele=>{ele.classList.remove('red')});
            }
            if(element.className!='styles'){
                button2.forEach(ele=>{ele.classList.remove('red')});
                this.classList.add('red');
            }
        }
    });
});