
document.querySelectorAll('.producto-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (card.innerText.includes('Hasselblad') || card.innerText.includes('200 MP')) {
            card.style.borderColor = '#00C6FF';
            console.log("Destacando equipo fotográfico profesional");
        }
    });
    card.addEventListener('mouseleave', () => {
        card.style.borderColor = '#eee';
    });
});