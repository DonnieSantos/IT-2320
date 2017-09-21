$(document).ready(function ()
{
	$(".cell").click(function ()
	{
		if ($(this).attr("class") == "cell")
		{
			$(this).addClass("highlight");
			$(this).removeClass("cell");
		}
		else
		{
			$(this).addClass("cell");
			$(this).removeClass("highlight");
		}
	});
});