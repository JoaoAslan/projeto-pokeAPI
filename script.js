async function getPokemon(arg) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${arg}`)
        .then((res) => res.json())
        .catch((e) => console.log(`API Fetch error, arg: ${arg}\n${e}`));
}

let lastIndex = 0;
function loadPokemons(n) {
    for (let i=1; i<=n; i++) {
        let nextIndex = lastIndex + 1;
        const btn = document.querySelector('.load-cards');
        if (nextIndex >= 1025) {
            btn.style.display = 'none';
            break;
        } else {
            btn.style.display = '';
        }
        try {
            const pokemon_data = loadedPokemons[nextIndex-1];
            createCard(pokemon_data);
        } catch (e) {
            console.log(`Load error on index ${nextIndex}\n${e}`);
        }
        lastIndex = nextIndex;
    }
}

let loadedPokemons = [];
async function loadAllPokemons() {
    loadingPage();
    for(let i=1; i<=1025; i++) {
        const pokemon_data = await getPokemon(i);
        if (!(pokemon_data === undefined)) {
            loadedPokemons.push(pokemon_data);
        }
    }
    finishLoadingPage();
}

let lastIndexBeforeSearch = 0;
function searchPokemon(search) {
    loadPokemons(loadedPokemons.length);
    const delIcon = document.querySelector('.close-icon');
    
    if (search.length >= 1) {
        delIcon.style.display = '';
        delIcon.addEventListener('click', () => {
            document.querySelector('.searchbar').value = '';
            delIcon.style.display = 'none';
            refreshPage();
        });

        loadedPokemons.forEach((pokemon_data) => {
            const card = document.getElementById(pokemon_data.name);
            const pokemonName = pokemon_data.name;
            const formattedName = formatName(pokemonName).toLowerCase();
            if (formattedName.indexOf(search.toLowerCase()) > -1) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        })
    } else {
        delIcon.style.display = 'none';
        refreshPage();
    }
}

function refreshPage() {
    removeCards();
    lastIndex = 0;
    loadPokemons(startLoad);
}

function loadingPage() {
    hideCards();
    const load_btn = document.querySelector('.load-cards');
    load_btn.style.display = 'none';

    const container = document.querySelector('.container-content');

    const card_loading = createDiv('card-loading');
    const spinda_loading = createImg('spinda-loading', 'imgs/spinda.gif', 'spinda-gif');
    const load_title = createLabel('load-title', 'Loading');

    container.insertAdjacentElement('afterbegin', card_loading);
    card_loading.appendChild(spinda_loading);
    card_loading.appendChild(load_title);

    let dots = 0;
    setInterval(() => {
        dots = (dots + 1) % 4;
        load_title.textContent = 'Loading' + '.'.repeat(dots);
    }, 500);
}

function finishLoadingPage() {
    showCards();
    const card_loading = document.querySelector('.card-loading');
    card_loading.style.display = 'none';
    const load_btn = document.querySelector('.load-cards');
    load_btn.style.display = '';
}

function hideCards() {
    const cards = document.querySelectorAll('.card-box');
    cards.forEach(card => {
        card.style.display = 'none';
    });
}

function showCards() {
    const cards = document.querySelectorAll('.card-box');
    cards.forEach(card => {
        card.style.display = '';
    });
}

function removeCards() {
    const cards = document.querySelectorAll(".card-box");
    cards.forEach(card => {
        card.remove();
    });
}

function createCard(pokemon_data) {
    const name = pokemon_data.name;
    const id = pokemon_data.id;
    const img = pokemon_data.sprites.other['official-artwork'].front_default;
    let audio = pokemon_data.cries.latest;
    const types = pokemon_data.types;

    const container = document.querySelector('.content-cards');

    const card_box = document.createElement('div');
    card_box.className = "card-box";
    card_box.id = name;

    const card_info = createDiv('card-info');
    const card_type_box = createDiv('card-types-box');
    const card_box_img = createDiv('card-box-img');

    container.appendChild(card_box);
    card_box.appendChild(card_info);
    card_box.appendChild(card_box_img);

    const card_img = createImg('card-img', `${img}`, `${name}`);
    card_box_img.appendChild(card_img);

    const card_id = createLabel('card-id', `#${id.toString().padStart(2, '0')}`);
    const card_name = createLabel('card-name', `${formatName(name)}`);

    card_box.addEventListener('click', () => {
        const card_audio = createAudio('card-audio', `${audio}`);
        card_audio.volume = 0.05;
        card_audio.play();
        card_audio.remove();
    });

    card_info.appendChild(card_id);
    card_info.appendChild(card_name);
    card_info.appendChild(card_type_box);

    if (name.length > 10) {
        card_name.style.fontSize = '24px';
    }
    for (let i=0; i<types.length; i++) {
        const card_type = createDiv(`card-type ${types[i].type.name}`);
        const card_type_text = createLabel('card-type-text', `${formatName(types[i].type.name)}`);
        const card_type_icon = createImg('card-type-icon', `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/${types[i].type.name}.svg`, `${types[i].type.name}`);
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

function formatName(name) {
    return name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
    ).join(' ');
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

let startLoad = 9;
function buttonEventClick() {
    const loads = 27;
    const btn = document.querySelector('.load-cards');
    btn.addEventListener('click', () => {
        loadPokemons(loads);
        startLoad += loads;
    });
}

function searchEventInput() {
    const delIcon = document.querySelector('.close-icon');
    console.log(delIcon);
    delIcon.style.display = 'none';
    const searchbar = document.querySelector('.searchbar');
    searchbar.addEventListener('input', e => {
        const value = e.target.value;
        searchPokemon(value);
    })
}

async function main() {
    try {
        await loadAllPokemons();
        loadPokemons(startLoad);
        buttonEventClick();
        searchEventInput();
    } catch (e){
        console.log(`An error occured: ${e}`);
    }
}

main();