using System.Web.Mvc;
using IntroductionToAngular.Extensions;
using System.Xml.Linq;
using System.Xml;
using Newtonsoft.Json;
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
            var data = new List<object>();

            data.Add(new { FirstName = "Kenny", LastName = "Lofton" });
            data.Add(new { FirstName = "Omar", LastName = "Vizquel" });
            data.Add(new { FirstName = "Carlos", LastName = "Baerga" });
            data.Add(new { FirstName = "Albert", LastName = "Belle" });
            data.Add(new { FirstName = "Eddie", LastName = "Murray" });
            data.Add(new { FirstName = "Jim", LastName = "Thome" });
            data.Add(new { FirstName = "Manny", LastName = "Ramirez" });
            data.Add(new { FirstName = "Paul", LastName = "Sorrento" });
            data.Add(new { FirstName = "Sandy", LastName = "Alomar" });

            return new JsonResult().SerializeObject(new
            {
                BattingOrder = data
            });
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}