$(document).ready(function () {
    const departments = ["Computer Science", "Mathematics", "Physics", "Biology"];
    const subjects = [
        {
            subjectCode: "CS101",
            subjectName: "Intro to CS",
            creditHours: "3",
            department: "Computer Science",
            classType: "Lecture"
        },
        {
            subjectCode: "PHY201",
            subjectName: "Thermodynamics",
            creditHours: "2",
            department: "Physics",
            classType: "Lab"
        }
    ];

    // Populate departments dropdown
    departments.forEach(dep => {
        $('#department').append(`<option value="${dep}">${dep}</option>`);
    });

    // Render subjects table
    function renderSubjects() {
        const tbody = $('#subjectsTable tbody');
        tbody.empty();
        subjects.forEach((subj, index) => {
            const row = `
                <tr>
                    <td>${subj.subjectCode}</td>
                    <td>${subj.subjectName}</td>
                    <td>${subj.creditHours}</td>
                    <td>${subj.department}</td>
                    <td>${subj.classType}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-2" onclick="editSubject(${index})">Edit</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteSubject(${index})">Delete</button>
                    </td>
                </tr>`;
            tbody.append(row);
        });
    }

    // Add new subject
    $('#subjectForm').on('submit', function (e) {
        e.preventDefault();
        const newSubject = {
            subjectCode: $('#subjectCode').val(),
            subjectName: $('#subjectName').val(),
            creditHours: $('#creditHours').val(),
            department: $('#department').val(),
            classType: $('#classType').val()
        };
        subjects.push(newSubject);
        this.reset();
        renderSubjects();
    });

    // Expose globally for buttons
    window.editSubject = function (index) {
        const subj = subjects[index];
        $('#subjectCode').val(subj.subjectCode);
        $('#subjectName').val(subj.subjectName);
        $('#creditHours').val(subj.creditHours);
        $('#department').val(subj.department);
        $('#classType').val(subj.classType);
        subjects.splice(index, 1); // remove to prevent duplicate
    };

    window.deleteSubject = function (index) {
        if (confirm("Are you sure you want to delete this subject?")) {
            subjects.splice(index, 1);
            renderSubjects();
        }
    };

    // Initial load
    renderSubjects();
});
