# Nodepop
Proyecto full stack web development Keepcoding.

## Practica devOps

Para acceder al frontend utilizamos la ip del servidor:

```
15.188.63.21
```

Para acceder al backend y sus funciones utilizamos el nombre de dominio:

```
ec2-15-188-63-21.eu-west-3.compute.amazonaws.com
```

Si lo usamos de esta forma no hay que especificar el puerto porque ya se encarga nginx de ello.

## Scripts NPM

Están preparados para funcionar en entornos multiplataforma, se puede trabajar indiferentemente en Windows, Mac y Linux.

### Run start

Arrancar la app en entorno de producción.

```
npm run start
```
### Run dev

Arranca la app en entorno de desarollo, puerto 3000. Se ejecuta con nodemon para que los cambios sean cargados al instante.

```
npm run dev
```

### Run devbug

Para usar el debugger.
```
npm run devbug
```
## ¿Como inicializar la base de datos?

Hay un script npm dedicado a ello.
```
npm run database
```

---

## Microservicios

El API cuenta con un microservicio que crea las imagenes mas pequeñas de las que las sube el usuario.
El requester se activa automaticamente al iniciar la aplicación, sin embargo, el consumer hay que activarlo manualmente, tenemos que ir a la ruta /lib/microservices y ejecutar el archivo "imageConsumer.js". Podemos abrir tantas instancias del mismo como queramos.
Una vez subida la imagen en 20 segundos aproximadamente es cuando se genera la thumbnail, que se generará con el mismo nombre de archivo asignado por el servidor pero como prefijo se añadirá "tn-".

Este es el nombre que se guardará en la base de datos, por tanto si queremos recuperar la imagen a tamaño natural deberemos quitar ese prefijo "tn-".

Este microservicio está integrado con la librería Cote.

## Llamadas a la API:

### Llamada POST AUTH

Se llama con post a /auth para obtener el token de autenticación.

Este post espera en el body dos parametros. Un user, el cual debe ser un correo electrónico y una password.

Si el username o la password son incorrecta la respuesta del servidor será un JSON tal que:

```
{
    "errors": "Username or password wrong"
}
```

Si tenemos éxito en la autenticación se nos devolverá un JSON como el siguiente:

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWFjMTZhODRjNTQ0NTMzZWM3Yjg0ZjUiLCJpYXQiOjE1ODg1MDMwNTUsImV4cCI6MTU4ODY3NTg1NX0.xqeqpxJ7ocwT2ahWxpYv43C7BvOwRaT7DtVbNfnlHPs"
}
```

Ejemplo del body en postman:

```
user:user@example.com
password:1234
```

El frontend será el encargado de guardar este token e incluirlo en las peticiones de datos dentro de los headers bajo el nombre de **"auth"** sin comillas.

Si el token expira, es inválido o cualquier otra circunstancia que haga que el token sea rechazado se recibirá como respuesta un JSON con mas información del error.

### Llamada GET, obtener datos.

Para obtener datos de la base de datos de nodepop es tan sencillo como usar query params en el endpoint /anuncios. Ejemplo:

```
url/anuncios?name=rueda
```

Tambien podemos encadenar todos los tags posibles mediante el símbolo "&". Ejemplo:

```
url/anuncios?name=rueda&sell=true
```

Los posibles filtros que tenemos son:
* name: Para buscar por el nombre del articulo
* tag: Para buscar por tag, deben estar juntos y separados por comas. Pe: lifestyle,work
* sell: True para anuncios de venta, false para anuncios de compra.
* pricemax: Precio maximo
* pricemin: Precio minimo
* orderby: Elige como quieres recibir el orden de los resultados. Por defecto usa el nombre.
    * name: Ordena por nombre
    * price: Ordena por precio

El orden de uso de los filtros o el mismo uso de estos es totalmente opcional, si no usas algunos se omitirán y si no usas ninguno se te devolverán todos los resultados de la base de datos.

Hay dos filtros adicionales de paginación:

* skip: para saltarse x numero de resultados.
* limit: limitar resultados. Por defecto es 100

Este endpoint está securizado tal y como se explica mas arriba, en el POST auth, es decir, a la petición GET le tenemos que introducir el token JWT en los headers del mensaje con el nombre de "auth".


#### Pagina de prueba.

Si realizamos una petición HTTP con cualquier navegador a la raiz de la aplicación obtendremos una tabla con los elementos contenidos en la base de datos.

Además, aquí podemos hacer uso de query params para filtrar, por ejemplo:

```
    ?name=telefono&tag=work
```

Eso nos devuelve la lista de anuncios en cuyo nombre esté contenida la palabra telefono y en la que al menos uno de sus tags sea work.

Esta llamada de prueba funciona con una llamada interna a la aplicación, si no tenemos el token auth puesto nos devolverá un error 500 tal que así.

```
Request failed with status code 500
```

Es necesario pedir al servidor un token de autenticación al servidor y colocarlo en el fichero .env. El campo a rellenar es JWT_VIEW_TOKEN. Esto es así porque la vista no está pensada para usuarios finales, es un método sencillo de comprobar el funcionamiento de la aplicación y no queremos dejar agujeros de seguridad.

### Llamada POST, escribir datos.

Tendremos que enviar la información en formato JSON. Tenemos que escribir todos los campos ya que todos son obligatorios:
* name: string con el nombre del artículo.
* sell: boolean, tal y como en el get true para articulos que están en venta y false para articulos que se están buscando.
* price: Precio del articulo.
* image: url de la imagen del anuncio.
* tags: [array, de, strings]

Por supuesto está securizado exactamente igual que el GET.

### Saber la lista de tags disponibles para nuestro anuncio:

Tenemos que hacer algo tan sencillo como una llamada get al endpoint /tags

Una vez realizada esta llamada la respuesta será tal que así:

```
[
    {
        "_id": "5e75fbd7250c623424b9454b",
        "tag": "lifestyle"
    },
    {
        "_id": "5e75fbd7250c623424b9454e",
        "tag": "mobile"
    },
    {
        "_id": "5e75fbd7250c623424b9454d",
        "tag": "motor"
    },
    {
        "_id": "5e75fbd7250c623424b9454c",
        "tag": "work"
    }
]
```
Evidentemente de no usar los tags exactamente como nos devuelve esta respuesta recibiremos un mensaje de error (Explicado mas abajo).

#### Respuesta correcta:
Recibiremos de vuelta un status 201 con un JSON de lo que se ha escrito exactamente en la base de datos:
```

    {
        "result": {
            "tags": [
                "lifestyle",
                "work",
                "motor"
            ],
            "_id": "5e7746cd957e102d30cc7dc6",
            "name": "Patinete",
            "sell": false,
            "price": 25,
            "image": "https://github.com/jjsue/nodepop",
            "__v": 0
        }
    }
```
#### Errores:
Si no nos ceñimos a lo esperado por nodepop obtendremos los siguientes errores:
* Tags:
    ```
    {
        "errors": "Error, tags are not corresponding with the expected ones"
    }
    ```
* Tags no array:
    ```
    {
        "errors": [
            {
                "value": "lifestyle",
                "msg": "Invalid value",
                "param": "tags",
                "location": "body"
            }
        ]
    }
    ```
* name:
    ```
    {
        "errors": [
            {
                "msg": "Invalid value",
                "param": "name",
                "location": "body"
            }
        ]
    }
    ```
* sell:
    ```
    {
        "errors": [
            {
                "value": "nobol",
                "msg": "Invalid value",
                "param": "sell",
                "location": "body"
            }
        ]
    }
    ```
* price:
    ```
    {
        "errors": [
            {
                "value": "nobol",
                "msg": "Invalid value",
                "param": "sell",
                "location": "body"
            }
        ]
    }
    ```
* image:
    ```
    {
        "errors": [
            {
                "value": "must be an url",
                "msg": "Invalid value",
                "param": "image",
                "location": "body"
            }
        ]
    }
    ```
* Varios errores encadenados:
    ```
    {
        "errors": [
            {
                "value": "false o algo asi",
                "msg": "Invalid value",
                "param": "sell",
                "location": "body"
            },
            {
                "value": "veinticingo",
                "msg": "Invalid value",
                "param": "price",
                "location": "body"
            },
            {
                "value": "must be an url",
                "msg": "Invalid value",
                "param": "image",
                "location": "body"
            }
        ]
    }
    ```
