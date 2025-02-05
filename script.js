import { PokemonInicial } from './pokeapiF.js';
import Player from './Player.js';
import { askForName,vaiproScript2 } from './pokeapiF.js';
import { locations } from './location.js';
import { PBattle,updatePlayerHealth,logMessage,removeClickEvent,getPokemonStats } from './Batalha.js';
import { clearLog,removeAllButtons,updateStatus,getMoveDetails,getPokemonData,calculateDamage} from './Batalha.js';
import { options } from './Opções.js';
import { PBattle2 } from './Batalha copy.js';
import {FF,addFF,zeraFF} from './pokeapiF.js';
import { moves } from './moves.js';


let xp = 0;
let health = 100;
let gold = 1000;
let currentWeapon = 0;
let fighting;
let monterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const button6 = document.querySelector("#button6");
const button7 = document.querySelector("#button7");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const PersonagemStats = document.querySelector("#PersonagemStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const rivalIMAGE = document.querySelector("#rivalSprite");
const OakIMAGE = document.querySelector("#pokemonImage");
//const menu = document.querySelector("#menuID");

const button1S = document.querySelector("#btn1");
const button2S = document.querySelector("#btn2");
const button3S = document.querySelector("#btn3");
const button4S = document.querySelector("#btn4");

const weapons = [
	{
		name: "stick",
		power: 5
	},
	{
		name: "dagger",
		power: 30
	},
	{
		name: "claw hammer",
		power: 50
	},
	{
		name: "sword",
		power: 100
	}
];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
];




// initialize buttons
export const player = new Player();
export const rival = new Player();

export const Poke1 = new Player();
export const Poke2 = new Player();
export const Poke3 = new Player();
export const Poke4 = new Player();
export const Poke5 = new Player();
export const Poke6 = new Player();
const PokeInstances = { Poke1, Poke2, Poke3, Poke4, Poke5, Poke6 };
export const treinador1 = new Player();
export const treinador2 = new Player();
export const treinador3 = new Player();
export const treinadorBrock = new Player();
const TrainerInstances = { treinador1, treinador2, treinador3 };


button1.onclick = pokeapiF1;
button2.onclick = pokeapiF4;
button3.onclick = pokeapiF7;

//button1S.onclick = goStore();

//Mostrar os sprite iniciais ao clicar
//[1, 4, 7].forEach(id => { ;
	//document.querySelector(`button[onclick="PokemonInicial(${id})"]`).onclick = () => PokemonInicial(id);});

export function update(location) {
	button5.style.display = "";
	button6.style.display = "";
  button7.style.display = "";

    monsterStats.style.display = "none";
	PersonagemStats.style.display = "none";
    button4.innerText = location["button text"][0];
    button5.innerText = location["button text"][1];
    button6.innerText = location["button text"][2];
    button7.onclick = location["button functions"][3];

    button4.onclick = location["button functions"][0];
    button5.onclick = location["button functions"][1];
    button6.onclick = location["button functions"][2];
    button7.onclick = location["button functions"][3];

    text.innerText = location.text;    
}

export function UniOp(location) {
	button5.style.display = "none";
	button6.style.display = "none";
  button7.style.display = "none";

    monsterStats.style.display = "none";
	PersonagemStats.style.display = "none";
    button4.innerText = location["button text"][0];
    button4.onclick = location["button functions"][0];
    text.innerText = location.text;    
}
export function DiOp(location) {
  button6.style.display = "none";
  button7.style.display = "none";
    monsterStats.style.display = "none";
	PersonagemStats.style.display = "none";
    button4.innerText = location["button text"][0];
    button5.innerText = location["button text"][1];
    button4.onclick = location["button functions"][0];
    button5.onclick = location["button functions"][1];

    text.innerText = location.text;    
}
export function TriOp(location) {
  button4.style.display = "";
  button5.style.display = "";
	button6.style.display = "";
  button7.style.display = "none";

    monsterStats.style.display = "none";
	PersonagemStats.style.display = "none";
    button4.innerText = location["button text"][0];
    button5.innerText = location["button text"][1];
    button6.innerText = location["button text"][2];

    button4.onclick = location["button functions"][0];
    button5.onclick = location["button functions"][1];
    button6.onclick = location["button functions"][2];

    text.innerText = location.text;    
}
export function QuadOp(location) {
	button4.style.display = "";
  button5.style.display = "";
	button6.style.display = "";
  button7.style.display = "";

    monsterStats.style.display = "none";
	PersonagemStats.style.display = "none";
    button4.innerText = location["button text"][0];
    button5.innerText = location["button text"][1];
    button6.innerText = location["button text"][2];
    button7.innerText = location["button text"][3];

    button4.onclick = location["button functions"][0];
    button5.onclick = location["button functions"][1];
    button6.onclick = location["button functions"][2];
    button7.onclick = location["button functions"][3];

    text.innerText = location.text;    
}
function pokeapiF1() {

	let aux = 25;
	PokemonInicial(1,aux);
	//console.log("sauy e "+ aux);
    //askForName(player)
	if (aux < 1) {
		update(locations[0]);
	}
	
}
function pokeapiF4() {
	let aux = 25;
	PokemonInicial(4,aux);
	//console.log("sauy")
	if (aux < 1) {
		update(locations[0]);
	}
	
}
function pokeapiF7() {
	let aux = 25;
	PokemonInicial(7,aux);
	//console.log("sauy")
	if (aux < 1) {
		update(locations[0]);
	}
	
}
export function goTown() {
    update(locations[0]);
}

export function goStore() {
	console.log("tamo aqui");
    update(locations[1]);
	document.getElementById('pokemonImage').style.display = 'none'
}

export function goCave() {
	console.log("afa");
    update(locations[2]);
}

export function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
    	healthText.innerText = health;       
    } else {
        text.innerText = "You do not have enough gold to buy health.";
    }

}

export function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
    	if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
    		text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
    	} else {
    		text.innerText = "You do not have enough gold to buy a weapon.";
    	} 
    } else {
		text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
		button2.onclick = sellWeapon;
	}
}

export function sellWeapon() {
	if (inventory.length > 1) {
		gold += 15;
		goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
	} else {
    	text.innerText = "Don't sell your only weapon!";
  	}
}

export function fightSlime() {
	fighting = 0;
	goFight();
}

export function fightBeast() {
	fighting = 1;
	goFight();    
}

export function fightDragon() {
	fighting = 2;
	goFight();
}

export function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
	monsterHealthText.innerText = monsterHealth;
}

export function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);
    } else {
		text.innerText += " You miss.";
	}
    
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
	healthText.innerText = health;
	monsterHealthText.innerText = monsterHealth;   
	if (health <= 0) {
		lose();
	} else if (monsterHealth <= 0) {
		fighting === 2 ? winGame() : defeatMonster();
	}

	if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
	}
}

export function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
}

export function isMonsterHit() {
	return Math.random() > .2 || health < 20;
}


export function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

export function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7)
    xp += monsters[fighting].level;
    goldText.innerText = gold;
	xpText.innerText = xp;
    update(locations[4]);
}

export function lose() {
    update(locations[5]);
}

export function winGame() {
  update(locations[6]);
}

export function restart() {
	xp = 0;
	health = 100;
	gold = 50;
	currentWeapon = 0;
	inventory = ["stick"];
	goldText.innerText = gold;
	healthText.innerText = health;
	xpText.innerText = xp;
	goTown();
}

export function easterEgg() {
	update(locations[7]);
}


export function pickTwo() {
 pick(2);
}

export function pickEight() {
 pick(8);
}

export function pick(guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }

    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";

    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }

    if (numbers.indexOf(guess) !== -1) {
        text.innerText += "Right! You win 20 gold!"
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Wrong! You lose 10 health!"
        health -= 10;
        healthText.innerText = health
        if (health <= 0) {
          lose();
        }
    }
}

export async function IMFREE(A, elementId,a,FF) {

    // Dynamically update the target element with starter Pokémon buttons
	document.getElementById('text').style.display = 'block';
	document.getElementById('battle-area').style.display = 'none';
	document.getElementById('status').style.display = 'none';
	document.getElementById('controls').style.display = 'none';
	document.getElementById('battle-log').style.display = 'none';
	

	document.getElementById(elementId).style.display = 'block'

	
	button4.onclick = goStore;  //Troca o botão pra ser a loja
	button5.onclick = goStore;  //Troca o botão pra ser a loja
	button6.onclick = goStore;  //Troca o botão pra ser a loja


console.log(FF);
      // Call goStore() if A == 1
    if (A === 1) {
      switch (FF) {
        case 0:
          console.log("PósInitProf");
          PósInitB(a);
          break;
        case 1:
        case 2:
          goFlorest();
          break;
        case 3:
          //cidade(a); //criar ainda
          console.log("Cidade");
          FF = 0;
          console.log("resetei,FF");
          break;
      }
        
        
    }
}



export async function PósInitB(a) {
	document.getElementById('pokemonImage').style.display = 'block'
	update(locations[8]);
  UniOp(locations[8]);

	rivalIMAGE.innerHTML = `<img src="Sprites/Green-transformed.png" />`;
	if (a == 1) {
		text.innerText = "Fracote! Tente me derrotar após obter uma insígia."}
	    else{
		text.innerText = "Droga! Te venceirei na próxima vez"}
	
	}


export async function PósInitProf() {
		document.getElementById('pokemonImage').style.display = 'block'
    update(locations[9]);
		UniOp(locations[9]);
		OakIMAGE.innerHTML = `<img src="Sprites/Oak-transformed.png" />`;

		text.innerText = "Meu neto foi até a cidade de Pewter atrás da insígnia de ginásio, por quê não ir lá também?"
	}
export async function PósInitProf2() {
  document.getElementById('pokemonImage').style.display = 'block'

  UniOp(locations[10]);
  text.innerText = "Professor Carvalho te dá 5 Poções. Você decide passar pela floresta para chegar em Pewter."


}
export async function Florestando(e) {

  document.getElementById('text').style.display = 'block'

    const sac = embaralharNumeros();
    console.log(sac[e]);

    switch (sac[e]) {
      case 1:
        let A = randomIntFromInterval(1, 6);
        let selectedPoke = PokeInstances[`Poke${A}`]; // Obtém o Pokémon correspondente
        if (selectedPoke) {
          let C = randomIntFromInterval(1, 10);

          PBattle(player, selectedPoke); // Passa o Pokémon para a batalha
         } else {console.error(`Poke${A} não encontrado!`);}
         break;
      case 2:
        let B = randomIntFromInterval(1, 3);
        let selectedTrainer = TrainerInstances[`treinador${B}`]; // Obtém o Pokémon correspondente
        if (selectedTrainer) {
          let C = randomIntFromInterval(1, 10);

          PBattle(player, selectedTrainer); // Passa o Pokémon para a batalha
         } else {console.error(`treinador${B} não encontrado!`);}
         break;
      case 3:
        let C = randomIntFromInterval(1, 10);
        Eventoso(C);
        break;
    }
		//UniOp(locations[10]);
	}
export async function goFlorest() {
  document.getElementById('pokemonImage').style.display = 'none'
  if (FF == 3) {
    console.log(FF);
    zeraFF();
    UniOp(locations[16]);
  } else {
    update(locations[11]);
    TriOp(locations[11]);
  }


	}
export async function Eventoso(C) {
  document.getElementById('pokemonImage').style.display = 'none';
  document.getElementById('text').style.display = 'block';
  console.log(FF);

  update(locations[13]);

  console.log("faa",C);
  if (C <= 6) {
    addFF()
    UniOp(locations[13]);
    text.innerText = "Você avançou na floresta sem problemas" ;

  }else if (C <= 9 && C >= 7) {
    addFF()
    gold += 200; // Agora o ouro será realmente adicionado!
    document.getElementById('goldText').innerHTML = gold; 

    UniOp(locations[13]);
    document.getElementById('text').innerText = "Achou 200 conto karai"; 

  }else if (C == 10) {
    addFF()
    Togepi();
    UniOp(locations[14]);
    text.innerText = "Encontra uma pokebola em cima de uma pedra";
  }
}
async function BatalhaSetup(id,lv) {
    return await getPokemonStats(id,lv)
}
async function Togepi() {
  text.innerText = "Após verificar descobre que dentro havia um Togepi"
  player.capturePokemon(player.name,await BatalhaSetup(175,7),0,7,moves[0], moves[25]);
}
export async function goPewter(op) {
  console.log(op);

if (op == 1) {
  text.innerText = "Você finalmente chega na cidade de Pewter";
	UniOp(locations[16]);
}
else if (op == 2) {
 QuadOp(locations[17]);
 text.innerText = "O quê fazer?";
}
}
export async function goCentroPokémon(op) {
  const text = document.getElementById('text');
  if (op == 1) {
    text.innerText = "Olá! precisa de que seus Pokémon sejam cuidados?"
    DiOp(locations[18]);
  }
  else if (op == 2) {
    text.innerText = "Seus Pokémon foram curados!"
    for (let i = 0; i < player.party.length; i++) {
      player.party[i].health = player.party[i].TotalHP;
      UniOp(locations[16]);
    }
  }}
  export async function goPokéMart(op) {
    if (op == 1) {
      text.innerText = "Olá! Como posso ajudá-lo?"
      TriOp(locations[19]);
    }
    else if (op == 2) {
      text.innerText = "Uma poção foi comprada!"
      UniOp(locations[16]);
    }
    else if (op == 3) {
      text.innerText = "Uma pokébola foi comprada!"
        UniOp(locations[16]);
      }
    }
    export async function goGym(op) {
  if (op == 1) {
    text.innerText = "Deseja desafiar o líder de ginásio Brock?"
    DiOp(locations[20]);
  }
  else if (op == 2) {
    PBattle(player,treinadorBrock);
  }
}
export async function goFinalBattle() {
  text.innerText = "Estive esperando por nossa segunda batalha, prepare-se para perder!"
  DiOp(locations[21]);
}
export async function Fim(op) {
  if (op == 1){
  text.innerText = "N-Não pode ser...eu perdi..."
  DiOp(locations[22]);
  }
  else if (op == 2){
  text.innerText = "Boa sorte na próxima hahaha!"
  DiOp(locations[17]);
}
}
export async function menu() {
    const buttonBox = document.getElementById("button-box");
    const displayStyle = buttonBox.style.display;
  
    if (displayStyle === 'grid') {
      buttonBox.style.display = 'none';
    } else {
      buttonBox.style.display = 'grid';
    }
  }
  export async function trocatela() {
    const party = document.getElementById("party");
    const displayStyle = party.style.display;
  
    if (displayStyle === 'grid') {
      party.style.display = 'none';
    } else {
      console.log("ABRIU");
      party.style.display = 'grid';
    }
  }


  export async function troca(fh,playerTroca,rival,ajuda,handleBtn1Click,btn,pOG) {
    
    console.log(btn,handleBtn1Click)
    if ((btn == P2 || btn == P3 || btn == P4 || btn == P5 || btn == P6) && handleBtn1Click != "Batata") {
      console.log("ENTROU");
      return [btn,25]
    }
    
    
    //player.party = fh;
    console.log("playerTroca antes:",fh[0],fh[playerTroca]);
    //console.log("inimigo antes:",rival);
    //await new Promise(resolve => setTimeout(resolve, 150000));
    const aux = fh[0];
    const TURNO = ajuda;
    const sla = 0
    const ct = 0
    console.log("afaa",fh[0],fh[playerTroca],handleBtn1Click)
    //await new Promise(resolve => setTimeout(resolve, 15000));
    

    if (fh.length > 1) {
    
    fh[0] = fh[playerTroca];
    fh[playerTroca] = aux;
    document.getElementById("player-pokemon-image").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${fh[0].name.id}.png`; // URL do sprite do Pokémon escolhido
    const divtroca = document.getElementById("controls");
    const buttonsAtroca = divtroca.querySelectorAll("button"); // Seleciona todos os <button> dentro do <div>
    buttonsAtroca.forEach(button => button.remove()); // Remove cada botão encontrado
console.log(playerTroca)
    //setTimeout(() => updatePlayerHealth(null, null, "player",player.party[0].name), 1500);
console.log("pOG:",pOG)
    setTimeout(() => PBattle(pOG,rival,0,TURNO), 1500);

    SwapIcons(fh[0],fh[playerTroca],1,playerTroca+1);
    console.log("playerTroca depois:",fh[0],fh[playerTroca]);
    return 25;
    }else{
      logMessage("Pokémon insuficientes pra trocar");
      return;
    }
  }
export async function bolsaPotion(fh) {
    //player.party[0]
console.log("wtf",fh.name.hp);
 if (fh.name.hp+20 <= fh.name.TotalHP) {
   fh.name.hp = fh.name.hp+20;
   document.getElementById('playerPokemonHealth').innerHTML = `
   <p><div id="${playerProgressBar}" style="width: ${fh.name.hp}%;"></div></p>
 <p>${Math.max(fh.name.hp, 0)}/${fh.name.TotalHP} HP</p>
`;}
else{
  fh.name.hp = fh.name.TotalHP;
  document.getElementById('playerPokemonHealth').innerHTML = `
  <p><div id="${playerProgressBar}" style="width: ${fh.name.hp}%;"></div></p>
<p>${Math.max(fh.name.hp, 0)}/${fh.name.TotalHP} HP</p>
`;}
}

  export async function captura(fh) {
  //rival.party[0] = fh;

  console.log("ds",);
  console.log(player.party[5]); //!!

    let verificaMaisQueSeis = player.capturePokemon(player.name,fh.name,0,fh.name.level,
        fh.moves[0], fh.moves[1], fh.moves[2], fh.moves[3],fh.NdeMov);
let ajudador = player.party.length;
let pokeText = document.getElementById("PokeN°Text");
let images = pokeText.getElementsByTagName("img");

  console.log(verificaMaisQueSeis)
if (verificaMaisQueSeis == undefined) {
  document.getElementById("PokeN°Text").innerHTML += 
  `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${player.party[ajudador - 1].name.id}.svg" 
        style="width: 3%; height: auto;" alt="${player.party[ajudador - 1].name.name}">`;
    
  insertIcon(fh)
}else{
  ajudador = verificaMaisQueSeis; 
  images[verificaMaisQueSeis-1].src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${player.party[ajudador - 1].name.id}.svg`;
  images[verificaMaisQueSeis-1].alt = player.party[ajudador - 1].name.name;
}


  //para adaptar a estrutura dos movimentos do npc pro player
  //lenght é temporário, não vai funcionar quando for capturar mais de
  //6 pokémon
  const moves = player.party[ajudador-1].moves;
  console.log("ds",moves);

  const filteredMoves = moves.filter(
    move => typeof move === "object" && move !== null && !Array.isArray(move)
  );
  const moveNames = filteredMoves.map(move => move.name);
  //console.log("ds",player.party.length);
  player.party[ajudador-1].moves = moveNames;
console.log("Switch",moveNames); 
     
  }
  export async function fugir() {
    const buttonBox = document.getElementById("button-box");
    const displayStyle = buttonBox.style.display;
  
    if (displayStyle === 'grid') {
      buttonBox.style.display = 'none';
    } else {
      buttonBox.style.display = 'grid';
    }
  }
  export async function S_Actions() {
    const btn1 = document.getElementById("btn1");
    console.log("btn1",btn1);
    if (btn1) {
     btn1.onclick = troca; // Garante que o evento está associado ao botão
   } else {
     console.error("O botão 'troca' não foi encontrado!");
   }
   const btn2 = document.getElementById("btn2");
   console.log("btn2",btn2);
   if (btn2) {
    btn2.onclick = bolsaPotion; // Garante que o evento está associado ao botão
  } else {
    console.error("O botão 'bolsaPotion' não foi encontrado!");
  }
  const btn3 = document.getElementById("btn3");
  console.log("btn3",btn3);
  if (btn3) {
    btn3.onclick = captura; // Garante que o evento está associado ao botão
 } else {
   console.error("O botão 'captura' não foi encontrado!");
 }
 const btn4 = document.getElementById("btn4");
 console.log("btn4",btn4);
 if (btn4) {
    btn4.onclick = fugir; // Garante que o evento está associado ao botão
} else {
  console.error("O botão 'fugir' não foi encontrado!");
}
    
  }
export function insertIcon(Pokemon,Substitui) {
  
    
  const partyDiv = document.getElementById("party");
  const voltarButton = document.getElementById("Voltar button-box");
  
  
  // Cria o novo elemento para adicionar
  const botão = document.createElement("button");
  if (Substitui != undefined) {
    botão.id = `P${Substitui}`;
  } else {botão.id = `P${player.party.length}`;}
  if (player.party.length < 7) {
  console.log(botão.id,Substitui)
  const { x2, y2 } = iconfix(botão.id);
  botão.innerHTML = `
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${Pokemon.name.id}.png" 
         style="position: absolute; top: ${x2}px; left: ${y2}px;">
  `;
  
  // Insere o novo elemento antes do botão "Voltar"
  partyDiv.insertBefore(botão, voltarButton);

  let a = document.getElementById("Voltar button-box");

  if (player.party.length === 2 || player.party.length === 4 || player.party.length === 6) {
    a.style.cssText = "grid-column: span 2; text-align: center;";
  } else if (player.party.length === 3 || player.party.length === 5) {
    a.style.cssText = "";  // This will remove the applied styles
  }
}
}
function iconfix(P) {
  console.log("DO",P)

  switch (P){
    case "P1":
      console.log("P1")
      return {x1: -10, y1: 11};
    case "P2":
      return {x2: -10, y2: 91};
    case "P3":
      return {x2: 50, y2: 11};
    case "P4":
      return {x2: 50, y2: 91};
    case "P5":
      return {x2: 110, y2: 11};
    case "P6":
      return {x2: 110, y2: 91};;
}
}
export function updateIcon(Pokemon, Substitui) {
  const partyDiv = document.getElementById("party");
  const voltarButton = document.getElementById("Voltar button-box");

  // Define o ID do botão a ser atualizado
  let botão;
  if (Substitui != undefined) {
    botão = document.getElementById(`P${Substitui}`);
  } else {
    // Se não houver Substitui, usa o índice baseado no tamanho do party
    botão = document.getElementById(`P${player.party.length}`);
  }
console.log(Pokemon)
  // Atualiza a imagem do Pokémon
  const { x2, y2 } = iconfix(botão.id);
  botão.innerHTML = ` 
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${Pokemon.id}.png" 
         style="position: absolute; top: ${x2}px; left: ${y2}px;">
  `;

  // Altera o estilo do botão "Voltar"
  let a = document.getElementById("Voltar button-box");

  if (player.party.length === 2 || player.party.length === 4 || player.party.length === 6) {
    a.style.cssText = "grid-column: span 2; text-align: center;";
  } else if (player.party.length === 3 || player.party.length === 5) {
    a.style.cssText = "";  // Remove a estilização
  }
}
export function SwapIcons(Pokemon1, Pokemon2, Substitui1, Substitui2) {
  const partyDiv = document.getElementById("party");
  const voltarButton = document.getElementById("Voltar button-box");

  // Define os IDs dos botões a serem atualizados
  let botão1;
  let botão2;
  if (Substitui1 != undefined) {
    botão1 = document.getElementById(`P${Substitui1}`);
  } else {
    // Se não houver Substitui1, usa o índice baseado no tamanho do party
    botão1 = document.getElementById(`P${player.party.length}`);
  }
  if (Substitui2 != undefined) {
    botão2 = document.getElementById(`P${Substitui2}`);
  } else {
    // Se não houver Substitui2, usa o índice baseado no tamanho do party
    botão2 = document.getElementById(`P${player.party.length}`);
  }
  
  // Atualiza as imagens dos ícone
 
  const { x1, y1 } = iconfix(botão1.id);
  const { x2, y2 } = iconfix(botão2.id);
  console.log(x1, y1,x2, y2)
  botão1.innerHTML = ` 
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${Pokemon1.name.id}.png" 
         style="position: absolute; top: ${x1}px; left: ${y1}px;">
  `;
  botão2.innerHTML = ` 
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${Pokemon2.name.id}.png" 
         style="position: absolute; top: ${x2}px; left: ${y2}px;">
  `;

  // Altera o estilo do botão "Voltar"
  let a = document.getElementById("Voltar button-box");

  if (player.party.length === 2 || player.party.length === 4 || player.party.length === 6) {
    a.style.cssText = "grid-column: span 2; text-align: center;";
  } else if (player.party.length === 3 || player.party.length === 5) {
    a.style.cssText = "";  // Remove a estilização
  }
}
export function AjustaMove(Pokemon) {
    //para adaptar a estrutura dos movimentos do npc pro player
  //lenght é temporário, não vai funcionar quando for capturar mais de
  //6 pokémon
  const moves = Pokemon.moves;
  const filteredMoves = moves.filter(
    move => typeof move === "object" && move !== null && !Array.isArray(move)
  );
  const moveNames = filteredMoves.map(move => move.name);
  //console.log("ds",player.party.length);
  Pokemon.moves = moveNames;
  console.log("Switch",moveNames);    

}
export function embaralharNumeros() {
  let numeros = [1, 2, 3];

  // Embaralhando os números usando o algoritmo de Fisher-Yates
  for (let i = numeros.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
  }

  return numeros; // Retorna o array embaralhado
}
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

