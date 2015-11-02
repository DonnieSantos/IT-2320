var Main = {};

Main.Canvas = document.getElementById('myCanvas');
Main.Context = Main.Canvas.getContext('2d');
Main.CheckmarkImage = new Image();
Main.CheckmarkImage.src = "Checkmark.png";

Main.Box = function(x, y, w, h)
{
	this.X = x;
	this.Y = y;
	this.Width = w;
	this.Height = h;

	this.DrawAsImage = function(image)
	{
		Main.Context.drawImage(image, this.X, this.Y, this.Width, this.Height);
	}
}

Main.Boxes = [
	new Main.Box(10, 10, 75, 75),
	new Main.Box(150, 100, 150, 150),
	new Main.Box(300, 300, 250, 250)
];

Main.Animate = function()
{
	Main.Context.clearRect(0, 0, Main.Canvas.width, Main.Canvas.height);

	for (var i=0; i<Main.Boxes.length; i++)
	{
		Main.Boxes[i].DrawAsImage(Main.CheckmarkImage);
	}

	requestAnimFrame(function() { Main.Animate(); });
}

window.requestAnimFrame = (function(callback)
{
	return window.requestAnimationFrame
	|| window.webkitRequestAnimationFrame
	|| window.mozRequestAnimationFrame
	|| window.oRequestAnimationFrame
	|| window.msRequestAnimationFrame
	|| function(callback) { window.setTimeout(callback, 1000 / 60); };
})();

$(document).ready(function()
{
	Main.Animate();
});