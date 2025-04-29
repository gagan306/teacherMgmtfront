let classIdCounter = 2; // Start after dummy data

function saveClass() {
    const className = document.getElementById('className').value;
    const faculty = document.getElementById('faculty').value;
    const shift = document.getElementById('shift').value;
    const duration = document.getElementById('duration').value;
    const breakDuration = document.getElementById('breakDuration').value;

    if (!className || !faculty || !shift || !duration || !breakDuration) {
        alert("Please fill all fields");
        return;
    }

    const newRow = `
            <tr data-id="${classIdCounter}">
                <td>${className}</td>
                <td>${faculty}</td>
                <td>${shift}</td>
                <td>${duration}</td>
                <td>${breakDuration}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editClass(${classIdCounter})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteClass(${classIdCounter})">Delete</button>
                </td>
            </tr>`;

    document.getElementById("classTableBody").insertAdjacentHTML('beforeend', newRow);

    // Simulate sending data
    fetch('/Class/Save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ className, faculty, shift, duration, breakDuration })
    });

    classIdCounter++;

    // Clear inputs
    document.getElementById('className').value = '';
    document.getElementById('faculty').value = '';
    document.getElementById('shift').value = '';
    document.getElementById('duration').value = '';
    document.getElementById('breakDuration').value = '';
}

function editClass(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    const cells = row.querySelectorAll('td');

    document.getElementById('className').value = cells[0].innerText;
    document.getElementById('faculty').value = cells[1].innerText;
    document.getElementById('shift').value = cells[2].innerText;
    document.getElementById('duration').value = cells[3].innerText;
    document.getElementById('breakDuration').value = cells[4].innerText;

    row.remove(); // Replace with new on save

    // Could optionally call backend: fetch('/Class/Update', ...)
}

function deleteClass(id) {
    document.querySelector(`tr[data-id="${id}"]`).remove();

    fetch(`/Class/Delete/${id}`, {
        method: 'DELETE'
    });
}