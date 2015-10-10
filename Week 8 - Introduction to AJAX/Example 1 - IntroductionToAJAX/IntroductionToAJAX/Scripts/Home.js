var Home = {}

Home.Button1Click = function ()
{
    $.get("Home/GetMockResponseNoData", function (rawResponseData, status)
    {
        alert(rawResponseData);

        var deserializedData = JSON.parse(rawResponseData);
        var people = deserializedData.Data;

        for (var i = 0; i < people.length; i++)
        {
            alert(people[i].Name);
            alert(people[i].Age);
        }
    });
}

Home.Button2Click = function ()
{
    $.ajax
    ({
        url: "Home/GetResponseBasedOnZIPCode",
        data: { ZIPCode : $(".zip-code").val() },
        success: function (result) { alert(result); }
    });
}

$(document).ready(function ()
{
    $(".button1").click(Home.Button1Click);
    $(".button2").click(Home.Button2Click);
});