
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

function displayTeam(team)
{
	alert(team.city);
	alert(team.name);
	alert(team.roster[0].firstName);
	alert(team.roster[0].lastName);
	alert(team.roster[0].number);

	for (var i=0; i<team.roster.length; i++)
	{
		var player = team.roster[i];
		alert("#" + player.number + " " + player.firstName + " " + player.lastName + ".");
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

function createTeamAsObject()
{
	var team = new Object();
	team.city = "Cleveland";
	team.name = "Cavaliers";

	var lebron = new Object();
	lebron.firstName = "Lebron";
	lebron.lastName = "James";
	lebron.number = 23;

	var kyrie = new Object();
	kyrie.firstName = "Kyrie";
	kyrie.lastName = "Irving";
	kyrie.number = 2;

	var love = new Object();
	love.firstName = "Kevin";
	love.lastName = "Love";
	love.number = 0;

	team.roster = new Array(lebron, kyrie, love);

	return team;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

function createTeamAsJSON()
{
	return {

		"city" : "Cleveland",
		"name" : "Cavaliers",
		"roster" : [

			{
				"firstName" : "Lebron",
				"lastName" : "James",
				"number" : 23
			},

			{
				"firstName" : "Kyrie",
				"lastName" : "Irving",
				"number" : 2
			},

			{
				"firstName" : "Kevin",
				"lastName" : "Love",
				"number" : 0
			}

		]

	};
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function()
{
	$(".button").mouseover(function()
	{
		$(this).css("border", "2px solid lime");
	});

	$(".button").mouseout(function()
	{
		$(this).css("border", "2px solid black");
	});

	$(".button1").click(function()
	{
		var team = createTeamAsObject();
		displayTeam(team);
	});

	$(".button2").click(function()
	{
		var team = createTeamAsJSON();
		displayTeam(team);
	});
});