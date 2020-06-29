import { canvas, ctx } from './getElements.js';
import { createImg } from './createImg.js';
const G = 4;
const D = 45;
let GAME_LOOP_COUNTER;
let IS_GAME_RUNNING = false;
let SPEED = 2;
let BG_SPEED = -SPEED;
let JUMP = false;
let DINO_SPEED_Y = 0;
let DINO_Y = canvas.height - 64 + DINO_SPEED_Y;
let SCORE = 0;
const TRAPS_IMG = [
    'cactus2.png',
    'cactus.png',
    'flyingdinosaur.png',
];
let TRAPS = [{ img: 0, x: 500, y: canvas.height - 57 }];
let TRAPS_SPEED = -SPEED;
const GAME_INIT = () => {
    IS_GAME_RUNNING = false;
    SPEED = 2;
    BG_SPEED = -SPEED;
    JUMP = false;
    DINO_SPEED_Y = 0;
    DINO_Y = canvas.height - 64 + DINO_SPEED_Y;
    SCORE = 0;
    TRAPS = [{ img: 0, x: 500, y: canvas.height - 57 }];
    TRAPS_SPEED = -SPEED;
};
const GAME_LOOP = () => {
    moveAll();
    for (let i = 0; i < TRAPS.length; i++) {
        if (TRAPS[i].x <= 35 && TRAPS[i].y > DINO_Y && TRAPS[i].y < DINO_Y + 40) {
            console.log('hit');
            return STOP_GAME_LOOP();
        }
    }
    drawAll();
    GAME_LOOP_COUNTER = requestAnimationFrame(GAME_LOOP);
};
const START_GAME_LOOP = () => {
    GAME_INIT();
    if (!IS_GAME_RUNNING) {
        IS_GAME_RUNNING = true;
        GAME_LOOP_COUNTER = requestAnimationFrame(GAME_LOOP);
    }
};
const STOP_GAME_LOOP = () => {
    if (IS_GAME_RUNNING) {
        IS_GAME_RUNNING = false;
        return cancelAnimationFrame(GAME_LOOP_COUNTER);
    }
};
START_GAME_LOOP();
window.addEventListener('keydown', (e) => {
    if ((e.keyCode === 32 || e.keyCode === 38) && DINO_SPEED_Y >= 0) {
        JUMP = true;
    }
    if ((e.keyCode === 32 || e.keyCode === 38) && !IS_GAME_RUNNING) {
        START_GAME_LOOP();
    }
});
const moveAll = () => {
    if (BG_SPEED < -canvas.width) {
        BG_SPEED = -SPEED;
    }
    else {
        BG_SPEED -= SPEED;
    }
    if (JUMP && DINO_SPEED_Y >= -G * D) {
        DINO_SPEED_Y -= G;
    }
    else if (DINO_SPEED_Y < 0) {
        JUMP = false;
        DINO_SPEED_Y += G;
    }
    for (let i = 0; i < TRAPS.length; i++) {
        TRAPS[i].x -= SPEED;
    }
    if (TRAPS[0].x < -50) {
        TRAPS.shift();
    }
    if (TRAPS.length <= 6) {
        const randomImg = Math.round(Math.random() * 2);
        TRAPS.push({
            img: randomImg,
            x: TRAPS[TRAPS.length - 1].x + Math.round(Math.random() * 100 + 200),
            y: randomImg === 2 ? canvas.height - 120 : canvas.height - 57,
        });
    }
    DINO_Y = canvas.height - 64 + DINO_SPEED_Y;
    SCORE++;
};
const drawAll = () => {
    createImg('dinobackground.png', BG_SPEED + canvas.width + SPEED, 0);
    createImg('dinobackground.png', BG_SPEED, 0);
    TRAPS.forEach((trap) => {
        createImg(TRAPS_IMG[trap.img], trap.x, trap.y);
    });
    // TOP
    createImg('dinosaur.png', 0, DINO_Y);
    ctx.fillStyle = '#535353';
    ctx.font = '20px monospace';
    ctx.fillText(`SCORE ${Math.floor(SCORE / 60)}`, canvas.width / 2 - 50, 100);
};
