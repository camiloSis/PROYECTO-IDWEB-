
const tablets = document.querySelectorAll('.producto-card');
tablets.forEach(tab => {
    if (tab.innerText.includes('S-Pen') || tab.innerText.includes('Apple Pencil')) {
        const aviso = document.createElement('span');
        aviso.innerText = " ✨ Incluye Lápiz Óptico";
        aviso.style.color = "#1a73e8";
        aviso.style.fontWeight = "bold";
        tab.querySelector('.card-content').appendChild(aviso);
    }
});