$(document).ready(function () {
    const times = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM"];
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Fake API call for demonstration (Replace this with actual API call)
    function fetchSchedule(sectionCode) {
        // Example: based on section code, return different schedules
        if (sectionCode === 'CS101') {
            return [
                { day: "Monday", time: "08:00 AM", subject: "CS Basics" },
                { day: "Monday", time: "09:00 AM", subject: "Algorithms" },
                { day: "Wednesday", time: "10:00 AM", subject: "Data Structures" },
                { day: "Friday", time: "12:00 PM", subject: "Networking" }
            ];
        } else if (sectionCode === 'MATH202') {
            return [
                { day: "Tuesday", time: "08:00 AM", subject: "Calculus I" },
                { day: "Thursday", time: "10:00 AM", subject: "Linear Algebra" }
            ];
        } else if (sectionCode === 'ENG301') {
            return [
                { day: "Monday", time: "11:00 AM", subject: "Literature" },
                { day: "Wednesday", time: "09:00 AM", subject: "Composition" }
            ];
        }
        return [];  // No schedule if no section is selected
    }

    // Function to build the table dynamically
    function buildScheduleTable(schedule) {
        // Clear the existing table
        $('#scheduleTable thead th:not(:first)').remove();
        $('#scheduleTable tbody').empty();

        // Build header
        times.forEach(time => {
            $('#scheduleTable thead tr').append(`<th class="bg-white text-secondary">${time}</th>`);
        });

        // Build body (weekdays)
        weekdays.forEach(day => {
            let row = `<tr><th class="text-start text-secondary fw-semibold">${day}</th>`;
            times.forEach(time => {
                row += `<td data-day="${day}" data-time="${time}" class="p-3"></td>`;
            });
            row += `</tr>`;
            $('#scheduleTable tbody').append(row);
        });

        // Populate periods
        schedule.forEach(entry => {
            const cell = $(`td[data-day="${entry.day}"][data-time="${entry.time}"]`);
            if (cell.length) {
                let colorClass = entry.subject.toLowerCase().includes('break')
                    ? 'bg-warning-subtle text-warning-emphasis'
                    : 'bg-success-subtle text-success-emphasis';

                cell.html(`<div class="${colorClass} fw-semibold rounded py-2 px-2 my-1">${entry.subject}</div>`);
            }
        });
    }

    // Fetch schedule when the section is selected
    $('#sectionSelect').on('change', function () {
        const sectionCode = $(this).val();
        if (sectionCode) {
            const schedule = fetchSchedule(sectionCode);
            buildScheduleTable(schedule);
        } else {
            $('#scheduleTable tbody').empty();  // Clear table if no section is selected
        }
    });

    // Initialize empty schedule (no section selected initially)
    buildScheduleTable([]);
});
