class Player {
    constructor() {
        this.position = {
            x : 300,
            y : 300
        };
        this.velocity = {
            x : 0,
            y : 0
        };
        this.speed = 3;
        this.radius = 10;
        this.gunRadius = 2;
        this.drag = 0.7;
        this.maxSpeed = 12;
        this.gunAngle = 0;
        this.bulletSpeed = 7;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
        ctx.closePath();

        let gunX = Math.cos(this.gunAngle) * this.radius;
        let gunY = Math.sin(this.gunAngle) * this.radius;
        
        //console.log(gunX, gunY, this.gunAngle, mousePos.x, mousePos.y);
        ctx.beginPath();
        ctx.arc(gunX + this.position.x, gunY + this.position.y, this.gunRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
        ctx.closePath();
        
    }
    update() {
        if (Math.abs(this.velocity.x) + Math.abs(this.velocity.y) < this.maxSpeed) {
            if (pressedKeys[87]) {//w
            this.velocity.y += -this.speed;
        }
        if (pressedKeys[65]) {//a
            this.velocity.x += -this.speed;
        }
        if (pressedKeys[83]) {//s
            this.velocity.y += this.speed;
        }
        if (pressedKeys[68]) {//d
            this.velocity.x += this.speed;
        }
        }
        

        this.velocity.x *= this.drag;
        this.velocity.y *= this.drag;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.gunAngle = Math.atan(((this.position.y - mousePos.y) / (this.position.x - mousePos.x)));
        if (mousePos.x < this.position.x) {
            this.gunAngle += Math.PI;
        }

        for (let i = 0; i < entityList.enemy?.length; i++) {
            if (entityList.enemy[i].position.x > this.position.x - this.radius &&
                entityList.enemy[i].position.x < this.position.x + this.radius &&
                entityList.enemy[i].position.y > this.position.y - this.radius &&
                entityList.enemy[i].position.y < this.position.y + this.radius) {
                    gameEnd();
            }
        }
        
        //console.log("x velocity: " + this.velocity.x + ", y velocity: " + this.velocity.y);
    }
}
let player = new Player();