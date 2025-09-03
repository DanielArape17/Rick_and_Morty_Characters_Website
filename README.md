# Rick_and_Morty_Characters_Website
A web application that displays characters from the Rick and Morty series using the official API.

---

## Requirements

1. **Character Listing**
    - Fetch and display all characters from the official API.
    - Implement **pagination** to navigate through the characters.

2. **Favorites**
    - Each character card must include a **heart icon**.
    - Clicking the heart should add the character to a **favorites list**.
    - Favorite characters must be stored in **localStorage** so they persist after page reload.

3. **Favorites Page**
    - Create a separate page that displays only the characters saved as favorites.
    - On this page, users should be able to **remove** characters from their favorites list.

---

## Objective

Practice API consumption, pagination implementation, DOM manipulation, event handling, and using localStorage for data persistence.

---

## Optional

- Create a **login/register** page with proper validations.
- When a user registers, their information should be saved in localStorage.
- Access to the characters should require logging in.
- The registration form should request: first name, last name, email, and password.
- Each user should have their own list of favorite characters.

- **Extra:** Encrypt the user's password at registration and decrypt it only for verification during login. Use a keyword as an encryption key, which should be hidden in a `.env` file (this file should not be accessible from the frontend).

---

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