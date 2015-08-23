////////////////////////////////////////////////////////////////////
// The following demonstrates JavaScript as a "Dynamic Language". //
// That means you can add properties that are not pre-defined.    //
////////////////////////////////////////////////////////////////////

var dynamicObject = {};
dynamicObject.Name = "SomeName";
dynamicObject.Data = "SomeData";
dynamicObject.ThankYouText = "Thank You!";

//////////////////////////////////////////////////////////////////
// The following demonstrates a "First Class Function".         //
// That means you can store a function as a reference variable. //
//////////////////////////////////////////////////////////////////

var alertUpdateDataFunction = function(page, input, message)
{
	message.innerHTML = dynamicObject.ThankYouText;
	page.removeChild(input);
};

function TextInputChanged(input)
{
	var page = document.getElementsByClassName("about-me")[0];
	var message = document.getElementsByClassName("footer")[0];
	alertUpdateDataFunction(page, input, message);
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

function ToggleFloImageHighlight()
{
	var floImages = document.getElementsByClassName("flo-image");
	var floImagesHighlight = document.getElementsByClassName("flo-image-highlight");
	var floCaptions = document.getElementsByClassName("flo-caption");

	var toggleStatus;

	if (floImages.length > 0)
	{
		toggleStatus = "ON";
		floImages[0].className = "flo-image-highlight";
	}
	else if (floImagesHighlight.length > 0)
	{
		toggleStatus = "OFF";
		floImagesHighlight[0].className = "flo-image";
	}

	floCaptions[0].innerHTML = "I just toggled the Flo Image Higlight to: " + toggleStatus;
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

function MouseOverListItem(li)
{
	li.className = "list-item-highlight";
}

function MouseOutListItem(li)
{
	li.className = "";
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////