# Usar la imagen oficial de Node.js como base
FROM node:14

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de la aplicación
COPY package*.json ./
COPY . . 

# Instalar las dependencias
RUN npm install

# Exponer el puerto en el que corre la app
EXPOSE 3000

# Comando para ejecutar la app
CMD ["npm","app.js"]