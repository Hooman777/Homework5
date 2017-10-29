
//*********************** INSERTING CANVAS **********************************************
const canvas = document.querySelector ('canvas');
const cxt = canvas.getContext ('2d');

//***************************************************************************************

canvas.width = 1200 ;
canvas.height = 600 ;
const numberOfRectangulars = 3;
const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

//********************* POINT BUILDER ***************************************************

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
            this.height = 30;
            this.xDelta = 1;
            this.yDelta = 1;
        }
    }
    const point = [];
const pointMaker = function (i) {
    if (i < 0) {
        return;
    }
     point[i] = new points (rand(canvasWidth), rand(canvasHeight), getRandomColor());
    pointMaker (i - 1);
}
pointMaker (count - 1);
return point;
}
//************************ PLAYER PROPERTIES ******************************************************
const player = {
    x: 10,
    y: (canvas.height - 60),
    height: 50,
    width: 50

}
document.addEventListener('keydown', function(event) {
    setTimeout(function(){
    if(event.keyCode === upKey) {
        player.y = player.y - 10 ;
    }
    else if(event.keyCode === downKey) {
        player.y = player.y + 10;
    }
    else if(event.keyCode === rightKey) {
        player.x = player.x + 10;
    }
    else if(event.keyCode === leftKey) {
        player.x = player.x - 10;
    }
}, 100);

})

//************************ ASSIGNING RECTANGULARS PROPERTIES *****************************************
const rectangulars = createPoints (numberOfRectangulars, canvas.width, canvas.height);
//************************ DEFINING RENDER FUNCTION **************************************************
const render = function (n) {
    cxt.clearRect (0, 0, canvas.width, canvas.height);
    // cxt.fillRect (0, 0, canvas.width, canvas.height);
    cxt.fillStyle = 'black';
    // cxt.arc (40, (canvas.width - 40), 35, 0, Math.PI * 2, false);
    // cxt.fillRect (10, (canvas.height -60), 50, 50);
    cxt.fillRect (player.x, player.y, player.width, player.height);
    // cxt.fill;

    const renderHelper = function (i) {
        if (i === n) {
            return;
        }
        const color = rectangulars[i].color;
        cxt.fillStyle = color;
        cxt.fillRect (rectangulars[i].x, rectangulars[i].y, rectangulars[i].width, rectangulars[i].height );
        renderHelper (i + 1);
    }
    renderHelper (0);
}
//********************* DEFINING UPDATE FUNCTION ***********************************************
const updateData = function (n) {
    console.log(`player.x=${player.x} player.y=${player.y}`);
//********************* CONTROLING OF PLAYER ***************************************************

    if (player.x < 0 ) {
        player.x = (canvas.width - player.width);
    }
    if (player.x > (canvas.width - player.width)) {
        player.x = 0;
    }
    if (player.y < 0 ) {
        player.y = canvas.height - player.height;
    }
    if (player.y > (canvas.height - player.height)) {
        player.y = 0;
    }
    //***************** CONTROLLING STATUS OF GAME ***********************************
    const looserCheck = function (n) {
        const leftDownCorner = [];
        const rightUpCorner = [];
        const looserHelper = function (i) {
            if (i === n) {
                return;
            }
             leftDownCorner[i] = {
                x: rectangulars[i].x - player.width,
                y: rectangulars[i].y - rectangulars[i].height
            }
             rightUpCorner[i] = {
                x: rectangulars[i].x + rectangulars[i].width,
                y: rectangulars[i].y + player.height
            }
            console.log(`rightUpCorner.x = ${rightUpCorner[i].x}  leftDownCorner.y = ${leftDownCorner[i].y}`);

            if ((player.x > leftDownCorner[i].x && player.x < rightUpCorner[i].x) && (player.y > leftDownCorner[i].y && player.y < rightUpCorner[i].y)) {
                setTimeout(function () {
                    alert ("Game Over!")

                }, 30);
            }
            looserHelper (i + 1);
        }
        looserHelper (0);
    }
    looserCheck (numberOfRectangulars);
    //**************** CONTROLLING OF ENEMIES **********************************************
    const updateHelper = function (i) {

        if (i === n) {
            return;
        }
        if (rectangulars[i].x === (canvas.width - rectangulars[i].width)) {
            rectangulars[i].x = 0;
        }
        rectangulars[i].x += rectangulars[i].xDelta;
        if (rectangulars[i].y === (canvas.height - rectangulars[i].height)) {
            rectangulars[i].y = 0;
        }
        rectangulars[i].y += rectangulars[i].yDelta;
        updateHelper (i + 1);
    }
    updateHelper (0);
}
//********************* ANIMATOR FUNCTION *************************************************
const animator = function () {
    render (numberOfRectangulars);
    updateData (numberOfRectangulars);
    requestAnimationFrame (animator);
}
animator ();
