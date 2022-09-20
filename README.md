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

### GET [/logout]

Desconexion del usuario

### GET [/name/:nconst]

Consulta sobre una persona por medio de su ID

Parametro | Descripción | Detalles
--:|--|--
`ncosnt` | ID de la persona | No puede repetirse

### GET [/title/:tconst]

Consulta la informacion de un titulo por medio de su ID. En caso de que el usuario este logueado tambien muestra la opinion del usuario de este titulo si esta existe.

Parametro | Descripción | Detalles
--:|--|--
`tcosnt` | ID del titulo | No puede repetirse

### GET [/listtitles]

Muestra los titulos del dataset ordenados por ID. Acepta filtrar por tipo de titulos. Tambien retorna las rutas a los siguientes titulos de la consulta en caso de que se exeda el limite establecido para asi navegar entre todos los resultados.

Parametro | Descripción | Detalles
--:|--|--
`type` | Tipo del titulo | -
`limit` | Cantidad maxima a mostrar por la consulta  | No puede ser menor a 0 y por defecto se establece en 25
`offset` | Cantidad de valores iniciales ignorados | No puede ser menor a 0 y por defecto se establece en 0

### GET [/search]

Mecanismo de busqueda simple. Permite buscar entre los titulos por el nombre de estos. Tambien retorna las rutas a los siguientes titulos de la consulta en caso de que se exeda el limite establecido para asi navegar entre todos los resultados.

Parametro | Descripción | Detalles
--:|--|--
`search` | Palabra a buscar dentro de los nombres de los titulos | -
`limit` | Cantidad maxima a mostrar por la consulta  | No puede ser menor a 0 y por defecto se establece en 25
`offset` | Cantidad de valores iniciales ignorados | No puede ser menor a 0 y por defecto se establece en 0

### GET [/advancesearch]

Mecanismo de busqueda completo. Permite buscar entre los titulos por el nombre de estos filtrando por año de estreno, rating minimo, generos, tipos y duracion minima. Tambien retorna las rutas a los siguientes titulos de la consulta en caso de que se exeda el limite establecido para asi navegar entre todos los resultados.

Parametro | Descripción | Detalles
--:|--|--
`search` | Palabra a buscar dentro de los nombres de los titulos | -
`limit` | Cantidad maxima a mostrar por la consulta  | No puede ser menor a 0 y por defecto se establece en 25
`offset` | Cantidad de valores iniciales ignorados | No puede ser menor a 0 y por defecto se establece en 0
`startyear` | Año de estreno del titulo | Valor numerico
`duration` | Duracion minima del titulo | Valor numerico
`rating` | Rating minimo del titulo | Valor numerico

### POST [/title/:tconst/add]

Solo esta habilitado si el usuario esta logueado. Permite al usuario agregar su opinion sobre el titulo identificado por el id.

Parametro | Descripción | Detalles
--:|--|--
`tconst` | ID del titulo | No puede repetirse

### PUT [/title/:tconst/update]

Solo esta habilitado si el usuario esta logueado. Permite al usuario modificar su opinion sobre el titulo identificado por el id.

Parametro | Descripción | Detalles
--:|--|--
`tconst` | ID del titulo | No puede repetirse

### DELETE [/title/:tconst/delete]

Solo esta habilitado si el usuario esta logueado. Permite al usuario eliminar su opinion sobre el titulo identificado por el id.

Parametro | Descripción | Detalles
--:|--|--
`tconst` | ID del titulo | No puede repetirse


