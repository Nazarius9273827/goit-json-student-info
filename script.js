document.getElementById('student-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const student = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        age: parseInt(formData.get('age')),
        course: parseInt(formData.get('course')),
        faculty: formData.get('faculty'),
        subjects: formData.get('subjects').split(',').map(s => s.trim()),
    };

    const response = await fetch('/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
    });

    if (response.ok) {
        loadStudents();
        event.target.reset();
    } else {
        alert('Помилка при додаванні студента');
    }
});

async function loadStudents() {
    const response = await fetch('/students');
    const students = await response.json();
    const tbody = document.querySelector('#students-table tbody');
    tbody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>${student.faculty}</td>
            <td>${student.subjects.join(', ')}</td>
            <td>
                <button onclick="deleteStudent(${index})">Видалити</button>
                <button onclick="editStudent(${index})">Редагувати</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function deleteStudent(index) {
    const response = await fetch(`/students/${index}`, { method: 'DELETE' });
    if (response.ok) loadStudents();
}

loadStudents();