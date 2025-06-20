﻿using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using teacherMgmtfront.Models;

namespace teacherMgmtfront.Controllers
{
    public class SubjectController : Controller
    {
        private readonly HttpClient _httpClient;

        public SubjectController()
        {
            _httpClient = new HttpClient { BaseAddress = new Uri("https://localhost:7008/") }; // Update port if needed
        }

        public IActionResult Index() => View();

        [HttpPost]
       
        public async Task<IActionResult> Add([FromBody] Subject subjectData)
        {
            if (subjectData == null)
                return BadRequest("Subject data is null.");

            var json = JsonSerializer.Serialize(subjectData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("api/SubjectsApi/Add", content);
            var responseContent = await response.Content.ReadAsStringAsync();

            return Content(responseContent, "application/json");
        }


        [HttpDelete("Subject/Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _httpClient.DeleteAsync($"api/SubjectsApi/Delete/{id}");
            return StatusCode((int)response.StatusCode);
        }

        [HttpGet("Subject/Get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var response = await _httpClient.GetAsync($"api/SubjectsApi/{id}");
            var content = await response.Content.ReadAsStringAsync();
            return Content(content, "application/json");
        }
        [HttpPut("Subject/Update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Subject subjectData)
        {
            if (subjectData == null)
                return BadRequest("Subject data is null.");

            var json = JsonSerializer.Serialize(subjectData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PutAsync($"api/SubjectsApi/Update/{id}", content);
            var responseContent = await response.Content.ReadAsStringAsync();

            return Content(responseContent, "application/json");
        }


        [HttpGet("Subject/List")]
        public async Task<IActionResult> List()
        {
            var response = await _httpClient.GetAsync("api/SubjectsApi/List");
            var content = await response.Content.ReadAsStringAsync();
            return Content(content, "application/json");
        }
    }
}
