import { update } from './script.js';
import { locations } from './script.js';
import { goStore } from './script.js';
import { Poke } from './pokeapi.js';
import { player } from './script.js';
import { rival } from './script.js';
import { startBattle } from './Batalha.js';
import { getPokemonStats } from './Batalha.js';
import { XPDX } from './XPf.js';


export async function PokemonInicial(pokemonId, aux) {
    let pokemonName = '';
    let pokemonImage = '';

    switch (pokemonId) {
        case 1:
            pokemonName = 'Bulbasaur';
            pokemonImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
            break;
        case 4:
            pokemonName = 'Charmander';
            pokemonImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png';
            break;
        case 7:
            pokemonName = 'Squirtle';
            pokemonImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png';
            break;
        default:
            pokemonName = 'Unknown';
            pokemonImage = '';
    }
  


    Poke(pokemonName.toLowerCase());
    //const player = new Player();
    
    //const initialPokemon = { name: pokemonName, level: 5, id: pokemonId }; // Armazene o id do Pokémon
    const initialPokemon = await getPokemonStats(pokemonId); // Armazene o id do Pokémon
    
    player.capturePokemon(initialPokemon);
    
    const initialRival = await getPokemonStats(inicialRival(player));
    rival.capturePokemon(initialRival);
    //captureRandomPokemon(player);
    console.log(`${initialPokemon.name} (Nível ${initialPokemon.level}) foi capturado!`);

    // Capturando Pokémon aleatórios
    //const randomPokemonNames = ['Charmander', 'Squirtle', 'Pikachu', 'Jigglypuff', 'Meowth'];
    //for (let i = 0; i < 3; i++) { // Exemplo: captura de 3 Pokémon aleatórios
    //    const randomName = randomPokemonNames[Math.floor(Math.random() * randomPokemonNames.length)];
    //    const randomLevel = Math.floor(Math.random() * 10) + 1; // Nível aleatório entre 1 e 10
    //    const randomPokemon = { name: randomName, level: randomLevel };
    //    player.capturePokemon(randomPokemon);
    //}

    document.getElementById("monsterName").textContent = pokemonName;
    document.getElementById("pokemonImage").innerHTML = `<img src="${pokemonImage}" alt="${pokemonName}">`;
    document.getElementById("text").textContent = `Você escolheu ${pokemonName}! Boa sorte na sua aventura!`;
    document.getElementById("PokeN°Text").innerHTML = `${1}`;

    changeButtonsToInput(player,aux);
}

function changeButtonsToInput(player,aux) {
    button1.innerText = "Obrigado!";
    button1.onclick = infos(player);


}

function infos(player, aux) {
    button2.style.display = 'none';
    button3.style.display = 'none';
    text.innerText = `Oh é mesmo! Eu nem mesmo sei o seu nome, poderia me dizer?`;
    button1.innerText = "Inserir seu nome"; 

    // Definir o novo evento
    const handleClick = () => {
        askForName(player);
        button1.removeEventListener("click", handleClick); // Remove o evento após a execução
    };

    button1.addEventListener("click", handleClick);
}

// Funções para capturar as informações do usuário
export function askForName(player,aux) {
    aux = 25;
    player.name = prompt("Digite seu nome:");
    if (player.name) {
        document.getElementById("NomeText").textContent = player.name;
        text.innerText = `Prazer em te conhecer: ${player.name}`;
        const handleClick = () => {
            rivalF(player)
            button1.removeEventListener("click", handleClick); // Remove o evento após a execução
        };
    
        button1.addEventListener("click", handleClick);
        button1.innerText = "Continuar";

    }
}
function rivalF(player) {
    // Esconde o sprite do rival antes da batalha
    document.getElementById("rival-sprite").style.display = "none"; 
    document.getElementById("charName").textContent = 'Green';
    document.getElementById("pokemonImage").innerHTML = `<img src="${'./Sprites/Green-transformed.png'}" alt="${'Green'}">`;
    document.getElementById("text").textContent = `Ei espera um momento ${player.name}! Não vai pensando que vai sair daqui sem uma batalha!`;
    const handleClick = () => {
        setTimeout(() => {
            startBattleF(player);  // Função que inicia a batalha
        }, 1000); 
        button1.removeEventListener("click", handleClick); // Remove o evento após a execução
    };
    button1.addEventListener("click", handleClick);

    // Adiciona um pequeno atraso antes de iniciar a batalha
 // Exibe por 2 segundos antes de começar a batalha
}



function startBattleF(player) {
    // Exibir a área de batalha 
    button1.style.display = 'none';

    document.getElementById("pokemonImage").style.display = "none"; 
    document.getElementById("battle-area").style.display = "block";
    document.getElementById("rival").innerHTML = `<img src="${'./Sprites/Green-transformed.png'}" alt="${'Green'}">`;
    document.getElementById("player-pokemon-image").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${player.party[0].id}.png`; // URL do sprite do Pokémon escolhido
    document.getElementById("rival-pokemon-image").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${rival.party[0].id}.png`; // URL do sprite do Pokémon escolhido
    console.log("HP inicial:", player.party[0].hp);


    
    //console.log(player.party[0].id, rival.party[0].id);
    //startBattle(player.party[0].id, rival.party[0].id);
    

    //console.log(player.party[0].id)
    // Resete HP para 100
    let playerPokemonHP = 100;
    let rivalPokemonHP = 100;

    updateHealth("player", 0,player.party[0].hp); // Atualiza HP inicial
    updateHealth("rival", 0,rival.party[0].hp); // Atualiza HP inicial

    const attackButton = document.getElementById("attack-button");
    attackButton.onclick = function() {
        let playerDamage = Math.floor(Math.random() * 10) + 5;
        let rivalDamage = Math.floor(Math.random() * 10) + 5;

        if (player.party[0].hp > 0) {
            console.log(`HP ${rival.party[0].name}: ${rival.party[0].hp}%`);
            rival.party[0].hp=updateHealth("rival", rivalDamage,rival.party[0].hp);
        }

        if (rival.party[0].hp > 0) {
            console.log(`HP ${player.party[0].name}: ${player.party[0].hp}%`);
            player.party[0].hp=updateHealth("player", playerDamage,player.party[0].hp);
        }

        console.log(`Ataque do ${player.party[0].name}: ${rivalDamage}`);
        console.log(`Ataque do ${rival.party[0].name}: ${playerDamage}`);

        document.getElementById("player-pokemon-health").innerText = `HP: ${Math.max(0, player.party[0].hp)}`;
        document.getElementById("rival-pokemon-health").innerText = `HP: ${Math.max(0, rival.party[0].hp)}`;
        if (player.party[0].hp <= 0 || rival.party[0].hp <= 0) {
            if (rival.party[0].hp <= 0) {
                XPDX(player.party[0].currentXP,player.party[0].levelType,rival.party[0].base_exp,player.party[0].level,rival.party[0].level);
            }
            setTimeout(endBattle, 100); // delay endBattle by 100ms
        }
        playerDamage, rivalDamage = 0;
    };
}


export function updateHealth(pokemon, damage,hp) {

    if (pokemon === "player") {
        hp -= damage;
    } else if (pokemon === "rival") {
        hp -= damage;
    }

    let healthElement;
    if (pokemon === "player") {
        healthElement = document.getElementById("player-pokemon-health");
    } else {
        healthElement = document.getElementById("rival-pokemon-health");
    }
    if (healthElement) {
        healthElement.innerText = `HP: ${Math.max(0, hp)}`;
      } else {
        console.error("Health element not found");
      }
      return hp;
    }
function endBattle() {
    const winner = player.party[0].hp > rival.party[0].hp ? "Você venceu!" : "Você perdeu!";
    alert(`A batalha terminou! ${winner}`);
    document.getElementById("battle-area").style.display = "none"; // Esconde a área de batalha após o fim
    // Aqui você pode adicionar lógica para o que acontece após a batalha
}

function vaiproScript() {
    button1.onclick = update(locations[0]);  // Atualiza para a próxima fase do jogo no script.js
    button2.style.display = 'inline-block';
    button3.style.display = 'inline-block';
    vaiproScript2();
}

function vaiproScript2() {
    button1.onclick = goStore;  //Troca o botão pra ser a loja
    button2.style.display = 'inline-block';
    button3.style.display = 'inline-block';

}
function askForAge() {
    const playerAge = prompt("Digite sua idade:");
    if (playerAge) {
        text.innerText = `Idade inserida: ${playerAge}`;
    }
}

function askForGender() {
    const playerGender = prompt("Digite seu sexo (M/F):");
    if (playerGender) {
        text.innerText = `Sexo inserido: ${playerGender}`;
    }
}


async function captureRandomPokemon(player) {
    const input = prompt("Digite o nome do Pokémon ou o número da Pokédex para capturá-lo:");
    let pokemonName;

    // Verifica se o input é um número ou um nome
    if (!isNaN(input)) {
        const pokemonId = parseInt(input);
        pokemonName = await getPokemonNameById(pokemonId);
    } else {
        pokemonName = input.toLowerCase();
    }

    if (pokemonName) {
        const randomLevel = Math.floor(Math.random() * 10) + 1; // Nível aleatório entre 1 e 10
        const newPokemon = { name: pokemonName, level: randomLevel };
        player.capturePokemon(newPokemon);
        
        // Exibe o nível do Pokémon capturado
        console.log(`${newPokemon.name.charAt(0).toUpperCase() + newPokemon.name.slice(1)} (Nível ${newPokemon.level}) foi capturado!`);
        player.showParty();

    } else {
        console.log("Pokémon não encontrado.");
    }
}

// Função para obter o nome do Pokémon baseado no ID
async function getPokemonNameById(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        if (response.ok) {
            const data = await response.json();
            return data.name; // Retorna o nome do Pokémon
        } else {
            console.log("Pokémon não encontrado.");
            return null;
        }
    } catch (error) {
        console.log("Erro ao buscar Pokémon:", error);
        return null;
    }
}

function inicialRival(player) {
    let r =0;
    switch (player.party[0].id) {
        case 1:
            r = 4;
            return r;
        case 4:
            r = 7;
            return r;
        case 7:
            r = 1;
            return r;

    }
}
