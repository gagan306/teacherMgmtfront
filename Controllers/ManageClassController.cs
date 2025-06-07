using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using teacherMgmtfront.ViewModes;  // Confirm correct namespace for ClassDto

public class ManageClassController : Controller
{
    private static readonly HttpClient _httpClient = new HttpClient
    {
        BaseAddress = new Uri("https://localhost:7008") // note trailing slash
    };

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> SaveClass([FromBody] ClassDto classDto)
    {
        if (classDto == null)
            return Json(new { success = false, message = "Class data was null." });

        HttpResponseMessage response;

        try
        {
            if (classDto.ClassId == null || classDto.ClassId == 0)
            {
                // New Class
                response = await _httpClient.PostAsJsonAsync("api/ClassApi/Add", classDto);
            }
            else
            {
                // Update Class
                response = await _httpClient.PutAsJsonAsync($"api/ClassApi/Update/{classDto.ClassId}", classDto);
            }
        }
        catch (Exception ex)
        {
            return Json(new { success = false, message = "API call failed.", details = ex.Message });
        }

        if (response.IsSuccessStatusCode)
            return Json(new { success = true });

        var errorText = await response.Content.ReadAsStringAsync();
        return Json(new { success = false, message = "Failed to save class.", details = errorText });
    }

    [HttpPost]
    public async Task<IActionResult> DeleteClass([FromBody] DeleteRequest data)
    {
        if (data == null || data.Id == 0)
            return Json(new { success = false, message = "Invalid delete request." });

        int id = data.Id;

        HttpResponseMessage response;

        try
        {
            response = await _httpClient.DeleteAsync($"api/ClassApi/Delete/{id}");
        }
        catch (Exception ex)
        {
            return Json(new { success = false, message = "API call failed.", details = ex.Message });
        }

        if (response.IsSuccessStatusCode)
            return Json(new { success = true });

        var errorText = await response.Content.ReadAsStringAsync();
        return Json(new { success = false, message = "Failed to delete class.", details = errorText });
    }


    [HttpGet]
    public async Task<IActionResult> GetAllClasses()
    {
        HttpResponseMessage response;

        try
        {
            response = await _httpClient.GetAsync("api/ClassApi/List");
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Failed to call API: " + ex.Message);
        }

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            return StatusCode((int)response.StatusCode, error);
        }

        var data = await response.Content.ReadFromJsonAsync<List<ClassDto>>();
        return Json(data);
    }
}
