collision = function(sprite1, sprite2, firstRadius, secondRadius) {
    let dx = sprite1.x - sprite2.x;
    let dy = sprite1.y - sprite2.y;
    return Math.sqrt(dx * dx + dy * dy) < firstRadius + secondRadius
};

follow = function(sprite1, sprite2) {
    if (sprite1.x < sprite2.x) {
        sprite1.dx = sprite1.baseSpeed;
    } else {
        sprite1.dx = -sprite1.baseSpeed;
    }
    if (sprite1.y < sprite2.y) {
        sprite1.dy = sprite1.baseSpeed;
    } else {
        sprite1.dy = -sprite1.baseSpeed;
    }
};

patrol = function(sprite){
    if (sprite.x - sprite.influenceZone < 0) {
        sprite.x += 1;
        sprite.dx = 0;
        sprite.dy = -sprite.baseSpeed;
    }
    if (sprite.x + sprite.influenceZone > canvas.width) {
        sprite.x -= 1;
        sprite.dx = 0;
        sprite.dy = sprite.baseSpeed;
    }
    if (sprite.y - sprite.influenceZone < 0) {
        sprite.y += 1;
        sprite.dx = sprite.baseSpeed;
        sprite.dy = 0;
    }
    if (sprite.y + sprite.influenceZone > canvas.height) {
        sprite.y -= 1;
        sprite.dx = -sprite.baseSpeed;
        sprite.dy = 0;
    }
};

control = function(sprite){
    if (kontra.keyPressed('left')) {
        sprite.dx = -sprite.baseSpeed;
    }
    if (kontra.keyPressed('right')) {
        sprite.dx = sprite.baseSpeed;
    }
    if (kontra.keyPressed('up')) {
        sprite.dy = -sprite.baseSpeed;
    }
    if (kontra.keyPressed('down')) {
        sprite.dy = sprite.baseSpeed;
    }
};

respectBounds = function (sprite) {
    if (sprite.x + sprite.radius > canvas.width) {
        sprite.x = canvas.width - sprite.radius;
    }
    if (sprite.x - sprite.radius < 0) {
        sprite.x = sprite.radius;
    }
    if (sprite.y + sprite.radius > canvas.height) {
        sprite.y = canvas.height - sprite.radius;
    }
    if (sprite.y - sprite.radius < 0) {
        sprite.y = sprite.radius;
    }
};