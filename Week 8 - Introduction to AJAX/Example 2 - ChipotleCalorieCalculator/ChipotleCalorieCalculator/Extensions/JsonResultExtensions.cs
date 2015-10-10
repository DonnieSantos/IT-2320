using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace ChipotleCalorieCalculator.Extensions
{
    public static class JsonResultExtensions
    {
        public static JsonResult SerializeObject(this JsonResult result, object rawObject)
        {
            result.Data = new JavaScriptSerializer().Serialize(rawObject);
            result.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return result;
        }
    }
}