import { PokemonInicial } from './pokeapiF.js';
import Player from './player.js';
import { askForName } from './pokeapiF.js';
import { locations } from './location.js';
import { PBattle } from './Batalha.js';



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
export const treinador1 = new Player();
export const treinador2 = new Player();
export const treinador3 = new Player();
export const treinadorBrock = new Player();


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

export function UniOp(location) {
	button5.style.display = "none";
	button6.style.display = "none";

    monsterStats.style.display = "none";
	PersonagemStats.style.display = "none";
    button4.innerText = location["button text"][0];
    button4.onclick = location["button functions"][0];
    text.innerText = location.text;    
}
export function DiOp(location) {
    monsterStats.style.display = "none";
	PersonagemStats.style.display = "none";
    button4.innerText = location["button text"][0];
    button5.innerText = location["button text"][1];
    button4.onclick = location["button functions"][0];
    button5.onclick = location["button functions"][1];

    text.innerText = location.text;    
}
export function TriOp(location) {
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
    monsterStats.style.display = "none";
	PersonagemStats.style.display = "none";
    button4.innerText = location["button text"][0];
    button5.innerText = location["button text"][1];
    button6.innerText = location["button text"][2];
	button3.innerText = location["button text"][3];

    button4.onclick = location["button functions"][0];
    button5.onclick = location["button functions"][1];
    button6.onclick = location["button functions"][2];
	button3.onclick = location["button functions"][3];

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

export async function IMFREE(A, elementId,a) {
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

    // Call goStore() if A == 1
    if (A === 1) {
        PósInitB(a);
    }
}

export async function PósInitB(a) {
	document.getElementById('pokemonImage').style.display = 'block'
console.log("sfsf");
	update(locations[8]);

	rivalIMAGE.innerHTML = `<img src="Sprites/Green-transformed.png" />`;
	if (a == 1) {
		text.innerText = "Fracote! Tente me derrotar após obter uma insígia."}
	    else{
		text.innerText = "Droga! Te venceirei na próxima vez"}
	
	}


export async function PósInitProf() {
		document.getElementById('pokemonImage').style.display = 'block'
		UniOp(locations[9]);
		OakIMAGE.innerHTML = `<img src="Sprites/Oak-transformed.png" />`;

		text.innerText = "Meu neto foi até a cidade de Pewter atrás da insígnia de ginásio, por quê não ir lá também?"
	}

export async function goFlorest() {
	QuadOp(locations[11]);
	}
export async function evento() {
    goldText.innerHTML = gold+200;
    text.innerText = "Achou 200 conto karai"
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

  export async function troca(fh) {
    //player.party = fh;
    const aux = fh[0];
    fh[0] = fh[1];
    fh[1] = aux;
    document.getElementById("player-pokemon-image").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${fh[0].name.id}.png`; // URL do sprite do Pokémon escolhido


  }
  export async function bolsaPotion(fh) {
//player.party[0]
console.log("sdsdd",fh.name.hp);
   fh.name.hp = fh.name.hp+20;
   document.getElementById('playerPokemonHealth').innerHTML = `
   <p><div id="${playerProgressBar}" style="width: ${fh.name.hp}%;"></div></p>
 <p>${Math.max(fh.name.hp, 0)}/${fh.name.TotalHP} HP</p>
`;

  }

  export async function captura(fh) {
  //rival.party[0] = fh;
  console.log("ds",player.party);
    player.capturePokemon(player.name,fh.name,0,fh.name.level,
        fh.moves[0], fh.moves[1], fh.moves[2], fh.moves[3],fh.NdeMov);
        
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