const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const allGenFilter = document.querySelector("#allgens");
const gen1Filter = document.querySelector("#gen1");
const gen2Filter = document.querySelector("#gen2");
const gen3Filter = document.querySelector("#gen3");
const gen4Filter = document.querySelector("#gen4");
const gen5Filter = document.querySelector("#gen5");
const gen6Filter = document.querySelector("#gen6");
const gen7Filter = document.querySelector("#gen7");
const gen8Filter = document.querySelector("#gen8");
const gen9Filter = document.querySelector("#gen9");
const notFoundMessage = document.querySelector("#not-found-message");
const searchIcon = document.querySelector("#search-close-icon");
const sortWrapper = document.querySelector(".sort-wrapper");

let allPokemon = [];

searchInput.focus();

fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025`)
  .then((response) => response.json())
  .then((data) => {
    allPokemon = data.results;
    displayPokemon(allPokemon);
  });

async function fetchPokemonDataBeforeRedirect(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
        res.json()
      ),
    ]);
    return true;
  } catch (error) {
    console.error("Failed to fetch Pokemon data before redirect");
  }
}

function displayPokemon(pokemon) {
  listWrapper.innerHTML = "";

  pokemon.forEach((pkmn) => {
    const pokemonId = pkmn.url.split("/")[6];
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
      <div class="number-wrap">
        <p class="caption-fonts">#${pokemonId}</p>
      </div>
      <div class="img-wrap">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" alt="${pkmn.name}" />
      </div>
      <div class="name-wrap">
        <p class="body3-fonts">${pkmn.name}</p>
      </div>
    `;

    listItem.addEventListener("click", async () => {
      const success = await fetchPokemonDataBeforeRedirect(pokemonId);
      if (success) {
        window.location.href = `./detail.html?id=${pokemonId}`;
      }
    });

    listWrapper.appendChild(listItem);
  });
}

searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredPokemon;

  filteredPokemon = allPokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchTerm)
  );

  displayPokemon(filteredPokemon);

  if (filteredPokemon.length === 0) {
    notFoundMessage.style.display = "block";
  } else {
    notFoundMessage.style.display = "none";
  }
}

// document.querySelector(".sort-wrap").addEventListener("click", handleGenChange)

allGenFilter.addEventListener("change", handleGenChange);
gen1Filter.addEventListener("change", handleGenChange);
gen2Filter.addEventListener("change", handleGenChange);
gen3Filter.addEventListener("change", handleGenChange);
gen4Filter.addEventListener("change", handleGenChange);
gen5Filter.addEventListener("change", handleGenChange);
gen6Filter.addEventListener("change", handleGenChange);
gen7Filter.addEventListener("change", handleGenChange);
gen8Filter.addEventListener("change", handleGenChange);
gen9Filter.addEventListener("change", handleGenChange);

function handleGenChange() {
  let filteredPokemon;

  // Check which generation filter is selected
  if (allGenFilter.checked) {
    // If "All" is selected, display all Pokémon
    filteredPokemon = allPokemon;
  } else if (gen1Filter.checked) {
    filteredPokemon = allPokemon.slice(0, 151);
  } else if (gen2Filter.checked) {
    filteredPokemon = allPokemon.slice(151, 251);
  } else if (gen3Filter.checked) {
    filteredPokemon = allPokemon.slice(251, 386);
  } else if (gen4Filter.checked) {
    filteredPokemon = allPokemon.slice(386, 493);
  } else if (gen5Filter.checked) {
    filteredPokemon = allPokemon.slice(493, 649);
  } else if (gen6Filter.checked) {
    filteredPokemon = allPokemon.slice(650, 721);
  } else if (gen7Filter.checked) {
    filteredPokemon = allPokemon.slice(721, 809);
  } else if (gen8Filter.checked) {
    filteredPokemon = allPokemon.slice(809, 905);
  } else if (gen9Filter.checked) {
    filteredPokemon = allPokemon.slice(905, 1025);
  }

  // Display the filtered Pokémon
  displayPokemon(filteredPokemon);
}

const closeButton = document.querySelector(".search-close-icon");
closeButton.addEventListener("click", clearSearch);

function clearSearch() {
  searchInput.value = "";
  displayPokemon(allPokemon);
  notFoundMessage.style.display = "none";
}

searchIcon.addEventListener("click", handleSearchCloseOnClick);

sortWrapper.addEventListener("click", handleSortIconOnClick);

function handleSearchCloseOnClick() {
  document.querySelector("#search-input").value = "";
  document
    .querySelector("#search-close-icon")
    .classList.remove("search-close-icon-visible");
}

function handleSortIconOnClick() {
  document
    .querySelector(".filter-wrapper")
    .classList.toggle("filter-wrapper-open");
  document.querySelector("body").classList.toggle("filter-wrapper-overlay");
}
