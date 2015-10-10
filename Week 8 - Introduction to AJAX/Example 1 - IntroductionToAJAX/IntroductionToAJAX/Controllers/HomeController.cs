using IntroductionToAJAX.Mocks;
using IntroductionToAJAX.Models;
using System.Web.Mvc;
using IntroductionToAJAX.Extensions;

namespace IntroductionToAJAX.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            HomeModel model = new HomeModel();
            model.PageTitle = "Intro To AJAX";
            return View(model);
        }

        [HttpGet]
        public JsonResult GetMockResponseNoData()
        {
            return new JsonResult().SerializeObject(MockResponse.NameDataResponse);
        }

        [HttpGet]
        public JsonResult GetResponseBasedOnZIPCode(InputModel model)
        {
            if (model.ZIPCode != null && model.ZIPCode.Length == 5)
            {
                return new JsonResult().SerializeObject(MockResponse.ZipCodeFormatGoodResponse);
            }

            return new JsonResult().SerializeObject(MockResponse.ZipCodeFormatErrorResponse);
        }
    }
}