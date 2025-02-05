import { goStore, treinadorBrock,Poke6,treinador1,treinador2, goFinalBattle } from './script.js';
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
import { goPewter,goCentroPokémon,goPokéMart,goGym } from './script.js';




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
		//img : `./Sprites/Green-transformed.png`
	},
	{
		id: 9,
		name: "Prof_Carvalho",
		"button text": ["Continuar(Floresta)"],
		"button functions": [PósInitProf2],
		text: "",
		//img: `./Sprites/Oak-transformed.png`
	},
	{
		id: 10,
		name: "Floresta0",
		"button text": ["Floresta"],
		"button functions": [goFlorest],
		text: "",
		//img: `./Sprites/Oak-transformed.png`
	},
	{
		id: 11,
		name: "Floresta",
		"button text": ["Curva à esquerda","Curva à direita","Caminhar reto"],
		"button functions": [() =>Florestando(0),() =>Florestando(1),() =>Florestando(2)],
		text: "",//1 Poke selvagem, 2 Treinador, 3 Evento
	},
    {
		id: 12,
		name: "Bug",
		"button text": ["<- Voltar","Curva à esquerda","Curva à direita","Caminhar reto"],
		"button functions": [goTown,goStore,goStore,goStore],
		text: "",
	},
	{
		id: 13,
		name: "Nada",
		"button text": ["Continuar"],
		"button functions": [goFlorest],
		text: "",
	},
    {
		id: 14,
		name: "Togepi",
		"button text": ["Continuar"],
		"button functions": [goFlorest],
		text: "",
	},
	{
		id: 15,
		name: "PewterChegada",
		"button text": ["Continuar"],
		"button functions": [() => goPewter(1)],
		text: "Você finalmente chega na cidade de Pewter",
	},
	{
		id: 16,
		name: "PewterChegada2",
		"button text": ["Continuar"],
		"button functions": [() => goPewter(2)],
		text: "Você finalmente chega na cidade de Pewter",
	},
	{
        id: 17,
        name: "Pewter",
        "button text": ["Centro Pokémon", "PokéMart", "Ginásio","Voltar"],
        "button functions": [
            () => goCentroPokémon(1), // Chama a função goCentroPokémon com argumento 1
            () => goPokéMart(1), // Chama a função goPokéMart com argumento 1
            () => goGym(1), // Chama a função goGym com argumento 1
			() => goFlorest(), // Chama a função goFlorest
        ],
        text: "",
	},
	{
		id: 18,
		name: "CentroPokémon",
		"button text": ["Voltar","Curar Pokémon"],
		"button functions": [goPewter,() =>goCentroPokémon(2)],
		text: "",
	},
	{
		id: 19,
		name: "Loja",
		"button text": ["Voltar","Comprar Poção ($200)","Comprar Pokebola ($300)"],
		"button functions": [goPewter,() =>goPokéMart(2), () =>goPokéMart(3)],
		text: "",
	},
	{
		id: 20,
		name: "Ginasio",
		"button text": ["Voltar","Começar Batalha"],
		"button functions": [goPewter,() => goGym(2)],
		text: "",
	},
	{
		id: 21,
		name: "BatalhaFinal",
		"button text": ["Voltar","Começar Batalha"],
		"button functions": [goPewter,goPewter],//PBattle(player, rival2)],
		text: "",
	},
	//{
	//	id: 21,
	//	name: "Fim",
	//	"button text": ["Continuar"],
	//	"button functions": [TelaDeFimDaDemo],
	//	text: "",
	//},
	{
		id: 22,
		name: "OuNão",
		"button text": ["Voltar","Centro Pokémon","PokéMart","Enfrentar Rival"],
		"button functions": [goFlorest,() => goCentroPokémon(1),() => goPokéMart(1),() => goFinalBattle],
		text: "",
	},
]