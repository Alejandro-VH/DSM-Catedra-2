﻿# DSM-Catedra-2
Este repositorio contiene la segunda prueba de catedra para el ramo Diseño de soluciones moviles. 

### Comandos iniciales
``` bash
# Instalar sequelize y las dependecias
npm i -g sequelize-cli
npm install
# Copiar el archivo .env
cp env/.env.example env/.env
# Generar JWT
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### Generar DB y ejecutar codigo
``` bash
# Generar migraciones y seeders
npm run db:migrate:up
npm run db:seed
# Ejecutar proyecto
npm run dev
```
