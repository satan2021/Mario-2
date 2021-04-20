class Mario{
    constructor(x, y, width, height){
     var options ={
         "restitution" : 0.5,
         "density" : 0.4,
         "friction" : 0.04
     }
       this.body = Bodies.rectangle(x, y, 80, 80, options);
       this.x = x;
       this.y = y;
       this.width = 80;
       this.height = 80;
       this.image = loadImage("mario/marioRun2.png");
       World.add(world, this.body);
    }

    display(){
        var pos = this.body.position;
        
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.width, this.height)
    }
    }