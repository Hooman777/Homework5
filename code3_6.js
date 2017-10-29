const newGame = function () {
    //*********************** INSERTING CANVAS & CHARACTERS IMAGES & SOUND EFFECT ***********
    const canvas = document.querySelector ('canvas');
    const ctx = canvas.getContext ('2d');
    const background = new Image ();
    background.src = 'background.png';
    const bee = new Image ();
    bee.src = 'bee.png';
    const enemy = new Image ();
    enemy.src = 'fly.png';
    const honey = new Image ();
    honey.src = 'honey.png';
    const gameOver = new Image ();
    gameOver.src = 'gameOver.png';
    const youWin = new Image ();
    youWin.src = 'win.png';
    const flower = new Image ();
    flower.src = 'Lotusflower.png';
    const taDa = new Audio ();
    taDa.src = 'taDa.mp3';
    const fail = new Audio ();
    fail.src = 'fail.mp3';

    //************************* INITIALISING PARAMETERS **************************************

    var life = true;
    var level = 1;
    var winStatus = false;
    var pause = false;
    canvas.width = window.innerWidth - 30 ;
    canvas.height = window.innerHeight - 30 ;
    var numberOfenemiesPos = 35;//20 + 5 * level;
    const numberOfflowers = 50;
    var numberOflives = 10;
    const leftKey = 37;
    const upKey = 38;
    const rightKey = 39;
    const downKey = 40;
    const nKey = 78;
    const spaceKey = 32;
    const enterKey = 13;
    const speed = {
        x: 5,
        y:3
    }
    const tolerance = {
        x: 20,
        y:15
    }

//**********************AFFECTING KEYBOARD STROKE AND MOUSE CLICK *****************************
document.addEventListener('keydown', function(event) {
    if (event.keyCode === spaceKey) {
        pause = !pause;
    }
})

// Using Jquery for fun!
$(document).ready(function(){
    $("canvas").on({
    dblclick: function(){
        pause = !pause;
    },
    click: function(){
        pause = !pause;
    }
});
});

//*********************************************************************************************
    const game = function () {
         winStatus = false;

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
                constructor(x, y, color, speedX, speedY) {
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
             point[i] = new points (rand(canvasWidth), rand(canvasHeight), getRandomColor(), rand(speed.x), rand(speed.y));
            pointMaker (i - 1);
        }
        pointMaker (count - 1);
        return point;
        }
        //************************ PLAYER & DESTINATION PROPERTIES ******************************************************
        const player = {
            x: 60,
            y: (canvas.height - 100),
            height: 50,
            width: 60,
            r: 35,
            color: 'darkblue'
        }
        const destination = {
            x: (canvas.width - 80),
            y:0,
            width:80,
            height: 100
        }
        //**********************AFFECTING KEYBOARD STROKE TO PLAYER MOVEMENT *********************
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

        //************************ ASSIGNING enemiesPos & flowers PROPERTIES *****************************************
        const enemiesPos = createPoints (numberOfenemiesPos, canvas.width, canvas.height);
        const flowerRain = createPoints (numberOfflowers, canvas.width, canvas.height);
        //************************ DEFINING RENDER FUNCTION **************************************************
        const renderIfpaused = function () {
            ctx.clearRect (0, 0, canvas.width, canvas.height);
            ctx.drawImage (background, 0, 0, canvas.width, canvas.height);
            ctx.font = "40px Comic Sans MS";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText(`For continue press space or click again.`, canvas.width/2, canvas.height/2);

        }
        const renderIfgameOver = function () {
            ctx.clearRect (0, 0, canvas.width, canvas.height);
            ctx.drawImage (background, 0, 0, canvas.width, canvas.height);
            ctx.drawImage (gameOver, canvas.width/2-150, canvas.height/2-150, 300, 300);
            ctx.font = "30px Comic Sans MS";
            ctx.fillStyle = "green";
            ctx.textAlign = "center";
            ctx.fillText(`If you want continue press N`, canvas.width/2, canvas.height-100);
            // alert (life);

        }
        const renderIfwin = function (n) {
            ctx.clearRect (0, 0, canvas.width, canvas.height);
            ctx.drawImage (background, 0, 0, canvas.width, canvas.height);
            ctx.drawImage (youWin, canvas.width/2-180, canvas.height/2-120, 300, 300);
            const renderIfwinHelper = function (i) {
                if (i === n) {
                    return;
                }
                ctx.drawImage(flower, flowerRain[i].x, flowerRain[i].y, flowerRain[i].width*2, flowerRain[i].height*2);
                renderIfwinHelper (i + 1);
            }
            renderIfwinHelper (0);
            ctx.font = '40px Comic Sans Ms';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText(`Press Enter to next level`, 300, 80);
        }
        const render = function (n) {
            ctx.clearRect (0, 0, canvas.width, canvas.height);
            ctx.drawImage (background, 0, 0, canvas.width, canvas.height);
            ctx.drawImage (honey, player.x, player.y, player.width, player.height);
            ctx.drawImage (bee, destination.x, destination.y, destination.width, destination.height);
            if (!pause) {
                ctx.font = '20px Comic Sans Ms';
                ctx.strokeStyle = 'black';
                ctx.textAlign = 'center';
                ctx.strokeText(`Press Space or click to pause`, 180, 30);
                ctx.strokeText(`Double click for fun ;)`, 180, 60);

            }

            // ctx.drawImage (gameOver, canvas.width/2-150, canvas.height/2-200, 300, 300);

            ctx.font = "30px Comic Sans MS";
            ctx.fillStyle = "gold";
            ctx.textAlign = "center";
            ctx.fillText(`Life : ${numberOflives}`, canvas.width/2, 50);
            ctx.font = "30px Comic Sans MS";
            ctx.fillStyle = "silver";
            ctx.textAlign = "center";
            ctx.fillText(`Level : ${level}`, 100, 110);
            const renderHelper = function (i) {
                if (i === n) {
                    return;
                }
                const color = enemiesPos[i].color;
                ctx.fillStyle = color;
                ctx.drawImage(enemy, enemiesPos[i].x, enemiesPos[i].y, enemiesPos[i].width, enemiesPos[i].height);
                renderHelper (i + 1);
            }
            renderHelper (0);
        }
        //********************* DEFINING UPDATE FUNCTION ***********************************************
        const updateIfwin = function(n) {
            const updateIfwinHelper = function (i) {
                if (i === n) {
                    return;
                }
                flowerRain[i].y +=flowerRain[i].yDelta;
                if (flowerRain[i].y > canvas.height) {
                    flowerRain[i].y = 0;
                }
                updateIfwinHelper (i + 1);
            }
            updateIfwinHelper (0);

        }
        const updateData = function (n) {
            // console.log(`player.x=${player.x} player.y=${player.y}`);
        //********************* CONTROLING OF PLAYER MOVEMENT *****************************************

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


            //**************** CONTROLLING OF ENEMIES **********************************************
            const updateHelper = function (i) {
                const leftUpCorner = [];
                const rightDownCorner = [];

                if (i === n) {
                    return;
                }
                if ((enemiesPos[i].x === (canvas.width - enemiesPos[i].width)) || (enemiesPos[i].x === 0)) {
                    // enemiesPos[i].x = 0;
                    enemiesPos[i].xDelta *= -1;
                }
                enemiesPos[i].x += enemiesPos[i].xDelta;
                if ((enemiesPos[i].y === (canvas.height - enemiesPos[i].height)) || (enemiesPos[i].y === 0)) {
                    enemiesPos[i].yDelta *= -1;
                }
                enemiesPos[i].y += enemiesPos[i].yDelta;
                updateHelper (i + 1);
            }
            updateHelper (0);
            const collision = function (i) {
                if (i === numberOfenemiesPos) {
                    return;
                }
                // const collisionHelper = function (j) {
                //     const leftUpCorner = [];
                //     const rightDownCorner = [];
                //     if (j === numberOfenemiesPos) {
                //         return;
                //     }
                //
                //     leftUpCorner[i][j] = {
                //        x: enemiesPos[i].x - enemiesPos[i].width, // + tolerance.x,
                //        y: enemiesPos[i].y - enemiesPos[j].height //+ tolerance.y
                //    }
                //     rightDownCorner[i][j] = {
                //        x: enemiesPos[i].x + enemiesPos[j].width,//- tolerance.x,
                //        y: enemiesPos[i].y + enemiesPos[j].height //- tolerance.y
                //    }
                //    if (enemiesPos[j].x > leftUpCorner[i][j].x && enemiesPos[j].x < rightDownCorner[i][j].x && enemiesPos[j].y > leftUpCorner[i][j].y && enemiesPos[j].y < rightDownCorner[i][j].y) {
                //        enemiesPos[i].xDelta *=-1;
                //        enemiesPos[i].yDelta *=-1;
                //        enemiesPos[j].xDelta *=-1;
                //        enemiesPos[j].yDelta *=-1;
                //    }
                //    collisionHelper (j + 1);
                // }
                // collisionHelper (0);
                collision (i + 1);
            }
            collision (0);
        }
        //***************** CONTROLLING STATUS OF GAME **************************************
        const statusCheck = function (n) {
            const leftUpCorner = [];
            const rightDownCorner = [];
            const looserHelper = function (i) {
                if (i === n) {
                    return;
                }
                 leftUpCorner[i] = {
                    x: enemiesPos[i].x - player.width + tolerance.x,
                    y: enemiesPos[i].y - player.height + tolerance.y
                }
                 rightDownCorner[i] = {
                    x: enemiesPos[i].x + enemiesPos[i].width - tolerance.x,
                    y: enemiesPos[i].y + enemiesPos[i].height - tolerance.y
                }
                // console.log(`rightUpCorner.x = ${rightUpCorner[i].x}  leftDownCorner.y = ${leftDownCorner[i].y}`);

                if ((player.x > leftUpCorner[i].x && player.x < rightDownCorner[i].x) && (player.y > leftUpCorner[i].y && player.y < rightDownCorner[i].y)) {
                    setTimeout(function () {
                        // alert ("Game Over!")
                        fail.play ();
                        numberOflives --;
                        enemiesPos[i].x = canvas.width + 10;
                        enemiesPos[i].y = canvas.height + 10;
                    }, 0);
                }
                looserHelper (i + 1);
            }
            looserHelper (0);

            const winerHelper = function () {
                if (player.x >= destination.x && player.y <= destination.height) {
                    // alert ('You Are Win!');
                    taDa.play ();
                    winStatus = !winStatus;
                }
            }
            winerHelper ();
            if (numberOflives === 0) {
                life = false;
            }
        }
        //********************* ANIMATOR FUNCTION *************************************************
        const maxFrame = 1000;
        var i = 0;
        const winAnimator = function () {
            renderIfwin (numberOfflowers);
            updateIfwin (numberOfflowers);
            i++;
            if (i < maxFrame) {
                requestAnimationFrame (winAnimator);

            } else {
                return;
            }

        }

        //**********************************************************************
        const animator = function () {
            if (life && !pause && !winStatus) {
                render (numberOfenemiesPos);
                updateData (numberOfenemiesPos);
                statusCheck (numberOfenemiesPos);
            }
            if (!life && !pause && !winStatus) {
                    renderIfgameOver ();
                    level = 1;
                    numberOflives = 10;
                    numberOfenemiesPos = 20;
                    return;
                }

            if (pause) {
                renderIfpaused ();
            }
            if (winStatus) {
                winAnimator();
                level ++;
                winStatus = !winStatus;
                pause = false;
                numberOfenemiesPos = numberOfenemiesPos + 5 * level;
                numberOflives = 10;
                // return;
            }
            requestAnimationFrame (animator);
        }
        //************************************************************************************
        animator ();
    }
    if (level === 1) {

        game ();
    }
    document.addEventListener('keydown', function(event) {
        if (event.keyCode === enterKey) {

            game();
        }
    })
    document.addEventListener('keydown', function(event) {
        if (event.keyCode === nKey) {
            life = true;
            numberOflives = 10;
            game ();
        }
    })
    //JQuery for extra animation
    $(document).ready(function(){
    $("canvas").dblclick(function(){
    var div = $("canvas");
    div.animate({height: `${canvas.height/2}`, opacity: '0.4'}, "slow");
    div.animate({width: `${canvas.width/2}`, opacity: '0.8'}, "slow");
    div.animate({height: `${canvas.height}`, opacity: '0.4'}, "fast");
    div.animate({width: `${canvas.width}`, opacity: '0.8'}, "fast");
    });
    });

}
newGame();
