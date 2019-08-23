kontra.init();
kontra.initKeys();
let canvas = kontra.getCanvas();
let  gameRunning = true;

let hero = heroCreator(300, 250);

let baddies = [
    baddieCreator(110, 110),
    baddieCreator(110, canvas.height - 110),
    baddieCreator(canvas.width - 110, 110),
    baddieCreator(canvas.width - 110, canvas.height - 110)];

let gameLoop = kontra.GameLoop({
    update() {
        baddies.forEach(function (baddie) {
            baddie.update();
        });
        hero.update();
        if (kontra.keyPressed('space')) {
            timeTravel(hero);
            baddies.forEach(function (baddie) {
                if (collision(hero, baddie, hero.influenceZone, baddie.width) && gameRunning) {
                    gameRunning = false
                    console.info("you win!");
                }
            })
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