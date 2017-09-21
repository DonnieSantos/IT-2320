$(document).ready(function ()
{
	$(".cell1").click(function ()
	{
		var currentClass = $(this).attr("class");

		var nextClass;

		if (currentClass == "cell1") nextClass = "cell2";
		else if (currentClass == "cell2") nextClass = "cell3";
		else nextClass = "cell1";

		$(this).attr("class", nextClass);
	});
});