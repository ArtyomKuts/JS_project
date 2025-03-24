window.addEventListener('load', main, false);
function main(){
    const w=canvasPreiesandPredators.width;
    const h=canvasPreiesandPredators.height;
    const ctx=canvasPreiesandPredators.getContext('2d');
    const f=canvasSchedule.width;
    const q=canvasSchedule.height;
    const rtx=canvasSchedule.getContext('2d');
    const fps=60;
    const dt=1/fps;
    const deltaTime=5000*dt;
    const cellWidth=4;
    const cellHeight=4;
    const fieldWidth=w/cellWidth;
    const fieldHeight=h/cellHeight;
    let preies=[];
    let predators=[];
    let preiesLenghtMas=[];
    let predatorsLengthMas=[];

    class Prey{
        constructor(x,y,dx,dy){
            this.x=x;
            this.y=y;
            this.dx=dx;
            this.dy=dy;
        }
        drawPrey(){
            ctx.fillStyle='blue';
            ctx.fillRect(this.x*cellWidth,this.y*cellHeight,cellWidth,cellHeight);
            
        }
        calculation(){
            this.dx=Math.floor(Math.random()*(2-(-1))+(-1));
            this.dy=Math.floor(Math.random()*(2-(-1))+(-1));
        }
        move(){
            this.x+=this.dx;
            this.y+=this.dy;
            if(this.x>=fieldWidth||this.x<=0){
                this.x-=this.dx;
            }
            if(this.y>=fieldHeight||this.y<=0){
                this.y-=this.dy
            }
        }
        otherpreies(other){
            if(Math.sqrt(Math.pow(this.x-other.x,2)+Math.pow(this.y-other.y,2))<=3){
                this.calculation();
                this.move();
            }
        }
    }

    class Predator{
        constructor(x,y,dx,dy,hungerTimer){
            this.x=x;
            this.y=y;
            this.dx=dx;
            this.dy=dy;
            this.hungerTimer=hungerTimer;
        }
        drawPredator(){
            ctx.fillStyle='red';
            ctx.fillRect(this.x*cellWidth,this.y*cellHeight,cellWidth,cellHeight);
        }
        calculation(){
            this.dx=Math.floor(Math.random()*(2-(-1))+(-1));
            this.dy=Math.floor(Math.random()*(2-(-1))+(-1));
        }
        move(){
            this.x+=this.dx;
            this.y+=this.dy;
            if(this.x>=fieldWidth||this.x<0){
                this.x-=this.dx;
            }
            if(this.y>=fieldHeight||this.y<0){
                this.y-=this.dy
            }
        }
        otherpredators(other){
            if(Math.sqrt(Math.pow(this.x-other.x,2)+Math.pow(this.y-other.y,2))<=3){
                this.calculation();
                this.move();
            }
        }
    }

    function preiesMove(){
        for(const prey of preies){
            let minDistance=Infinity;
            let closestPredator = null;
            for(i=0;i<predators.length;i++){
                let o=Math.sqrt(Math.pow(prey.x-predators[i].x,2)+Math.pow(prey.y-predators[i].y,2));
                if (o < minDistance) {
                    minDistance = o;
                    closestPredator = predators[i];
                }
            }
            if(minDistance<=(Math.sqrt(preyVision^2+preyVision^2))){
                if(prey.x-closestPredator.x>0&&prey.y-closestPredator.y>0){
                    prey.dx=1;
                    prey.dy=1;
                    prey.move();
                }else if(prey.x-closestPredator.x<0&&prey.y-closestPredator.y<0){
                    prey.dx=-1;
                    prey.dy=-1;
                    prey.move();
                }else if(prey.x-closestPredator.x>0&&prey.y-closestPredator.y<0){
                    prey.dx=1;
                    prey.dy=-1;
                    prey.move();
                }else if(prey.x-closestPredator.x<0&&prey.y-closestPredator.y>0){
                    prey.dx=-1;
                    prey.dy=1;
                    prey.move();
                }else if(prey.x-closestPredator.x==0&&prey.y-closestPredator.y>0){
                    p=Math.floor(Math.random()*3);
                    if(p==0){
                        prey.dx=0;
                        prey.dy=1;
                        prey.move();
                    }else if(p==1){
                        prey.dx=1;
                        prey.dy=1;
                        prey.move();
                    }else{
                        prey.dx=-1;
                        prey.dy=1;
                        prey.move();
                    }
                }else if(prey.x-closestPredator.x>0&&prey.y-closestPredator.y==0){
                    p=Math.floor(Math.random()*3);
                    if(p==0){
                        prey.dx=1;
                        prey.dy=0;
                        prey.move();
                    }else if(p==1){
                        prey.dx=1;
                        prey.dy=1;
                        prey.move();
                    }else{
                        prey.dx=1;
                        prey.dy=-1;
                        prey.move();
                    }
                }else if(prey.x-closestPredator.x==0&&prey.y-closestPredator.y<0){
                    p=Math.floor(Math.random()*3);
                    if(p==0){
                        prey.dx=0;
                        prey.dy=-1;
                        prey.move();
                    }else if(p==1){
                        prey.dx=1;
                        prey.dy=-1;
                        prey.move();
                    }else{
                        prey.dx=-1;
                        prey.dy=-1;
                        prey.move();
                    }
                }else if(prey.x-closestPredator.x<0&&prey.y-closestPredator.y==0){
                    p=Math.floor(Math.random()*3);
                    if(p==0){
                        prey.dx=-1;
                        prey.dy=0;
                        prey.move();
                    }else if(p==1){
                        prey.dx=-1;
                        prey.dy=1;
                        prey.move();
                    }else{
                        prey.dx=-1;
                        prey.dy=-1;
                        prey.move();
                    }
                }else{
                    prey.calculation();
                    prey.move();
                }
            }else{
                prey.calculation();
                prey.move();
            }
        }
    }
    
    function predatorsMove(){
       for(const predator of predators){
            let minDistance=Infinity;
            let closestPrey=null;
            for(i=0;i<preies.length;i++){
                    let o=Math.sqrt(Math.pow(predator.x-preies[i].x,2)+Math.pow(predator.y-preies[i].y,2));
                    if (o < minDistance) {
                        minDistance = o;
                        closestPrey = preies[i];
                    }
                }
            
            if(minDistance<=Math.sqrt(predatorVision^2+predatorVision^2)){
                if(predator.x-closestPrey.x>0&&predator.y-closestPrey.y>0){
                    predator.dx=-1;
                    predator.dy=-1;
                    predator.move();
                }else if(predator.x-closestPrey.x<0&&predator.y-closestPrey.y<0){
                    predator.dx=1;
                    predator.dy=1;
                    predator.move();
                }else if(predator.x-closestPrey.x>0&&predator.y-closestPrey.y<0){
                    predator.dx=-1;
                    predator.dy=1;
                    predator.move();
                }else if(predator.x-closestPrey.x<0&&predator.y-closestPrey.y>0){
                    predator.dx=1;
                    predator.dy=-1;
                    predator.move();
                }else if(predator.x-closestPrey.x==0&&predator.y-closestPrey.y>0){
                    predator.dx=0;
                    predator.dy=-1;
                    predator.move();
                }else if(predator.x-closestPrey.x>0&&predator.y-closestPrey.y==0){
                    predator.dx=-1;
                    predator.dy=0;
                    predator.move();
                }else if(predator.x-closestPrey.x==0&&predator.y-closestPrey.y<0){
                    predator.dx=0;
                    predator.dy=1;
                    predator.move();
                }else if(predator.x-closestPrey.x<0&&predator.y-closestPrey.y==0){
                    predator.dx=1;
                    predator.dy=0;
                    predator.move();
                }else{
                    predator.calculation();
                    predator.move();
                }
            }else{
                predator.calculation();
                predator.move();
            }
        }
    }
    
    function initializeArrays(){
        if(preies.length==0&&predators.length==0){
            for(i=0;i<N;i++){
                x=Math.floor((Math.random()*w)/Math.pow(cellWidth,2))*cellWidth;
                y=Math.floor((Math.random()*h)/Math.pow(cellHeight,2))*cellHeight;
                let newPrey=new Prey(x,y);
                preies.push(newPrey);
            }
            for(i=0;i<n;i++){
                x=Math.floor((Math.random()*w)/Math.pow(cellWidth,2))*cellWidth;
                y=Math.floor((Math.random()*h)/Math.pow(cellHeight,2))*cellHeight;
                let newPredator=new Predator(x,y, null, null,  0);
                predators.push(newPredator);
            }
           
        } 
    }
    
    function eat(){
        for(const predator of predators){
            if(Math.random()<(1-Math.cos(0.5*Math.PI*predator.hungerTimer/(hungryTime)))){
                predators.splice(predators.indexOf(predator),1);
            }else{
                predator.hungerTimer++;
            }
            for(const prey of preies){
                if(prey.x==predator.x && prey.y==predator.y){
                    preies.splice(preies.indexOf(prey),1);
                    predator.hungerTimer=0;
                }
            }
        }
    }

    function predatorsReprodaction(){
        if(predators.length>=2&&predators.length<=500){
            for(i=0;i<Math.floor(predators.length/2);i++){
                if(Math.random()<probabilityReprodactionPredator/100){
                    x=Math.floor((Math.random()*w)/Math.pow(cellWidth,2))*cellWidth;
                    y=Math.floor((Math.random()*h)/Math.pow(cellHeight,2))*cellHeight;
                    let newPredator=new Predator(x,y,null, null, 0);
                    predators.push(newPredator);
                }
            }
        }  
    }

    function preiesReprodaction(){
        if(preies.length>=2&&preies.length<=500){
            for(let i=0;i<Math.floor(preies.length/2);i++){
                if(Math.random()<probabilityReprodactionPrey/100){
                    x=Math.floor((Math.random()*w)/Math.pow(cellWidth,2))*cellWidth;
                    y=Math.floor((Math.random()*h)/Math.pow(cellHeight,2))*cellHeight;
                    let newPrey=new Prey(x,y);
                    preies.push(newPrey);
                }
            }
        }   
    }
   
    function draw(){
        for(const prey of preies){
            prey.drawPrey();
        }
        for(const predator of predators){
            predator.drawPredator();
        }
    }
    
    function clear(){
       ctx.clearRect(0,0,w,h); 
    }

    function reprodaction(){
        preiesReprodaction();
        predatorsReprodaction();
    }

    function control(){
        preiesMove();
        predatorsMove();
        for (i=0; i<predators.length; i++){
			for (let j=0; j<i; j++){
				predators[i].otherpredators(predators[j])
			}
		}
        for (i=0; i<preies.length; i++){
			for (let j=0; j<i; j++){
				preies[i].otherpreies(preies[j])
			}
		}
    }

   function all(){
        draw();
        control();
        eat();
        reprodaction();
        graphic();
    }
    
    function graphic(){
        preiesLenghtMas.push(preies.length);
        predatorsLengthMas.push(predators.length);
        rtx.strokeStyle="blue";
        rtx.clearRect(0,0,f,q);
        rtx.beginPath();
        rtx.moveTo(0,q-preiesLenghtMas[0]);
        for(i=0;i<preiesLenghtMas.length;i++){
            rtx.lineTo(i*(f/(preiesLenghtMas.length-1)),q-preiesLenghtMas[i]);
        }
        rtx.stroke();
        rtx.strokeStyle="red";
        rtx.beginPath();
        rtx.moveTo(0,q-predatorsLengthMas[0]);
        for(i=0;i<predatorsLengthMas.length;i++){
            rtx.lineTo(i*(f/(predatorsLengthMas.length-1)),q-predatorsLengthMas[i]);
        }
        rtx.stroke();
    }
    
    start.onclick=()=>{
        N=document.querySelector("input[name='Preies']").value;
        n=document.querySelector("input[name='Predators']").value;
        probabilityReprodactionPrey=document.querySelector("input[name='probabilityReprodactionPrey']").value;
        probabilityReprodactionPredator=document.querySelector("input[name='probabilityReprodactionPredator']").value;
        hungryTime=document.querySelector("input[name='hungryTime']").value;
        preyVision=document.querySelector("input[name='PreyVision']").value;
        predatorVision=document.querySelector("input[name='PredatorVision']").value;
        initializeArrays();
        clearTime=setInterval(clear,deltaTime-10*dt);
        allTime=setInterval(all,deltaTime);

    }

    stopp.onclick=()=>{
        clearInterval(clearTime);
        clearInterval(allTime);
    }
}

    