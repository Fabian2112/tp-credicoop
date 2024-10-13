// Importar módulos nativos de Node.js y mysql2 para la base de datos
const http = require('http');
const mysql = require('mysql2');

// Crear la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario',         
    password: 'tu_contraseña',  
    database: 'tu_base_de_datos'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Función para manejar las solicitudes
function handleRequest(req, res) {
    // Parsear la URL
    const { method, url } = req;

    if (url === '/libros' && method === 'GET') {
        // Obtener libros de la base de datos
        db.query('SELECT * FROM libros', (err, results) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: err.message }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });

    } else if (url === '/libros' && method === 'PUT') {
        // Recibir datos para agregar un nuevo libro
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const { titulo, autor, precio } = JSON.parse(body);

                if (!titulo || !autor || !precio) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Faltan campos requeridos' }));
                }

                const sql = 'INSERT INTO libros (titulo, autor, precio) VALUES (?, ?, ?)';
                db.query(sql, [titulo, autor, precio], (err, results) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        return res.end(JSON.stringify({ error: err.message }));
                    }
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ id: results.insertId, titulo, autor, precio }));
                });
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Formato JSON inválido' }));
            }
        });
        
    } else {
        // Ruta no encontrada
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    }
}

// Crear servidor HTTP
const server = http.createServer(handleRequest);

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
