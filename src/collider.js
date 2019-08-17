export default class Collider {

    constructor(c) {
 	
 		this.char = c;

    }

    getCollisionPoints(colMap, tile_size){

	    // COLLISION
	    var bottom, left, right, top, value;

	    /* First we test the top left corner of the object. We get the row and column
	    he occupies in the collision map, then we get the value from the collision map
	    at that row and column. In this case the row is top and the column is left. Then
	    we hand the information to the collider's collide function. */
	    top    = Math.floor(this.char.getTop()  / tile_size);
	    left   = Math.floor(this.char.getLeft() / tile_size);
	    value  = colMap[top][left];

	    this.checkCollision(value, left*tile_size , top*tile_size, tile_size);

	    /* We must redifine top since the last collision check because the object may
	    have moved since the last collision check. Also, the reason I check the top corners
	    first is because if the object is moved down while checking the top, he will be
	    moved back up when checking the bottom, and it is better to look like he is standing
	    on the ground than being pushed down through the ground by the cieling. */
	    top    = Math.floor(this.char.getTop()    / tile_size);
	    right  = Math.floor(this.char.getRight()  / tile_size);
	    value  = colMap[top][right];
	    
	    this.checkCollision(value, right*tile_size , top*tile_size, tile_size);


	    bottom = Math.floor(this.char.getBottom() / tile_size);
	    left   = Math.floor(this.char.getLeft()   / tile_size);
	    value  = colMap[bottom][left];
	    
	    this.checkCollision(value, left*tile_size , bottom*tile_size, tile_size);


	    bottom = Math.floor(this.char.getBottom() / tile_size);
	    right  = Math.floor(this.char.getRight()  / tile_size);  
	    value  = colMap[bottom][right];
	    
	    this.checkCollision(value, right*tile_size , bottom*tile_size, tile_size);

	}

 	checkCollision(value, tileX, tileY, tile_size){
    
	    if (value == 1){

	        if(this.char.collidePlatformTop(tileY)) return;
	        if (this.char.collidePlatformLeft(tileX)) return;
	        if (this.char.collidePlatformRight(tileX + tile_size)) return;
	        this.char.collidePlatformBottom(tileY + tile_size);
	    }

	}

}