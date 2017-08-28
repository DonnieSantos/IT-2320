using FinalProject.Models;
using System.Web.Mvc;
using FinalProject.Extensions;
using System.Xml.Linq;
using System.Xml;
using Newtonsoft.Json;

namespace FinalProject.Controllers
{
    public class HomeController : Controller
    {
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        public ActionResult Index()
        {
            return View(new HomeViewModel());
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        [HttpGet]
        public JsonResult GetAccountInformation(GetAccountInformationRequestModel model)
        {
            if (!accountExists(model.Username.ToLower()))
            {
                return new JsonResult().SerializeObject(new
                {
                    Error = "Account Not Found"
                });
            }

            string accountInfo = getAccountInfo(model.Username);

            return new JsonResult().SerializeObject(new
            {
                Message = "Success",
                Payload = accountInfo
            });
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        [HttpGet]
        public JsonResult AddOrUpdateElement(AddOrUpdateElementRequestModel model)
        {
            string username = model.Username.ToLower();
            string elementName = model.ElementName;
            string elementValue = model.ElementValue;

            if (elementName.ToLower().Equals("username"))
            {
                return new JsonResult().SerializeObject(new
                {
                    Error = "Cannot Change Username"
                });
            }

            if (!accountExists(username))
            {
                return new JsonResult().SerializeObject(new
                {
                    Error = "Account Not Found"
                });
            }

            if (model.ElementName.Contains(" "))
            {
                return new JsonResult().SerializeObject(new
                {
                    Error = "Cannot Have Spaces In Element Name"
                });
            }

            addOrUpdateAccountElement(username, elementName, elementValue);

            string accountInfo = getAccountInfo(username);

            return new JsonResult().SerializeObject(new
            {
                Message = "Success",
                Payload = accountInfo
            });
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        [HttpGet]
        public JsonResult CreateAccount(CreateAccountRequestModel model)
        {
            bool invalidUsername = false;
            bool invalidPassword = false;
            bool invalidEmailAdd = false;
            bool invalidEmailCon = false;

            string usernameResponse = "Good";
            string passwordResponse = "Good";
            string emailAddResponse = "Good";
            string repeatEmResponse = "Good";

            if (string.IsNullOrEmpty(model.Username) || model.Username.Length < 6)
            {
                usernameResponse = "Invalid";
                invalidUsername = true;
            }
            else if (accountExists(model.Username))
            {
                usernameResponse = "Exists";
                invalidUsername = true;
            }

            if (string.IsNullOrEmpty(model.Password) || model.Password.Length < 6)
            {
                passwordResponse = "Invalid";
                invalidPassword = true;
            }
            
            if (string.IsNullOrEmpty(model.EmailAdd) || !model.EmailAdd.Contains("@"))
            {
                emailAddResponse = "Invalid";
                invalidEmailAdd = true;
            }

            if (string.IsNullOrEmpty(model.EmailCon))
            {
                repeatEmResponse = "Invalid";
                invalidEmailCon = true;
            }
            else if (!model.EmailAdd.Equals(model.EmailCon))
            {
                repeatEmResponse = "Mismatch";
                invalidEmailCon = true;
            }

            if (invalidUsername || invalidPassword || invalidEmailAdd || invalidEmailCon)
            {
                return new JsonResult().SerializeObject(new
                {
                    Message = "Error",
                    Username = usernameResponse,
                    Password = passwordResponse,
                    EmailAdd = emailAddResponse,
                    EmailCon = repeatEmResponse
                });
            }

            createAccount(model.Username, model.Password, model.EmailAdd);

            return new JsonResult().SerializeObject(new
            {
                Message = "Success"
            });
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        [HttpGet]
        public JsonResult Login(LoginRequestModel model)
        {
            if (string.IsNullOrEmpty(model.Username) || !accountExists(model.Username))
            {
                return new JsonResult().SerializeObject(new
                {
                    Message = "Error",
                    Username = "Invalid"
                });
            }

            string passwordOnAccount = getAccountValue(model.Username, "password").ToLower();

            if (!model.Password.ToLower().Equals(passwordOnAccount))
            {
                return new JsonResult().SerializeObject(new
                {
                    Message = "Error",
                    Username = "Found",
                    Password = "Wrong"
                });
            }

            return new JsonResult().SerializeObject(new
            {
                Message = "Success"
            });
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        private string accountPath(string username)
        {
            return ControllerContext.HttpContext.Server.MapPath("~/Accounts/" + username + ".xml");
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        private bool accountExists(string username)
        {
            return System.IO.File.Exists(accountPath(username));
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        private void createAccount(string username, string password, string emailadd)
        {
            username = username.ToLower();
            password = password.ToLower();
            emailadd = emailadd.ToLower();

            new XDocument(
                new XElement("account",
                    new XElement("username", username),
                    new XElement("password", password),
                    new XElement("emailadd", emailadd)
                )
            ).Save(accountPath(username));
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        private string getAccountValue(string username, string element)
        {
            XmlDocument document = new XmlDocument();
            document.Load(accountPath(username.ToLower()));
            var nodeList = document.GetElementsByTagName(element);

            if (nodeList.Count > 0)
            {
                return nodeList[0].InnerXml;
            }

            return string.Empty;
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        private void addOrUpdateAccountElement(string username, string element, string value)
        {
            XmlDocument document = new XmlDocument();
            document.Load(accountPath(username.ToLower()));
            var accountInfo = document.GetElementsByTagName("account")[0];
            
            var existingElement = accountInfo[element];

            if (existingElement != null)
            {
                existingElement.InnerXml = value;
            }
            else
            {
                XmlElement newElement = document.CreateElement(element);
                newElement.InnerXml = value;
                accountInfo.AppendChild(newElement);
            }

            document.Save(accountPath(username));
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        private string getAccountInfo(string username)
        {
            XmlDocument document = new XmlDocument();
            document.Load(accountPath(username.ToLower()));
            string accountInfo = document.GetElementsByTagName("account")[0].OuterXml;
            return convertXMLToJson(accountInfo);
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        private string convertXMLToJson(string XMLString)
        {
            XmlDocument document = new XmlDocument();
            document.LoadXml(XMLString);
            return JsonConvert.SerializeXmlNode(document);
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}