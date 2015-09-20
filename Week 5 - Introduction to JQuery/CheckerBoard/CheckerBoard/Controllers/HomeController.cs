using CheckerBoard.Models;
using System.Web.Mvc;

namespace CheckerBoard.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View(new HomeModel
            {
                PageTitle = "CheckerBoard"
            });
        }
    }
}