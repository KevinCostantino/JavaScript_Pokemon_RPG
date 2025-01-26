import { endBattleF } from './pokeapiF.js'; 
import { XPDX } from './XPf.js';
import { getXPGrowthRate } from './XPf.js';
import { options } from './Opções.js';
import { Pokemon } from './Pokémon.js'
//import { rival } from './script.js';
import { menu} from './script.js';

//btn2.addEventListener("click", () => exampleUsage("btn2"));
btn2.addEventListener("click", () => console.log("OSJDODJ"));




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
    //console.log("BD: ",pokemonId);
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
        level: nível,
        id: pokemonId,
        hp:calculateHP(pokemonStats.stats[0].base_stat,5), // HP
        attack: calculateStat(pokemonStats.stats[1].base_stat,5), // Attack
        defense: calculateStat(pokemonStats.stats[2].base_stat,5), // Defense
        special_attack: calculateStat(pokemonStats.stats[3].base_stat,5), // Special Attack
        special_defense: calculateStat(pokemonStats.stats[4].base_stat,5), // Special Defense
        speed: calculateStat(pokemonStats.stats[5].base_stat,5), // Speed
        base_exp: pokemonStats.base_experience, // Base Experience
        currentXP: 0,
        levelType: data2.name, // Aqui agora funciona porque data2 foi aguardado
        type1: typesData.types[0]?.type?.name || null, // Tipo 1
        type2: typesData.types[1]?.type?.name || null, // Tipo 2
        mod: modifiers,
        TotalHP: calculateHP(pokemonStats.stats[0].base_stat,5),
        hptemp: calculateHP(pokemonStats.stats[0].base_stat,5),
        NdeMov: 4,
      };

      //console.log('Initial Pokémon:', initialPokemon);
      return initialPokemon;
    }
  } catch (error) {
    console.error('Erro ao criar o Pokémon:', error);

  }
}


    // Função para buscar detalhes de um movimento específico
export async function getMoveDetails(moveName) {
      try {
        console.log(`Buscando detalhes do movimentodS: ${moveName}`);
        if (moveName == "[object Object]") {
          console.log("Objeto");
          return null;
        }
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
      //console.log("typeData:", typeData);
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
export async function calculateDamage(attacker, defender, move,turnoAtual) {
    console.log("move",move,attacker.name.name);
    console.log("move",move.isStatus,attacker.name.name);
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
          defender.name.mod.AtkMod =defender.name.mod.AtkMod*0.7072;
          console.log("sfSsw",defender.name.mod.AtkMod);

          return { damage: 0 };
        }
        else{
          logMessage(`${LetraM1(attacker.name.name)} usou ${LetraM1(move.name)}, mas sou burro porque 
            não programei`);
          return { damage: 0, effect: move.name + ' não causa dano direto.' };
        }
      }
      else{
        console.log("ok",move);
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
                //console.log("P");
                //const baseDamage = Math.floor(((2 * level) / 5 + 2) * basePower * attacker.name.attack / defender.name.defense / 50) + 2;
                const PbaseDamage = Math.floor((((((2 * attacker.name.level) / 5 + 2) * basePower * ((attacker.name.attack* attacker.name.mod.AtkMod) / defender.name.defense)) / 50)+2)); // Modificador de ataque
                const PtypeMultiplier = await getTypeMultiplier(move.type, defender.name.extra.types);
                console.log("PtypeMultiplier:", PtypeMultiplier);
                const PtotalDamage = Math.floor(PbaseDamage * critical * randomFactor * stab * PtypeMultiplier);
                return [Math.round(PtotalDamage), PtypeMultiplier]; // Return an array
            case "special":
                //console.log("S");
                const SbaseDamage = Math.floor((((((2 * attacker.name.level) / 5 + 2) * basePower * ((attacker.name.special_attack* attacker.name.mod.SpaAtkMod) / defender.name.special_defense)) / 50)+2)); // Modificador de ataque
                //const SbaseDamage = Math.floor(basePower * attacker.name.extra.attackModifier); // Modificador de ataque
                const StypeMultiplier = await getTypeMultiplier(move.type, defender.name.extra.types);
                //console.log("StypeMultiplier:", StypeMultiplier);
                const StotalDamage = Math.floor(SbaseDamage * critical * randomFactor * stab * StypeMultiplier);
                return [Math.round(StotalDamage), StypeMultiplier]; // Return an array
            case undefined:
              let aux = 0;
              return [0, 1];
            default:
                throw new Error(`Unknown damage class: ${move.damage_class}`);
        }
           }
    

const [totalDamage, typeMultiplier] = await TotalDamageAndClass(move, attacker, defender);
//console.log("typeMultiplier:", typeMultiplier);


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
export function logMessage(message) {
      const log = document.getElementById('battle-log');
      document.getElementById('battle-log').style.display = 'block';
      const newMessage = document.createElement('p');
      newMessage.textContent = message;
      log.appendChild(newMessage);
      log.scrollTop = log.scrollHeight;
    }

function clearLog() {
      const log = document.getElementById('battle-log');
      log.innerHTML = ''; // Remove todo o conteúdo
      log.style.display = 'none'; // Opcional: Esconde o log novamente
    }
    // Função para mostrar o status dos Pokémon 
export function updateStatus(player, opponent,dano,vidaAntigaP,vidaAntigaO,atacante,opponentLV) {
  //btn1.removeEventListener("click", handleBtn1Click);

          const status = document.getElementById('status');
          status.style.display = 'block';
          //opponent.level=opponentLV
    // Selecionando os elementos da barra de progresso
     console.log("OPONENTE",opponent)
     

     document.getElementById('playerName').innerHTML = 
 `<p><strong>${player.name[0].toUpperCase()  + 
  player.name.substring(1)}</strong></p>
  `
  document.getElementById('pokeLv').innerHTML = 
  `<p><strong>Lv.${player.level}</strong></p>
   `;

document.getElementById('playerPokemonHealth').innerHTML = 
`
<p>${Math.max(player.hp, 0)}/${player.TotalHP} HP</p>

`;playerInfo
document.getElementById('opponentName').innerHTML = 
`<p><strong>${opponent.name[0].toUpperCase()  + 
  opponent.name.substring(1)}</strong></p>
  `
  //console.log("ALOUQ",opponent.level)
  document.getElementById('RpokeLv').innerHTML = 
  `<p><strong>Lv.${opponent.level}</strong></p>
   `;
      document.getElementById('rivalPokemonHealth').innerHTML = 
`
      <p>${Math.max(opponent.hp, 0)}/${opponent.TotalHP} HP</p>
     `;

     
    // Inicializando as barras de progresso
    if (vidaAntigaP != null && dano != null && atacante == "rival") {
      updateRivalHealth(player, dano, atacante,opponent);
      //console.log("HA")
      //console.log(dano)
      updatePlayerHealth(player, dano, atacante,opponent);
      return;
    } else if (vidaAntigaO != null && dano != null && atacante == "player") {
      updatePlayerHealth(player, dano, atacante,opponent);
      updateRivalHealth(player, dano, atacante,opponent);
      return;
    }
  }
export function updatePlayerHealth(player, dano, atacante,opponent) {
    
    const playerProgressBar = document.getElementById("PprogressBar");


    let pap = 845; // Porcentagem máxima
    let progressa = 200; // Porcentagem inicial da barra
    let pa = Math.round((progressa / pap) * 100); // Porcentagem inicial ajustada para 100%

    updateProgressBar(100,playerProgressBar); // Inicializa a barra
    //setTimeout(20000);
    //updateProgressBar(pa); // Inicializa a porcentagem da barra

    //console.log("pa",pa);
    
    // Função para atualizar a barra e o texto

    
    //const playerProgressBar = document.getElementById('playerProgressBar');
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

      //console.log("ps0!: ",ps)
      Id = 'playerPokemonHealth'
      pokename = player
      Bar = playerProgressBar;
      hp = player.hp;
      hpt = player.TotalHP;
      document.getElementById("playerName").innerHTML = `
      <p><strong>${pokename.name[0].toUpperCase() + pokename.name.substring(1)}</strong></p>`
      document.getElementById(Id).innerHTML = `
        <p><div id="${Bar}" style="width: ${ps}%;"></div></p>
      <p>${Math.max(hp, 0)}/${hpt} HP</p>
      
    `
    updateProgressBar(ps,Bar);


    }else if (atacante == "player") {


      console.log("player.hp!: ",player.hp)
       ps = Math.round(((player.hp) / player.TotalHP) * 100);
       if (ps < 0) {
        ps = 0
      }
      playerProgressBar.style.width = `${ps}%`;
       //console.log("ps0!: ",ps)
       Id = 'playerPokemonHealth'
       pokename = player
       Bar = opponentProgressBar;
       hp = player.hp;
       hpt = player.TotalHP;
       document.getElementById("playerName").innerHTML = `
       <p><strong>${pokename.name[0].toUpperCase() + pokename.name.substring(1)}</strong></p>`
       document.getElementById(Id).innerHTML = `
         <p><div id="${Bar}" style="width: ${ps}%;"></div></p>
       <p>${Math.max(hp, 0)}/${hpt} HP</p>
     `;

    }
    //console.log("vida:",player.hp);
    
    //console.log("ps1!: ",ps)
    updateProgressBar(ps,Bar);

  }
  
function updateRivalHealth(player, dano, atacante,opponent) {

    const opponentProgressBar = document.getElementById("OprogressBar");
    var Bar,hp,hpt,pokename,Id = null;
    let ps = null; 

    //console.log("ata",atacante )
    updateProgressBar(100,playerProgressBar); // Inicializa a barra
    //setTimeout(20000);
    //updateProgressBar(pa); // Inicializa a porcentagem da barra

    if (atacante == "rival") {

      // Define a animação da barra
      opponentProgressBar.style.transition = "width 10.5s ease"; 


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

      //console.log("ps0!: ",ps)
      console.log("pokename.name[0]: ",pokename)
      document.getElementById("opponentName").innerHTML = `
      <p><strong>${pokename.name[0].toUpperCase() + pokename.name.substring(1)}</strong></p>`
      document.getElementById(Id).innerHTML = `
        <p><div id="${Bar}" style="width: ${ps}%;"></div></p>
      <p>${Math.max(hp, 0)}/${hpt} HP</p>
    `  ; 
    updateProgressBar(ps,Bar);
   }else if (atacante == "player") {
  ps = Math.round(((opponent.hp) / opponent.TotalHP) * 100);
  if (ps < 0) {

    ps = 0
  }

  opponentProgressBar.style.width = `${ps}%`;
  opponentProgressBar.style.transition = `width 1.5s ease`

  console.log("opponent.hp!: ",opponent.hp)
  //console.log("pss!: ",ps)

  Id = 'rivalPokemonHealth'
  pokename = opponent
  Bar = opponentProgressBar;
  hp = opponent.hp;
  hpt = opponent.TotalHP;
  //console.log("ps0!: ",dano)
  document.getElementById("opponentName").innerHTML = `
  <p><strong>${pokename.name[0].toUpperCase() + pokename.name.substring(1)}</strong></p>`
  document.getElementById(Id).innerHTML = `
    <p><div id="${Bar}" style="width: ${ps}%;"></div></p>
  <p>${Math.max(hp, 0)}/${hpt} HP</p>
`  ;
 }
   //console.log("vidsa:",player.hp);


   updateProgressBar(ps,Bar);


//console.log("af",Math.max(ps, 0))
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

function updateProgressBar(pa,Bar) {
          //console.log("Bar",Bar);
          Bar.style.width = `${pa}%`; // Atualiza a largura da barra dinamicamente

        }

function removeAllButtons() {
          const buttons = controls.querySelectorAll('button');
          buttons.forEach(button => button.remove()); // Remove todos os botões
        }



    // Função de batalha
export async function PBattle(player, rival,auxo,TURNO,sla) {
  let turnoAtual

if (TURNO != undefined) {
  turnoAtual = TURNO; // Controla o número do turno
}else{
   turnoAtual = 1; // Controla o número do turno
}
      
      //var AM = 1; //Adapatador de movimento
      //(rivalSprite).style.display = "block";
      clearLog(); // Limpa o log após 5 segundos

      document.getElementById('text').style.display = 'none';
      document.getElementById('Inicial').style.display = 'none';
      document.getElementById('Options').style.display = 'none';
      document.getElementById('pokemonImage').style.display = 'none';

      removeAllButtons();
      updatePlayerHealth(player.party[0].name, null, "rival", rival.party[0].name)
      updateRivalHealth(null, null, "rival",rival.party[0].name)

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
      let aux = 25;
      const movimentosEnemyDebug = rival.party[0].moves


      updateStatus(player.party[0].name, rival.party[0].name, null, vidaAntigaP,vidaAntigaO,rival.party[0].level);   
         // Atualize o status no início
         const menuButton = document.getElementById("menuID");
         console.log(player.party)
         if (menuButton) {
           menuButton.onclick = menu; // Garante que o evento está associado ao botão
         } else {
           console.error("O botão 'menu' não foi encontrado!");
         }
         const btn1 = document.getElementById("btn1");
         const btn2 = document.getElementById("btn2");
         const btn3 = document.getElementById("btn3");
        

         const handleBtn1Click = () => options(btn1, turnoAtual, player.party[0], rival.party[0], player, rival);
         const handleBtn2Click = () => options(btn2, turnoAtual, player.party[0], rival.party[0], player, rival);
         const handleBtn3Click = () => options(btn3, turnoAtual, player.party[0], rival.party[0], player, rival);

         btn1.removeEventListener("click", handleBtn1Click);
         btn2.removeEventListener("click", handleBtn2Click);
         btn3.removeEventListener("click", handleBtn3Click);
         
         //var AM = 1; //Adapatador de movimento
         let handleBtn1ClickAdded = sla;
         let handleBtn2ClickAdded = sla;

         if (handleBtn1ClickAdded == undefined) {
           btn1.addEventListener("click", handleBtn1Click);
           handleBtn1ClickAdded = undefined;
         }    

         if (handleBtn2ClickAdded == undefined) {
          btn2.addEventListener("click", handleBtn2Click);
          handleBtn2ClickAdded = undefined;
        }       
        btn3.addEventListener("click", handleBtn3Click);

         btn1.addEventListener("click", () => turnoAtual++);
         btn2.addEventListener("click", () => turnoAtual++);
         btn3.addEventListener("click", () => turnoAtual++);


        if (aux === 0) {
          //aux = 25;
          //console.log("TurnoOOOO")
          //console.log(`ATurno ${turnoAtual} finalizado. Último ataque realizado por: ${atacante}`);
          //turnoAtual++;

        }



      //const bulbasaur = await getPokemonData('bulbasaur');
      //const charmander = await getPokemonData('charmander');
      const attackButton = document.getElementById("controls");

      

        const movim = [];  // Cria o array para armazenar os detalhes dos movimentos
        const sd = []; // Declara e inicializa o array `a` vazio
        console.log("hetero");
        for (let index = 0; index < player.party[0].moves.length; index++) {
          //console.log(":V",player.party[0])
          //console.log("A",player.party[0].moves[index])

          sd[index] = player.party[0].moves[index]
          //console.log(":Q",player.party[0].moves[index])
          sd[index]= await getMoveDetails(sd[index]);
          

        }
if (auxo === undefined) {
          //console.log("Analisando movimentos do "+rival.party[0].name.name+" rival");
rival.party[0].moves = await Promise.all(
  rival.party[0].moves.slice(0, 4) // Limita a 4 movimentos
    .filter(moveName => moveName != null) // Filtra movimentos nulos
    .map(async moveName => await getMoveDetails(moveName)) // Busca os detalhes dos movimentos
);
}
console.log("1 rival.party[0]: e player.party[0]",rival,player);
//await new Promise(resolve => setTimeout(resolve, 15000));   



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

      sd.forEach((move, index) => {
        console.log(player);
        const button = document.createElement('button');
        button.textContent = formatString(move.name);
        //button.removeEventListener('click', () => playerTurn(index));
        button.addEventListener('click', () => playerTurn(index));
        controls.appendChild(button);
      });
      

      
      async function playerTurn(choice) {
        if (isBattleOver()) return; // Verifica se a batalha já acabou

        // Player escolhe o movimento
        const playerMove = sd[choice];
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
        if (playerSpeed >= rivalSpeed || playerMove === ("btn2"||"btn3"||"btn1")) {
          // Jogador ataca primeiro
          console.log("Jogador ataca primeiro");
          // Executa o ataque do jogador
          const dano = await executeAttack(player.party[0], rival.party[0], playerMove);
          //dano = result.damage;
          if (playerMove != ("btn2"||"btn3"||"btn1")) {

          //vidaAntigaO = result.vidaAntiga;
          atacante = "player";
          
          // Atualiza o status após o ataque do jogador
          updateStatus(player.party[0].name, rival.party[0].name, dano, vidaAntigaP,vidaAntigaO,atacante);      // Atualize o status no início
        
          }

          // Verifica se a batalha não acabou, então o rival ataca
          if (!isBattleOver()) {
            const rivalMove = getRandomMove(rival.party[0]);

            const dano = await executeAttack(rival.party[0], player.party[0], rivalMove);
            //dano = resultRival.damage;
            //vidaAntigaP = resultRival.vidaAntiga;
            atacante = "rival";

            // Atualiza o status após o ataque do rival
            console.log("rival.party[0]: e player.party[0]",rival.party[0],player.party[0]);

            updateStatus(player.party[0].name, rival.party[0].name, dano, vidaAntigaP,vidaAntigaO,atacante);      // Atualize o status no início

          }
        } else {
          // Rival ataca primeiro
          console.log("rival.party[0]: e player.party[0]",rival.party[0],player.party[0]);
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
        console.log(`BTurno ${turnoAtual} finalizado. Último ataque realizado por: ${atacante}`);
        turnoAtual++;
        
        // Verifica o status da batalha no final do turno
        checkBattleStatus();
      }
      
        async function executeAttack(attacker, defender, move) {
        //console.log("move",move,attacker);

        const { damage } = await calculateDamage(attacker, defender, move,turnoAtual);
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

         
        console.log("rival.party.length:",rival.party.length);
          if (rival.party.length > 1) {
            
            XPDX(player.party[0].name.currentXP,player.party[0].name.levelType,rival.party[0].name.base_exp,player.party[0].name.level,rival.party[0].name.level,0)
            console.log("rival.party[0]:",rival.party[0],player.party[0]);
            
            
            //const reserva = player.party[0];
            auxo = undefined; //sim isso envolve a troca de poke do rival
            rival.party[0] = rival.party[1];
            rival.party[1] = null;
            console.log("rival.party[0]:",rival.party[0],player.party[0]);

            const div = document.getElementById("controls");
            const buttonsA = div.querySelectorAll("button"); // Seleciona todos os <button> dentro do <div>
            buttonsA.forEach(button => button.remove()); // Remove cada botão encontrado
            


            setTimeout(() => updateRivalHealth(null, null, "rival",rival.party[0].name), 1500);
            rival.party.pop();
            //AM = 1; //Adapatador de movimento
            btn1.removeEventListener("click", handleBtn1Click);
            btn2.removeEventListener("click", handleBtn2Click);
            btn3.removeEventListener("click", handleBtn3Click);

            setTimeout(() => PBattle(player,rival,undefined,turnoAtual,0), 1500);
            
          }
          else{
            console.log("player.party[0]",player.party[0]);



            XPDX(player.party[0].name.currentXP,player.party[0].name.levelType,rival.party[0].name.base_exp,player.party[0].name.level,rival.party[0].name.level,0)
            logMessage('Você venceu a batalha!');

            endBattle('player');
          }
          //console.log("XP inicial:",player.party[0]);

        }
      }
      
      function isBattleOver() {
        // Verifica se qualquer Pokémon tem HP 0 ou menos
        return player.party[0].name.hp <= 0 || rival.party[0].name.hp <= 0;
      }

function endBattle(winner) {
    // Atualiza o nível do Pokémon do jogador com um pequeno atraso
    setTimeout(() => updateLV(player.party[0].name), 100);

    // Exibe o resultado da batalha após 1 segundo
    setTimeout(() => {
        const message = winner === 'player' ? 'Você venceu!' : 'Você perdeu!';
        console.log(message);
        alert(message);
        //removeListener();        
        // Chama a função de finalização com base no vencedor
        if (winner === 'player') {
          turnoAtual = 1
          for (let index = 0; index < player.party.length; index++) {
            player.party[index].name.hp = player.party[index].name.TotalHP;            
          }
          btn1.removeEventListener("click", handleBtn1Click);
          btn2.removeEventListener("click", handleBtn2Click);
          btn3.removeEventListener("click", handleBtn3Click);          
            //player.party[1].name.hp = player.party[1].name.TotalHP;
            endBattleF(0); // Finalização para jogador
        } else {
          for (let index = 0; index < player.party.length; index++) {
            player.party[index].name.hp = player.party[index].name.TotalHP;
          }
          btn1.removeEventListener("click", handleBtn1Click);
          btn2.removeEventListener("click", handleBtn2Click);
          btn3.removeEventListener("click", handleBtn3Click);
            endBattleF(1); // Finalização para rival
        }
    }, 1000);
}

      function updateLV(PokeP) {
        console.log("UH?:",player.party[0].name.level);
        document.getElementById('pokeLv').innerHTML = 
        `<p><strong>Lv.${PokeP.level}</strong></p>
         `;
        
            }      


}






