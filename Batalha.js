import { Poke } from './pokeapi.js';
import { updateHealth } from './pokeapiF.js';
import { endBattle } from './pokeapiF.js'; 
import { XPDX } from './XPf.js';
import { getXPGrowthRate } from './XPf.js';
import { Pokemon } from './Pokémon.js'
import { rival } from './script.js';
import { player } from './script.js';
import { initializeProgressBar } from './HPbar.js';

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
    console.log("BD: ",pokemonId);
    const data2 = await getXPGrowthRate(pokemonId);

    // Busca os tipos do Pokémon
    const typesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const typesData = await typesResponse.json();
    let modifiers = {   AtkMod: 1,  SpaAtkMod: 1,  DefMod: 1,  SpaDefMod: 1,  SpeMod: 1 };
    // Função auxiliar para pegar os stats do Pokémon
    const pokemonStats = await getPokemonStatsAux(pokemonId);

    function calculateHP(baseHP, level) {
      // Fórmula especial para HP
      return Math.floor(((2 * baseHP + 31 + Math.floor(0 / 4)) * level) / 100) + level + 10;
  }
  function calculateStat(baseStat, level) {
    // Fórmula para Status Físicos e Especiais
    const stat = Math.floor(
        Math.floor(((2 * baseStat + 31 + Math.floor(0 / 4)) * level) / 100) + 5
    );

    // Aplicar modificador de natureza
    return Math.floor(stat);
}
    if (pokemonStats) {
      const initialPokemon = {
        name: pokemonStats.name,
        level: 5,
        id: pokemonId,
        hp: calculateHP(pokemonStats.stats[0].base_stat,5), // HP
        attack: calculateStat(pokemonStats.stats[1].base_stat,5), // Attack
        defense: calculateStat(pokemonStats.stats[2].base_stat,5), // Defense
        special_attack: calculateHP(pokemonStats.stats[3].base_stat,5), // Special Attack
        special_defense: calculateHP(pokemonStats.stats[4].base_stat,5), // Special Defense
        speed: calculateHP(pokemonStats.stats[5].base_stat,5), // Speed
        base_exp: pokemonStats.base_experience, // Base Experience
        currentXP: 0,
        levelType: data2.name, // Aqui agora funciona porque data2 foi aguardado
        type1: typesData.types[0]?.type?.name || null, // Tipo 1
        type2: typesData.types[1]?.type?.name || null, // Tipo 2
        mod: modifiers,
        TotalHP: calculateHP(pokemonStats.stats[0].base_stat,5),
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
          accuracy: data.accuracy || 0,
          damage_class: data.damage_class.name,
          pp: data.pp,
          priority: data.priority,

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
      console.log("typeData:", typeData);
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
          attacker.name.mod.AtkMod =attacker.name.mod.AtkMod*2;
          return { damage: 0 };
        }
        else if (move.name === 'growl') {
          logMessage(`${LetraM1(attacker.name.name)} usou ${LetraM1(move.name)}, seu ataque diminuiu um pouco.`);
          defender.name.mod.AtkMod =defender.name.name.mod.AtkMod*0.5;
          return { damage: 0 };
        }
        else{
          logMessage(`${LetraM1(attacker.name.name)} usou ${LetraM1(move.name)}, mas sou burro porque 
            não programei`);
          return { damage: 0, effect: move.name + ' não causa dano direto.' };
        }
      }
      async function TotalDamageAndClass(move, attacker, defender) {
        const basePower = move.power;
        const critical = Math.random() < 0.042 ? 1.5 : 1; // Crítico
        const randomFactor = Math.random() * (1 - 0.85) + 0.85; // Aleatório entre 0.85 e 1.00
        const stab = attacker.name.extra.types.includes(move.type) ? 1.5 : 1;
        const otherModifiers = 1; // Exemplo: Itens, clima, etc.
        const IV = 31
        const EV = 0

      


        switch (move.damage_class) {
            case "physical":
                console.log("P");
                //const baseDamage = Math.floor(((2 * level) / 5 + 2) * basePower * attacker.name.attack / defender.name.defense / 50) + 2;
                const PbaseDamage = Math.floor((((((2 * attacker.name.level) / 5 + 2) * basePower * ((attacker.name.attack* attacker.name.mod.AtkMod) / defender.name.defense)) / 50)+2)); // Modificador de ataque
                const PtypeMultiplier = await getTypeMultiplier(move.type, defender.name.extra.types);
                console.log("PtypeMultiplier:", PtypeMultiplier);
                const PtotalDamage = Math.floor(PbaseDamage * critical * randomFactor * stab * PtypeMultiplier);
                return [Math.round(PtotalDamage), PtypeMultiplier]; // Return an array
            case "special":
                console.log("S");
                const SbaseDamage = Math.floor((((((2 * attacker.name.level) / 5 + 2) * basePower * ((attacker.name.special_attack* attacker.name.mod.SpaAtkMod) / defender.name.special_defense)) / 50)+2)); // Modificador de ataque
                //const SbaseDamage = Math.floor(basePower * attacker.name.extra.attackModifier); // Modificador de ataque
                const StypeMultiplier = await getTypeMultiplier(move.type, defender.name.extra.types);
                console.log("StypeMultiplier:", StypeMultiplier);
                const StotalDamage = Math.floor(SbaseDamage * critical * randomFactor * stab * StypeMultiplier);
                return [Math.round(StotalDamage), StypeMultiplier]; // Return an array
            default:
                throw new Error(`Unknown damage class: ${move.damage_class}`);
        }
    }
    
    
const [totalDamage, typeMultiplier] = await TotalDamageAndClass(move, attacker, defender);
console.log("typeMultiplier:", typeMultiplier);


//era pra ser attacker.attackModifier aí em cima
    //console.log("baseDamage",baseDamage * attacker.name.extra.attackModifier);



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
    function updateStatus(player, opponent,dano,vidaAntigaP,vidaAntigaO,atacante) {

          const status = document.getElementById('status');
          status.style.display = 'block';

    // Selecionando os elementos da barra de progresso
     console.log(atacante)
     

document.getElementById('playerPokemonHealth').innerHTML = `<p><strong>${player.name[0].toUpperCase() + player.name.substring(1)}:</strong></p>
<div class="container">
  <div id="${playerProgressBar}" class="progress-bar" style="width: style="transition ${100}%;"></div>
</div>
<p>${Math.max(player.hp, 0)}/${player.TotalHP} HP</p>

`;

      document.getElementById('rivalPokemonHealth').innerHTML = `<p><strong>${opponent.name[0].toUpperCase() + opponent.name.substring(1)}:</strong></p>
       <div class="container">
         <div id="${opponentProgressBar}" class="progress-bar" style="width: ${100}%;"></div>
       </div>
       <p>${Math.max(opponent.hp, 0)}/${opponent.TotalHP} HP</p>
     `;
    // Inicializando as barras de progresso
    if (vidaAntigaP != null && dano != null && atacante == "rival") {
      updateRivalHealth(player, dano, atacante,opponent);
      console.log("HA")
      console.log(dano)
      updatePlayerHealth(player, dano, atacante,opponent);
      return;
    } else if (vidaAntigaO != null && dano != null && atacante == "player") {
      updatePlayerHealth(player, dano, atacante,opponent);
      updateRivalHealth(player, dano, atacante,opponent);
      return;
    }
  }

  function updatePlayerHealth(player, dano, atacante,opponent) {
    const playerProgressBar = document.getElementById('playerProgressBar');
    const opponentProgressBar = document.getElementById('opponentProgressBar');
    var Bar,hp,hpt,pokename,Id = null;
    let ps = null; 
    if (atacante == "rival") {
    
      console.log("player.hp!: ",player.hp)
      ps = Math.round(((player.hp) / player.TotalHP) * 100);
      if (ps < 0) {
        ps = 0
      }
      playerProgressBar.style.width = `${ps}%`;
      playerProgressBar.transition = `width 1.5s ease`

      console.log("ps0!: ",ps)
      Id = 'playerPokemonHealth'
      pokename = player
      Bar = playerProgressBar;
      hp = player.hp;
      hpt = player.TotalHP;
      document.getElementById(Id).innerHTML = `
      <p><strong>${pokename.name[0].toUpperCase() + pokename.name.substring(1)}:</strong></p>
      <div class="container">
        <div id="${Bar}" class="progress-bar" style="width: ${ps}%;"></div>
      </div>
      <p>${Math.max(hp, 0)}/${hpt} HP</p>
    `;


    }else if (atacante == "player") {
      console.log("player.hp!: ",player.hp)
       ps = Math.round(((player.hp) / player.TotalHP) * 100);
       if (ps < 0) {
        ps = 0
      }
       playerProgressBar.style.width = `${ps}%`;
       console.log("ps0!: ",ps)
       Id = 'playerPokemonHealth'
       pokename = player
       Bar = playerProgressBar;
       hp = player.hp;
       hpt = player.TotalHP;
       document.getElementById(Id).innerHTML = `
       <p><strong>${pokename.name[0].toUpperCase() + pokename.name.substring(1)}:</strong></p>
       <div class="container">
         <div id="${Bar}" class="progress-bar" style="width: ${ps}%;"></div>
       </div>
       <p>${Math.max(hp, 0)}/${hpt} HP</p>
     `;

    }
    console.log("vida:",player.hp);
    
    console.log("ps1!: ",ps)

  }
  
  function updateRivalHealth(player, dano, atacante,opponent) {
    const opponentProgressBar = document.getElementById('opponentProgressBar');
    const playerProgressBar = document.getElementById('playerProgressBar');
    var Bar,hp,hpt,pokename,Id = null;
    let ps = null; 
    if (atacante == "rival") {
      ps = Math.round(((opponent.hp) / opponent.TotalHP) * 100);
      if (ps < 0) {
        ps = 0
      }
      opponentProgressBar.style.width = `${ps}%`;
      opponentProgressBar.style.transition = `width 1.5s ease`

      console.log("opponent.hp!: ",opponent.hp)
      Id = 'rivalPokemonHealth'
      pokename = opponent
      Bar = opponentProgressBar;
      hp = opponent.hp;
      hpt = opponent.TotalHP;
      console.log("ps0!: ",ps)
      document.getElementById(Id).innerHTML = `
      <p><strong>${pokename.name[0].toUpperCase() + pokename.name.substring(1)}:</strong></p>
      <div class="container">
        <div id="${Bar}" class="progress-bar" style="width: ${ps}%;"></div>
      </div>
      <p>${Math.max(hp, 0)}/${hpt} HP</p>
    `;
   }else if (atacante == "player") {
  ps = Math.round(((opponent.hp) / opponent.TotalHP) * 100);
  if (ps < 0) {
    ps = 0
  }
  opponentProgressBar.style.width = `${ps}%`;
  opponentProgressBar.style.transition = `width 1.5s ease`

  console.log("opponent.hp!: ",opponent.hp)
  console.log("pss!: ",ps)

  Id = 'rivalPokemonHealth'
  pokename = opponent
  Bar = opponentProgressBar;
  hp = opponent.hp;
  hpt = opponent.TotalHP;
  console.log("ps0!: ",dano)
  document.getElementById(Id).innerHTML = `
  <p><strong>${pokename.name[0].toUpperCase() + pokename.name.substring(1)}:</strong></p>
  <div class="container">
    <div id="${Bar}" class="progress-bar" style="width: ${ps}%;"></div>
  </div>
  <p>${Math.max(hp, 0)}/${hpt} HP</p>
`;
 }
   console.log("vidsa:",player.hp);




console.log("af",Math.max(ps, 0))
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
      let vidaAntigaP = player.party[0].name.hp;
      let vidaAntigaO = rival.party[0].name.hp;


      updateStatus(player.party[0].name, rival.party[0].name, null, vidaAntigaP,vidaAntigaO);      // Atualize o status no início

    

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
      
        let dano, vidaAntiga, atacante;

        // Determina quem ataca primeiro
        if (playerSpeed >= rivalSpeed) {
          // Jogador ataca primeiro
          console.log("Jogador ataca primeiro");
        
          // Executa o ataque do jogador
          const dano = await executeAttack(player.party[0], rival.party[0], playerMove);
          //dano = result.damage;
          //vidaAntigaO = result.vidaAntiga;
          atacante = "player";
        
          // Atualiza o status após o ataque do jogador
          updateStatus(player.party[0].name, rival.party[0].name, dano, vidaAntigaP,vidaAntigaO,atacante);      // Atualize o status no início
        
          // Verifica se a batalha não acabou, então o rival ataca
          if (!isBattleOver()) {
            const rivalMove = getRandomMove(rival.party[0]);
            const dano = await executeAttack(rival.party[0], player.party[0], rivalMove);
            //dano = resultRival.damage;
            //vidaAntigaP = resultRival.vidaAntiga;
            atacante = "rival";
        
            // Atualiza o status após o ataque do rival
            updateStatus(player.party[0].name, rival.party[0].name, dano, vidaAntigaP,vidaAntigaO,atacante);      // Atualize o status no início
          }
        } else {
          // Rival ataca primeiro
          console.log("Rival ataca primeiro");
          const rivalMove = getRandomMove(rival.party[0]);
          const dano = await executeAttack(rival.party[0], player.party[0], rivalMove);
          //dano = result.damage;
          //vidaAntigaP = result.vidaAntiga;
          atacante = "rival";
        
          // Atualiza o status após o ataque do rival
          updateStatus(player.party[0].name, rival.party[0].name, dano, vidaAntigaP,vidaAntigaO,atacante);      // Atualize o status no início
        
          // Verifica se a batalha não acabou, então o jogador ataca
          if (!isBattleOver()) {
            const dano = await executeAttack(player.party[0], rival.party[0], playerMove);
            //dano = resultPlayer.damage;
            //vidaAntigaO = resultPlayer.vidaAntiga;
            

            atacante = "player";
        
            // Atualiza o status após o ataque do jogador
            updateStatus(player.party[0].name, rival.party[0].name, dano, vidaAntigaP,vidaAntigaO,atacante);      // Atualize o status no início
          }
        }
        // Aumenta o turno para a próxima rodada
        turnoAtual++;
        console.log(`Turno ${turnoAtual} finalizado. Último ataque realizado por: ${atacante}`);
        
        // Verifica o status da batalha no final do turno
        checkBattleStatus();
      }
      
      async function executeAttack(attacker, defender, move) {
        const { damage } = await calculateDamage(attacker, defender, move);
        //const vidaAntiga = defender.name.hp;
        defender.name.hp -= damage;
            
        if (defender.name.hp <= 0) {
          logMessage(`${LetraM1(defender.name.name)} foi derrotado!`);
        }
        return damage;
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

    