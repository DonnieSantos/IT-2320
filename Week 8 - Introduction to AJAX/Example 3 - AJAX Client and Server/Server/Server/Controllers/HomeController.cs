using System.Web.Mvc;
using Server.Extensions;
using Server.Models;

namespace Server.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [AllowCrossSiteJson]
        public JsonResult GoodMorning()
        {
            return new JsonResult().SerializeObject(new 
            {
                Message = "Good morning, Donnie."
            });
        }

        [HttpGet]
        [AllowCrossSiteJson]
        public JsonResult TodaysDiet(TodaysDietRequestModel model)
        {
            if (model.MyWeight == 0)
            {
                return new JsonResult().SerializeObject(new
                {
                    Message = "Missing Parameter",
                    ParameterName = "MyWeight",
                    ParameterType = "Integer"
                });
            }

            string message = model.MyWeight < 190 ? "Eat whatever you want." : "No junk food today.";

            return new JsonResult().SerializeObject(new
            {
                Message = message
            });
        }
    }
}