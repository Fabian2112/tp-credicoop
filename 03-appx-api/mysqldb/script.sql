-- Crear la base de datos
CREATE DATABASE libros;

-- Crear un usuario y conceder permisos
CREATE USER 'userx'@'localhost' IDENTIFIED BY 'fabian2112';
GRANT ALL PRIVILEGES ON libros.* TO 'userx'@'localhost';

-- Asegúrate de aplicar los cambios
FLUSH PRIVILEGES;

-- Seleccionar la base de datos
USE libros;

-- Crear la tabla libros
CREATE TABLE libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL
);

