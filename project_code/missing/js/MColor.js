MColor = function(pObj){
	this.canvas = pObj.canvas;
	this.context = this.canvas.getContext("2d");
	this.imageWidth = pObj.imageWidth;
	this.imageHeight = pObj.imageHeight;
}

//=================== image ===================
MColor.prototype.loadImage = function(pFile){
	var self = this;

	this.colorImage = new Image();
	this.colorImage.onload = function(){
		self.loadColor();
		self.colorLoaded();
	}
	this.colorImage.src = pFile;
}

//=================== color ===================
MColor.prototype.loadColor = function(){
	this.context.drawImage(this.colorImage,0,0);
	this.imageData = this.context.getImageData(0,0,this.imageWidth,this.imageHeight).data;
}

MColor.prototype.getRandomColor = function(pCount){
	var resultArray = [];
	var tRange = this.imageWidth * this.imageHeight;
	var tNum;
	var tIndex;
	var tHex;
	for(var i=0;i<pCount;i++){
		tNum = this.getRandom(tRange);
		tIndex = tNum*4;
		tHex = "#" + ("000000" + this.getHex(this.imageData[tIndex + 0], this.imageData[tIndex + 1], this.imageData[tIndex + 2])).slice(-6);
		resultArray.push(tHex);
	}
	return resultArray;
}

//=================== util ===================
MColor.prototype.getRandom = function(pNum){
	return Math.floor(Math.random()*pNum);
}

MColor.prototype.getHex = function(r, g, b){
	return ((r << 16) | (g << 8) | b).toString(16);
}