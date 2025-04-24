using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using teacherMgmtfront.Models;

public class CalendarController : Controller
{
    [HttpGet]
    public IActionResult GetEvents(string tz)
    {
        var tzInfo = TimeZoneInfo.FindSystemTimeZoneById(tz);
        var events = new List<EventDto>
    {
        new EventDto
        {
            Start = TimeZoneInfo.ConvertTime(DateTime.Today.AddHours(10), tzInfo),
            End = TimeZoneInfo.ConvertTime(DateTime.Today.AddHours(12), tzInfo),
            Title = "Morning Meeting"
        },
        new EventDto
        {
            Start = TimeZoneInfo.ConvertTime(DateTime.Today.AddDays(2).AddHours(14), tzInfo),
            End = TimeZoneInfo.ConvertTime(DateTime.Today.AddDays(2).AddHours(15), tzInfo),
            Title = "Team Review"
        }
    };

        return Json(events); // ✅ Works in ASP.NET Core
    }

}
