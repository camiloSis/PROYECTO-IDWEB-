document.addEventListener('DOMContentLoaded', () => {
    const loginBox = document.getElementById('login-box');
    const registerBox = document.getElementById('register-box');
    const authSection = document.getElementById('auth-section');

    const linkRegistro = document.getElementById('link-registro');
    const linkLogin = document.getElementById('link-login');

    const formRegistro = document.getElementById('form-register');
    const formLogin = document.getElementById('form-login');

    // --- 1. NAVEGACIÓN ENTRE FORMULARIOS ---
    if (linkRegistro) {
        linkRegistro.addEventListener('click', (e) => {
            e.preventDefault();
            loginBox.style.display = 'none';
            registerBox.style.display = 'block';
        });
    }

    if (linkLogin) {
        linkLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerBox.style.display = 'none';
            loginBox.style.display = 'block';
        });
    }

    // --- 2. LÓGICA DE REGISTRO (Guarda credenciales) ---
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nombreUsuario = document.getElementById('reg-nombre').value;
            const emailUsuario = document.getElementById('reg-email').value;
            const passUsuario = document.getElementById('reg-pass').value;

            // Creamos un objeto con los datos para validar luego
            const datosUsuario = {
                nombre: nombreUsuario,
                email: emailUsuario,
                password: passUsuario
            };
            
            // Guardamos el objeto y marcamos la sesión activa
            localStorage.setItem('usuarioVortex_DB', JSON.stringify(datosUsuario));
            localStorage.setItem('usuarioVortex', nombreUsuario);
            
            alert("¡Registrado exitosamente: " + nombreUsuario + "!");
            window.location.href = "../home/home.html";
        });
    }

    // --- 3. LÓGICA DE INICIO DE SESIÓN (Validación Real) ---
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailIngresado = document.getElementById('login-email').value;
            const passIngresada = document.getElementById('login-pass').value;

            // Recuperamos los datos guardados en el registro
            const db = JSON.parse(localStorage.getItem('usuarioVortex_DB'));

            // Verificamos si los datos coinciden
            if (db && emailIngresado === db.email && passIngresada === db.password) {
                localStorage.setItem('usuarioVortex', db.nombre);
                alert("¡Bienvenido de nuevo, " + db.nombre + "!");
                window.location.href = "../home/home.html";
            } else {
                // Mensaje de error si falla la validación
                alert("Error: Correo electrónico o contraseña inválida");
            }
        });
    }

    // --- 4. PERSISTENCIA DE SESIÓN EN EL HEADER ---
    const usuarioActivo = localStorage.getItem('usuarioVortex');
    if (usuarioActivo && authSection) {
        authSection.innerHTML = `
            <div class="user-pill">
                <span class="user-name">👤 ${usuarioActivo}</span>
                <a href="#" class="btn-salir" id="logout-btn">Salir</a>
            </div>
        `;

        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('usuarioVortex');
            alert("Sesión cerrada.");
            window.location.reload();
        });
    }
});