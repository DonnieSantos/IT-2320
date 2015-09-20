var Home = {};

Home.Title = "";
Home.AnimationStatus = "left";

Home.WireClickEvent = function ()
{
    $(".click-me").click(function ()
    {
        var greenBox = $(this);
        greenBox.AlertText = "Div Became JQuery Object";
        alert(greenBox.AlertText);
    });
}

Home.WireDragEvent = function ()
{
    $(".drag-me").draggable();
}

Home.WireHideEvent = function ()
{
    $(".hide-me").click(function ()
    {
        $(this).hide();
    });
}

Home.WireFadeEvent = function ()
{
    $(".fade-me").click(function ()
    {
        $(this).fadeOut(800);
    });
}

Home.WireAnimateEvent = function ()
{
    $(".animate-me").click(function ()
    {
        if (Home.AnimationStatus == "left")
        {
            $(this).animate( { left: '310px', height: '+=80px', width: '+=80px' }, 800);
            Home.AnimationStatus = "right";
        }
        else
        {
            $(this).animate({ left: '10px', height: '-=80px', width: '-=80px' }, 800);
            Home.AnimationStatus = "left";
        }
    });
}

Home.WireChainEvent = function ()
{
    $(".chain-me").click(function ()
    {
        $(this).css("background-color", "red").slideUp(800).slideDown(800, function ()
        {
            $(this).css("background-color", "yellow");
        });
    });
}

Home.WireHoverEvent = function ()
{
    $("h2").hover(
        function ()
        {
            $(this).css("color", "red");
        },
        function ()
        {
            $(this).css("color", "black");
        }
    );
}

Home.WireTextEvent = function ()
{
    $("h2").mousedown(function ()
    {
        $(this).text("Ouch!");
    });
    $("h2").mouseup(function ()
    {
        $(this).html(Home.Title);
    });
}

$(document).ready(function ()
{
    Home.WireClickEvent();
    Home.WireDragEvent();
    Home.WireHideEvent();
    Home.WireFadeEvent();
    Home.WireAnimateEvent();
    Home.WireChainEvent();
    Home.WireHoverEvent();
    Home.WireTextEvent();
});