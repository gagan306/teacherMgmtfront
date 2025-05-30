﻿$(document).ready(function () {
    const times = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM"];
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Dummy Data for Sections
    const sections = ["CS101", "MATH202", "ENG301", "BIO103"];

    // Dummy Data for Schedules (for each section)
    const schedules = {
        "CS101": [
            { "day": "Monday", "time": "08:00 AM", "subject": "CS Basics", "teacher": "Dr. John Doe" },
            { "day": "Monday", "time": "09:00 AM", "subject": "Algorithms", "teacher": "Prof. Jane Smith" },
            { "day": "Monday", "time": "12:00 PM", "subject": "Lunch Break", "teacher": "" },
            { "day": "Tuesday", "time": "08:00 AM", "subject": "Networking", "teacher": "Mr. Alan Turing" }
        ],
        "MATH202": [
            { "day": "Tuesday", "time": "08:00 AM", "subject": "Calculus I", "teacher": "Prof. Eva White" },
            { "day": "Wednesday", "time": "10:00 AM", "subject": "Linear Algebra", "teacher": "Dr. Richard Black" }
        ]
    };

    // Function to fetch available sections from the dummy data
    function fetchSections() {
        const sectionSelect = $('#sectionSelect');
        // Populate the sections dropdown dynamically
        sections.forEach(function (section) {
            sectionSelect.append(`<option value="${section}">${section}</option>`);
        });
    }

    // Function to fetch schedule data for the selected section from the dummy data
    function fetchSchedule(sectionCode) {
        return schedules[sectionCode] || [];
    }

    // Function to build the schedule table dynamically
    function buildScheduleTable(schedule) {
        // Clear existing table
        $('#scheduleTable thead th:not(:first)').remove();
        $('#scheduleTable tbody').empty();

        // Build header (Time slots)
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

                const subjectHtml = `
                    <div class="${colorClass} fw-semibold rounded py-2 px-2 my-1">
                        ${entry.subject}
                        ${entry.teacher ? `<div class="text-muted mt-1" style="font-size: 0.9rem;">${entry.teacher}</div>` : ''}
                    </div>
                `;
                cell.html(subjectHtml);
            }
        });
    }

    // Fetch schedule when section is selected
    $('#sectionSelect').on('change', function () {
        const sectionCode = $(this).val();
        if (sectionCode) {
            const schedule = fetchSchedule(sectionCode);
            buildScheduleTable(schedule);
        } else {
            $('#scheduleTable tbody').empty();  // Clear table if no section is selected
        }
    });

    // Fetch available sections when the page loads
    fetchSections();
    // When section is selected, show selected class code
    $('#sectionSelect').on('change', function () {
        const sectionCode = $(this).val();
        $('#currentSection').text(sectionCode || 'None');

        if (sectionCode) {
            const schedule = fetchSchedule(sectionCode);
            buildScheduleTable(schedule);
        } else {
            $('#scheduleTable tbody').empty();
        }
    });
    $('#printBtn').on('click', printSchedule);
    function printSchedule() {
        const sectionCode = $('#sectionSelect').val();
        if (!sectionCode) {
            alert("Please select a section to print.");
            return;
        }

        const printableWindow = window.open('', '_blank');
        const tableHtml = $('#scheduleTable')[0].outerHTML;
        const styles = `
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h2 { text-align: center; margin-bottom: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
            th { background-color: #f8f9fa; }
            .bg-success-subtle { background-color: #d1e7dd !important; color: #0f5132; }
            .bg-warning-subtle { background-color: #fff3cd !important; color: #664d03; }
        </style>
    `;

        printableWindow.document.write(`
        <html>
        <head>
            <title>Print Schedule - ${sectionCode}</title>
            ${styles}
        </head>
        <body>
            <h2>Schedule for Class: ${sectionCode}</h2>
            ${tableHtml}
        </body>
        </html>
    `);

        printableWindow.document.close();
        printableWindow.focus();
        printableWindow.print();
    }
});
