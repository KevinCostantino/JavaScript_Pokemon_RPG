import { Poke } from './pokeapi.js';
import { updateHealth } from './pokeapiF.js';

// Define a Pokemon class


// Define a Battle class
class Battle {
  constructor(pokemon1, pokemon2) {
    this.pokemon1 = pokemon1;
    this.pokemon2 = pokemon2;
    this.turn = 0;
  }

  startBattle() {
    console.log(`ASAs`);
    while (this.pokemon1.isAlive() && this.pokemon2.isAlive()) {
      this.turn++;
      console.log(`Turn ${this.turn}:`);

      // Determine which Pokémon attacks first based on speed
      if (this.pokemon1.speed > this.pokemon2.speed) {
        this.pokemon1.attackOpponent(this.pokemon2);
        console.log(`${this.pokemon1.name} attacks ${this.pokemon2.name} for ${this.pokemon2.hp} damage!`);
        if (!this.pokemon2.isAlive()) break;
        this.pokemon2.attackOpponent(this.pokemon1);
        console.log(`${this.pokemon2.name} attacks ${this.pokemon1.name} for ${this.pokemon1.hp} damage!`);
      } else {
        this.pokemon2.attackOpponent(this.pokemon1);
        console.log(`${this.pokemon2.name} attacks ${this.pokemon1.name} for ${this.pokemon1.hp} damage!`);
        if (!this.pokemon1.isAlive()) break;
        this.pokemon1.attackOpponent(this.pokemon2);
        console.log(`${this.pokemon1.name} attacks ${this.pokemon2.name} for ${this.pokemon2.hp} damage!`);
      }
    }
        // Update the HP values of the Pokémon objects
        updateHealth(this.pokemon1, damage);
        updateHealth(this.pokemon2, damage);
    console.log(`Battle ended! ${this.pokemon1.isAlive() ? this.pokemon1.name : this.pokemon2.name} wins!`);
  }
}

// Fetch data from the PokeAPI and create Pokemon instances
async function createPokemon(name) {
  console.log("as: ", name);
  const data = await Poke(name);
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const stats = await response.json();
  const hp = stats.stats.find(stat => stat.stat.name === 'hp').base_stat;
  const attack = stats.stats.find(stat => stat.stat.name === 'attack').base_stat;
  const defense = stats.stats.find(stat => stat.stat.name === 'defense').base_stat;
  const specialAttack = stats.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
  const specialDefense = stats.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
  const speed = stats.stats.find(stat => stat.stat.name === 'speed').base_stat;
  const basexp = XPFiltro(name);
  const currentXP = 0

  const response2 = await fetch(`https://pokeapi.co/api/v2/growth-rate/${name}`);
  console.log(response2);
  const stats2 = await response2.json();
  const levelType = stats2.stats2.find(stat => stat.stat.name === 'name').base_stat;

  console.log("aga",levelType);
  return new Pokemon(data.name, hp, attack, defense, specialAttack, specialDefense, speed, basexp,currentXP,levelType);
}

export async function startBattle(playerPokemon, trainerPokemon) {
    // Create Pokémon instances
    const [playerPokemonInstance, trainerPokemonInstance] = await Promise.all([
      createPokemon(playerPokemon),
      createPokemon(trainerPokemon)
    ]);
  
    // Create a Battle instance
    const battle = new Battle(playerPokemonInstance, trainerPokemonInstance);
  
    // Start the battle
    battle.startBattle();
  }

export async function getPokemonStats(pokemonId) {
    async function getPokemonStatsAux(pokemonId) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching Pokémon stats:', error);
        return null;
      }
    }
    const response2 = await fetch(`https://pokeapi.co/api/v2/growth-rate/${pokemonId}`);
    const data2 = await response2.json();

    const pokemonStats = await getPokemonStatsAux(pokemonId);
    if (pokemonStats) {
      const initialPokemon = {
        name: pokemonStats.name,
        level: 5,
        id: pokemonId,
        hp: pokemonStats.stats[0].base_stat, // HP
        attack: pokemonStats.stats[1].base_stat, // Attack
        defense: pokemonStats.stats[2].base_stat, // Defense
        special_attack: pokemonStats.stats[3].base_stat, // Special Attack
        special_defense: pokemonStats.stats[4].base_stat, // Special Defense
        speed: pokemonStats.stats[5].base_stat, // Speed
        base_exp: pokemonStats.base_experience, // Correctly accessing base experience
        currentXP : 0,
        levelType: data2.name
      };
  
      console.log(initialPokemon);
      return initialPokemon; // Retorne o objeto initialPokemon
    } else {
      console.log('Failed to fetch Pokémon stats');
    }
  }

  function XPFiltro(id)
{
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao buscar os dados da API');
    }
    return response.json();
  })
  .then(data => {
    const baseExperience = data.base_experience;
    console.log('Base Experience:', baseExperience);
    return baseExperience;s
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}