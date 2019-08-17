
import Character from '/src/character.js' ;
import InputHandler from '/src/input handler.js' ;

// MAIN CODE ////////////////////

// Getting canvas and context from html file
let canvas = document.getElementById("Screen");
let ctx = canvas.getContext("2d");

// Game dimensions
const GAME_W = 1280;
const GAME_H = 720;

// Instantiates the 2 characters
let lavaBoy = new Character(200, 100, "#e6350e");
let aquaGirl = new Character(500, 64, "#22bce3");

// Creates the controller
let IH = new InputHandler(lavaBoy,aquaGirl);

let collision_map= [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],      // COLLISION MAP /////////
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],      // 0 - nothing
                    [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],      // 1 - wall
                    [0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [1,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0],
                    [1,1,1,1,1,1,1,0,0,1,1,0,0,0,1,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
                    [1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,0],
                    [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
                    [1,1,1,1,1,1,1,0,0,1,1,0,0,0,0,0]];

var tile_size = 64; // Each index on the map represents a 64x64 px area


// Sets Game loop /////////////////////////
let lastTime = 0;
function loop (currentTime){               // Function called passing the current time
    let deltaTime = currentTime-lastTime;  // deltaTime (time passed) is calculated
    lastTime = currentTime;                // lastTime is updated

    // Clears screen, before updating it
    ctx.clearRect(0,0,GAME_W,GAME_H);

    // Updates all characters
    lavaBoy.update(deltaTime);
    aquaGirl.update(deltaTime);
    
    // Gets collision points of all the colliders and checks for collisions
    lavaBoy.getCollider().getCollisionPoints(collision_map, tile_size);
    aquaGirl.getCollider().getCollisionPoints(collision_map, tile_size);

    // Draws the map
    drawMap(collision_map);

    // Draws the characters
    lavaBoy.draw(ctx);
    aquaGirl.draw(ctx);

    // JS function that calls a function, passing the currentTime
    requestAnimationFrame(loop);
}

function drawMap(map){

    for (var i = 0; i<map.length; i++){
        for (var j = 0; j<map[i].length; j++){
            
            if (map[i][j] == 1){                    // For each index in the map, draws:
                ctx.fillStyle = "#000000" ;         // - Nothing, for 0s
                ctx.fillRect(j*64,i*64,64,64);      // - Black, for 1s
            }

        }
    }

}

// Calls game loop
loop();
