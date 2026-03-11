await loadData(1);

async function loadData(generation){ 
    let apiLink = "https://tyradex.app/api/v1/gen/" + generation; 
    const data = await fetch (apiLink)
        .then(response => response.json())
        .catch(error => alert("Erreur : " + error));

    console.log('Données récupérées :', data);

    let selecteur = document.querySelector('select');
    console.log(selecteur.value)
    selecteur.addEventListener('click', ()=>{
        loadData(selecteur.value);
    });

    function getTypeColor(typeName) {
        switch (typeName) {
            case 'Plante':
                return '#139918';
            case 'Feu':
                return '#fb8b36';
            case 'Eau':
                return '#4999f5';
            case 'Poison':
                return '#c800ff';
            case 'Vol':
                return '#aedce1';
            case 'Insecte':
                return '#9ec530';
            case 'Électrik':
                return '#fbed6b';
            case 'Sol':
                return '#553423';
            case 'Fée':
                return '#f68af2'
            case 'Combat':
                return '#a14406';
            case 'Psy':
                return '#f87078'
            case 'Roche':
                return '#c4b987';
            case 'Glace':
                return '#0e067d'
            case 'Acier':
                return '#365f6d';
            case 'Spectre':
                return '#859eaf';
            case 'Dragon':
                return '#a0b40a';
            case 'Ténèbres':
                return '#2c0b6a';
            default:
                return '#757575';
        }
    }

    const main = document.querySelector('main');
    main.innerHTML = "";
    data.forEach(pokemon => {
        const article = document.createElement('article');
        const typesHTML = pokemon.types;
        if (pokemon.types.length === 2) {
            const color1 = getTypeColor(pokemon.types[0].name);
            const color2 = getTypeColor(pokemon.types[1].name);
            article.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
        } else {
            const color1 = getTypeColor(pokemon.types[0].name);
            const color2 = '#ffffff';
            article.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
        }

        let types = '<span class="types">';
        typesHTML.forEach(async (type)=>{
            types = `${types}${type.name} `;
        });
        types = `${types}</span>`;
        article.innerHTML = `
            <figure>
                <picture>
                    <img src="${pokemon.sprites.regular}" alt="Image ${pokemon.name}" />
                </picture>
                <figcaption>
                    ${types}
                    <h2>${pokemon.name.fr}</h2>
                    <ol>
                        <li>Points de vie : ${pokemon.stats.HP}</li>
                        <li>Attaque : ${pokemon.stats.attack}</li>
                        <li>Défense : ${pokemon.stats.defense}</li>
                        <li>Attaque spéciale : ${pokemon.stats.special_attack}</li>
                        <li>Défense spéciale : ${pokemon.stats.special_defense}</li>
                        <li>Vitesse : ${pokemon.stats.speed}</li>
                    </ol>
                </figcaption>
            </figure>
        `;
        main.appendChild(article);
    });
}