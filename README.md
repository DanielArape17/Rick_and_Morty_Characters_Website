# Rick_and_Morty_Characters_Website
A web application that displays characters from the Rick and Morty series using its official API.

Crea una aplicación web que muestre los personajes de la serie *Rick and Morty* utilizando su API oficial.

*Requerimientos:*

1. *Listado de personajes:*
    - Obtén y muestra todos los personajes desde la API, implementando *paginación* para navegar entre ellos.
2. *Favoritos:*
    - Cada tarjeta o elemento de personaje debe incluir un *icono de corazón*.
    - Al hacer clic en el corazón, el personaje se debe agregar a una *lista de personajes favoritos*.
    - Los personajes favoritos deben almacenarse en el *localStorage* para que persistan al recargar la página.
3. *Página de favoritos:*
    - Crea una página independiente que muestre únicamente los personajes guardados como favoritos.
    - En esta página, el usuario debe poder *eliminar* personajes de la lista de favoritos.

*Objetivo:*

Practicar el consumo de APIs, la implementación de paginación, la manipulación del DOM, el manejo de eventos y el uso de localStorage para persistencia de datos.

Opcional: Crea una página de login/register con sus validaciones respectivas. Cuando alguien se registra debe de ser guardado en el local storage. Para acceder a los personajes debes de loguearte. El registro debe de pedir nombre, apellido, correo, contraseña. Y debes hacer que cada usuario tenga sus propios personajes favoritos

Opcional: Encripta la contraseña del usuario al momento de registrarse, y desencriptala unicamente para verificación al momento del login, para encriptar debes de utilizar la palabra clave que funcione como una llave. Esta llave debe de estar escondida en un archivo .env, ya que el usuario no carga este archivo en el frontend.