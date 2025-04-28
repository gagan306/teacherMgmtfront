// wwwroot/js/schedule.js

$(document).ready(function () {
    const times = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM"];
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Fake API call
    function fetchSchedule() {
        return [
            { day: "Monday", time: "08:00 AM", subject: "Math" },
            { day: "Monday", time: "09:00 AM", subject: "Physics" },
            { day: "Monday", time: "12:00 PM", subject: "Break" },
            { day: "Tuesday", time: "10:00 AM", subject: "English" },
            { day: "Wednesday", time: "08:00 AM", subject: "Chemistry" },
            { day: "Friday", time: "01:00 PM", subject: "Sports" },
            { day: "Friday", time: "12:00 PM", subject: "Lunch Break" },
        ];
    }

    // Build header
    times.forEach(time => {
        $('#scheduleTable thead tr').append(`<th class="bg-white text-secondary">${time}</th>`);
    });

    // Build body
    weekdays.forEach(day => {
        let row = `<tr><th class="text-start text-secondary fw-semibold">${day}</th>`;
        times.forEach(time => {
            row += `<td data-day="${day}" data-time="${time}" class="p-3"></td>`;
        });
        row += `</tr>`;
        $('#scheduleTable tbody').append(row);
    });

    // Populate periods
    const schedule = fetchSchedule();
    schedule.forEach(entry => {
        const cell = $(`td[data-day="${entry.day}"][data-time="${entry.time}"]`);
        if (cell.length) {
            let colorClass = entry.subject.toLowerCase().includes('break')
                ? 'bg-warning-subtle text-warning-emphasis'
                : 'bg-success-subtle text-success-emphasis';

            cell.html(`<div class="${colorClass} fw-semibold rounded py-2 px-2 my-1">${entry.subject}</div>`);
        }
    });
});
