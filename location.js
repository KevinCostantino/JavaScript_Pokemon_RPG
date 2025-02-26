import { treinadorBrock,Poke6,treinador1,treinador2, goFinalBattle } from './script.js';
import { goTown } from './script.js';
import { PósInitProf,goFlorest,PósInitProf2,Florestando,embaralharNumeros} from './script.js';
import { PBattle } from './Batalha.js';
//import { PBattle2 } from './Batalha copy.js';
import { player } from './script.js';
import { rival,rival2 } from './script.js';
import { Poke1, Poke2, Poke3, Poke4, Poke5} from './script.js';
import { goPewter,goCentroPokémon,goPokéMart,goGym } from './script.js';
import { tocarMusica } from './pokeapiF.js';


//goTown servindo somente como template, não tem uma função realmente 
export const locations = [
    {
		id: 0,
        name: "",
        "button text": ["", "", ""],
        "button functions": [goTown, goTown, goTown],
        text: ""
    },
	{
		id: 1,
        name: "",
        "button text": ["", "", ""],
        "button functions": [goTown, goTown, goTown],
        text: ""
	},
	{
		id: 2,
        name: "",
        "button text": ["", "", ""],
        "button functions": [goTown, goTown, goTown],
        text: ""
	},
	{
		id: 3,
        name: "",
        "button text": ["", "", ""],
        "button functions": [goTown, goTown, goTown],
        text: ""
	},
	{
		id: 4,
        name: "",
        "button text": ["", "", ""],
        "button functions": [goTown, goTown, goTown],
        text: ""
	},
	{
		id: 5,
        name: "",
        "button text": ["", "", ""],
        "button functions": [goTown, goTown, goTown],
        text: ""
	},
	{
		id: 6,
        name: "",
        "button text": ["", "", ""],
        "button functions": [goTown, goTown, goTown],
        text: ""
    },
	{
		id: 7,
        name: "",
        "button text": ["", "", ""],
        "button functions": [goTown, goTown, goTown],
        text: ""
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
		text: "Por qual caminho seguir?",//1 Poke selvagem, 2 Treinador, 3 Evento
	},
    {
		id: 12,
		name: "Bug",
		"button text": ["<- Voltar","Curva à esquerda","Curva à direita","Caminhar reto"],
		"button functions": [goTown,goTown,goTown,goTown],
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
		"button functions": [() => goPewter(2),() =>goCentroPokémon(2)],
		text: "Olá! precisa de que seus Pokémon sejam cuidados?",
	},
	{
		id: 19,
		name: "Loja",
		"button text": ["Voltar","Comprar Poção ($200)","Comprar Pokebola ($300)"],
		"button functions": [() => goPewter(2),() =>goPokéMart(2), () =>goPokéMart(3)],
		text: "Olá! Como posso ajudá-lo?",
	},
	{
		id: 20,
		name: "Ginasio",
		"button text": ["Voltar","Começar Batalha"],
		"button functions": [() => goPewter(2),() => goGym(2)],
		text: "Deseja desafiar o líder de ginásio Brock?",
	},
	{
		id: 21,
		name: "BatalhaFinal",
		"button text": ["Voltar","Começar Batalha."],
		"button functions": [() => goPewter(3),() =>goFinalBattle(1)],
		text: "",
	    img: `./Sprites/Green-transformed.png`

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
	{
		id: 23,
		name: "PokemonCenter",
		"button text": ["Continuar"],
		"button functions": [() => goPewter(2)],
		text: "Seus Pokémon foram curados!",
	},
	{
		id: 24,
        name: "Pewter",
        "button text": ["Centro Pokémon", "PokéMart", "Rival","Voltar"],
        "button functions": [
            () => goCentroPokémon(1), // Chama a função goCentroPokémon com argumento 1
            () => goPokéMart(1), // Chama a função goPokéMart com argumento 1
            () => goFinalBattle(1), // Chama a função goGym com argumento 1
			() => goFlorest(), // Chama a função goFlorest
        ],
        text: "",
	},
]