MDraw = function(pProp){
	this.canvas = pProp.canvas;
	this.ct = this.canvas.getContext("2d");
	this.canvasWidth = pProp.canvasWidth;
	this.canvasHeight = pProp.canvasHeight;
}

MDraw.prototype.init = function(pObj){
	this.colorArray = pObj.colorArray;
	this.colorIndex = 0;

	this.ballArray = this.createBallArray(1,this.canvasWidth/2,this.canvasHeight/2,0);
	for(var i=0;i<28;i++){
		this.ballArray = this.ballArray.concat( this.createBallArray(i*7,this.canvasWidth/2,this.canvasHeight/2,i*8) );
	}
}	

//=================== drawing ===================
MDraw.prototype.paint = function(){
	this.ct.fillStyle = "#000000";
	this.ct.fillRect(0,0,this.canvasWidth,this.canvasHeight);

	var tObj;
	for(var i=0;i<this.ballArray.length;i++){
		tObj = this.ballArray[i];
		this.drawBall(tObj.x, tObj.y, 2, tObj.color);
	}
}

MDraw.prototype.drawBall = function(pX,pY,pR,pColor){
	this.ct.beginPath();
	this.ct.arc(pX,pY,pR,0,2*Math.PI);
	this.ct.fillStyle=pColor;
	this.ct.fill();	
}

//=================== ballArray ===================
MDraw.prototype.createBallArray = function(pCount, pX, pY, pR){
	var tAngle = 0;
	var tGap = 360/pCount;
	var resultArray = [];

	for(var i=0;i<pCount;i++){
		var tObj = {};
		tObj.x = pX + Math.cos( this.getRadian(tAngle) )*pR;
		tObj.y = pY + Math.sin( this.getRadian(tAngle) )*pR;
		tObj.color = this.colorArray[this.colorIndex];
		tAngle += tGap;
		this.colorIndex += 1;
		if(this.colorIndex>=this.colorArray.length) this.colorIndex = 0;
		resultArray.push(tObj);
	}
	return resultArray;
}

MDraw.prototype.checkBallArray = function(){
	if(this.ballArray.length<=0){
		return -1;
	}
}

MDraw.prototype.deleteBallArray = function(pCount){
	if(this.ballArray.length>pCount){
		for(var i=0;i<pCount;i++){
			var tIndex = this.getRandom(this.ballArray.length);
			this.ballArray.splice(tIndex,1);
		}
		console.log(this.ballArray.length);
	} else {
		this.ballArray = [];
	}
}

//=================== util ===================
MDraw.prototype.getRadian = function(pAngle){
	return pAngle * Math.PI / 180;
}

MDraw.prototype.getRandom = function(pCount){
	return Math.floor(Math.random()*pCount);
}