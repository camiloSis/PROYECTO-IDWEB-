document.addEventListener('DOMContentLoaded', () => {
    // --- SELECCIÓN DE ELEMENTOS ---
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

    // --- 2. LÓGICA DE REGISTRO CON FETCH ---
    if (formRegistro) {
        formRegistro.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const datos = {
                nombre: document.getElementById('reg-nombre').value,
                email: document.getElementById('reg-email').value,
                password: document.getElementById('reg-pass').value
            };

            try {
                const respuesta = await fetch('/registro', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datos)
                });

                const resultado = await respuesta.json();

                if (respuesta.ok) {
                    alert(resultado.mensaje);
                    localStorage.setItem('usuarioVortex', datos.nombre);
                    // CAMBIO: Redirección usando la ruta de Flask
                    window.location.href = "/home"; 
                } else {
                    alert(resultado.error || "Error al registrar");
                }
            } catch (error) {
                console.error("Error de conexión:", error);
                alert("No se pudo conectar con el servidor.");
            }
        });
    }

    // --- 3. LÓGICA DE INICIO DE SESIÓN CON FETCH ---
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const datos = {
                email: document.getElementById('login-email').value,
                password: document.getElementById('login-pass').value
            };

            try {
                const respuesta = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datos)
                });

                const resultado = await respuesta.json();

                if (respuesta.ok) {
                    alert("¡Bienvenido de nuevo, " + resultado.nombre + "!");
                    localStorage.setItem('usuarioVortex', resultado.nombre);
                    // CAMBIO: Redirección usando la ruta de Flask
                    window.location.href = "/home"; 
                } else {
                    alert(resultado.error);
                }
            } catch (error) {
                console.error("Error de conexión:", error);
                alert("Error de red o el servidor Flask no está encendido.");
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