
function createCard(name, id, img, types) {
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
    const card_name = createLabel("card-name", `${upperFirst(name)}`);

    card_info.appendChild(card_id);
    card_info.appendChild(card_name);
    card_info.appendChild(card_type_box);
    
    for (let i=0; i<types.length; i++) {
        const card_type = createDiv(`card-type ${types[i].type.name}`);
        const card_type_text = createLabel("card-type-text", `${upperFirst(types[i].type.name)}`);
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

function upperFirst(text) {
    return text[0].toUpperCase() + text.substring(1);
}

let loadedPokemons = [];
let lastPokemonIndex = 0;

async function loadPokemon(n) {
    for (let i=0; i<n; i++) {
        const nextPokemonIndex = lastPokemonIndex + 1;
        await displayPokemon(nextPokemonIndex);
        lastPokemonIndex = nextPokemonIndex;
    }
}

function getPokemon(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((data) => data.json())
        .catch((err) => console.log(`An Error occured: ${err}`));
}

async function displayPokemon(id) {
    const data = await getPokemon(id);
    console.log(data);
        if (!loadedPokemons.includes(data.id)) {
            loadedPokemons.push(data.id);
            createCard(data.name, data.id, data.sprites.other["official-artwork"].front_default, data.types);
        } else {
            console.log(`Pokemon #${id.toString().padStart(2, '0')} já foi carregado...`)
        }
}
// console.log(loadedPokemons);
document.onload = loadPokemon(9),
document.querySelector("button").addEventListener('click', function() {loadPokemon(400)});