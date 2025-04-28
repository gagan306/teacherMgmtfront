using Microsoft.AspNetCore.Mvc;

namespace teacherMgmtfront.Controllers
{
    public class ClassSubjectsController : Controller
    {
        public IActionResult ManageClass()
        {
            return View();
        }
    }
}
