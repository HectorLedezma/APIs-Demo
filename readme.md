# Pasos para iniciar el servidor de la API
## 1. Instalar dependencias
 Antes de iniciar el servidor, se deben de instalar las dependencias indicadas en el archivo `composer.json`, para ello, se debe ejecutar el comando `composer install`.
## 2. Iniciar el servidor
Para ejecutar el servidor se debe ejecutar el siguiente comando:
`php -S localhost:[puerto a elección] index.php`.

El puerto del servidor puede ser cualquer valor a elección, siempre y cuando no se encuentre ocupado por otros servicios.

## 3. Rutas de End-points
Las rutas de acceso para los distintos micro servicios se deben definir en la carpeta `src/routes`, de la raiz del proyecto.
Dentro de esta carpeta puedes agregar archivos ejecutables mediante solicitud HTTP, agregar nuevos directorios dentro de la carpeta mencionada, permitira crear subrutas, para un mejor orden.

Ejemplo:

Actualmente el proyecto cuenta con un archivo de endpoint, llamdo `get_user.php`, dentro de una carpeta llamda `user`, lo que significa, que para ejecutar el codigo dentro de este endpoint, se debe acceder a la ruta:
`http://localhost:[puerto elegido]/user/get_user.php`
