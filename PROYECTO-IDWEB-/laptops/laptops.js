
function filtrarGamer() {
    const laptops = document.querySelectorAll('.producto-card');
    laptops.forEach(lap => {
        const esGamer = lap.innerText.includes('RTX') || lap.innerText.includes('Ultra 9');
        lap.style.backgroundColor = esGamer ? '#e3f2fd' : '#fff';
    });
}
// Se podría llamar desde un botón en el HTML