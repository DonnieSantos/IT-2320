using System.Web.Mvc;
using IntroductionToAngular.Extensions;
using System.Collections.Generic;

namespace IntroductionToAngular.Controllers
{
    public class HomeController : Controller
    {
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        public ActionResult Index()
        {
            return View();
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        [HttpGet]
        public JsonResult GetBattingOrder()
        {
            return new JsonResult().SerializeObject(new
            {
                BattingOrder = new[] {
                    new { FirstName = "Kenny" , LastName = "Lofton" },
                    new { FirstName = "Omar" , LastName = "Vizquel" },
                    new { FirstName = "Carlos" , LastName = "Baerga" },
                    new { FirstName = "Albert" , LastName = "Belle" },
                    new { FirstName = "Eddie" , LastName = "Murray" },
                    new { FirstName = "Jim" , LastName = "Thome" },
                    new { FirstName = "Manny" , LastName = "Ramirez" },
                    new { FirstName = "Paul" , LastName = "Sorrento" },
                    new { FirstName = "Sandy" , LastName = "Alomar" }
                }
            });
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}