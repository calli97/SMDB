# SMDB
A small implementation of IMDB

## De qué trata

Utilizando los Datasets provistos por [IMDB](https://www.imdb.com/interfaces/) se construyo una API REST en Node.js donde los usuarios pueden realizar consultas sobre los diversos titulos ademas de registrarse y guardas sus opiniones.

Para la estructura de la aplicacion se utilizo Express y para la persistencia de datos se utilizo MySQL.

## Cómo correrlo de forma local

Todo el código relativo al proyecto se encuentra en el directorio [./proyecto](./proyecto/).

Una vez armada la base de datos para correrlo de forma local solo es necesario correr

```sh
# Desde la carpeta ./proyecto
mpn start
```

## Estructura del proyecto

- [./proyecto/app.js](./proyecto/app.js): Inicializacion de la app de Express y se configuran las herramientas necesarias para el proyecto.
- [./proyecto/server.js](./proyecto/server.js): Puesta en marcha del servidor.
- [./proyecto/models](./proyecto/models): Modulos con las declaraciones es de las estructuras utilizadas en el proyecto.
- [./proyecto/persistence](./proyecto/persistence): Modulos con la conexion a la base de datos y las consultas a esta.
- [./proyecto/controllers](./proyecto/controllers): Modulos que manejan las consultas del cliente(GET, POST, PUT, DELETE) asi como el manejo de parametros de estas.
- [./proyecto/routes](./proyecto/routes): Manejo de rutas de la aplicacion.

## Endpoints

### POST [/signup]

Alta de usuario

Parametro | Descripción | Detalles
--:|--|--
`username` | Nombre de usuario | No puede repetirse
`pass` | contraseña | Falta validacion
`fullname` | Nombre completo del usuario | -
`email` | Correo del usuario | No puede repetirse

### POST [/signin]

Ingreso del usuario

Parametro | Descripción | Detalles
--:|--|--
`username` | Nombre de usuario | No puede repetirse
`pass` | contraseña | Falta validacion

