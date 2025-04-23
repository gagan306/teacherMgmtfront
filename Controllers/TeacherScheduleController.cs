using Microsoft.AspNetCore.Mvc;

namespace teacherMgmtfront.Controllers
{
    public class TeacherScheduleController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
