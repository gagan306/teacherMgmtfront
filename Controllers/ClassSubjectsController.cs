using Microsoft.AspNetCore.Mvc;
using teacherMgmtfront.Models;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using teacherMgmtfront.ViewModes;
namespace teacherMgmtfront.Controllers
{
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
        public  async Task <IActionResult> Add([FromBody] ClassDto Class)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data");

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7008/api/ClassApi"); // change this

                var json = JsonSerializer.Serialize(Class);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PostAsync("api/ClassApi", content); // change endpoint as needed

                if (response.IsSuccessStatusCode)
                    return Ok(new { message = "Class added successfully" });

                else
                    return StatusCode((int)response.StatusCode, "Class to add subject");
            }
        }

    }
}