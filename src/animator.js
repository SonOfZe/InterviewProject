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

		this.count ++;



		if (this.count >= this.animationList[this.currentAnim][4]){

			this.count = 0;
			this.currentFrame = (this.currentFrame == this.animationList[this.currentAnim][5]-1) ? 0 : this.currentFrame+1;
		}

	}

	setAnimation(x){
		this.currentAnim = x;
	}


}