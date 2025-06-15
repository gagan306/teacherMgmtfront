// Subjects.js
$(document).ready(function () {
    loadSubjects();

    $('#subjectForm').on('submit', function (e) {
        e.preventDefault();

        const subjectData = {
            subjectCode: $('#subjectCode').val(),
            subjectName: $('#subjectName').val(),
            creditHours: $('#creditHours').val(),
            department: $('#department').val(),
            batch: $('#batch').val(),
            classType: $('#classType').val(),
            faculty: $('#faculty').val(),
            hasSubSubjects: $('#hasSubSubjects').is(':checked'),
            subSubjectCount: parseInt($('#subSubjectCount').val()) || 0
        };

        $.ajax({
            url: '/Subject/Add',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(subjectData),
            success: function () {
                alert("Subject added successfully!");
                $('#subjectForm')[0].reset();
                loadSubjects();
            },
            error: function (err) {
                console.error(err);
                alert("Failed to add subject.");
            }
        });
    });
});

function loadSubjects() {
    $.ajax({
        url: '/Subject/List',
        type: 'GET',
        success: function (subjects) {
            const tbody = $('#subjectsTable tbody');
            tbody.empty();
            subjects.forEach(subj => {
                const row = `
                    <tr>
                        <td>${subj.subjectCode}</td>
                        <td>${subj.subjectName}</td>
                        <td>${subj.creditHours}</td>
                        <td>${subj.department}</td>
                        <td>${subj.classType}</td>
                        <td>${subj.faculty}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary" onclick="editSubject('${subj.subjectId}')">Edit</button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteSubject('${subj.subjectId}')">Delete</button>
                        </td>
                    </tr>`;
                tbody.append(row);
            });
        },
        error: function () {
            alert("Failed to load subjects.");
        }
    });
}

function deleteSubject(id) {
    if (!confirm("Are you sure you want to delete this subject?")) return;

    $.ajax({
        url: `/Subject/Delete/${id}`,
        type: 'DELETE',
        success: function () {
            alert("Subject deleted.");
            loadSubjects();
        },
        error: function () {
            alert("Failed to delete subject.");
        }
    });
}

function editSubject(id) {
    $.ajax({
        url: `/Subject/Get/${id}`,
        type: 'GET',
        success: function (subj) {
            $('#subjectCode').val(subj.subjectCode);
            $('#subjectName').val(subj.subjectName);
            $('#creditHours').val(subj.creditHours);
            $('#department').val(subj.department);
            $('#batch').val(subj.batch);
            $('#classType').val(subj.classType);
            $('#faculty').val(subj.faculty);
            $('#hasSubSubjects').prop('checked', subj.hasSubSubjects);
            $('#subSubjectCount').val(subj.subSubjectCount);
        },
        error: function () {
            alert("Failed to fetch subject.");
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
        const currentYear = new Date().getFullYear();
        const batchSelect = document.getElementById("Batch");

        // Clear existing options
        batchSelect.innerHTML = "";

        // Generate next 6 years including current year
        for (let year = currentYear; year <= currentYear + 5; year++) {
            const option = document.createElement("option");
            option.value = year;
            option.textContent = year;
            batchSelect.appendChild(option);
        }
    });