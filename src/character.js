//import * as stg from '/src/settings.js';
import Collider from '/src/collider.js' ;

var Gravity = 0.5;
var Friction = -0.09;

export default class Character {

    constructor(posX, posY, clr) {

        this.width = 30;
        this.height = 40;

        this.collider = new Collider(this); // Creates the collision handler

        this.color = clr

        this.pos = {        		// Character position
            x: posX,
            y: posY
        };

        this.previousPos = {        // Character previous position, used for checking
            x: posX,				// from which side the character collided
            y: posY					// with the walls
        };

        this.acc = {        // Character acceleration
            x: 0,
            y: 0
        };

        this.vel = {        // Character velocity
            x: 0,
            y: 0
        };

        this.jumping = false;
        this.movingLeft = false;
        this.movingRight = false;

    }

    // function for updating character's data ////////////////////////
    update(dt) {			

        if(!dt) return;

        // Sets previous positions
        this.previousPos.x = this.pos.x;
		this.previousPos.y = this.pos.y;

		// Checks if booleans of movement are active, and move character accordingly
		if(this.movingRight) this.acc.x = 0.8;
		if(this.movingLeft) this.acc.x = -0.8;
		if(!this.movingRight && !this.movingLeft) this.acc.x = 0;

		// Applies external forces to character movement
        this.acc.y = Gravity;
        this.acc.x+= this.vel.x*Friction;

        // Makes the acceleration and velocity calculations
        this.vel.x += this.acc.x;
        this.vel.y += this.acc.y;

        // Updates position
        this.pos.x += this.vel.x / dt*10;
        this.pos.y += this.vel.y / dt*10;

    }


    // Function for drawing the character on screen //////////////////////////
    draw(ctx) {				

    	ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }


    // Function for jumping //////////////////////////
    jump(){

    	if(!this.jumping){
    		this.jumping = true;
    		this.vel.y = -12;
    	}
    }


    // Movement functions //////////////////////
    moveRight(){
    	this.movingRight = true;
    	this.movingLeft = false;
    }
    moveLeft(){
    	this.movingLeft = true;
    	this.movingRight = false;
    }
    stop(){
    	this.movingLeft = false;
    	this.movingRight = false;
    }
    getCollider(){
    	return this.collider;
    }


    // Get side positions ///////////////
    getTop(){
    	return this.pos.y;
    }
    getBottom(){
    	return this.pos.y + this.height;
    }
    getLeft(){
    	return this.pos.x;
    }
    getRight(){
    	return this.pos.x + this.width;
    }


    // Get previous side positions //////////////////
    getPreviousTop(){
    	return this.previousPos.y;
    }
    getPreviousBottom(){
    	return this.previousPos.y + this.height;
    }
    getPreviousLeft(){
    	return this.previousPos.x;
    }
    getPreviousRight(){
    	return this.previousPos.x + this.width;
    }


    // Set positions through sides /////////////////
    setTop(newY){
    	this.pos.y = newY;
    }
    setBottom(newY){
    	this.pos.y = newY - this.height;
    }
    setLeft(newX){
    	this.pos.x = newX;
    }
    setRight(newX){
    	this.pos.x = newX - this.width;
    }


    // Functions for making the character move accordingly with the collision ///////////////////////////
    collidePlatformBottom (tile_bottom) {

    	// Checks if character is intersecting with the wall from below
        if (this.getTop() < tile_bottom && this.getPreviousTop() >= tile_bottom) {

		    this.setTop(tile_bottom);	// Move the top of the object to the bottom of the tile.
		    this.vel.y = 0;     		// Stop moving in that direction.
		    this.acc.y = 0;  
		    return true;               	// Return true because there was a collision.

        } return false;              	// Return false if there was no collision.

      }
	collidePlatformLeft (tile_left) {

		// Checks if character is intersecting with the wall from the left
		if (this.getRight() > tile_left && this.getPreviousRight() <= tile_left) {

			this.setRight(tile_left - 0.01);	// -0.01 is to fix a small problem
		  	this.vel.x = 0;
		  	this.acc.x = 0;
		  	return true;

		} return false;

	}
	collidePlatformRight (tile_right) {

		// Checks if character is intersecting with the wall from the right
		if (this.getLeft() < tile_right && this.getPreviousLeft() >= tile_right) {

			this.setLeft(tile_right);
			this.vel.x = 0;
			this.acc.x = 0;
			return true;

		} return false;

	}
	collidePlatformTop(tile_top) {

		// Checks if character is intersecting with the wall from above
		if (this.getBottom() > tile_top && this.getPreviousBottom() <= tile_top) {

			this.setBottom(tile_top - 0.01);
			this.vel.y = 0;
			this.acc.y = 0;  
			this.jumping = false;
			return true;

		} return false;

	}

}
