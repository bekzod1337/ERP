// Check for access and refresh tokens in local storage
const accessToken = localStorage.getItem('accsessToken');
const refreshToken = localStorage.getItem('refreshToken');
if (!accessToken || !refreshToken) {
    window.location.href = 'http://127.0.0.1:5501/frontend/login/html/login.html';
}

// kurs qo'shish
document.addEventListener('DOMContentLoaded', async function() {
    // Fetch teachers
    fetch('http://localhost:4000/user/teachers', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Serverdan javob olishda xato: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        const teacherSelect = document.getElementById('teacher-id');
        data.forEach(teacher => {
            const option = document.createElement('option');
            option.value = teacher.id; 
            option.textContent = `${teacher.first_name} ${teacher.second_name}`; 
            teacherSelect.appendChild(option);
        });
    })
    .catch(error => console.error('O\'qituvchilarni olishda xato:', error));

    // Fetch rooms 
    fetch('http://localhost:4000/room', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Serverdan javob olishda xato: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        const roomSelect = document.getElementById('room-id');
        data.forEach(room => {
            const option = document.createElement('option');
            option.value = room.id; 
            option.textContent = room.name;
            roomSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Honalarning olishda xato:', error));

    // Handle form submission
    document.getElementById('course-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const courseName = document.getElementById('course-name').value;
        const teacherId = document.getElementById('teacher-id').value;
        const startedDate = document.getElementById('started-date').value;
        const startTime = document.getElementById('start-time').value;
        const endTime = document.getElementById('end-time').value;
        const price = parseFloat(document.getElementById('price').value);
        const roomId = document.getElementById('room-id').value;

        const payload = {
            name: courseName,
            teacher_id: teacherId,
            start_date: startedDate,
            start_time: startTime,
            end_time: endTime,
            price: price,
            room_id: roomId
        };

        // kurs ochish uchun so'rov yuborish
        fetch('http://localhost:4000/course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(message => {
            alert(message);
            document.getElementById('course-form').reset();
        })
        .catch(error => console.error('Ma’lumotlarni olishda xato:', error));
    });
});

// Function to handle form submission
async function handleFormSubmit(event) {
    event.preventDefault(); 

    const form = event.target; 
    const formData = new FormData(form); 
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    let url;
    switch (form.id) {
        case 'user-form':
            url = 'http://localhost:4000/user';
            break;
        case 'course-form':
            url = 'http://localhost:4000/course';
            break;
        case 'room-form':
            url = 'http://localhost:4000/room';
            break;
        default:
            alert("No valid form selected.");
            return;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(data) 
        });

        const responseText = await response.text();


        if (response.ok) {
            alert("Ma'lumot muvaffaqiyatli qo'shildi!"); 
            console.log("Response:", responseText);
        } else {
            console.error("Error response:", responseText); 
            alert("Xatolik yuz berdi. Iltimos, qaytadan urunib ko'ring.");
        }
    } catch (error) {
        console.error("Error during form submission:", error);
        alert("Tarmoq xatosi yuz berdi. Iltimos, qaytadan urunib ko'ring.");
    }
}

// Attach the event listener to all forms
document.querySelectorAll('.form-container form').forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
});

// Attach an event listener to the selection dropdown
document.getElementById('selection').addEventListener('change', showForm);

// Show/Hide forms based on selection
function showForm() {
    const selection = document.getElementById('selection').value;

    // Hide all forms
    document.getElementById('user-form').style.display = 'none';
    document.getElementById('course-form').style.display = 'none';
    document.getElementById('room-form').style.display = 'none';

    // Show selected form
    if (selection === 'user') {
        document.getElementById('user-form').style.display = 'block';
    } else if (selection === 'course') {
        document.getElementById('course-form').style.display = 'block';
    } else if (selection === 'room') {
        document.getElementById('room-form').style.display = 'block';
    }
}
