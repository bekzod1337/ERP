import { login } from "../../../backend/src/core/users/users.service.js";
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Formani yuborishni to'xtatadi
    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;
    try {
        login();
    } catch (error) {
        console.error('Kirishda xatolik:', error);
        alert('Kirishda xatolik.');
    }
});
