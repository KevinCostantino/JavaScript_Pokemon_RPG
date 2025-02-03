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
import { PósInitProf,goFlorest,PósInitProf2,Florestando,embaralharNumeros} from './script.js';
import { pickTwo } from './script.js';
import { pickEight } from './script.js';
import { PBattle } from './Batalha.js';
import { PBattle2 } from './Batalha copy.js';
import { player } from './script.js';
import { rival } from './script.js';
import { Poke1, Poke2, Poke3, Poke4, Poke5} from './script.js';




export const locations = [
    {
		id: 0,
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store.\""
    },
	{
		id: 1,
		name: "store",
		"button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
		"button functions": [buyHealth, buyWeapon, goTown],
		text: "You enter the store."
	},
	{
		id: 2,
		name: "cave",
		"button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
		"button functions": [fightSlime, fightBeast, goTown],
		text: "You enter the cave. You see some monsters."
	},
	{
		id: 3,
		name: "fight",
		"button text": ["Attack", "Dodge", "Run"],
		"button functions": [attack, dodge, goTown],
		text: "You are fighting a monster."
	},
	{
		id: 4,
		name: "kill monster",
		"button text": ["Go to town square", "Go to town square", "Go to town square"],
		"button functions": [goTown, goTown, easterEgg],
		text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
	},
	{
		id: 5,
		name: "lose",
		"button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
		"button functions": [restart, restart, restart],
		text: "You die. ☠️"
	},
	{
		id: 6,
		name: "win",
		"button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
		"button functions": [restart, restart, restart],
		text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
    },
	{
		id: 7,
		name: "easter egg",
		"button text": ["2", "8", "Go to town square?"],
		"button functions": [pickTwo, pickEight, goTown],
		text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
	},
	{
		id: 8,
		name: "Pós Batalha",
		"button text": ["Continuar(Oak)"],
		"button functions": [PósInitProf],
		text: "",
		img : `./Sprites/Green-transformed.png`
	},
	{
		id: 9,
		name: "Prof_Carvalho",
		"button text": ["Continuar(Floresta)"],
		"button functions": [PósInitProf2],
		text: "",
		img: `./Sprites/Oak-transformed.png`
	},
	{
		id: 10,
		name: "Floresta0",
		"button text": ["Floresta"],
		"button functions": [goFlorest],
		text: "Professor Carvalho te dá 5 Poções. Você decide passar pela floresta para chegar em Pewter.",
	},
	{
		id: 11,
		name: "Floresta",
		"button text": ["Curva à esquerda","Caminhar reto","Curva à direita"],
		"button functions": [() =>Florestando(0),() =>Florestando(1),() =>Florestando(2)],
		text: "",//1 Poke selvagem, 2 Treinador, 3 Evento
	},
    {
		name: "Floresta",
		"button text": ["<- Voltar","Curva à esquerda","Curva à direita","Caminhar reto"],
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