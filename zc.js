var view = {
	setTheCrosses: function (location) {
		var crosses = document.getElementById(location);
		crosses.setAttribute("class", "crosses");
	},

	setTheZeros: function (location) {
		var zeros = document.getElementById(location);
		zeros.setAttribute("class", "zeros");
	},

	setLineOnAcross: function (i) {
		var table = document.getElementById("border");
		var img = document.createElement("img");
		img.src = "stickSkyLine.png";
		img.setAttribute("class", "line");
		var element = table.appendChild(img);
		var temp = getComputedStyle(element);
		var top = parseInt(temp.top);
		var borderTable = 8;
		if (i === 1) {
			element.style.top = 272 + "px";
		} else if (i === 2) {
			element.style.top = 209 + "px";
		} else {
			table.appendChild(img);
		}		
		
	},

	setLineOnDown: function (j) {
		var table = document.getElementById("border");
		var img = document.createElement("img");
		img.src = "stickVert.png";
		img.setAttribute("class", "line");
		if (j === 0) {
			table.appendChild(img).style.top = "74px";
			table.appendChild(img).style.left = "368px";
		} else if (j === 1) {
			table.appendChild(img).style.top = "74px";
			table.appendChild(img).style.left = "510px";
		} else {
			table.appendChild(img).style.top = "74px";
			table.appendChild(img).style.left = "652px";
		}

		},

	setLineOnSecondaryDiagonal: function () {
		var table = document.getElementById("border");
		var img = document.createElement("img");
		img.src = "diagRight.png";
		img.setAttribute("class", "line");
		table.appendChild(img).style.top = "74px";
	},


	setLineOnMainDiagonal: function () {
		var table = document.getElementById("border");
		var img = document.createElement("img");
		img.src = "diagLeft.png";
		img.setAttribute("class", "line");
		table.appendChild(img).style.top = "74px";
	}


};



function start(event) {
	
	controler.run(event.target.id);
   
};


var model = {
	field: [["", "", ""],
			["", "", ""],
			["", "", ""]],

	filledCell: 0,

	isEmptyCell: function (i, j) {
		return this.field[i][j] === "";
	},

	setSign: function (i, j, sign) {
		this.field[i][j] = sign;
		this.filledCell++;
	},

	isOnMainDiagonal: function (i, j) {
		return i===j;
	},

	isOnSecondaryDiagonal: function (i, j) {
		return i === this.field.length - 1 - j;
	},

	isGameOverOnMainDiagonal: function (sign) {
		for (var i = 0; i < this.field.length; i++) {
			 if (this.field[i][i] !== sign) {
			 	return false;
			 }
		}
		return true;
	},

	isGameOverOnSecondaryDiagonal: function (sign) {
		for (var i = 0; i < this.field.length; i++) {
			if (this.field[i][this.field.length - 1 - i] !== sign) {
				return false;
			}
		}
		return true;
	},

	isGameOverOnAcross: function (i, sign) {
		for (var j = 0; j < this.field.length; j++) {
			if (this.field[i][j] !== sign) {
				return false;
			}
		}
		return true;
	},

	isGameOverOnDown: function (j, sign) {
		for (var i = 0; i < this.field.length; i++) {
			if (this.field[i][j] !==sign) {
				return false;
			}
		}
		return true;
	},

	isGameOverFilledCells: function () {
		return this.filledCell === this.field.length * this.field.length;
	}

};

var controler = {
	sign: "x",
	isGameOver: false,
	run: function (location) {
		if(this.isGameOver){
			return;
		}

		var i = Number(location[0]);
		var j = Number(location[1]);

		if (model.isEmptyCell(i, j)){
			model.setSign(i, j, this.sign);
			if (this.sign === "x") {
				view.setTheCrosses(location)
			} else {
				view.setTheZeros(location);
			}
		} else { return; }

	if (model.isOnMainDiagonal(i, j)) {
		if (model.isGameOverOnMainDiagonal(this.sign)) {
			view.setLineOnMainDiagonal();
			this.isGameOver = true;
			return;
		} 
	}

	if (model.isOnSecondaryDiagonal(i, j)) {
		if (model.isGameOverOnSecondaryDiagonal(this.sign)) {
			view.setLineOnSecondaryDiagonal();
			this.isGameOver = true;
			return;
		}
	}


	if (model.isGameOverOnAcross(i, this.sign)) {
			view.setLineOnAcross(i);
			this.isGameOver = true;
			return;
		}


		if (model.isGameOverOnDown(j, this.sign)) {
			view.setLineOnDown(j);
			return;
		}


		if (model.isGameOverFilledCells()) {
			alert("Game over on filled the celles");
			this.isGameOver = true;
		}


		this.sign = (this.sign === "x")?"o":"x";


	}
};



