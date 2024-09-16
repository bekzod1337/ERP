document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch('http://localhost:4000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json(); // Javobni bir marta o'qish
            localStorage.setItem('accsessToken', result.accsessToken)
            localStorage.setItem('refreshToken', result.refreshToken);
            if (response.ok) {
                switch(result.role) {
                    case 'admin':
                        window.location.href = 'http://127.0.0.1:5501/frontend/admin/html/index.html';
                        break;
                    case 'student':
                        window.location.href = 'http://127.0.0.1:5501/frontend/student/html/index.html';
                        break;
                    case 'teacher':
                        window.location.href = 'http://127.0.0.1:5501/frontend/teacher/html/index.html';
                        break;
                    default:
                        console.error('Unknown role:', result.role);
                        break;
                }
            } else {
                console.error('Error:', result.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
