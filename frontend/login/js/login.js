document.addEventListener('DOMContentLoaded', function() {
    // Formani tanlash
    const form = document.getElementById('loginForm');

    // Formaning submit hodisasini ushlash
    form.addEventListener('submit', function(event) {
        // Default submit harakatini to'xtatish
        event.preventDefault();
        console.log('works login')

        // // Formadagi ma'lumotlarni olish
        const formData = new FormData(form);

        // // AJAX so'rovini yaratish
        fetch('http://localhost:4000/user', { // 'YOUR_ENDPOINT_URL_HERE' joyiga ma'lum manzilni kiriting
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Yana bir ehtimoliy o'zgartirish: `response.text()` yoki boshqa format bo'lishi mumkin
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});