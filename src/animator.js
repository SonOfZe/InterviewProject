export default class Animator {

	constructor(sheet, animList){

		this.spritesheet = new Image();
		this.spritesheet.src = sheet;

		this.animationList = animList;
		this.currentAnim = 0;

		this.count = 0;
		this.currentFrame = 0;

	}

	animate(ctx, posX, posY){

		// Draws the current frame of the current animation using the properties from the animation list, cutting the spritesheet image accordingly
		ctx.drawImage  (this.spritesheet,
						this.animationList[this.currentAnim][0] + this.animationList[this.currentAnim][2]*this.currentFrame, 
						this.animationList[this.currentAnim][1],

						this.animationList[this.currentAnim][2], 
						this.animationList[this.currentAnim][3],

						posX,posY,
						this.animationList[this.currentAnim][2], this.animationList[this.currentAnim][3]);

		this.updateFrame();
	}

	updateFrame(){

		this.count ++; // counts the iterations

		// Checks if enough iterations have passed, then adds+1 to current frame, if its on the last frame, sets back to first
		if (this.count >= this.animationList[this.currentAnim][4]){

			this.count = 0;
			this.currentFrame = (this.currentFrame == this.animationList[this.currentAnim][5]-1) ? 0 : this.currentFrame+1;
		}
	}

	setAnimation(x){
		this.currentAnim = x;
	}


}