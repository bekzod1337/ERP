const accessToken = localStorage.getItem('accsessToken');
const refreshToken = localStorage.getItem('refreshToken');
if (!accessToken || !refreshToken) {
    window.location.href = 'http://127.0.0.1:5501/frontend/login/html/login.html';
}



// Tanlangan qiymatga qarab sahifaga o'tish
document.getElementById('action-select').addEventListener('change', function() {
    const selectedValue = this.value;

    if (selectedValue === 'add') {
        window.location.href = "http://127.0.0.1:5501/frontend/admin/html/add.html";
    } else if (selectedValue === 'update') {
        window.location.href = "http://127.0.0.1:5501/frontend/admin/html/update.html";
    } else if (selectedValue === 'delete') {
        window.location.href = "http://127.0.0.1:5501/frontend/admin/html/delete.html";
    }

    // Tanlangan qiymatni 'default' ga qaytarish
    this.value = 'default';
});


// Common fetch function with authorization
function fetchWithAuth(url) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });
}

// Get all users
function getAllUsers() {
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('users').addEventListener('click', function () {
            fetchWithAuth('http://localhost:4000/user')
                .then(response => handleFetchResponse(response))
                .then(data => renderUserData(data))
                .catch(error => console.error('Ma’lumotlarni olishda xato:', error));
        });
    });
}

// Get all students
function getAllStudents() {
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('students').addEventListener('click', function () {
            fetchWithAuth('http://localhost:4000/user/students')
                .then(response => handleFetchResponse(response))
                .then(data => renderUserData(data))
                .catch(error => console.error('Ma’lumotlarni olishda xato:', error));
        });
    });
}

// Get all teachers
function getAllTeachers() {
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('teachers').addEventListener('click', function () {
            fetchWithAuth('http://localhost:4000/user/teachers')
                .then(response => handleFetchResponse(response))
                .then(data => renderUserData(data))
                .catch(error => console.error('Ma’lumotlarni olishda xato:', error));
        });
    });
}

// Get all admins
function getAllAdmins() {
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('admins').addEventListener('click', function () {
            fetchWithAuth('http://localhost:4000/user/admins')
                .then(response => handleFetchResponse(response))
                .then(data => renderUserData(data))
                .catch(error => console.error('Ma’lumotlarni olishda xato:', error));
        });
    });
}

// Get search results
function getInSearch() {
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('search-btn').addEventListener('click', function () {
            const searchValue = document.getElementById('search-input').value;
            const url = `http://localhost:4000/user/${encodeURIComponent(searchValue)}`;
            fetchWithAuth(url)
                .then(response => handleFetchResponse(response))
                .then(data => renderUserData(data))
                .catch(error => console.error("Ma'lumotlarni olishda xato:", error));
        });
    });
}

// Get all rooms
function getAllRoom() {
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('rooms').addEventListener('click', function () {
            fetchWithAuth('http://localhost:4000/room')
                .then(response => handleFetchResponse(response))
                .then(data => renderRoomData(data))
                .catch(error => console.error('Ma’lumotlarni olishda xato:', error));
        });
    });
}

// Get all courses
function getAllCourse() {
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('courses').addEventListener('click', function () {
            fetchWithAuth('http://localhost:4000/course')
                .then(response => handleFetchResponse(response))
                .then(data => renderCourseData(data))
                .catch(error => console.error('Ma’lumotlarni olishda xato:', error));
        });
    });
}

// Handle fetch response
function handleFetchResponse(response) {
    if (!response.ok) {
        return response.text().then(text => {
            throw new Error(`Network response was not ok: ${text}`);
        });
    }
    return response.json();
}


// Render user data
function renderUserData(data) {
    let output = '<table><thead><tr><th>Id</th><th>Ism</th><th>Familiya</th><th>Lavozimi</th><th>Parol</th><th>Yaratilgan sana</th></tr></thead><tbody>';
    data.forEach(user => {
        const formattedDate = new Date(user.created_at).toLocaleString();
        output += `<tr>
            <td>${user.id}</td>
            <td>${user.first_name}</td>
            <td>${user.second_name}</td>
            <td>${user.role || 'N/A'}</td>
            <td>${user.password}</td>
            <td>${formattedDate}</td>
        </tr>`;
    });
    output += '</tbody></table>';
    document.getElementById('list').innerHTML = output;
}

// Render room data
function renderRoomData(data) {
    let output = '<table><thead><tr><th>Id</th><th>Hona nomi</th></tr></thead><tbody>';
    data.forEach(room => {
        output += `<tr>
            <td>${room.id}</td>
            <td>${room.name}</td>
        </tr>`;
    });
    output += '</tbody></table>';
    document.getElementById('list').innerHTML = output;
}

// Render course data
function renderCourseData(data) {
    let output = `
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Kurs nomi</th>
                    <th>O'qituvchi</th>
                    <th>Ochilgan sana</th>
                    <th>Bo'shlanish vaqti</th>
                    <th>Tugash vaqti</th>
                    <th>Kurs narxi</th>
                    <th>Hona</th>
                </tr>
            </thead>
            <tbody>`;
    
    data.forEach(course => {
        const formattedDate = new Date(course.start_date).toLocaleDateString();
        output += `
            <tr>
                <td>${course.id}</td>
                <td>${course.course_name}</td>
                <td>${course.teacher_first_name} ${course.teacher_second_name}</td>
                <td>${formattedDate}</td>
                <td>${course.start_time}</td>
                <td>${course.end_time}</td>
                <td>${course.price} UZS</td>
                <td>${course.room_name}</td>
            </tr>`;
    });

    output += '</tbody></table>';
    document.getElementById('list').innerHTML = output;
}

// Logout functionality
document.getElementById("exit-to-login").addEventListener("click", function () {
    localStorage.removeItem('accsessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = 'http://127.0.0.1:5501/frontend/login/html/login.html';
});

// Initialize all functions
getAllUsers();
getAllTeachers();
getAllStudents();
getAllAdmins();
getAllCourse();
getInSearch();
getAllRoom();
