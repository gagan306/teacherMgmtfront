using Microsoft.AspNetCore.Mvc;
using teacherMgmtfront.ViewModes;

namespace teacherMgmtfront.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClassSubjectsController : Controller
    {
        public IActionResult ManageClass()
        {
            return View();
        }
        public IActionResult ManageSubjects()
        {
            return View();
        }
        [HttpPost]
        public IActionResult AddClass([FromBody] ClassDto newClass)
        {
            // You now have access to ClassDto from the ViewModels folder
            return Ok(new { message = "Class saved successfully", classData = newClass });
        }
    }
}
