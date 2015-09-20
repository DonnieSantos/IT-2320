window.onload = function()
{
	var cells = document.getElementsByClassName("cell");
	
	for (var i=0; i<cells.length; i++)
	{
		cells[i].onmouseover = function()
		{
			this.rememberBackground = this.style.backgroundColor;
			this.style.backgroundColor = "rgb(255, 255, 0)";
		}
		
		cells[i].onmouseout = function()
		{
			this.style.backgroundColor = this.rememberBackground;
		}
		
		cells[i].onclick = function()
		{
			var purpleColor = "rgb(127, 0, 235)";
			var whiteColor = "rgb(255, 255, 255)";
			
			if (this.rememberBackground == whiteColor || this.rememberBackground == "")
			{
				this.style.backgroundColor = purpleColor;
				this.rememberBackground = purpleColor;
			}
			else
			{
				this.style.backgroundColor = whiteColor;
				this.rememberBackground = whiteColor;
			}
		}
	}
}