/*

The Game Project 5 - Bring it all together

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isJumping;

var clouds;
var mountains;
var trees_x;
var canyon;
var collectable;

var game_score;
var flagpole;
var lives;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	lives = 4;
    startGame();
	game_score = 0;
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); //draw green ground

    //scrolling
    push();
    translate(scrollPos, 0);

	// Draw clouds.
    drawClouds();

	// Draw mountains.
    drawMountains();

	// Draw trees.
    drawTrees();

	// Draw canyons.
    for(var i = 0; i < canyons.length; i++)
    {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }

    //losing lives
    if(gameChar_y > 574 && lives > 0)
    {
        startGame();
    }

	// Draw collectable items.
    for(var i = 0; i < collectables.length; i++)
    {
        if(collectables[i].isFound != true)
        {
            drawCollectable(collectables[i]);
            checkCollectable(collectables[i]);
        }
    }

    renderFlagpole();
    pop();

	// Draw game character.
	drawGameChar();

    //draw screen text
    fill(255);
    noStroke();
    text("score: " + game_score, 10, 20);
    text("lives" + lives, 10, 35);

    //lives
    for(var i = 0; i < lives; i++)
    {
        push();
        fill(255, 0, 0);
        rect([i]+10, 40, 25, 25);
        pop();
    }

    //game over
    if(lives < 1)
    {
        fill(255, 0, 0);
        noStroke();
        textSize(25);
        text("Game over. Press space to continue!", 315, 60);
        return;
    }

    //level complete
    if(flagpole.isReached == true)
    {
        fill(255, 255, 0);
        noStroke();
        textSize(25)
        text("Level complete. Press space to continue!", 315, 60)
        return;
    }
    // Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}

    //the logic to make the game character rise and fall
    if(gameChar_y < floorPos_y)
    {
        gameChar_y += 2;
        isFalling = true;
    }
    else
    {
        isFalling = false;
    }

    if(flagpole.isReached != true)
    {
        checkFlagpole();
    }
	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed()
{

    if(flagpole.isReached && key == ' ')
    {
        nextLevel();
        return
    }
    else if(lives == 0 && key == ' ')
    {
        returnToStart();
        return
    }

	console.log("press" + keyCode);
	console.log("press" + key);

    if(key == "A" || keyCode == 37)
    {
        isLeft = true;
        console.log("isLeft:" + isLeft);
    }

    if(key == "D" || keyCode == 39)
    {
        isRight = true;
        console.log("isRight:" + isRight);
    }

    if(key == ' ')
        {
            if(!isFalling)
            {
                gameChar_y -= 100;
            }
        }

    if(keyCode == 32 && gameChar_y == floorPos_y)
    {
        gameChar_y -=50;
    }

}

function keyReleased()
{

	console.log("release" + keyCode);
	console.log("release" + key);

        if(keyCode == 37)
    {
        isLeft = false;
        console.log("isLeft:" + isLeft);
    }

    if(keyCode == 39)
    {
        isRight = false;
        console.log("isRight:" + isRight);
    }

}

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character

    if(isLeft && isFalling)
    {
        fill(255,0,0);
        rect(gameChar_x - 4, gameChar_y - 54, 10, 12);
        fill(0);
        ellipse(gameChar_x + 1, gameChar_y - 27, 15, 30);
        fill(0)
        ellipse (gameChar_x - 10, gameChar_y - 31, 18, 5);
        fill(255,0,255);
        ellipse(gameChar_x + 2, gameChar_y - 8, 5, 5);
        ellipse(gameChar_x + 2, gameChar_y - 1, 5, 5);
        ellipse(gameChar_x + 2, gameChar_y + 6, 5, 5);
    }
    else if(isRight && isFalling)
    {
        fill(255,0,0);
        rect(gameChar_x - 4, gameChar_y - 54, 10, 12);
        fill(0);
        ellipse(gameChar_x + 1, gameChar_y - 27, 15, 30);
        fill(0)
        ellipse (gameChar_x + 13, gameChar_y - 31, 18, 5);
        fill(255,0,255);
        ellipse(gameChar_x + 2, gameChar_y - 8, 5, 5);
        ellipse(gameChar_x + 2, gameChar_y - 1, 5, 5);
        ellipse(gameChar_x + 2, gameChar_y + 6, 5, 5);
    }
    else if(isLeft)
    {
        fill(255,0,0);
        rect(gameChar_x - 4, gameChar_y - 40, 10, 12);
        fill(0);
        ellipse(gameChar_x + 1, gameChar_y - 15, 15, 30);
        fill(0)
        ellipse (gameChar_x - 10, gameChar_y - 18, 18, 5);
    }
    else if(isRight)
    {
        fill(255,0,0);
        rect(gameChar_x - 4, gameChar_y - 40, 10, 12);
        fill(0);
        ellipse(gameChar_x + 1, gameChar_y - 15, 15, 30);
        fill(0)
        ellipse (gameChar_x + 13, gameChar_y - 18, 18, 5);
    }
    else if(isFalling || isPlummeting)
    {
        fill(255,0,0);
        rect(gameChar_x - 8, gameChar_y - 53, 20, 10);
        fill(0);
        ellipse(gameChar_x + 2, gameChar_y - 28, 15, 30);
        fill(0)
        ellipse(gameChar_x - 8, gameChar_y - 31, 18, 5);
        ellipse (gameChar_x + 11, gameChar_y - 31, 18, 5);
        fill(255,0,255);
        ellipse(gameChar_x + 2, gameChar_y - 8, 5, 5);
        ellipse(gameChar_x + 2, gameChar_y - 1, 5, 5);
        ellipse(gameChar_x + 2, gameChar_y + 6, 5, 5);
    }
    else
    {
        fill(255,0,0);
        rect(gameChar_x - 10, gameChar_y - 40, 20, 10);
        fill(0);
        ellipse(gameChar_x - 0, gameChar_y - 15, 15, 30);
        fill(0)
        ellipse(gameChar_x + 10, gameChar_y - 18, 18, 5);
        ellipse (gameChar_x - 10, gameChar_y - 18, 18, 5);
    }

}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{
    for(var i = 0; i < clouds.length; i++)
    {
        noStroke();
        fill(255);
        ellipse(clouds[i].x_pos+50, clouds[i].y_pos+0,clouds[i].size+25);
        noStroke();
        fill(255);
        ellipse(clouds[i].x_pos+100, clouds[i].y_pos+0,clouds[i].size+40);
        noStroke();
        fill(255);
        ellipse(clouds[i].x_pos+150, clouds[i].y_pos+0,clouds[i].size+25);
    }
}


// Function to draw mountains objects.
function drawMountains()
{
    for(var i = 0; i < mountains.length; i++)
    {
        noStroke();
        fill(178,34,34);
        triangle(mountains[i].x_pos+340, mountains[i].y_pos+333, mountains[i].x_pos+540, mountains[i].y_pos+333, mountains[i].x_pos+440, mountains[i].y_pos+100, mountains.size);

        noStroke();
        fill(255);
        triangle(mountains[i].x_pos+414, mountains[i].y_pos+162, mountains[i].x_pos+466, mountains[i].y_pos+166, mountains[i].x_pos+440, mountains[i].y_pos+100);
    }
}

// Function to draw trees objects.
function drawTrees()
{
    for(var i = 0; i < trees_x.length; i++)
    {
        fill(140, 50, 0);
        quad (-500+trees_x[i] + 845, -435 + floorPos_y + 434, -500+trees_x[i] + 915, -435 + floorPos_y + 435, -500+trees_x[i] + 895, -435 + floorPos_y + 320, -500+trees_x[i] + 860, -435 + floorPos_y + 320);

        fill(0, 255, 0);
        ellipse(trees_x[i]+370, -150+floorPos_y+20, 80, 80);
        fill(0, 255, 0);
        ellipse(trees_x[i]+337, -150+floorPos_y+30, 90, 60);
        fill(0, 255, 0);
        ellipse(trees_x[i]+330, -150+floorPos_y-10, 80, 80);
        fill(0, 255, 0);
        ellipse(trees_x[i]+370, -150+floorPos_y-20, 80, 80);
        fill(0, 255, 0);
        ellipse(trees_x[i]+410, -150+floorPos_y+10, 90, 90);
    }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
        fill(30,144,255);
        rect(t_canyon.x_pos, t_canyon.y_pos, t_canyon.width, t_canyon.height);

}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
    if(gameChar_world_x > t_canyon.x_pos && gameChar_world_x < t_canyon.x_pos + 170)

        {
            isPlummeting = true;
        }

     else
        {
            isPlummeting = false;
        }
       if (isPlummeting)
        {
            gameChar_y += 2;
        }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
        stroke(0)
        fill(255, 0, 0)
        triangle(t_collectable.x_pos+290, t_collectable.y_pos+280, t_collectable.x_pos+310, t_collectable.y_pos+280, t_collectable.x_pos+300, t_collectable.y_pos+260);

        fill(255, 76, 76)
        triangle(t_collectable.x_pos+300, t_collectable.y_pos+260, t_collectable.x_pos+320, t_collectable.y_pos+260, t_collectable.x_pos+310, t_collectable.y_pos+280);

        fill(255, 0, 0)
        triangle(t_collectable.x_pos+310, t_collectable.y_pos+280, t_collectable.x_pos+330, t_collectable.y_pos+280, t_collectable.x_pos+320, t_collectable.y_pos+260);

        fill(255, 127, 127)
        triangle (t_collectable.x_pos+320, t_collectable.y_pos+260, t_collectable.x_pos+340, t_collectable.y_pos+260, t_collectable.x_pos+330, t_collectable.y_pos+280);

        fill (255, 50, 50)
        triangle (t_collectable.x_pos+330, t_collectable.y_pos+280, t_collectable.x_pos+350, t_collectable.y_pos+280, t_collectable.x_pos+340, t_collectable.y_pos+260);

        fill (284, 0, 0)
        triangle(t_collectable.x_pos+310, t_collectable.y_pos+280, t_collectable.x_pos+290, t_collectable.y_pos+280, t_collectable.x_pos+320, t_collectable.y_pos+320);

        fill(200, 0, 0)
        triangle(t_collectable.x_pos+350, t_collectable.y_pos+280, t_collectable.x_pos+330, t_collectable.y_pos+280, t_collectable.x_pos+320, t_collectable.y_pos+320);

        fill(255, 127, 127)
        triangle(t_collectable.x_pos+330, t_collectable.y_pos+280, t_collectable.x_pos+310, t_collectable.y_pos+280, t_collectable.x_pos+320, t_collectable.y_pos+320);

}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
    var d = dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos);
    if(d < 453 && d > 438 && gameChar_y)
    {
        t_collectable.isFound = true;
        game_score += t_collectable.size;
    }
}

function renderFlagpole()
{
    push();
    stroke(0);
    strokeWeight(5);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 200);

    if(flagpole.isReached)
    {
        noStroke();
        fill(255, 0, 255);
        rect(flagpole.x_pos, floorPos_y - 200, 50, 50);
    }
    else
    {
        noStroke();
        fill(255, 0, 255);
        rect(flagpole.x_pos, floorPos_y -50, 50, 50);
    }
    pop();
}


function checkFlagpole()
{
    var d = abs(gameChar_world_x - flagpole.x_pos);
    if(d < 50)
    {
        flagpole.isReached = true;
    }
}

function startGame()
{
    gameChar_x = width/2;
    gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

    collectable = {x_pos: 100, y_pos: 100, size: 50, isFound: false};

	// Initialise arrays of scenery objects.

    trees_x = [-1200, -900, -500, -275, -90, 100, 295, 852, 1024, 1500];

    clouds = [
              {x_pos:500, y_pos:100, size:50},
              {x_pos:100, y_pos:100, size:50},
              {x_pos:300, y_pos:100, size:50},
              {x_pos:500, y_pos:100, size:50}
             ];

    mountains = [
                {x_pos:450, y_pos:100, size:50},
                {x_pos:800, y_pos:100, size:50},
                {x_pos:100, y_pos:100, size:50},
                {x_pos: 1150, y_pos:100, size: 50}
                ];

    canyons = [
             {x_pos: 0, y_pos:floorPos_y, width:100, height:height-floorPos_y},
             {x_pos: 550, y_pos:floorPos_y, width:100, height:height-floorPos_y},
             {x_pos: 900, y_pos:floorPos_y, width:100, height:height-floorPos_y}
             ];


    collectables = [
                  {x_pos: 200, y_pos: 100, size: 50},
                  {x_pos: 500, y_pos: 100, size: 50},
                  {x_pos: 1000, y_pos: 100, size:50}
                  ];

    game_score = 0;

    flagpole = {x_pos: 2200, isReached: false}
    lives -=1
}
