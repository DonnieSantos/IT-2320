var Home = {}

Home.ProcessModel = function (model)
{
    for (var i = 0; i < model.People.length; i++)
    {
        var person = model.People[i];

        $("#output").append($("<div></div>").text(person.Name).addClass("text"));
        $("#output").append($("<div></div>").text(person.Age).addClass("text"));

        for (var j = 0; j < person.Children.length; j++)
        {
            var child = person.Children[j];

            $("#output").append($("<div></div>").text(child.Name).addClass("text"));
            $("#output").append($("<div></div>").text(child.Age).addClass("text"));
        }
    }
}