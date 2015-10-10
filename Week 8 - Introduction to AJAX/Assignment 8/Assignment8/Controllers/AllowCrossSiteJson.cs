using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ChipotleCalorieCalculator.Controllers
{
    public class AllowCrossSiteJson : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContext.Current.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            HttpContext.Current.Response.Cache.SetNoStore();

            var headers = Enumerable.ToList(HttpContext.Current.Request.Headers.AllKeys);
            headers.Add("X-HTTP-Method-Override");

            filterContext.RequestContext.HttpContext.Response.AppendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            filterContext.RequestContext.HttpContext.Response.AppendHeader("Access-Control-Allow-Headers", string.Join(", ", headers));

            filterContext.RequestContext.HttpContext.Response.AppendHeader("Access-Control-Allow-Origin", "*");

            base.OnActionExecuting(filterContext);
        }
    }
}