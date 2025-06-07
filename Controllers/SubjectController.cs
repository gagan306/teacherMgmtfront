using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using teacherMgmtfront.Models; // adjust based on your folder structure

namespace teacherMgmtfront.Controllers
{
    public class SubjectController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Subject subject)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data");

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7008/api/SubjectsApi"); // change this

                var json = JsonSerializer.Serialize(subject);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.PostAsync("api/subjects", content); // change endpoint as needed

                if (response.IsSuccessStatusCode)
                    return Ok(new { message = "Subject added successfully" });
                
                else
                    return StatusCode((int)response.StatusCode, "Failed to add subject");
            }
        }
    }
}
