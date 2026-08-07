# Estructura del Proyecto — Vortex Tech (PROYECTO-IDWEB-)

Aplicación web de comercio electrónico de tecnología construida con **Flask + Jinja2 + SQLite**.

## Esquema general

```
PROYECTO-IDWEB-/
│
├── app.py                # Servidor Flask: rutas, lógica y base de datos
├── vortex_tech.db        # Base de datos SQLite (tabla "usuarios")
├── ESTRUCTURA.md         # Este documento
│
├── static/               # Recursos estáticos servidos por Flask
│   │
│   ├── *.css            # Hojas de estilo por página
│   │   ├── estiloslogin.css
│   │   ├── estiloshome.css
│   │   ├── estiloscelulares.css
│   │   ├── estilostelevisores.css
│   │   ├── estiloslaptops.css
│   │   └── estilostablets.css
│   │
│   ├── *.js             # Scripts por página
│   │   ├── login.js
│   │   ├── home.js
│   │   ├── celulares.js
│   │   ├── televisor.js
│   │   ├── laptops.js
│   │   └── tablets.js
│   │
│   └── *.jpg/*.png/*.avif/*.webp  # Imágenes de productos y banners
│
└── templates/           # Plantillas HTML (Jinja2)
    ├── login.html       # Vista de login/registro (ruta raíz)
    ├── home.html        # Página principal / inicio
    ├── celulares.html
    ├── televisores.html
    ├── laptops.html
    └── tablets.html
```

## Flujo de la aplicación

1. **`app.py`** arranca Flask y crea/valida la tabla `usuarios` en `vortex_tech.db`.
2. Las rutas `/`, `/home`, `/celulares`, `/televisores`, `/laptops` y `/tablets` renderizan cada plantilla de `templates/` (motor Jinja2).
3. Las plantillas enlazan CSS, JS e imágenes de `static/` mediante `url_for('static', ...)`.
4. `login.js` consume los endpoints POST `/login` y `/registro`, que leen/escriben en `vortex_tech.db`.

## Rutas del servidor (app.py)

| Método | Ruta        | Descripción                                    |
|--------|-------------|------------------------------------------------|
| GET    | `/`         | Renderiza `login.html` (por defecto)          |
| GET    | `/home`     | Renderiza `home.html`                         |
| GET    | `/celulares`| Renderiza `celulares.html`                    |
| GET    | `/televisores` | Renderiza `televisores.html`               |
| GET    | `/laptops`  | Renderiza `laptops.html`                      |
| GET    | `/tablets`  | Renderiza `tablets.html`                      |
| POST   | `/registro` | Inserta un usuario nuevo en SQLite            |
| POST   | `/login`    | Valida credenciales en SQLite                 |

## Cómo ejecutar

```bash
pip install flask
python app.py
```

Abrir en el navegador: `http://localhost:5000/home`

> **Nota**: este proyecto usa plantillas Jinja2 y un backend Flask. NO funciona al abrir `home.html` directamente con "Live Server" (el navegador no procesa Jinja2 ni `url_for()`).