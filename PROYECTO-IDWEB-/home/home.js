
window.onload = () => {
    const usuario = localStorage.getItem('usuarioVortex');
    if (usuario) {
        const heroH1 = document.querySelector('.hero-content h1');
        heroH1.innerText = "¡Bienvenido de nuevo, " + usuario + "!";
    }
};