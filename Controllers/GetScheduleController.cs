using Microsoft.AspNetCore.Mvc;

namespace teacherMgmtfront.Controllers
{
    public class GetScheduleController : Controller
    {
        public IActionResult GetSchedule()
        {
            return View();
        }
    }
}
