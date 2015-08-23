var isPainting = false;
function StartPainting() { isPainting = true; }
function StopPainting() { isPainting = false; }

window.onload = function Load()
{
    var grid = document.getElementsByClassName("grid")[0];
    grid.addEventListener("mousedown", StartPainting);
    grid.addEventListener("mouseup", StopPainting);

    for (var i=0; i<100; i++)
    {
        var row = CreateDiv("row");
        grid.appendChild(row);
        
        for (var j=0; j<100; j++)
        {
            var cell = CreateDiv("cell");
            cell.addEventListener("mouseover", ClickedCell);
            row.appendChild(cell);
        }
    }
}

function CreateDiv(className)
{
    var newDiv = document.createElement("div");
    newDiv.className = className;
    return newDiv;
}

function ClickedCell(element)
{
    if (isPainting)
    {
        element.target.className = (element.target.className=="cell") ? "cell active" : "cell";
    }
}