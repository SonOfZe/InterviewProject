export default class Collider {

    constructor(c) {
 	
 		this.char = c;

    }

    // Function for getting the 4 collision points (corners) of the character /////////////
    getCollisionPoints(colMap, tile_size){

	    var bottom, left, right, top, value;

	    top    = Math.floor(this.char.getTop()  / tile_size);				// Gets the top left corner position
	    left   = Math.floor(this.char.getLeft() / tile_size);				// of the character inside the map array
	    value  = colMap[top][left];											// and uses it to know the value in that index

	    switch(value){
	    	case 0: break;

    		case 1: 
		    	this.checkCollision(left*tile_size , top*tile_size, tile_size);	
		    	break;

	    	case 2: 
		    	this.checkCollision(left*tile_size , top*tile_size+(tile_size/2), tile_size/2);	
		    	break;
		}


	    top    = Math.floor(this.char.getTop()    / tile_size);				// Gets top right
	    right  = Math.floor(this.char.getRight()  / tile_size);
	    value  = colMap[top][right];

	    switch(value){
	    	case 0: break;

    		case 1: 
		    	this.checkCollision(right*tile_size , top*tile_size, tile_size);
		    	break;

	    	case 2: 
		    	this.checkCollision(right*tile_size , top*tile_size+(tile_size/2), tile_size/2);
		    	break;	
		}


	    bottom = Math.floor(this.char.getBottom() / tile_size);				// Gets bottom left
	    left   = Math.floor(this.char.getLeft()   / tile_size);
	    value  = colMap[bottom][left];
	    
	    switch(value){
	    	case 0: break;

    		case 1: 
		    	this.checkCollision(left*tile_size , bottom*tile_size, tile_size);
		    	break;

	    	case 2: 
		    	this.checkCollision(left*tile_size , bottom*tile_size+(tile_size/2), tile_size/2);
		    	break;	
		}
	    
	    
	    bottom = Math.floor(this.char.getBottom() / tile_size);				// Gets bottom right
	    right  = Math.floor(this.char.getRight()  / tile_size);  
	    value  = colMap[bottom][right];
	    
	    switch(value){
	    	case 0: break;

    		case 1: 
		    	this.checkCollision(right*tile_size , bottom*tile_size, tile_size);
		    	break;

	    	case 2: 
		    	this.checkCollision(right*tile_size , bottom*tile_size+(tile_size/2), tile_size/2);	
		    	break;
		}

	}

	// Checks the type of collision
 	checkCollision(tileX, tileY, tile_size){

        if(this.char.collidePlatformTop(tileY)) return;
        if (this.char.collidePlatformLeft(tileX, tileY)) return;
        if (this.char.collidePlatformRight(tileX + tile_size, tileY)) return;
        this.char.collidePlatformBottom(tileY + tile_size);

	}

}