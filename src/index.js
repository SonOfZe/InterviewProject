
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
let lavaBoy = new Character(300, 300, "#e6350e");
let aquaGirl = new Character(500, 0, "#22bce3");

// Creates the controller
let IH = new InputHandler(lavaBoy,aquaGirl);

let collision_map= [[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],      // COLLISION MAP /////////
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],      // 0 - nothing
                    [1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1],      // 1 - wall
                    [1,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,2,2,2,2,2,0,0,0,0,2,2,2,2,2,0,1,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

var tile_size = 40; // Each index on the map represents a 64x64 px area


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

            let v = map[i][j];

            switch(v){

                case 1: 
                ctx.fillStyle = "#000000" ;                                 // - Nothing, for 0s
                ctx.fillRect(j*tile_size,i*tile_size,tile_size,tile_size);
                break;

                case 2: 
                ctx.fillStyle = "#000000" ;                                 // - Nothing, for 0s
                ctx.fillRect(j*tile_size,i*tile_size+(tile_size/2),tile_size,tile_size/2);
                break;
            }

        }
    }


    // SHOWS GRIDLINES ///////////////////////////
    /*
    for (var i = 0; i<map.length; i++){             

        ctx.fillStyle = "#ababab" ;                
        ctx.fillRect(0, i*tile_size, 1280, 1);  
    }

    for (var j = 0; j<map[0].length; j++){
             
        ctx.fillRect(j*tile_size,0,1,720);
            
    }*/

}

// Calls game loop
loop();
