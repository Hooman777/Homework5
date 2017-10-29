
//*********************** INSERTING CANVAS **********************************************
const canvas = document.querySelector ('canvas');
const ctx = canvas.getContext ('2d');

//************************* INITIALISING PARAMETERS **************************************

canvas.width = 1200 ;
canvas.height = 600 ;
const numberOfRectangulars = 7;
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
    x: 40,
    y: (canvas.height - 40),
    height: 50,
    width: 50,
    r: 35,
    color: 'darkblue'
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
}, 0);

})

//************************ ASSIGNING RECTANGULARS PROPERTIES *****************************************
const rectangulars = createPoints (numberOfRectangulars, canvas.width, canvas.height);
//************************ DEFINING RENDER FUNCTION **************************************************
const render = function (n) {
    ctx.clearRect (0, 0, canvas.width, canvas.height);
    // ctx.fillRect (0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'black';
    ctx.beginPath();
    // ctx.arc(100,75,50,0,2*Math.PI);
    // ctx.stroke();
    ctx.arc (player.x, player.y, player.r, 0, Math.PI * 2, false);
    // ctx.fillRect (10, (canvas.height -60), 50, 50);
    // ctx.fillRect (player.x, player.y, player.width, player.height);
    ctx.fillStyle = player.color;
    ctx.fill ();
    ctx.stroke;

    const renderHelper = function (i) {
        if (i === n) {
            return;
        }
        const color = rectangulars[i].color;
        ctx.fillStyle = color;
        ctx.fillRect (rectangulars[i].x, rectangulars[i].y, rectangulars[i].width, rectangulars[i].height );
        renderHelper (i + 1);
    }
    renderHelper (0);
}
//********************* DEFINING UPDATE FUNCTION ***********************************************
const updateData = function (n) {
    console.log(`player.x=${player.x} player.y=${player.y}`);
//********************* CONTROLING OF PLAYER ***************************************************

    if (player.x < player.r ) {
        player.x = (canvas.width - player.r);
    }
    if (player.x > (canvas.width - player.r)) {
        player.x = player.r;
    }
    if (player.y < player.r ) {
        player.y = canvas.height - player.r;
    }
    if (player.y > (canvas.height - player.r)) {
        player.y = player.r;
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
                x: rectangulars[i].x - player.r,
                y: rectangulars[i].y - rectangulars[i].height - player.r
            }
             rightUpCorner[i] = {
                x: rectangulars[i].x + rectangulars[i].width + player.r,
                y: rectangulars[i].y + player.r
            }
            console.log(`rightUpCorner.x = ${rightUpCorner[i].x}  leftDownCorner.y = ${leftDownCorner[i].y}`);

            if ((player.x > leftDownCorner[i].x && player.x < rightUpCorner[i].x) && (player.y > leftDownCorner[i].y && player.y < rightUpCorner[i].y)) {
                setTimeout(function () {
                    alert ("Game Over!")
                    // return;

                }, 0);
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
