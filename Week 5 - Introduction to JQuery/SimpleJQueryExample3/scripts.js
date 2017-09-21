var LastElement = {}
var CurrentElement = {};

function ToggleHighlight()
{
	var current = $(CurrentElement);
	var last = $(LastElement);

	if (last != null)
	{
		var lastText = last.text();
		last.text(current.text());
		if (lastText.length > 0) current.text(lastText);
	}

	current.removeClass("cell");
	current.addClass("highlighted-cell");
	last.removeClass("highlighted-cell");
	last.addClass("cell");
}

$(document).ready(function ()
{
	$(".cell").click(function ()
	{
		CurrentElement = this;
		ToggleHighlight();
		LastElement = this;
	});
});