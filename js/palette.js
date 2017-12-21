class Palette{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.cw = this.canvas.offsetWidth;
        this.ch = this.canvas.offsetHeight;
        this.history=[];
        this.PI = Math.PI;
    }
    pencil(colors){
        let that = this;
        let lines = that.ctx;
        this.canvas.onmousedown=function(e){
            let ox = e.offsetX,oy = e.offsetY;
            lines.beginPath();
            lines.moveTo(ox,oy);
            document.onmousemove=function(e){
                let mx = e.offsetX,my = e.offsetY;
                lines.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    lines.putImageData(that.history[that.history.length-1],0,0);
                }
                if(colors){
                    lines.strokeStyle = colors;
                }
                lines.lineTo(mx,my);
                lines.stroke();
            }
        };
        this.canvas.onmouseup=function(){
            document.onmousemove=null;
            let da = lines.getImageData(0,0,that.cw,that.cw);
            that.history.push(da);
        }
    }
    line(num,colors){
        let that = this;
        let lines = that.ctx;
        this.canvas.onmousedown=function(e){
            let ox = e.offsetX,oy = e.offsetY;
            document.onmousemove=function(e){
                let mx = e.offsetX,my = e.offsetY;
                lines.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    lines.putImageData(that.history[that.history.length-1],0,0);
                }
                if(num){
                    that.ctx.setLineDash([num,num]);
                }
                lines.beginPath();
                if(colors){
                    lines.strokeStyle = colors;
                }
                lines.moveTo(ox,oy);
                lines.lineTo(mx,my);
                lines.stroke();
                that.ctx.setLineDash([0,0]);
            }
        };
        this.canvas.onmouseup=function(){
            document.onmousemove=null;
            let da = lines.getImageData(0,0,that.cw,that.cw);
            that.history.push(da);
        }
    }
    dashed(){
        this.line(5);
    }
    radiu(colors,flag){
        flag=false||flag;
        let that = this;
        let radius = that.ctx;
        this.canvas.onmousedown=function(e){
            let ox = e.offsetX,oy = e.offsetY;
            document.onmousemove=function(e){
                let mx = e.offsetX,my = e.offsetY;
                let r = Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));
                radius.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    radius.putImageData(that.history[that.history.length-1],0,0);
                }
                if(colors){
                    radius.strokeStyle = colors;
                }
                if(colors){
                    radius.fillStyle = colors;
                }
                radius.beginPath();
                radius.arc(ox,oy,r,0,that.PI*2);
                radius.stroke();
                if(flag == true){
                    radius.fill();
                }
            }
        };
        this.canvas.onmouseup=function(){
            let da = radius.getImageData(0,0,that.cw,that.cw);
            that.history.push(da);
            document.onmousemove=null;
        }
    }
    rectangle(colors,flag){
        //flag=false||flag;
        let that = this;
        let rect = this.ctx;
        that.canvas.onmousedown = function (e) {
            let ox = e.offsetX , oy = e.offsetY;
            that.canvas.onmousemove = function (e) {
                let mx = e.offsetX , my = e.offsetY;
                let r = Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));
                rect.clearRect(0,0,that.cw,that.ch);
                if (that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                rect.beginPath();
                if(colors){
                    rect.strokeStyle = colors;
                }
                if(colors){
                    rect.fillStyle = colors;
                }
                rect.moveTo(ox + r,oy);
                rect.rect(ox, oy, mx-ox, my-oy);
                rect.closePath();
                rect.stroke();
                if(flag == true){
                    rect.fill();
                }
            }
            that.canvas.onmouseup = function () {
                that.history.push(rect.getImageData(0,0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    }
    poly(colors,flag){
        flag=false||flag;
        let that = this;
        let duo = that.ctx;
        this.canvas.onmousedown=function(e){
            let ox = e.offsetX , oy = e.offsetY;
            let inum = document.querySelector('.text').value;
            document.onmousemove=function(e){
                let mx = e.offsetX,my= e.offsetY;
                let r = Math.sqrt((ox-mx)*(ox-mx)+(my-oy)*(my-oy));
                sum(r,ox,oy,inum);
                console.log(r,ox,oy,inum);
            }
        };
        this.canvas.onmouseup=function(){
            document.onmousemove=null;
            let da = duo.getImageData(0,0,that.cw,that.ch);
            that.history.push(da);
        };
        function sum(r,ox,oy,num){
            num = num || 5;
            duo.clearRect(0,0,that.cw,that.ch);
            //定义一个半径
            let deg = 2* that.PI/num;
            //求角度
            if(that.history.length){
                duo.putImageData(that.history[that.history.length-1],0,0);
            }
            duo.beginPath();
            for(let i = 0;i < num;i++){
                let x = ox + r*Math.cos(deg*i);
                //x轴的位置
                let y = oy + r*Math.sin(deg*i);
                //y轴的位置
                duo.lineTo(x,y);
            }
            if(colors){
                duo.strokeStyle = colors;
            }
            if(colors){
                duo.fillStyle = colors;
            }
            duo.closePath();
            duo.stroke();
            if(flag == true) {
                duo.fill();
            }
        }
    }
    polyJ(colors,flag){
        flag=false||flag;
        let that = this;
        let duo = that.ctx;
        this.canvas.onmousedown=function(e){
            let ox = e.offsetX , oy = e.offsetY;
            let inum = document.querySelector('.text').value;
            document.onmousemove=function(e){
                let mx = e.offsetX,my= e.offsetY;
                let r = Math.sqrt((ox-mx)*(ox-mx)+(my-oy)*(my-oy));
                sum(r,ox,oy,inum);
                console.log(r,ox,oy,inum);
            }
        };
        this.canvas.onmouseup=function(){
            document.onmousemove=null;
            let da = duo.getImageData(0,0,that.cw,that.ch);
            that.history.push(da);
        };
        function sum(r,ox,oy,num){
            num = num || 5;
            duo.clearRect(0,0,that.cw,that.ch);
            //定义一个半径
            let ang = that.PI / num;
            let r1 = r /3;
            //求角度
            if(that.history.length){
                duo.putImageData(that.history[that.history.length-1],0,0);
            }
            duo.beginPath();
            for(let i = 0;i < num*2;i++){
                let x,y;
                if(i%2==0) {
                    x = ox + r*Math.cos(ang*i);
                    y = oy + r*Math.sin(ang*i);
                }else{
                    x = ox + r1*Math.cos(ang*i);
                    y = oy + r1*Math.sin(ang*i);
                }
                duo.lineTo(x,y);
            }
            if(colors){
                duo.strokeStyle = colors;
            }
            if(colors){
                duo.fillStyle = colors;
            }
            duo.closePath();
            duo.stroke();
            if(flag == true) {
                duo.fill();
            }
        }
    }
    che(){
        this.history.pop();
        this.ctx.putImageData(this.history[this.history.length-1],0,0);
    }
}