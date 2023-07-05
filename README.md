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
- [Moment](https://www.npmjs.com/package/moment)

**Sigue los pasos de la presentación de pasos en el repositorio -**

## Linea de Tiempo

### Prueba #1

En esta versión se hace la prueba para doctores con un cliente local, utilizando la extensión Thunder Client en Visual Studio Code, donde estas peticiones son muy básicas.

| Descripcion | Soporte   |
|:------------|---------: |
| Se hace una primera prueba, con una extensión de vscode llamada thunder Client que hace una ejecucion tipo postman            | ![Soporte 1](./img/1.gif?raw=true "import")       |

### Prueba #2

En esta versión se hace una prueba para doctores de forma gráfica, donde se puede observar:

- Todos los doctores creados con información relevante.
- Edición de un doctor, donde se puede cambiar el nombre, apellido, correo electrónico, consultorio y disponibilidad.
- Creación de un nuevo doctor.
- En esta creación se realizan dos consultas:
  - Especialidad: Lista todas las especialidades existentes en la base de datos.
  - Consultorio: Asigna un consultorio si está disponible.

| Descripcion | Soporte   |
|:------------|---------: |
| Se hace una segunda prueba, ya de forma grafica       | ![Soporte 2](./img/2.gif?raw=true "import")       |

### Prueba #3

En esta versión se hace una prueba para pacientes de forma gráfica, donde se puede observar:

- Todos los pacientes creados con información relevante, como nombre, apellido y edad (calculada a partir de la fecha de nacimiento y la fecha actual).
- Edición de un paciente, donde se puede cambiar el nombre, apellido, cédula, fecha de nacimiento y teléfono.
- Creación de un nuevo paciente.

| Descripcion | Soporte   |
|:------------|---------: |
| Se hace una tercera prueba, ya de forma grafica       | ![Soporte 3](./img/3.gif?raw=true "import")       |

### Prueba #4

En esta versión se hace una prueba para citas médicas de forma gráfica, donde se puede observar:

- Todas las citas médicas, donde las citas disponibles se muestran en verde y las ocupadas en rojo.
- Las citas están disponibles si no tienen un paciente asignado.
  - Se puede editar una cita médica, cambiando la cédula, especialidad, doctor de la especialidad y fecha.
- Se puede crear una cita médica, con o sin cédula. También se solicita la especialidad, el doctor y una fecha.
  - Si se proporciona una cédula válida de un paciente, la cita se crea como ocupada.
  - De lo contrario, la cita se crea como disponible.

| Descripcion | Soporte   |
|:------------|---------: |
| Se hace una cuarta prueba, ya de forma grafica       | ![Soporte 4](./img/4.gif?raw=true "import")       |