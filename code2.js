const canvas = document.querySelector ('canvas');
const cxt = canvas.getContext ('2d');
//***********************************************************************

canvas.width = 1000 ;
canvas.height = 1000 ;
const numberOfRectangulars = 10;


//************************************************************************
const createPoints = function(count, canvasWidth, canvasHeight) {

    const rand = function(num) {
    	return Math.floor(Math.random() * num) + 1;
    };

    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    // const rgbRand = function () {
    //     const rand = function(num) {
    //     	return Math.floor(Math.random() * num) + 1;
    //     }
    //     const red = rand (255);
    //     const green = rand (255);
    //     const blue = rand (255);
    //     // return "'rgb ("+red+', '+green+', '+blue+" )'";
    //     return "rgb ("+red+', '+green+', '+blue+" )";
    // }

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

//******************************************************************************

const rectangulars = createPoints (numberOfRectangulars, canvas.width, canvas.height);

//*******************************************************************************

const render = function (n) {
    // cxt.clearRect (0, 0, canvas.width, canvas.height);
    cxt.fillRect (0, 0, canvas.width, canvas.height);

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


//*********************************************************************************

const updateData = function (n) {

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

//*********************************************************************************
const animator = function () {
    render (numberOfRectangulars);
    updateData (numberOfRectangulars);
    requestAnimationFrame (animator);
}
animator ();
