// token bor yoqligini tekshirish

const accsessToken = localStorage.getItem('accsessToken')
const refreshToken = localStorage.getItem('refreshToken')
if(!accsessToken || !refreshToken){
    window.location.href = 'http://127.0.0.1:5501/frontend/login/html/login.html'
}



// chiqish  tugmasi bosilganda chiqish
document.getElementById("exit-to-login").addEventListener("click", function(){
    localStorage.removeItem('accsessToken')
    localStorage.removeItem('refreshToken')
    window.location.href = 'http://127.0.0.1:5501/frontend/login/html/login.html'
});

document.querySelector('.mini-menu-icon').addEventListener('click', function() {
    document.querySelector('.menu').classList.toggle('collapsed');
});
