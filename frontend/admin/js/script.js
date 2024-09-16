getAllUsers();
getAllTeachers();
getAllStudents();
getAllAdmins();
getInSearch();
getAllRoom();

// get all

function getAllUsers(){
    document.addEventListener('DOMContentLoaded', function() {
        // O'quvchilar tugmasiga bosilganda AJAX so'rovini yuborish
        document.getElementById('users').addEventListener('click', function() {
            fetch('http://localhost:4000/user/', {
                method: 'GET',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Ma’lumotlarni qayta ishlash va ko’rsatish
                let output = '<table border="1"><thead><tr><th>Id</th><th>Ism</th><th>Familiya</th><th>lavozimi</th><th>parol</th><th>yaratilgansana</th></tr></thead><tbody>';
                data.forEach(user => {
                    const formattedDate = new Date(user.created_at).toLocaleString();
                    output += `<tr>
                    <td>${user.id}</td>
                    <td>${user.first_name}</td>
                    <td>${user.second_name}</td>
                    <td>${user.role}</td>
                    <td>${user.password}</td>
                    <td>${formattedDate}</td>
                    </tr>`;
                });
                output += '</tbody></table>';
                document.getElementById('list').innerHTML = output;
            })
            .catch(error => console.error('Ma’lumotlarni olishda xato:', error));
        });
    });
}


// get students
function getAllStudents(){
    document.addEventListener('DOMContentLoaded', function() {
        // O'quvchilar tugmasiga bosilganda AJAX so'rovini yuborish
        document.getElementById('students').addEventListener('click', function() {
            fetch('http://localhost:4000/user/students', {
                method: 'GET',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Ma’lumotlarni qayta ishlash va ko’rsatish
                let output = '<table border="1"><thead><tr><th>Id</th><th>Ism</th><th>Familiya</th><th>parol</th><th>yaratilgan sana</th></tr></thead><tbody>';
                data.forEach(user => {
                    const formattedDate = new Date(user.created_at).toLocaleString();
                    output += `<tr>
                    <td>${user.id}</td>
                    <td>${user.first_name}</td>
                    <td>${user.second_name}</td>
                    <td>${user.password}</td>
                    <td>${formattedDate}</td>
                    </tr>`;
                });
                output += '</tbody></table>';
                document.getElementById('list').innerHTML = output;
            })
            .catch(error => console.error('Ma’lumotlarni olishda xato:', error));
        });
    });
}

// get teachers

function getAllTeachers(){
    document.addEventListener('DOMContentLoaded', function() {
        // O'quvchilar tugmasiga bosilganda AJAX so'rovini yuborish
        document.getElementById('teachers').addEventListener('click', function() {
            fetch('http://localhost:4000/user/teachers', {
                method: 'GET',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Ma’lumotlarni qayta ishlash va ko’rsatish
                let output = '<table border="1"><thead><tr><th>Id</th><th>Ism</th><th>Familiya</th><th>parol</th><th>yaratilgan sana</th></tr></thead><tbody>';
                data.forEach(user => {
                    const formattedDate = new Date(user.created_at).toLocaleString();
                    output += `<tr>
                    <td>${user.id}</td>
                    <td>${user.first_name}</td>
                    <td>${user.second_name}</td>
                    <td>${user.password}</td>
                    <td>${formattedDate}</td>
                    </tr>`;
                });
                output += '</tbody></table>';
                document.getElementById('list').innerHTML = output;
            })
            .catch(error => console.error('Ma’lumotlarni olishda xato:', error));
        });
    });
}


// get admins

function getAllAdmins(){
    document.addEventListener('DOMContentLoaded', function() {
        // O'quvchilar tugmasiga bosilganda AJAX so'rovini yuborish
        document.getElementById('admins').addEventListener('click', function() {
            fetch('http://localhost:4000/user/admins', {
                method: 'GET',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Ma’lumotlarni qayta ishlash va ko’rsatish
                let output = '<table border="1"><thead><tr><th>Id</th><th>Ism</th><th>Familiya</th><th>parol</th><th>yaratilgan sana</th></tr></thead><tbody>';
                data.forEach(user => {
                    const formattedDate = new Date(user.created_at).toLocaleString();
                    output += `<tr>
                    <td>${user.id}</td>
                    <td>${user.first_name}</td>
                    <td>${user.second_name}</td>
                    <td>${user.password}</td>
                    <td>${formattedDate}</td>
                    </tr>`;
                });
                output += '</tbody></table>';
                document.getElementById('list').innerHTML = output;
            })
            .catch(error => console.error('Ma’lumotlarni olishda xato:', error));
        });
    });
}


// get in search

function getInSearch(){
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('search-btn').addEventListener('click', function() {
            const searchValue = document.getElementById('search-input').value;
            const url = `http://localhost:4000/user/${encodeURIComponent(searchValue)}`;
            fetch(url, {
                method: 'GET',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {               
                let output = '<table border="1"><thead><tr><th>Id</th><th>Ism</th><th>Familiya</th><th>Lavozimi</th><th>Parol</th><th>Yaratilgan sana</th></tr></thead><tbody>';
                data.forEach(user => {
                    const formattedDate = new Date(user.created_at).toLocaleString();
                    output += `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.first_name}</td>
                            <td>${user.second_name}</td>
                            <td>${user.role}</td>
                            <td>${user.password}</td>
                            <td>${formattedDate}</td>
                        </tr>`;
                });
                output += '</tbody></table>';
    
                document.getElementById('list').innerHTML = output;
            })
            .catch(error => console.error("Ma'lumotlarni olishda xato:", error));
        });
    });
    
}

// get all rooms

function getAllRoom(){
    document.addEventListener('DOMContentLoaded', function() {
        // O'quvchilar tugmasiga bosilganda AJAX so'rovini yuborish
        document.getElementById('rooms').addEventListener('click', function() {
            fetch('http://localhost:4000/room', {
                method: 'GET',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Ma’lumotlarni qayta ishlash va ko’rsatish
                let output = '<table border="1"><thead><tr><th>Id</th><th>Hona nomi</th></tr></thead><tbody>';
                data.forEach(rooms => {
                    output += `<tr>
                    <td>${rooms.id}</td>
                    <td>${rooms.name}</td>
                    </tr>`;
                });
                output += '</tbody></table>';
                document.getElementById('list').innerHTML = output;
            })
            .catch(error => console.error('Ma’lumotlarni olishda xato:', error));
        });
    });
}


// chiqish

const accsessToken = localStorage.getItem('accsessToken')
const refreshToken = localStorage.getItem('refreshToken')
if(!accsessToken || !refreshToken){
    window.location.href = 'http://127.0.0.1:5501/frontend/login/html/login.html'
}

document.getElementById("exit-to-login").addEventListener("click", function(){
    localStorage.removeItem('accsessToken')
    localStorage.removeItem('refreshToken')
    window.location.href = 'http://127.0.0.1:5501/frontend/login/html/login.html'
});