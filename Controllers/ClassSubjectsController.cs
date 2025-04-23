using Microsoft.AspNetCore.Mvc;

namespace teacherMgmtfront.Controllers
{
    public class ClassSubjectsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
