const accessToken = localStorage.getItem('accsessToken');
const refreshToken = localStorage.getItem('refreshToken');
if (!accessToken || !refreshToken) {
    window.location.href = 'http://127.0.0.1:5501/frontend/login/html/login.html';
}

// Common fetch function with authorization
function fetchWithAuth(url, method = 'GET') {
    return fetch(url, {
        method: method,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });
}

// Handle fetch response
function handleFetchResponse(response) {
    if (!response.ok) {
        return response.text().then(text => {
            throw new Error(`Xatolik: ${text}`);
        });
    }
    return response.json();
}

// Fetch and populate select options for deletion
function fetchOptions(url, selectElement, textProperties) {
    fetchWithAuth(url)
        .then(response => handleFetchResponse(response))
        .then(data => {
            selectElement.innerHTML = '<option value="">Tanlash</option>'; // Reset options
            if (data.length === 0) {
                alert('Ma\'lumotlar topilmadi.');
                return;
            }
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = `${item.id} - ${textProperties.map(prop => item[prop]).join(' ')}`;
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Ma’lumotlarni olishda xato:', error));
}

// Function to format time
function formatTime(dateString) {
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date)) {
        console.error(`Invalid date: ${dateString}`);
        return 'N/A'; // Or any other default value you prefer
    }

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Handle delete operation
function handleDelete(url, id) {
    fetchWithAuth(`${url}/${id}`, 'DELETE')
        .then(response => {
            if (response.ok) {
                alert('Ma\'lumot muvaffaqiyatli o\'chirildi!');
                location.reload(); // Refresh the page to update the options
            } else {
                return response.text().then(text => {
                    throw new Error(`Xatolik: ${text}`);
                });
            }
        })
        .catch(error => console.error('O\'chirishda xato:', error));
}

// Event listener for delete button
document.getElementById('delete-btn').addEventListener('click', function() {
    const selectedValue = document.getElementById('item-select').value;
    const selectedType = document.getElementById('type-select').value;

    let url;
    if (selectedType === 'user') {
        url = 'http://localhost:4000/user';
    } else if (selectedType === 'course') {
        url = 'http://localhost:4000/course';
    } else if (selectedType === 'room') {
        url = 'http://localhost:4000/room';
    } else {
        alert('Iltimos, ma\'lumot turini tanlang.');
        return;
    }

    if (!selectedValue) {
        alert('Iltimos, o\'chirish uchun ma\'lumotni tanlang.');
        return;
    }

    handleDelete(url, selectedValue);
});

// Populate selection options on page load
document.addEventListener('DOMContentLoaded', function() {
    const typeSelect = document.getElementById('type-select');
    const itemSelect = document.getElementById('item-select');
    const itemContainer = document.getElementById('item-container');
    const deleteButton = document.getElementById('delete-btn');

    // Initial setup to hide item selection and delete button
    itemContainer.style.display = 'none';
    deleteButton.style.display = 'none';

    // Fetch options based on selected type
    typeSelect.addEventListener('change', function() {
        const selectedType = this.value;
        itemSelect.innerHTML = '<option value="">Tanlash</option>'; // Reset options

        if (selectedType === 'user') {
            fetchOptions('http://localhost:4000/user', itemSelect, ['id', 'first_name', 'second_name', 'role']);
        } else if (selectedType === 'course') {
            fetchOptions('http://localhost:4000/course', itemSelect, ['id', 'course_name', 'start_time', 'end_time', 'teacher_first_name', 'teacher_second_name']);
        } else if (selectedType === 'room') {
            fetchOptions('http://localhost:4000/room', itemSelect, ['id', 'name']);
        } else {
            itemContainer.style.display = 'none';
            deleteButton.style.display = 'none';
            return;
        }

        itemContainer.style.display = 'block';
        deleteButton.style.display = 'block';
    });
});
