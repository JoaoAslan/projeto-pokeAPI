
function createCard(name, id, img, types, audio) {
    const container = document.querySelector(".content-cards");

    const card_box = createDiv("card-box");
    const card_info = createDiv("card-info");
    const card_type_box = createDiv("card-types-box");
    const card_box_img = createDiv("card-box-img");

    container.appendChild(card_box);
    card_box.appendChild(card_info);
    card_box.appendChild(card_box_img);

    const card_img = createImg("card-img", `${img}`, `${name}`);
    card_box_img.appendChild(card_img);

    const card_id = createLabel("card-id", `#${id.toString().padStart(2, '0')}`);
    const card_name = createLabel("card-name", `${formatName(name)}`);
    
    const card_audio = createAudio("card-audio", `${audio}`);
    card_audio.volume = 0.2;
    card_box.addEventListener("click", () => card_audio.play());

    card_info.appendChild(card_id);
    card_info.appendChild(card_name);
    card_info.appendChild(card_type_box);
    card_info.appendChild(card_audio);

    if (name.length > 10) {
        card_name.style.fontSize = '24px';
    }
    
    for (let i=0; i<types.length; i++) {
        const card_type = createDiv(`card-type ${types[i].type.name}`);
        const card_type_text = createLabel("card-type-text", `${formatName(types[i].type.name)}`);
        const card_type_icon = createImg("card-type-icon", `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/${types[i].type.name}.svg`, `${types[i].type.name}`);
        card_type.appendChild(card_type_icon);
        card_type.appendChild(card_type_text);
        card_type_box.appendChild(card_type);

        if (i === 0) {
            switch (types[i].type.name) {
                case 'fire':
                    card_box.style.backgroundColor = '#ffa860';
                    break;
                case 'grass':
                    card_box.style.backgroundColor = '#77c471';
                    break;
                case 'bug':
                    card_box.style.backgroundColor = '#aecc64';
                    break;
                case 'dark':
                    card_box.style.backgroundColor = '#7c798a';
                    break;
                case 'dragon':
                    card_box.style.backgroundColor = '#6392c2';
                    break;
                case 'ground':
                    card_box.style.backgroundColor = '#e3946d';
                    break;
                case 'electric':
                    card_box.style.backgroundColor = '#ebdb86';
                    break;
                case 'fairy':
                    card_box.style.backgroundColor = '#e3b1df';
                    break;
                case 'fighting':
                    card_box.style.backgroundColor = '#8c4150';
                    break;
                case 'flying':
                    card_box.style.backgroundColor = '#bccbe8';
                    break;
                case 'ghost':
                    card_box.style.backgroundColor = '#959dcf';
                    break;
                case 'ice':
                    card_box.style.backgroundColor = '#a4ded4';
                    break;
                case 'normal':
                    card_box.style.backgroundColor = '#bbbdbb';
                    break;
                case 'poison':
                    card_box.style.backgroundColor = '#b98fc4';
                    break;
                case 'psychic':
                    card_box.style.backgroundColor = '#e3a6a3';
                    break;
                case 'rock':
                    card_box.style.backgroundColor = '#dbd1ab';
                    break;
                case 'steel':
                    card_box.style.backgroundColor = '#90c5d1';
                    break;
                case 'water':
                    card_box.style.backgroundColor = '#37a7f2';
                    break;
                default:
                    card_box.style.backgroundColor = '#595761';
            }
        }
    }
}

function removeCards() {
    const cards = document.querySelectorAll(".card-box");
    cards.forEach(card => {
        card.remove();
    });
}

function createDiv(className) {
    const div = document.createElement('div');
    div.className = className;
    return div;
}

function createLabel(className, content) {
    const label = document.createElement('label');
    label.className = className;
    label.textContent = content;
    return label;
}

function createImg(className, src, alt) {
    const img = document.createElement('img');
    img.className = className;
    img.src = src;
    img.alt = alt;
    return img;
}

function createAudio(className, src) {
    const audio = document.createElement('audio');
    audio.className = className;
    audio.src = src;
    return audio;
}

function formatName(name) {
    return name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
    ).join(' ');
}

let lastPokemonBeforeSearch = 0;
let lastPokemonIndex = 0;
async function loadPokemon(n) {
    for (let i=0; i<n; i++) {
        let nextPokemonIndex = lastPokemonIndex + 1;
        await displayPokemon(nextPokemonIndex);
        lastPokemonIndex = nextPokemonIndex;
        lastPokemonBeforeSearch = lastPokemonIndex;
    }
}

function getPokemon(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((data) => data.json())
        .catch((err) => {
            throw new Error(`API data error, ${err}`)});
}

async function displayPokemon(id) {
    try {
        const data = await getPokemon(id);
        createCard(data.name, data.id, data.sprites.other["official-artwork"].front_default, data.types, data.cries.latest);
    } catch(e) {
        console.log(`Display error on ID ${id}, ${e}`);
    }
}

async function findAllPokemons() {
    let allPokemons = [];
    for(let i=1; i<=1025; i++) {
        try {
            const data = await getPokemon(i);
            allPokemons.push(data);
        } catch (e) {
            console.log(`Error to find all Pokemons on id ${i}, ${e}`);
        }
    }
    return allPokemons;
}

const clear = document.querySelector(".close-icon");
function searchPokemon(input, pokemons) {
    const data = input.value.toLowerCase();
    clear.style.display = 'none';
    removeCards();
    if (data.length >= 1) {
        clear.style.display = '';
        clear.addEventListener("click", () => input.value = '');
        for (let i=0; i<pokemons.length; i++) {
            let name = pokemons[i].name;
            if (name.indexOf(data) > -1) {
                displayPokemon(pokemons[i].id);
            }
        }
    } else {
        refreshPage();
        
    }
}

function refreshPage() {
    lastPokemonIndex = 0;
    loadPokemon(lastPokemonBeforeSearch);
    lastPokemonBeforeSearch = 0;
}

async function main() {
    document.onload = loadPokemon(9);
    document.querySelector("button").addEventListener('click', function() {loadPokemon(27)});
    clear.style.display = 'none';
    
    const allPokemons = await findAllPokemons();
    console.log("All pokemons loaded!");
    const input = document.querySelector(".searchbar");
    input.addEventListener("keyup", () => searchPokemon(input, allPokemons));
}

main();
