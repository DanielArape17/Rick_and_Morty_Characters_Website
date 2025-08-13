const firstApiUrl = 'https://rickandmortyapi.com/api/character';
let currentApiUrl = '';

const favoriteCharacters = JSON.parse(localStorage.getItem('favoriteCharacters')) || [];

const btnNextPage = document.getElementById('btnNextPage');
const btnPrevPage = document.getElementById('btnPrevPage');

const pagination = {
  current: '',
  next: '',
  prev: ''
};

btnNextPage.addEventListener('click', () => {
  if(pagination.next) loadPage(pagination.next);
});

btnPrevPage.addEventListener('click', () => {
  if(pagination.prev) loadPage(pagination.prev);
});

async function getData(currentPage) {
  await fetch(currentPage)
  .then(response => response.json())
  .then(data => {
    pagination.current = currentPage;
    pagination.next = data.info.next;
    pagination.prev = data.info.prev;
    console.log(data);

    clearCards();
    cards(data.results);
  })
};

const loadPage = (url) => {
  getData(url);
  currentApiUrl = url;
};

const cards = (characters) => {
  let charactersContainer = document.getElementById('charactersContainer');

  characters.forEach(character => {
    const isFavorite = favoriteCharacters.includes(character.id);
    const heartIcon = isFavorite ? '♥' : '♡';
    const ariaPressed = isFavorite ? "true" : "false"

    let card = document.createElement('div');
    card.className = 'border p-4 rounded text-white';
    card.innerHTML = ` 
      <h2 class="font-bold">${character.name}</h2>
      <img src="${character.image}" alt="${character.name}" class="w-full h-auto rounded">
      <p>Status: ${character.status}</p>
      <button id="btnHeart${character.id}" 
        class="cursor-pointer" 
        onclick="toggleFavoriteCharacter(${character.id})"
        aria-pressed="${ariaPressed}"
        aria-label="Agregar ${character.name} a favoritos">
        ${heartIcon}
      </button>
    `;
    charactersContainer.appendChild(card);
  });
};

const clearCards = () => {
  let charactersContainer = document.getElementById('charactersContainer');
  charactersContainer.innerHTML = '';
};

const toggleFavoriteCharacter = (btnHeartCharacterId) => {
  const btnHeartId = document.getElementById(`btnHeart${btnHeartCharacterId}`);
  const isPressed = btnHeartId.getAttribute('aria-pressed') === "true"; 
  btnHeartId.setAttribute('aria-pressed', !isPressed);
  console.log(isPressed)
  
  if(!isPressed){
    favoriteCharacters.push(btnHeartCharacterId);
    console.log(favoriteCharacters);
    btnHeartId.textContent = '♥'
  }
  else{
    indexOfFavoriteCharacters = favoriteCharacters.indexOf(btnHeartCharacterId);
    favoriteCharacters.splice(indexOfFavoriteCharacters, 1);
    console.log(favoriteCharacters);
    btnHeartId.textContent = '♡';
  }
  localStorage.setItem("favoriteCharacters", JSON.stringify(favoriteCharacters));
}

loadPage(firstApiUrl);