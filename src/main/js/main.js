kontra.init();

let timeToJump = 180;
let timeout = 0;
let  baddieSpeed = 1.1;
let  gameRunning = true;

let  heroPositions = [timeToJump];
let  count = 0;
for (i = 0; i < timeToJump; i++) {
    heroPositions[i] = [300, 250];
}

baddieCreator = function (x, y) {
    return kontra.Sprite({
        following: false,
        x: x,
        y: y,
        radius: 100,
        dx: baddieSpeed,
        dy: 0,
        render() {
            this.context.strokeStyle = 'white';
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius / 10, 0, Math.PI * 2);
            this.context.stroke();
        }
    });
};


let canvas = kontra.getCanvas();

baddies = [
    baddieCreator(110, 110),
    baddieCreator(110, canvas.height - 110),
    baddieCreator(canvas.width - 110, 110),
    baddieCreator(canvas.width - 110, canvas.height - 110)]

kontra.initKeys();

let hero = kontra.Sprite({
    x: 300,
    y: 250,
    dx: 0,
    dy: 0,
    radius: 10,
    render() {
        this.context.strokeStyle = 'white';
        this.context.beginPath();  // start drawing a shape
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context.stroke();     // outline the circle
    },
    update() {
        heroPositions[count] = [this.x, this.y];
        count++;
        if (count > timeToJump) {
            count = 0;
        }
        if (kontra.keyPressed('left')) {
            this.dx = -1;
        }
        if (kontra.keyPressed('right')) {
            this.dx = 1;
        }
        if (kontra.keyPressed('up')) {
            this.dy = -1;
        }
        if (kontra.keyPressed('down')) {
            this.dy = 1;
        }
    }
});

let gameLoop = kontra.GameLoop({
    update() {
        baddies.forEach(function (baddie) {
            baddie.update()
        });
        hero.update();
        if (timeout !== 0) {
            timeout--;
        }
        if (kontra.keyPressed('space') && timeout === 0) {
            var position = heroPositions[count === timeToJump ? 0 : count + 1]
            hero.x = position[0];
            hero.y = position[1];
            timeout = timeToJump;
            baddies.forEach(function (baddie) {
                let dx1 = baddie.x - hero.x;
                let dy1 = baddie.y - hero.y;
                if (Math.sqrt(dx1 * dx1 + dy1 * dy1) < baddie.radius / 5 + hero.width && gameRunning) {
                    gameRunning = false
                    console.info("you win!");
                }
            })
        }
        baddies.forEach(function (baddie) {
            let dx = baddie.x - hero.x;
            let dy = baddie.y - hero.y;
            baddie.following = Math.sqrt(dx * dx + dy * dy) < baddie.radius + hero.width;
            if (Math.sqrt(dx * dx + dy * dy) < baddie.radius / 5 + hero.width && gameRunning) {
                gameRunning = false;
                console.info("you lose!");
            }
            if (baddie.following) {
                if (baddie.x < hero.x) {
                    baddie.dx = baddieSpeed;
                } else {
                    baddie.dx = -baddieSpeed;
                }
                if (baddie.y < hero.y) {
                    baddie.dy = baddieSpeed;
                } else {
                    baddie.dy = -baddieSpeed;
                }
            } else {
                if (baddie.x - baddie.radius < 0) {
                    baddie.x += 1;
                    baddie.dx = 0;
                    baddie.dy = -baddieSpeed;
                }
                if (baddie.x + baddie.radius > canvas.width) {
                    baddie.x -= 1;
                    baddie.dx = 0;
                    baddie.dy = baddieSpeed;
                }
                if (baddie.y - baddie.radius < 0) {
                    baddie.y += 1;
                    baddie.dx = baddieSpeed;
                    baddie.dy = 0;
                }
                if (baddie.y + baddie.radius > canvas.height) {
                    baddie.y -= 1;
                    baddie.dx = -baddieSpeed;
                    baddie.dy = 0;
                }
            }
        });
        if (hero.x + hero.radius > canvas.width) {
            hero.x = canvas.width() - hero.radius;
        }
        if (hero.x - hero.radius < 0) {
            hero.x = hero.radius;
        }
        if (hero.y + hero.radius > canvas.height) {
            hero.y = canvas.height() - hero.radius;
        }
        if (hero.y - hero.radius < 0) {
            hero.y = hero.radius;
        }
    },
    render() {
        hero.render();
        baddies.forEach(function (baddie) {
            baddie.render()
        });
    }
});
gameLoop.start();