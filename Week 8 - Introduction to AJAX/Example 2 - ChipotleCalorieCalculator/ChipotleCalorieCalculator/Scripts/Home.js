function ProcessResponse(response)
{
    $(".results").empty();
    $(".results-total").empty();

    for (var i = 0; i < response.OrderDetails.length; i++)
    {
        $(".results").append(response.OrderDetails[i].Name + ", ");
        $(".results").append(response.OrderDetails[i].Calories + ".");
        $(".results").append("<br/>");
    }

    $(".results-total").append("Total Calories, " + response.TotalCalories + ".");
}

function CreateRequest()
{
    return {
        "url": "http://localhost:61872/Home/GetOrderDetails",
        "success": function (response) { ProcessResponse(JSON.parse(response)); },
        "data": {
            "Chicken": $(".chicken").children("input").is(':checked'),
            "Carnitas": $(".carnitas").children("input").is(':checked'),
            "Steak": $(".steak").children("input").is(':checked'),
            "Barbacoa": $(".barbacoa").children("input").is(':checked')
        }
    }
}

$(document).ready(function () {
    $("input").click(function () {
        $.ajax(CreateRequest());
    });
});