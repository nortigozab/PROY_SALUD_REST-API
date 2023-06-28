# PROY_SALUD_REST-API
## Descripción
El proyecto consiste en un aplicativo web (REST API) para la gestión de pacientes, doctores y citas médicas. Permite capturar información a través de formularios, almacenarla en una base de datos (MySQL) y mostrarla en páginas web utilizando DOM.

## Objetivo

El objetivo es proporcionar una solución completa, eficiente y segura para la administración de datos médicos.

## Tecnologías utilizadas
- [Node](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com)
- [Typescript](https://nodejs.dev/en/learn/nodejs-with-typescript/)

## Instalación y Ejecución de la Aplicación :zap:

1. Clona este repositorio ejecutando el siguiente comando:

   ```bash
   git clone https://github.com/nortigozab/PROY_SALUD_REST-API.git
   cd PROY_SALUD_REST-API
   ```

2. Instala las dependencias requeridas:

   ```bash
   npm install
   ```

3. Ejecuta el comando npm para iniciar el proyecto:

   ```bash
   npm run dev
   ```
**4.** **🎉 Open your browser and test the rest of the API at this URL `https://127.0.0.1:3000`**

Recuerda que se debe crear el archivo .env para que la API funcione.
- Asegurese que debe tener el nombre **.env**
- Ingresar los datos segun esta estructura 
```bash
PORT=3000
HOST=127.0.0.1
DB_USER=USERNAME
DB_PWD=PASSWORD
DB_NAME=NAMEDATABASE
```
#### Además, este proyecto utiliza:

- [TS-Nodemon](https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [EJS](https://www.npmjs.com/package/ejs)

**Sigue los pasos de la presentación de pasos en el repositorio -**

## Linea de Tiempo

| Descripcion | Soporte   |
|:------------|---------: |
| Se hace una primera prueba, con una extensión de vscode llamada thunder Client que hace una ejecucion tipo postman            | ![Soporte 1](./img/1.gif?raw=true "import")       |

En esta versión se hace la prueba para doctores con un cliente local, con la extensión thunder Client, donde estas peticiones son muy basicas

| Descripcion | Soporte   |
|:------------|---------: |
| Se hace una segunda prueba, ya de forma grafica       | ![Soporte 1](./img/2.gif?raw=true "import")       |

En esta version se hace una prueba para doctores ya de forma grafica, donde se puede observer:
- Todos los doctores creados con una información relevante.
- Edición de un doctor, donde se puede cambiar el nombre, apellido y correo electronico y se observa el consultorio y y la disponibilidad
- Creacion de Nuevo doctor
  - En esta creación se hacen dos consultas
    - Especialidad: Donde se enlista todas las Especialidades que hay en la Base de datos
    - Consultorio: Donde se asigna un consultorio si esta disponible
