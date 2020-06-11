# Ecommerce
Implementación de ejemplo de un Ecommerce. Vue.js, Vuex, Vuetify, Node.js, Express.js, JWT

# Para ejecutar el programa:

1.- Clonar el repositorio
2.- Ingresar a los directorios client/ y server/, ejecutar la instalación de los paquetes en cada uno.

```
npm install
```

3.- Ejecutar el script de la base de datos que se encuentra en *db/*.
4.- Dentro de server/ crear el archivo de configuración *keys.js*.

```
/*keys.js*/
module.exports = {
    database :{
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'database'
    },
    llave: 'keyexample',
    salt_rounds: 12
} 
``
5.- Puesta en marcha del servidor. Ejecutar en server/
```
npm run devbabel
```
6.- Puesta en marcha del cliente. Ejecutar en client/
```
npm run serve


