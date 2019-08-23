let timeToJump = 180;
let timeout = 0;
let  count = 0;
let  heroPositions = [timeToJump];
for (i = 0; i < timeToJump; i++) {
    heroPositions[i] = [300, 250];
}


updateTimeTravel  = function(sprite) {
    heroPositions[count] = [sprite.x, sprite.y];
    count++;
    if (count > timeToJump) {
        count = 0;
    }
    if (timeout !== 0) {
        timeout--;
    }
};

timeTravel = function(sprite) {
    if (timeout === 0) {
        let position = heroPositions[count === timeToJump ? 0 : count + 1];
        sprite.x = position[0];
        sprite.y = position[1];
        timeout = timeToJump;
    }
};