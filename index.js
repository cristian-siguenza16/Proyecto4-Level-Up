var idRandom = [];
const cargarPokemones = async () => {
    try {
        let respuesta = [];
        for (let a = 0; a < 6; a++) {
            idRandom[a]=Math.floor(Math.random() * 898)+1;
            respuesta[a] = await fetch(`https://pokeapi.co/api/v2/pokemon/${idRandom[a]}`);
        }
        let pokemons = '';
        for (let a = 0; a < 6; a++) {
            // Si la respuesta es correcta
            if (respuesta[a].status === 200) {
                const datos = await respuesta[a].json();
                pokemons += `
                <div class="pokemon">
                    <p class="nombre">${datos.name.charAt(0).toUpperCase() + datos.name.slice(1)}</p>
                    <img class="sprit" srcset="${datos.sprites.front_default}">
                </div>
                `;
                document.getElementById('contenedor').innerHTML = pokemons;
            }
            else if (respuesta[a].status === 401) {
                console.log('Pusiste la llave mal');
            }
            else if (respuesta[a].status === 404) {
                console.log('La pelicula que buscas no existe');
            }
            else {
                console.log('Hubo un error y no sabemos que paso');
            }
        }

    } catch (error) {
        console.log(error);
    }

}

cargarPokemones();