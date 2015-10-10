var Client = {};

Client.BaseURL = "http://localhost:54403";

Client.CallGoodMorningMethod = function ()
{
    $.ajax
    ({
        url: Client.BaseURL + "/Home/GoodMorning",
        success: function (result) { alert(result); }
    });
}

Client.CallTodaysDietMethod = function ()
{
    $.ajax
    ({
        url: Client.BaseURL + "/Home/TodaysDiet",
        data: { MyWeight : $(".my-weight").val() },
        success: function (result) { alert(result); }
    });
}

$(document).ready(function ()
{
    $(".good-morning").click(Client.CallGoodMorningMethod);
    $(".todays-diet").click(Client.CallTodaysDietMethod);
});