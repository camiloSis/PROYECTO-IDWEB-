from flask import Flask, request, jsonify, render_template
import sqlite3

app = Flask(__name__)

# Configuración de la Base de Datos
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

@app.route('/registro', methods=['POST'])
def registro():
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
    app.run(debug=True)