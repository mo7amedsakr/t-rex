import { ctx } from './getElements.js';
export const createImg = (image, x, y) => {
    const img = new Image();
    img.src = `../assets/${image}`;
    img.onload = () => {
        ctx.drawImage(img, x, y);
    };
};
