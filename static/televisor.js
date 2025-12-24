
document.querySelectorAll('.producto-card').forEach(tv => {
    tv.addEventListener('click', () => {
        const nombre = tv.querySelector('h3').innerText;
        alert("Para este " + nombre + ", te recomendamos una distancia de visión de 2.5 metros.");
    });
});