// --- LÓGICA DE LOGIN Y REGISTRO VORTEX TECH ---

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // 1. FUNCIÓN PARA CAMBIAR ENTRE FORMULARIOS
    // Esta función se activa cuando haces clic en los enlaces de "Regístrate" o "Inicia Sesión"
    window.toggleForms = function() {
        if (loginForm.style.display === "none") {
            loginForm.style.display = "block";
            registerForm.style.display = "none";
        } else {
            loginForm.style.display = "none";
            registerForm.style.display = "block";
        }
    };

    // 2. MANEJO DEL INICIO DE SESIÓN
    const formLogin = loginForm.querySelector('form');
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue de golpe
        
        // Obtenemos el correo para sacar el nombre de usuario
        const email = loginForm.querySelector('input[type="email"]').value;
        const nombreUsuario = email.split('@')[0]; // Ejemplo: de 'juan@mail.com' saca 'juan'

        // Guardamos el nombre en la memoria del navegador (LocalStorage)
        localStorage.setItem('usuarioVortex', nombreUsuario);

        alert("¡Bienvenido a Vortex Tech, " + nombreUsuario + "!");
        
        // Redirigimos al Home (ajusta la ruta según tu carpeta)
        window.location.href = "../home/home.html";
    });

    // 3. MANEJO DEL REGISTRO
    const formRegister = registerForm.querySelector('form');
    formRegister.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");
        toggleForms(); // Regresa al formulario de login
    });
});