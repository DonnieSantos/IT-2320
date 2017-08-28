function cyclePiece(piece)
{
    if (piece.className == "piece-empty") piece.className = "piece-x";
    else if (piece.className == "piece-x") piece.className = "piece-o";
    else piece.className = "piece-empty";
}

window.onload = function()
{
    var cells = document.getElementsByClassName("piece-empty");

    for (var i=0; i<cells.length; i++)
    {
        cells[i].onmouseover = function() { this.style.border = "2px solid lime"; }
        cells[i].onmouseout = function() { this.style.border = "2px solid black"; }
        cells[i].onclick = function() { cyclePiece(this); }
    }
}