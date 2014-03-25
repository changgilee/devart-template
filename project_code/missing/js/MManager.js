MManager = function(pProp){
	this.imageFileArray = pProp.imageFileArray;
	this.imageCanvas = pProp.imageCanvas;
	this.imageWidth = pProp.imageWidth;
	this.imageHeight = pProp.imageHeight;
	this.drawCanvas = pProp.drawCanvas;
	this.drawWidth = pProp.drawWidth;
	this.drawHeight = pProp.drawHeight;
	this.drawLayer = pProp.drawLayer;

	this.init();
}

MManager.prototype.init = function(){
	var self = this;

	this.imageFileIndex = 0;

	// colorObj
	this.colorObj = new MColor({
		canvas : this.imageCanvas,
		imageWidth : this.imageWidth,
		imageHeight : this.imageHeight
	});
	this.colorObj.colorLoaded = function(){
		self.colorArray = this.getRandomColor(100);
		self.setAni(self.colorArray);
		self.startAni();
	}

	// drawObj
	this.drawObj = new MDraw({
		canvas : this.drawCanvas,
		canvasWidth : this.drawWidth,
		canvasHeight : this.drawHeight
	});

	// update canvas position
	this.updateCanvasPos();

	window.onresize = function(){
		self.updateCanvasPos();
	}

	// start scene
	this.loadScene();
}

//=================== canvas ===================
MManager.prototype.updateCanvasPos = function(){
	var windowW = window.innerWidth;
	var windowH = window.innerHeight;
	var tX = Math.floor( (windowW - this.drawWidth)/2 );
	var tY = Math.floor( (windowH - this.drawHeight)/2 );

	this.drawLayer.style.left = tX + "px";
	this.drawLayer.style.top = tY + "px";	
}

//=================== scene ===================
MManager.prototype.loadScene = function(){
	this.colorObj.loadImage(this.imageFileArray[this.imageFileIndex]);	

	this.imageFileIndex += 1;
	if(this.imageFileIndex>this.imageFileArray.length-1) this.imageFileIndex = 0;
}

//=================== animation ===================
MManager.prototype.setAni = function(pColorArray){
	this.drawObj.init({
		colorArray : pColorArray
	});
}

MManager.prototype.startAni = function(){
	var self = this;

	clearInterval(this.threadID);
	this.threadID = setInterval(function(){
		self.drawObj.paint();
	},100);

	clearInterval(this.deleteID);
	this.deleteID = setInterval(function(){
		self.drawObj.deleteBallArray(100);

		if(self.drawObj.checkBallArray()==-1){
			self.drawObj.paint();
			self.stopAni();
		}
	},3000);
}

MManager.prototype.stopAni = function(){
	var self = this;

	clearInterval(this.threadID);
	clearInterval(this.deleteID);

	setTimeout(function(){
		self.loadScene();
	},5000);
}