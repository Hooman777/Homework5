const createPoints = function(count, canvasWidth, canvasHeight) {

    const rand = function(num) {
    	return Math.floor(Math.random() * num) + 1;
    }
    const getRandomColor = function () {
        const rand = function(num) {
            return Math.floor(Math.random() * num) + 1;
        }
        return `rgb(${rand (255)}, ${rand (255)}, ${rand (255)})`;

    }
    class points {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.width = 30;
            this.heigth = 30;
            this.xDelta = 1;
            this.yDelta = 1;
        }
    }
    const point = [];
const pointMaker = function (i) {
    if (i < 0) {
        return;
    }
     point[i] = new points (rand(canvasHeight), rand(canvasWidth), getRandomColor());
    pointMaker (i - 1);
}
pointMaker (count - 1);
return point;
}

console.log(createPoints(20, 700, 500));
