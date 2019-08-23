heroCreator = function (x, y) {
    return spriteCreator(
        x,
        y,
        1,
        () => {
            this.context.strokeStyle = 'white';
            this.context.beginPath();  // start drawing a shape
            this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.context.stroke();     // outline the circle
        },
        () => {
            respectBounds(this);
            control(this)
        });
};

baddieCreator = function (x, y) {
    return spriteCreator(x, y, 1,
        () => {
            this.context.strokeStyle = 'white';
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.context.stroke();
        },
        () => {
            respectBounds(this);
            if (collision(this, hero, this.width, hero.influenceZone) && gameRunning) {
                gameRunning = false;
                console.info("you lose!");
            }
            if (collision(this, hero, this.influenceZone, hero.influenceZone)) {
                follow(this, hero)
            } else {
                patrol(this)
            }
        });
};

spriteCreator = function (x, y, baseSpeed, render, update) {
    return kontra.Sprite({
        x: x,
        y: y,
        dx: 0,
        dy: 0,
        baseSpeed: baseSpeed,
        radius: 10,
        influenceZone: 10,
        render: render,
        update: update
    });
};
