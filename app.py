from flask import Flask, render_template, request, jsonify, url_for
import sqlite3
import os

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('vortex_tech.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

init_db()


@app.route('/')
def index():
    """Carga el formulario de login/registro por defecto."""
    return render_template('login.html')

@app.route('/home')
def home():
    """Carga la página principal del sitio."""
    return render_template('home.html')

@app.route('/celulares')
def celulares():
    return render_template('celulares.html')

@app.route('/televisores')
def televisores():
    return render_template('televisores.html')

@app.route('/laptops')
def laptops():
    return render_template('laptops.html')

@app.route('/tablets')
def tablets():
    return render_template('tablets.html')

@app.route('/registro', methods=['POST'])
def registro():
    """Recibe datos del formulario de registro y los guarda en SQLite."""
    datos = request.json
    try:
        conn = sqlite3.connect('vortex_tech.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
                       (datos['nombre'], datos['email'], datos['password']))
        conn.commit()
        conn.close()
        return jsonify({"mensaje": f"Registrado exitosamente: {datos['nombre']}"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "El correo ya está registrado"}), 400

@app.route('/login', methods=['POST'])
def login():
    """Verifica si las credenciales existen en la base de datos."""
    datos = request.json
    conn = sqlite3.connect('vortex_tech.db')
    cursor = conn.cursor()
    cursor.execute('SELECT nombre FROM usuarios WHERE email = ? AND password = ?',
                   (datos['email'], datos['password']))
    usuario = cursor.fetchone()
    conn.close()

    if usuario:
        return jsonify({"nombre": usuario[0]}), 200
    else:
        return jsonify({"error": "Correo electrónico o contraseña inválida"}), 401

if __name__ == '__main__':
    app.run(debug=True, port=5000)