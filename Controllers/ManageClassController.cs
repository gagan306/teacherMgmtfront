using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using teacherMgmtfront.ViewModes;

public class ManageClassController : Controller
{
    private readonly HttpClient _httpClient;

    public ManageClassController()
    {
        _httpClient = new HttpClient
        {
            BaseAddress = new Uri("https://localhost:7008") // API base URL
        };
    }

    public ActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public async Task<ActionResult> SaveClass([FromBody] ClassDto classDto)
    {
        if (classDto == null)
            return Json(new { success = false, message = "Class data was null." });

        HttpResponseMessage response;

        if (classDto.ClassId == null || classDto.ClassId == 0)
        {
            // NEW CLASS - no ID sent
            var payload = new
            {
                classDto.ClassName,
                classDto.Faculty,
                classDto.Shift,
                classDto.Duration,
                classDto.BreakDuration,
                classDto.Batch,
                classDto.TimeFrom,
                classDto.TimeTo
            };

            response = await _httpClient.PostAsJsonAsync("api/ClassApi/Add", payload);
        }
        else
        {
            // UPDATE CLASS - ID included
            response = await _httpClient.PutAsJsonAsync($"api/ClassApi/Update/{classDto.ClassId}", classDto);
        }

        if (response.IsSuccessStatusCode)
            return Json(new { success = true });

        string errorText = await response.Content.ReadAsStringAsync();
        return Json(new { success = false, message = "Failed to save class.", details = errorText });
    }

    [HttpPost]
    public async Task<ActionResult> DeleteClass([FromBody] dynamic data)
    {
        int id = data.id;
        var response = await _httpClient.DeleteAsync($"api/ClassApi/Delete/{id}");

        if (response.IsSuccessStatusCode)
            return Json(new { success = true });

        string errorText = await response.Content.ReadAsStringAsync();
        return Json(new { success = false, message = "Failed to delete class.", details = errorText });
    }
    [HttpGet]
    public async Task<IActionResult> GetAllClasses()
    {
        var response = await _httpClient.GetAsync("api/ClassApi/List");

        if (!response.IsSuccessStatusCode)
        {
            string err = await response.Content.ReadAsStringAsync();
            return StatusCode((int)response.StatusCode, err);
        }

        var data = await response.Content.ReadFromJsonAsync<List<ClassDto>>();
        return Json(data);
    }

}
