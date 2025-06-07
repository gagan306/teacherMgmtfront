let editingClassId = null;

document.getElementById("classForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const isEdit = editingClassId !== null;

    // Prepare data
    const classData = {
        ClassName: document.getElementById("className").value.trim(),
        Faculty: document.getElementById("faculty").value.trim(),
        Shift: document.getElementById("shift").value,
        Duration: parseInt(document.getElementById("duration").value),
        BreakDuration: parseInt(document.getElementById("breakDuration").value),
        Batch: document.getElementById("batch").value.trim(),
        TimeFrom: document.getElementById("timeFrom").value,
        TimeTo: document.getElementById("timeTo").value
    };

    if (isEdit) {
        classData.ClassId = editingClassId;
    }

    fetch("/ManageClass/SaveClass", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(classData)
    })
        .then(async res => {
            const contentType = res.headers.get("content-type");
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Server error: ${res.status} - ${text}`);
            }
            if (contentType && contentType.includes("application/json")) {
                return res.json();
            } else {
                throw new Error("Response is not JSON.");
            }
        })
        .then(data => {
            if (data.success) {
                alert(isEdit ? "Class updated successfully." : "Class added successfully.");
                location.reload();
            } else {
                alert("Error: " + (data.message || "Failed to save class."));
            }
        })
        .catch(err => {
            console.error("Error:", err);
            alert("An unexpected error occurred.");
        });

    editingClassId = null;
});

function editClass(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    const cells = row.querySelectorAll("td");

    document.getElementById("className").value = cells[0].innerText;
    document.getElementById("faculty").value = cells[1].innerText;
    document.getElementById("shift").value = cells[2].innerText;
    document.getElementById("duration").value = cells[3].innerText;
    document.getElementById("breakDuration").value = cells[4].innerText;
    document.getElementById("batch").value = cells[5].innerText;
    document.getElementById("timeFrom").value = cells[6].innerText;
    document.getElementById("timeTo").value = cells[7].innerText;

    editingClassId = id;
}

function deleteClass(id) {
    if (!confirm("Are you sure you want to delete this class?")) return;

    fetch("/ManageClass/DeleteClass", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: id })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Class deleted successfully.");
                location.reload();
            } else {
                alert("Failed to delete class.");
            }
        })
        .catch(err => {
            console.error("Error during deletion:", err);
            alert("An unexpected error occurred.");
        });
}
document.addEventListener("DOMContentLoaded", function () {
    loadClassData();
});

function loadClassData() {
    fetch("/ManageClass/GetAllClasses")
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch class data");
            return res.json();
        })
        .then(data => {
            const tbody = document.getElementById("classTableBody");
            tbody.innerHTML = ""; // clear table

            if (!data || data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="9" class="text-center">No classes found.</td></tr>`;
                return;
            }

            data.forEach(cls => {
                const tr = document.createElement("tr");
                tr.setAttribute("data-id", cls.classId);

                tr.innerHTML = `
                    <td>${cls.className || ""}</td>
                    <td>${cls.faculty || ""}</td>
                    <td>${cls.shift || ""}</td>
                    <td>${cls.duration || ""}</td>
                    <td>${cls.breakDuration || ""}</td>
                    <td>${cls.batch || ""}</td>
                    <td>${cls.timeFrom || ""}</td>
                    <td>${cls.timeTo || ""}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editClass(${cls.classId})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteClass(${cls.classId})">Delete</button>
                    </td>
                `;

                tbody.appendChild(tr);
            });
        })
        .catch(err => {
            console.error("Error loading class list:", err);
        });
}
