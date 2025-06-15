$(document).ready(function () {
    loadSubjects();

    const currentYear = new Date().getFullYear();
    const batchSelect = $('#batch');
    for (let year = currentYear; year <= currentYear + 5; year++) {
        batchSelect.append(`<option value="${year}">${year}</option>`);
    }

    $('#hasSubYes').change(() => $('#subSubjectCountDiv').show());
    $('#hasSubNo').change(() => {
        $('#subSubjectCountDiv').hide();
        $('#subSubjectCount').val('');
    });

    $('#subjectForm').on('submit', function (e) {
        e.preventDefault();

        const subjectData = {
            SubjectCode: $("#subjectCode").val(),
            SubjectName: $("#subjectName").val(),
            CreditHours: $("#creditHours").val(),
            Department: $("#department").val(),
            Batch: $("#batch").val(),
            ClassType: $("#classType").val(),
            Faculty: $("#faculty").val(),
            HasSubSubjects: $("#hasSubSubjects").is(":checked"),
            SubSubjectCount: parseInt($("#subSubjectCount").val()) || 0
        };

        console.log("Sending data:", subjectData);

        $.ajax({
            url: "/Subject/Add",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(subjectData),
            success: function (res) {
                console.log("Success:", res);
                alert("Subject added successfully");
            },
            error: function (xhr) {
                console.error("Error:", xhr);
                alert("Failed to add subject. Check console for details.");
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
                tbody.append(`
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
                    </tr>`);
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

            if (subj.hasSubSubjects) {
                $('#hasSubYes').prop('checked', true).trigger('change');
                $('#subSubjectCount').val(subj.subSubjectCount);
            } else {
                $('#hasSubNo').prop('checked', true).trigger('change');
                $('#subSubjectCount').val('');
            }
        },
        error: function () {
            alert("Failed to fetch subject.");
        }
    });
}
