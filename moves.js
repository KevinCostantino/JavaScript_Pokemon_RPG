// Função para buscar dados do Pokémon na PokeAPI
async function fetchPokemonData(moveName) {
    const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
    return response.json();
}

// Função para registrar movimentos de um Pokémon
async function getPokemonMoves(moveName) {
    const moveName = await fetchPokemonData(moveName);
    const moves = moveName.moves.slice(0, 4).map(move => move.move.name); // Limitar a 4 movimentos
    return {
        name: moveName.name,
        maxHP: moveName.stats.find(stat => stat.stat.name === "hp").base_stat,
        moves
    };
}
