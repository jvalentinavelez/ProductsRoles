Backend Página de Roles y Productos

**Description:**

Este proyecto está desarrollado usando Node.js y Express.
Mediante este proyecto se pueden crear registros de usuarios, que son almacenados y recuperados de un .json.
Se tienen dos roles: User y Admin, cada uno con un código respectivo. Para el Registro, se usa bcrypt para realizar hash y salt en las contraseñas.
En la autenticación se usa JWT para la generación de access y refresh tokens, con el fin de tener rutas protegidas. Mediante un middleware se verifica que el access token tenga los headers y la estructura adecuada.
Las rutas se manejan mediante Express.

In the project directory, you can run the server:

### `npm run dev`