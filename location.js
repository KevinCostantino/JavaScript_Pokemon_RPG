import { goStore, treinadorBrock,Poke6,treinador1,treinador2 } from './script.js';
import { goCave } from './script.js';
import { goTown } from './script.js';
import { buyHealth } from './script.js';
import { buyWeapon } from './script.js';
import { fightSlime } from './script.js';
import { fightBeast } from './script.js';
import { fightDragon } from './script.js';
import { attack } from './script.js';
import { dodge } from './script.js';
import { easterEgg } from './script.js';
import { restart } from './script.js';
import { PósInitProf } from './script.js';
import { pickTwo } from './script.js';
import { pickEight } from './script.js';
import { PBattle } from './Batalha.js';
import { player } from './script.js';
import { rival } from './script.js';




export const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store.\""
    },
	{
		name: "store",
		"button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
		"button functions": [buyHealth, buyWeapon, goTown],
		text: "You enter the store."
	},
	{
		name: "cave",
		"button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
		"button functions": [fightSlime, fightBeast, goTown],
		text: "You enter the cave. You see some monsters."
	},
	{
		name: "fight",
		"button text": ["Attack", "Dodge", "Run"],
		"button functions": [attack, dodge, goTown],
		text: "You are fighting a monster."
	},
	{
		name: "kill monster",
		"button text": ["Go to town square", "Go to town square", "Go to town square"],
		"button functions": [goTown, goTown, easterEgg],
		text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
	},
	{
		name: "lose",
		"button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
		"button functions": [restart, restart, restart],
		text: "You die. ☠️"
	},
	{
		name: "win",
		"button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
		"button functions": [restart, restart, restart],
		text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
    },
	{
		name: "easter egg",
		"button text": ["2", "8", "Go to town square?"],
		"button functions": [pickTwo, pickEight, goTown],
		text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
	},
	{
		name: "Pós Batalha",
		"button text": ["Continuar(Oak)", "Continuar (loja)", "Continuar (loja)"],
		"button functions": [PósInitProf,goStore,goStore],
		text: "",
		img : `./Sprites/Green-transformed.png`
	},
	{
		name: "Prof_Carvalho",
		"button text": ["Batalha rival"],
		"button functions": [() => PBattle(player, Poke6)],
		text: "",
		img: `./Sprites/Oak-transformed.png`
	},
    {
		name: "Floresta0",
		"button text": ["Floresta"],
		"button functions": [goStore],
		text: "",
		img : `./Sprites/Oak-transformed.png`
	},
    {
		name: "Floresta",
		"button text": ["<- Voltar","Curva à esquerda","Caminhar reto","Curva à direita"],
		"button functions": [goTown,goStore,goStore,goStore],
		text: "",
	},
    {
		name: "Evento",
		"button text": ["Continuar"],
		"button functions": [goTown],
		text: "",
	},
	
]