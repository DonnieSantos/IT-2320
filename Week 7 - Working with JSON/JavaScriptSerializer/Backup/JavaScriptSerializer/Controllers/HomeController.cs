using JavaScriptSerializer.Models;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace JavaScriptSerializer.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View(Model);
            //return ConvertModelToJson(Model);
        }

        private JsonResult ConvertModelToJson(HomeModel model)
        {
            var result = new JsonResult()
            {
                Data = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(model)
            };

            result.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            return result;
        }

        private HomeModel Model
        {
            get
            {
                var alana = new Person { Name = "Alana Santos", Age = 41 };
                var donnie = new Person { Name = "Donnie Santos", Age = 36 };
                var michael = new Person { Name = "Michael Santos", Age = 28 };

                var marsha = new Person
                {
                    Name = "Marsha Santos",
                    Age = 67,
                    Children = new List<Person>() { alana, donnie, michael }
                };

                var mark = new Person { Name = "Mark Strnad", Age = 52 };
                var lee = new Person { Name = "Lee Strnad", Age = 48 };
                var lynn = new Person { Name = "Lynn Strnad", Age = 44 };

                var gail = new Person
                {
                    Name = "Gail Strnad",
                    Age = 71,
                    Children = new List<Person>() { mark, lee, lynn }
                };

                return new HomeModel
                {
                    People = new List<Person> {marsha, gail},
                    RawData = "{\"People\":[{\"Name\":\"Marsha Santos\",\"Age\":67,\"Children\":[{\"Name\":\"Alana Santos\",\"Age\":41,\"Children\":null},{\"Name\":\"Donnie Santos\",\"Age\":36,\"Children\":null},{\"Name\":\"Michael Santos\",\"Age\":28,\"Children\":null}]},{\"Name\":\"Gail Strnad\",\"Age\":71,\"Children\":[{\"Name\":\"Mark Strnad\",\"Age\":52,\"Children\":null},{\"Name\":\"Lee Strnad\",\"Age\":48,\"Children\":null},{\"Name\":\"Lynn Strnad\",\"Age\":44,\"Children\":null}]}]}"
                };
            }
        }
    }
}