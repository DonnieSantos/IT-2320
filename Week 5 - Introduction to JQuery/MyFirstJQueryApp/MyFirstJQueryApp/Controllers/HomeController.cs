using MyFirstJQueryApp.Models;
using System.Web.Mvc;

namespace MyFirstJQueryApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            HomeModel model = new HomeModel();
            model.Title = "My First JQuery App";
            return View(model);
        }
    }
}