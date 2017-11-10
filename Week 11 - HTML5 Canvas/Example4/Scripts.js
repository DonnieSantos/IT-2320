var Main = {};

Main.Canvas = document.getElementById('myCanvas');
Main.Context = Main.Canvas.getContext('2d');
Main.StandardColor = "#999999";
Main.HighlightColor = "#FF0000";
Main.MousePressed = false;
Main.MX = 0;
Main.MY = 0;
Main.MXOffset = 0;
Main.BoxWidth = 150;
Main.BoxHeight = 150;
Main.CarouselY = 90;
Main.CarouselX = 100;
Main.CarouselSpacing = 50;
Main.CarouselVelocity = 0;
Main.CarouselInertiaDirection = "Right";
Main.VelocityToPixelTranslation = 20;
Main.VelocityDegradation = 1;
Main.Box1X = Main.CarouselX;
Main.Box2X = Main.CarouselX + Main.BoxWidth + Main.CarouselSpacing;
Main.Box3X = Main.CarouselX + (Main.BoxWidth*2) + (Main.CarouselSpacing*2);
Main.XCoordinateHistory = new Array();
Main.XCoordinateHistorySampleSize = 10;

Main.Box = function(x, y, w, h)
{
	this.X = x;
	this.Y = y;
	this.Width = w;
	this.Height = h;

	this.IsSelected = function()
	{
		if (!Main.MousePressed) return false;
		var withinXAxisCoordinates = Main.MX > this.X && Main.MX < (this.X + this.Width);
		var withinYAxisCoordinates = Main.MY > this.Y && Main.MY < (this.Y + this.Height);
		return withinXAxisCoordinates && withinYAxisCoordinates;
	}
}

Main.Boxes = [
	new Main.Box(Main.Box1X, Main.CarouselY, Main.BoxWidth, Main.BoxHeight),
	new Main.Box(Main.Box2X, Main.CarouselY, Main.BoxWidth, Main.BoxHeight),
	new Main.Box(Main.Box3X, Main.CarouselY, Main.BoxWidth, Main.BoxHeight)
];

Main.Canvas.onmousemove = function(event)
{
	if (event.offsetX)
	{
		mouseX = event.offsetX;
		mouseY = event.offsetY;
	}
	else if (event.layerX)
	{
		mouseX = event.layerX;
		mouseY = event.layerY;
	}

	Main.MX = mouseX;
	Main.MY = mouseY;
}

Main.ComputeVelocityAndInertia = function()
{
	var oldestXCoord = Main.XCoordinateHistory[0];
	var mostRecentXCoord = Main.XCoordinateHistory[Main.XCoordinateHistorySampleSize-1]
	Main.CarouselVelocity = Math.abs(oldestXCoord - mostRecentXCoord);
	Main.CarouselInertiaDirection = (oldestXCoord < mostRecentXCoord) ? "Right" : "Left";
}

Main.MouseUp = function(mouseEvent)
{
	Main.MousePressed = false;
	Main.ComputeVelocityAndInertia();
	Main.XCoordinateHistory = new Array();
}

Main.MouseDown = function(mouseEvent)
{
	if (Main.MouseWithinAnyBox())
	{
		Main.MousePressed = true;
		Main.MXOffset = Main.MX - Main.Boxes[0].X;
	}
}

Main.UpdateBoxes = function()
{
	if (Main.MousePressed)
	{
		Main.Boxes[0].X = Main.MX - Main.MXOffset;
		Main.Boxes[1].X = Main.MX + Main.BoxWidth + Main.CarouselSpacing - Main.MXOffset;
		Main.Boxes[2].X = Main.MX + (Main.BoxWidth*2) + (Main.CarouselSpacing*2) - Main.MXOffset;
	}
}

Main.AdjustBoxesDueToInertia = function(pixels)
{
	var adjustment = Main.CarouselVelocity / Main.VelocityToPixelTranslation;
	var translationInPixels = (Main.CarouselInertiaDirection == "Right") ? adjustment : -adjustment;

	Main.Boxes[0].X += translationInPixels;
	Main.Boxes[1].X += translationInPixels;
	Main.Boxes[2].X += translationInPixels;

	Main.CarouselVelocity -= 1;
}

Main.DrawBoxes = function()
{
	if (Main.CarouselVelocity > 0 && Main.MousePressed == false)
	{
		Main.AdjustBoxesDueToInertia();
	}

	for (var i=0; i<Main.Boxes.length; i++)
	{
		var box = Main.Boxes[i];
		Main.Context.fillStyle = Main.MouseWithinBox(box) ? Main.HighlightColor : Main.StandardColor;
		Main.Context.fillRect(box.X, box.Y, box.Width, box.Height);
	}
}

Main.MouseWithinBox = function(box)
{
	var withinBoxHorizontally = Main.MX >= box.X && Main.MX <= (box.X + box.Width);
	var withinBoxVertically = Main.MY >= box.Y && Main.MY <= (box.Y + box.Height);
	return withinBoxVertically && withinBoxHorizontally;
}

Main.MouseWithinAnyBox = function()
{
	for (var i=0; i<Main.Boxes.length; i++)
	{
		var box = Main.Boxes[i];
		if (Main.MouseWithinBox(box)) return true;
	}

	return false;
}

Main.RememberMouseHistory = function()
{
	if (Main.MousePressed)
	{
		Main.XCoordinateHistory.push(Main.MX);

		while (Main.XCoordinateHistory.length > Main.XCoordinateHistorySampleSize)
		{
			Main.XCoordinateHistory.shift();
		}
	}
}

Main.DrawText = function()
{
	Main.Context.fillStyle = (Main.MouseWithinAnyBox()) ? Main.HighlightColor : Main.StandardColor;
	Main.Context.font = "30px Arial";
	Main.Context.fillText("X: " + Main.MX + "  y: " + Main.MY, 50, 50);
	Main.Context.fillText("Velocity: " +  Main.CarouselVelocity, 350, 50);
	Main.Context.fillText("Direction: " + Main.CarouselInertiaDirection, 650, 50);
	Main.Context.fillStyle = Main.StandardColor;
}

Main.Animate = function()
{
	Main.Context.clearRect(0, 0, Main.Canvas.width, Main.Canvas.height);
	Main.RememberMouseHistory();
	Main.UpdateBoxes()
	Main.DrawBoxes();
	Main.DrawText();
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
	Main.Canvas.addEventListener('mouseup', function(mouseEvent) { Main.MouseUp(mouseEvent); });
	Main.Canvas.addEventListener('mousedown', function(mouseEvent) { Main.MouseDown(mouseEvent); });
});