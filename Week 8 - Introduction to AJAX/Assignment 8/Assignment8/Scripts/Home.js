$(document).ready(function () {

    var textbox = $(".player-number-textbox-input");
    var button = $(".player-number-button");
    var output = $(".output");

    button.click(function () {
        $.ajax({
            url: "Home/GetPlayerInformation",
            data: { PlayerNumber: textbox.val() },
            success: function (stringResponse) {
                response = JSON.parse(stringResponse);
                output.html(response.PlayerName);
            }
        });
    });
});