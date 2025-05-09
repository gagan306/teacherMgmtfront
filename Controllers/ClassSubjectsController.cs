using Microsoft.AspNetCore.Mvc;
using teacherMgmtfront.ViewModels; 

namespace teacherMgmtfront.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
   
    public class ClassPageController : Controller
    {
        public IActionResult ManageClass() => View();
        public IActionResult ManageSubjects() => View();
    }

    public class ClassSubjectsController : ControllerBase
    {
        [HttpPost]
        public IActionResult AddClass([FromBody] ClassDto newClass)
        {
            // You now have access to ClassDto from the ViewModels folder  
            return Ok(new { message = "Class saved successfully", classData = newClass });
        }
    }
}
