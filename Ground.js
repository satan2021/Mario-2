class Ground{
    constructor(x, y, width, height){
        var option ={
            isStatic : true
        }
        this.body = Bodies.rectangle(x, y, width, height, option);
        this.width = width;
        this.height = height;
        this.image = loadImage("mario/ground.png");
        World.add(world, this.body);
    }

    display(){
        var pos = this.body.position;
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.width, this.height);
    }
}