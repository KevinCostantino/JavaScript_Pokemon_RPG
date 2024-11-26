import { Poke } from './pokeapi.js';
import { updateHealth } from './pokeapiF.js';
import { endBattle } from './pokeapiF.js'; 
import { XPDX } from './XPf.js';
import { getXPGrowthRate } from './XPf.js';
import { Pokemon } from './Pokémon.js'
import { rival } from './script.js';
import { player } from './script.js';

// Define a Battle class
class Battle {
  constructor(pokemon1, pokemon2) {
    this.pokemon1 = pokemon1;
    this.pokemon2 = pokemon2;
    this.turn = 0;
  }

  startBattle() {
 
    while (this.pokemon1.isAlive() && this.pokemon2.isAlive()) {
      this.turn++;
      console.log(`Turn ${this.turn}:`);
      const attackModifierP = 1
      const attackModifierR = 1

      
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
  const stats2 = await response2.json();
  const levelType = "wt"
  const types = await fetch(`https://pokeapi.co/api/v2/type/${types}`);

  return new Pokemon(data.name, hp, attack, defense, specialAttack, specialDefense, speed, basexp,currentXP,level,levelType,types[0],types[1]);
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
export async function getPokemonStats(pokemonId,nível) {
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
   try {
    // Aguarda o resultado da taxa de crescimento
    const data2 = await getXPGrowthRate(pokemonId);

    // Busca os tipos do Pokémon
    const typesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const typesData = await typesResponse.json();

    // Função auxiliar para pegar os stats do Pokémon
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
        base_exp: pokemonStats.base_experience, // Base Experience
        currentXP: 0,
        levelType: data2.name, // Aqui agora funciona porque data2 foi aguardado
        type1: typesData.types[0]?.type?.name || null, // Tipo 1
        type2: typesData.types[1]?.type?.name || null // Tipo 2
      };

      console.log('Initial Pokémon:', initialPokemon);
      return initialPokemon;
    }
  } catch (error) {
    console.error('Erro ao criar o Pokémon:', error);

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

    // Função para buscar detalhes de um movimento específico
    export async function getMoveDetails(moveName) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
        const data = await response.json();
        return {
          name: data.name,
          power: data.power || 0,
          type: data.type.name, // Tipo do movimento
          isStatus: data.damage_class.name === 'status', // Identificar se é movimento de status
        };
      } catch (error) {
        console.error(`Erro ao buscar detalhes do movimento ${moveName}:`, error);
        return null; // Retorne null ou um valor padrão para evitar falhas
      }
    }
    


    // Função para buscar informações sobre um tipo
    async function getTypeData(typeName) {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
    
      return response.json();
    }

        // Função para calcular vantagem de tipos
    async function getTypeMultiplier(moveType, defenderTypes) {
      const typeData = await getTypeData(moveType);
      let multiplier = 1;

      defenderTypes.forEach(defenderType => {
        if (typeData.damage_relations.double_damage_to.some(type => type.name === defenderType)) {
          multiplier *= 2; // Super-efetivo
        }
        if (typeData.damage_relations.half_damage_to.some(type => type.name === defenderType)) {
          multiplier *= 0.5; // Não muito efetivo
        }
        if (typeData.damage_relations.no_damage_to.some(type => type.name === defenderType)) {
          multiplier *= 0; // Imune
        }
      });

      return multiplier;
    }

    // Função para calcular dano
    async function calculateDamage(attacker, defender, move) {

      if (move.isStatus) 
        {
        if (move.name === 'splash') {
          logMessage(`${LetraM1(attacker.name.name)} usou ${LetraM1(move.name)}, mas não teve efeito.`);
          return { damage: 0 };
        }
        else if (move.name === 'swords-dance') {
          logMessage(`${LetraM1(attacker.name.name)} usou ${LetraM1(move.name)}, seu ataque aumentou muito.`);
          attacker.name.extra.attackModifier =attacker.name.extra.attackModifier*2;
          return { damage: 0 };
        }
        else if (move.name === 'growl') {
          logMessage(`${LetraM1(attacker.name.name)} usou ${LetraM1(move.name)}, seu ataque aumentou muito.`);
          defender.name.extra.attackModifier =defender.name.extra.attackModifier*0.5;
          return { damage: 0 };
        }
        else{
          logMessage(`${LetraM1(attacker.name.name)} usou ${LetraM1(move.name)}, mas não sou burro porque 
            não programei`);
          return { damage: 0, effect: move.name + ' não causa dano direto.' };
        }
      }

    const basePower = move.power;
    const baseDamage = Math.floor(basePower * attacker.name.extra.attackModifier); // Modificador de ataque 
//era pra ser attacker.attackModifier aí em cima
    console.log("baseDamage",baseDamage * attacker.name.extra.attackModifier);

    const typeMultiplier = await getTypeMultiplier(move.type, defender.name.extra.types);
    console.log("typeMultiplier",typeMultiplier)
  
    const totalDamage = Math.max(baseDamage * typeMultiplier - defender.name.defense / 2, 0);

    let effectivenessMessage = ''; 
    if (typeMultiplier > 1) effectivenessMessage = 'É super-efetivo!';
    if (typeMultiplier < 1 && typeMultiplier > 0) effectivenessMessage = 'Não é muito efetivo...';
    if (typeMultiplier === 0) effectivenessMessage = 'Não teve efeito.';
    //console.log("hsdh",LetraM1(move.name))

    logMessage(`${LetraM1(attacker.name.name)} usou ${LetraM1(move.name)}! Causou ${totalDamage} de dano! ${effectivenessMessage}`);
    return { damage: totalDamage };
      }  
      

    // Função para log de mensagens
    function logMessage(message) {
      const log = document.getElementById('battle-log');
      document.getElementById('battle-log').style.display = 'block';
      const newMessage = document.createElement('p');
      newMessage.textContent = message;
      log.appendChild(newMessage);
      log.scrollTop = log.scrollHeight;
    }

    // Função para mostrar o status dos Pokémon 
    function updateStatus(player, opponent) {

          const status = document.getElementById('status');
          status.style.display = 'block';
          playerPokemonHealth.innerHTML = `
          <p><strong>Bulbasaur:</strong> ${Math.max(player.hp, 0)} HP</p>
        `;
          rivalPokemonHealth.innerHTML = `
          <p><strong>Charmander:</strong> ${Math.max(opponent.hp, 0)} HP</p>
        `;

          //console.log(`Status Atual - Jogador: ${player} HP: ${player.hp}, Rival: ${opponent} HP: ${opponent.hp}`);

        }


        async function getPokemonData(pokemonName) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
          const data = await response.json();
  
          return {
            name: data.name,
            types: data.types.map(typeInfo => typeInfo.type.name), // Obtendo os tipos do Pokémon
            stats: {
              hp: data.stats.find(stat => stat.stat.name === 'hp').base_stat,
              attack: data.stats.find(stat => stat.stat.name === 'attack').base_stat,
              Spattack: data.stats.find(stat => stat.stat.name === 'special-attack').base_stat,
              defense: data.stats.find(stat => stat.stat.name === 'defense').base_stat,
              Spdefense: data.stats.find(stat => stat.stat.name === 'special-defense').base_stat,
              Speed: data.stats.find(stat => stat.stat.name === 'speed').base_stat

            },
            moves: data.moves.map(moveInfo => moveInfo.move.name),
            attackModifier: 1, // Modificador de ataque inicial
          };
        }
    function LetraM1(str) {
          return str.charAt(0).toUpperCase() + str.slice(1);
        }
    // Função de batalha
    export async function PBattle(player) {
      (rivalSprite).style.display = "block";

      document.getElementById('text').style.display = 'none';
      document.getElementById('Inicial').style.display = 'none';

      player.party[0].name.extra = await getPokemonData(player.party[0].name.name);
      rival.party[0].name.extra = await getPokemonData(rival.party[0].name.name);

      document.getElementById("pokemonImage").style.display = "none"; 
      document.getElementById("battle-area").style.display = "block";
      document.getElementById("rival").innerHTML = `<img src="${'./Sprites/Green-transformed.png'}" alt="${'Green'}">`;
      document.getElementById("player-pokemon-image").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${player.party[0].name.id}.png`; // URL do sprite do Pokémon escolhido
      document.getElementById("rival-pokemon-image").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${rival.party[0].name.id}.png`; // URL do sprite do Pokémon escolhido
      
      //console.log("HP inicial:", player.party[0].name.hp);
    
      updateStatus(player.party[0].name, rival.party[0].name); // Atualize o status no início

    

      //const bulbasaur = await getPokemonData('bulbasaur');
      //const charmander = await getPokemonData('charmander');
      const attackButton = document.getElementById("controls");

      

        const movim = [];  // Cria o array para armazenar os detalhes dos movimentos
        for (let index = 0; index < player.party[0].moves.length; index++) {
          player.party[0].moves[index]= await getMoveDetails(player.party[0].moves[index]);
        }
      

      rival.party[0].moves = await Promise.all(
        rival.party[0].moves.slice(0, 4).map(async moveName => await getMoveDetails(moveName))
      );      

      let turn = 0;

      updateStatus(player.party[0].name, rival.party[0].name);

      function formatString(input) {
        return input
          .replace(/-/g, " ") // Substitui "-" por espaços
          .replace(/\b\w/g, char => char.toUpperCase()); // Capitaliza a primeira letra de cada palavra
      }

      
     

      

      
      const controls = document.getElementById('controls');
      controls.style.display = 'block';
      document.getElementById('battle-log').style.display = 'block';

      player.party[0].moves.forEach((move, index) => {
        const button = document.createElement('button');
        button.textContent = formatString(move.name);
        button.addEventListener('click', () => playerTurn(index));
        controls.appendChild(button);
      });

      let turnoAtual = 1; // Controla o número do turno

      async function playerTurn(choice) {
        if (isBattleOver()) return; // Verifica se a batalha já acabou
      
        // Player escolhe o movimento
        const playerMove = player.party[0].moves[choice];
        if (!playerMove) return;
      
        // Exibe o turno da batalha
        logMessage(`Turno ${turnoAtual}:`);
      
        // Resolve o turno
        await resolveTurn(playerMove);
      }
      
      async function resolveTurn(playerMove) {
        (player.party[0].name, rival.party[0].name);
        if (isBattleOver()) return; // Verifica novamente se a batalha já acabou
      
        const playerSpeed = player.party[0].name.extra.stats.Speed;
        console.log(playerSpeed);
        const rivalSpeed = rival.party[0].name.extra.stats.Speed;
      
        // Determina quem ataca primeiro
        if (playerSpeed >= rivalSpeed) {
          // Jogador ataca primeiro
          console.log("Jogador ataca primeiro");
          await executeAttack(player.party[0], rival.party[0], playerMove);
          if (!isBattleOver()) { // Se a batalha não acabou, o rival ataca
            const rivalMove = getRandomMove(rival.party[0].moves);
            await executeAttack(rival.party[0], player.party[0], rivalMove);
            updateStatus(player.party[0].name, rival.party[0].name);

          }
        } else {
          // Rival ataca primeiro
          console.log("Rival ataca primeiro");
          const rivalMove = getRandomMove(rival.party[0]);
          console.log(rivalMove);
          await executeAttack(rival.party[0], player.party[0], rivalMove);
          if (!isBattleOver()) { // Se a batalha não acabou, o jogador ataca
            await executeAttack(player.party[0], rival.party[0], playerMove);
            updateStatus(player.party[0].name, rival.party[0].name);
          }
        }
      
        // Aumenta o turno para a próxima rodada
        turnoAtual++;

        updateStatus(player.party[0].name, rival.party[0].name); // Atualize o status no início

        // Verifica o status da batalha no final do turno
        checkBattleStatus();
      }
      
      async function executeAttack(attacker, defender, move) {
        const { damage } = await calculateDamage(attacker, defender, move);
        defender.name.hp -= damage;
            
        if (defender.name.hp <= 0) {
          logMessage(`${LetraM1(defender.name.name)} foi derrotado!`);
        }
      }
      
      function getRandomMove(pokemon) {
        return pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)];
      }
      
      function checkBattleStatus() {
        if (player.party[0].name.hp <= 0) {
          logMessage('Você perdeu a batalha!');
          endBattle('rival');
        } else if (rival.party[0].name.hp <= 0) {
          logMessage('Você venceu a batalha!');
          //console.log("XP inicial:",player.party[0]);
          XPDX(player.party[0].name.currentXP,player.party[0].name.levelType,rival.party[0].name.base_exp,player.party[0].name.level,rival.party[0].name.level)
          endBattle('player');
        }
      }
      
      function isBattleOver() {
        // Verifica se qualquer Pokémon tem HP 0 ou menos
        return player.party[0].name.hp <= 0 || rival.party[0].name.hp <= 0;
      }
      
      function endBattle(winner) {
        setTimeout(() => {
          console.log(winner === 'player' ? 'Você venceu!' : 'Você perdeu!');
          alert(winner === 'player' ? 'Você venceu!' : 'Você perdeu!');
        }, 1000);
      }
      
      // Função para exibir mensagens no log
      function logMessages(message) {
        console.log(message); // Aqui você pode implementar um sistema de log para mostrar na interface do jogo
      }
      
      function updateStatuss(playerPokemon, rivalPokemon) {
        // Atualize o status dos Pokémon (por exemplo, HP)
      }
      
    }      

    