using System.Web.Mvc;
using ChipotleCalorieCalculator.Models;
using ChipotleCalorieCalculator.Extensions;
using System.Collections.Generic;

namespace ChipotleCalorieCalculator.Controllers
{
    public class HomeController : Controller
    {
        private int TotalCalories { get; set; }

        public ActionResult Index()
        {
            var viewModel = new HomeModel
            {
                Title = "Lab 5"
            };

            return View(viewModel);
        }

        [HttpGet]
        [AllowCrossSiteJson]
        public JsonResult GetOrderDetails(RequestModel model)
        {
            TotalCalories = 0;

            var response = new ResponseModel();
            response.OrderDetails = new List<MenuItem>();

            AddItem(model.Chicken, response.OrderDetails, "Chicken", "180");
            AddItem(model.Carnitas, response.OrderDetails, "Carnitas", "220");
            AddItem(model.Steak, response.OrderDetails, "Steak", "190");
            AddItem(model.Barbacoa, response.OrderDetails, "Barbacoa", "165");

            response.TotalCalories = this.TotalCalories;

            return new JsonResult().SerializeObject(response);
        }

        private void AddItem(string item, List<MenuItem> list, string name, string calories)
        {
            if (item != null && item.Equals("true"))
            {
                list.Add(new MenuItem { Name = name, Calories = calories} );
                this.TotalCalories += int.Parse(calories);
            }
        }
    }
}