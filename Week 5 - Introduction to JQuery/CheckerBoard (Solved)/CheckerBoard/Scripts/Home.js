var isHoldingPiece = false;
var pieceInHand = {};

PickUpPiece = function (element) {

    // Highlight selected element.
    $(element).css("border", "1px solid red");

    // Update stateful variables.
    pieceInHand = element;
    isHoldingPiece = true;
}

DropPieceInHandOnElement = function (targetElement) {

    // Move the old piece to the new location.
    targetElement.className = pieceInHand.className;

    // Clear out the old location.
    $(pieceInHand).css("border", "1px solid black");
    pieceInHand.className = "cell";

    // Update stateful variables.
    isHoldingPiece = false;
    pieceInHand = {};
}

$(document).ready(function ()
{
    var cells = $(".cell");
    var colorCount = 0;

    for (var i = 0; i < cells.length; i++) {
        var cell = $(cells[i]);
        var isDark = colorCount % 2 == 0;
        var isNextRow = (i + 1) % 8 == 0;
        colorCount += isNextRow ? 2 : 1;
        cell.css("background-color", isDark ? "navy" : "white");
    }

    $(".cell").click(function () {

        if (!isHoldingPiece) {
            if ($(this).hasClass("piece")) {
                PickUpPiece(this)
            }
        }
        else {
            DropPieceInHandOnElement(this)
        }
        
    });

});