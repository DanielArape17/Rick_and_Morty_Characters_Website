const firstApiUrl = 'https://rickandmortyapi.com/api/character';
let currentApiUrl = '';

const btnNextPage = document.getElementById('btnNextPage');
const btnPrevPage = document.getElementById('btnPrevPage');
const heartPlay = './svg/heartPlay.svg'
const heartNoPlay = './svg/heartNoPlay.svg'

let bodyId = document.body.id;

const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    window.location.href = './loginRegister.html';
}

const pagination = {
  current: '',
  next: '',
  prev: ''
};

const updatePaginationButtons = () => {
  // Para el botón "Anterior"
  btnPrevPage.classList.toggle('cursor-not-allowed', pagination.prev == null);
  btnPrevPage.classList.toggle('cursor-pointer', pagination.prev != null);
  btnPrevPage.disabled = pagination.prev == null;

  // Para el botón "Siguiente"
  btnNextPage.classList.toggle('cursor-not-allowed', pagination.next == null);
  btnNextPage.classList.toggle('cursor-pointer', pagination.next != null);
  btnNextPage.disabled = pagination.next == null;
};


async function getData(currentPage) {
  await fetch(currentPage)
  .then(response => response.json())
  .then(data => {
    pagination.current = currentPage;
    if(bodyId === 'indexPage'){
      pagination.next = data.info.next;
      pagination.prev = data.info.prev;
      updatePaginationButtons();
    }

    clearCards();
    
    bodyId === 'indexPage' ? cards(data.results) : cards(data);
  })
};

const loadPage = (url) => {
  getData(url);
  currentApiUrl = url;
};

const cards = (characters) => {
  let charactersContainer = document.getElementById('charactersContainer');

  characters.forEach(character => {
    const isFavorite = user.favoriteCharacters.includes(character.id);
    const heartIcon = isFavorite ? heartPlay : heartNoPlay;
    const ariaPressed = isFavorite ? "true" : "false"
    const buttonClass = isFavorite ? "shadow-[#e74d3c99] bg-[#551e2e] text-[#e2a8a1]" : "border border-[#33DDFF] shadow-[#3bb6ce4d]";
    const status = character.status
    
    statusColor =
      status == "Alive" ? "#7eb82e" :
      status == "Dead" ? "#e74c3c" :
      "#98c4d5";

    let card = document.createElement('div');
    card.className = 'flex flex-col group border rounded-lg text-white shadow-[0_0_20px] shadow-[#3bb6ce66] shadow-[0_0_30px_#090628cc] border-[#33DDFF] transition-all duration-700 hover:border-[#97ce4c] hover:scale-105';
    card.innerHTML = ` 
        <div class="flex justify-between items-center text-center px-2 py-3 rounded-t-lg bg-linear-135 from-[#33DDFF]/70 to-[#660099]/40">
          <h3 class="font-black tracking-wide text-[#FCD640] text-xl text-shadow-glow truncate">${character.name}</h3>
          <div class="rounded-full px-2 statusPulse${status} border border-[${statusColor}]">
            <p class="text-[${statusColor}] font-medium">${character.status}</p>
          </div>
        </div>

        <div class="bg-gradient-to-br from-[#2a4365] to-[#2c5282] h-64">
          <img src="${character.image}" alt="${character.name}" loading="lazy" onload="imageUploaded(this)" class="opacity-0">
        </div>

        <div class="grid grid-cols-[85%_15%] p-1 bg-[#0d092b]/10 backdrop-blur-md rounded-b-lg duration-500 ease-in group-hover:bg-[#0d092b]/70">
          <div class="flex flex-col gap-1 p-1">
            <div class="flex gap-1 items-center font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user text-portal-blue" data-lov-id="src/components/CharacterCard.tsx:137:14" data-lov-name="UserCircle" data-component-path="src/components/CharacterCard.tsx" data-component-line="137" data-component-file="CharacterCard.tsx" data-component-name="UserCircle" data-component-content="%7B%22className%22%3A%22text-portal-blue%22%7D"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>
              <p class="truncate">Species: <span class="character-info-shadow">${character.species}</span></p>
            </div>
            <div class="flex gap-1 items-center font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user text-portal-blue" data-lov-id="src/components/CharacterCard.tsx:137:14" data-lov-name="UserCircle" data-component-path="src/components/CharacterCard.tsx" data-component-line="137" data-component-file="CharacterCard.tsx" data-component-name="UserCircle" data-component-content="%7B%22className%22%3A%22text-portal-blue%22%7D"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>
              <p>Gender: <span class="character-info-shadow ">${character.gender}</span></p>
            </div>
            <div class="flex gap-1 items-center font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user text-portal-blue" data-lov-id="src/components/CharacterCard.tsx:137:14" data-lov-name="UserCircle" data-component-path="src/components/CharacterCard.tsx" data-component-line="137" data-component-file="CharacterCard.tsx" data-component-name="UserCircle" data-component-content="%7B%22className%22%3A%22text-portal-blue%22%7D"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>
              <p>Episodes: <span class="character-info-shadow ">${character.episode.length}</span></p>
            </div>
          </div>

          <div class="flex flex-col p-1 justify-between">
            <div class="flex justify-end">
              <button id="btnHeart${character.id}" 
                class="${buttonClass} rounded-full p-2 shadow-[0_0_12px] cursor-pointer transition-all duration-500 hover:scale-110"
                onclick="toggleFavoriteCharacter(${character.id})"
                aria-pressed="${ariaPressed}"
                aria-label="Agregar ${character.name} a favoritos">
                <img id="heartIcon${character.id}" src="${heartIcon}" alt="Heart Icon" class="heart-icon cursor-pointer transition-all duration-500 group-hover:drop-shadow-[0_0_8px_currentColor]">
              </button> 
            </div>
          </div>
        </div>
    `;
    charactersContainer.appendChild(card);
  });
};

const imageUploaded = (img) => {
  img.classList.remove("opacity-0")
  img.classList.add("opacity-100")

  const imgContainer = img.parentElement;

  imgContainer.classList.remove("h-64")
}

const clearCards = () => {
  let charactersContainer = document.getElementById('charactersContainer');
  charactersContainer.innerHTML = '';
};

const toggleFavoriteCharacter = (btnHeartCharacterId) => {
  const btnHeartId = document.getElementById(`btnHeart${btnHeartCharacterId}`);
  const isPressed = btnHeartId.getAttribute('aria-pressed') === "true"; 
  const heartIconId = document.getElementById(`heartIcon${btnHeartCharacterId}`)
  btnHeartId.setAttribute('aria-pressed', !isPressed);
  console.log(isPressed)
  
  if(!isPressed){
    user.favoriteCharacters.push(btnHeartCharacterId);
    console.log(user.favoriteCharacters);
    heartIconId.src = heartPlay;
    btnHeartId.classList.add("shadow-[#e74d3c99]", "bg-[#551e2e]", "text-[#e2a8a1]");
    btnHeartId.classList.remove("border", "border-[#33DDFF]", "shadow-[#3bb6ce4d]");
  }
  else{
    indexOfFavoriteCharacters = user.favoriteCharacters.indexOf(btnHeartCharacterId);
    user.favoriteCharacters.splice(indexOfFavoriteCharacters, 1);
    console.log(user.favoriteCharacters);
    heartIconId.src = heartNoPlay;
    btnHeartId.classList.add("border", "border-[#33DDFF]", "shadow-[#3bb6ce4d]");
    btnHeartId.classList.remove("shadow-[#e74d3c99]", "bg-[#551e2e]", "text-[#e2a8a1]");
  }
  localStorage.setItem('user', JSON.stringify(user));
}


if(bodyId === 'indexPage'){
  btnNextPage.addEventListener('click', () => {
    if(pagination.next) loadPage(pagination.next);
    window.scrollTo({
        top: 0,
    });
  });

  btnPrevPage.addEventListener('click', () => {
    if(pagination.prev) loadPage(pagination.prev);
    window.scrollTo({
        top: 0,
    });
  });
  loadPage(firstApiUrl);

}
else{
  favoriteCharactersString = user.favoriteCharacters.toString();
  
  favoriteCharactersUrl = `${firstApiUrl}/${favoriteCharactersString}`;
  console.log(favoriteCharactersUrl)

  loadPage(favoriteCharactersUrl); 
}
