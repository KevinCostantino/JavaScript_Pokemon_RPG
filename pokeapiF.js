import { goPewter, update, goFinalBattle } from './script.js';
import { locations } from './location.js';
import { goStore } from './script.js';
import { Poke } from './pokeapi.js';
import { player } from './script.js';
import {aumentargold } from "./script.js";
import { rival,rival2 } from './script.js';
import { Poke1, Poke2, Poke3, Poke4, Poke5,Poke6,treinador1,treinador2,treinador3,treinadorBrock } from './script.js';

//import { startBattle } from './Batalha.js';
//import { getPokemonStats } from './Batalha.js';
import { XPDX } from './XPf.js';
import { PBattle,getPokemonStats } from './Batalha.js';
//import { PBattle2,getPokemonStats } from './Batalha copy.js';

import { IMFREE } from './script.js';
import { moves } from './moves.js';

export async function PokemonInicial(pokemonId, aux) {
    let pokemonName = '';
    let pokemonImage = '';
    let M1 = ''; let M2 = ''; let M3 = ''; let M4 = '';
    switch (pokemonId) {
        case 1:
            pokemonName = 'Bulbasaur';
            pokemonImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
            M1 ='tackle'; M2 = 'swords-dance'; M3 = 'vine-whip'; M4 = 'growl';
            break;
        case 4:
            pokemonName = 'Charmander';
            pokemonImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png';
            M1 ='tackle'; M2 = 'swords-dance'; M3 = 'ember'; M4 = 'growl';
            break;
        case 7:
            pokemonName = 'Squirtle';
            pokemonImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png';
            M1 ='tackle'; M2 = 'swords-dance'; M3 = 'water-gun'; M4 = 'splash';
            break;
        default:
            pokemonName = 'Unknown';
            pokemonImage = '';
    }
    document.getElementById("PokeN°Text").innerHTML = null;



    Poke(pokemonName.toLowerCase());
    //const player = new Player();
    
    //const initialPokemon = { name: pokemonName, level: 5, id: pokemonId }; // Armazene o id do Pokémon
    const initialPokemon = await getPokemonStats(pokemonId,5); // Armazene o id do Pokémon


    player.capturePokemon(player.name,initialPokemon,0,5,M1, M2, M3, M4,initialPokemon.type1,initialPokemon.type2,null,null,4);
    document.getElementById("P1").innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${player.party[0].name.id}.png" 
    style="position: absolute; top: -10px; left: 11px;" alt=${pokemonName}>`;
    console.log(player.party[0]);

    const initialRival = await getPokemonStats(inicialRival(player),5);
    const initialRival2 = await getPokemonStats(inicialRival(player)+1,5);
    const [MR1, MR2, MR3, MR4] = MovRival(player);
    rival.capturePokemon("Gary",initialRival, 0, 5, MR1, MR2, MR3, MR4,4); 
    

    console.log(rival);
    //captureRandomPokemon(player);
    console.log(`${initialPokemon.name} (Nível ${initialPokemon.level}) foi capturado!`);
    
    async function BatalhaSetup(id,lv) {
        return await getPokemonStats(id,lv)
    }
    removerFundo()

    trocarFundo("./Fundos/Laboratório_V2.png");
    tocarMusica("./Audios/Welcome_to_the_world_of_Pokemon.mp3"); // Música de batalha

    Poke1.capturePokemon("",await BatalhaSetup(10,getRandomInt(2,4)),0,getRandomInt(2,4),moves[0], moves[6], moves[7],null,3);
    Poke2.capturePokemon("",await BatalhaSetup(13,getRandomInt(2,4)),0,getRandomInt(2,4),moves[8], moves[6], moves[7]);
    Poke3.capturePokemon("",await BatalhaSetup(16,getRandomInt(3,6)),0,getRandomInt(3,6),moves[0], moves[9], moves[10]);
    Poke4.capturePokemon("",await BatalhaSetup(19,getRandomInt(2,6)),0,getRandomInt(2,6),moves[0], moves[11], moves[12]);
    Poke5.capturePokemon("",await BatalhaSetup(114,getRandomInt(7,8)),0,getRandomInt(7,8),moves[4], moves[3]);
    Poke6.capturePokemon("",await BatalhaSetup(74,getRandomInt(4,6)),0,getRandomInt(4,6),moves[0], moves[23]);

    treinador1.capturePokemon("John",await BatalhaSetup(21,4),0,4,moves[13], moves[14], moves[15]);
    treinador2.capturePokemon("Maria",await BatalhaSetup(23,9),0,9,moves[15], moves[8], moves[12]);
    treinador3.capturePokemon("Leon",await BatalhaSetup(25,7),0,7,moves[16], moves[17], moves[14]);
    
    treinadorBrock.capturePokemon("Brock",await BatalhaSetup(74,8),0,8,moves[0], moves[23], moves[24]);
    treinadorBrock.capturePokemon("Brock",await BatalhaSetup(95,10),0,10,moves[1], moves[2], moves[23], moves[0]);
    console.log(treinadorBrock.party);
    console.log(Poke6.party);
    rival2.capturePokemon("Gary_2",await BatalhaSetup(21,11), 0, 11,moves[9], moves[14], moves[15],4);    
    rival2.capturePokemon("Gary_2",await BatalhaSetup(inicialRival(player)+1,13), 0, 13, MR1, MR2, MR3, MR4,4);


    console.log(rival.party[0]);
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
    document.getElementById("PokeN°Text").innerHTML = 
    `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${player.party[0].name.id}.svg" 
          style="width: 3%; height: auto;" alt=${pokemonName}>`;
  
  
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
export async function askForName(player, aux) {
    aux = 25;
    player.name = await showInputAlert("Digite seu nome");

    if (player.name) {
        document.getElementById("NomeText").textContent = player.name;
        document.getElementById("text").innerText = `Prazer em te conhecer: ${player.name}`;

        const handleClick = () => {
            rivalF(player);
            button1.removeEventListener("click", handleClick); // Remove o evento após a execução
        };

        button1.addEventListener("click", handleClick);
        button1.innerText = "Continuar";
    }
}
function rivalF(player) {
    // Esconde o sprite do rival antes da batalha
    document.getElementById("charName").textContent = 'Green';
    document.getElementById("pokemonImage").innerHTML = `<img src="${'./Sprites/Green-transformed.png'}" alt="${'Green'}">`;
    tocarMusica("./Audios/Rival_Appears.mp3"); // Música de batalha

    document.getElementById("text").textContent = `Ei espera um momento ${player.name}! Não vai pensando que vai sair daqui sem uma batalha!`;
    const handleClick = () => {
        setTimeout(() => {
            startBattleF(player);  // Função que inicia a batalha
        }, 1//1000
        ); 
        button1.removeEventListener("click", handleClick); // Remove o evento após a execução
    };
    button1.addEventListener("click", handleClick);

    // Adiciona um pequeno atraso antes de iniciar a batalha
 // Exibe por 2 segundos antes de começar a batalha
}



function startBattleF(player) {

    document.getElementById("pokemonImage").style.display = "none"
    console.log(rival,rival2);
    PBattle(player, rival)
    //evento()

}


export function updateHealth(pokemon, damage,hp) {

    if (pokemon === "player") {
        hp -= damage;
    } else if (pokemon === "rival") {
        hp -= damage;
    }

    let healthElement;
    if (pokemon === "player") {
        healthElement = document.getElementById("playerPokemonHealth");
    } else {
        healthElement = document.getElementById("rivalPokemonhealth");
    }
    if (healthElement) {
        healthElement.innerText = `HP: ${Math.max(0, hp)}`;
      } else {
        console.error("Health element not found");
      }
      return hp;
    }
export function endBattleF(a,treinadorNome) {
    console.log(treinadorNome);
    if (treinadorNome == "Gary" || treinadorNome == "Gary_2" || treinadorNome == "Brock") {
        console.log("entrou");
        for (let index = 0; index < player.party.length; index++) {
            player.party[index].name.hp = player.party[index].name.TotalHP;
          }
    }

    if (treinadorNome != "") {
        if (treinadorNome != "Gary" && treinadorNome != "Gary_2" && treinadorNome != "Brock") {
            aumentargold(300);
        }
    }
    //const winner = player.party[0].name.hp > rival.party[0].name.hp ? "Você venceu!" : "Você perdeu!";
    setTimeout(2000);
    //alert(`EAE`);
    //document.getElementById("battle-area").style.display = "none"; // Esconde a área de batalha após o fim
    // Aqui você pode adicionar lógica para o que acontece após a batalha
    vaiproScript(a,treinadorNome)
}
export let FF = 0;

export function addFF() {
    FF+= 1;
}
export function zeraFF() {
    FF = 0;
}
function vaiproScript(a,treinadorNome) {
    button1.style.display = 'inline-block';
    button1.onclick = update(locations[0]);  // Atualiza para a próxima fase do jogo no script.js
    button2.style.display = 'inline-block';
    button3.style.display = 'inline-block';
    const nomesPermitidos = [treinador1.treinador, treinador2.treinador, treinador3.treinador];
    console.log(treinadorNome,nomesPermitidos);

    if (nomesPermitidos.includes(treinadorNome) || treinadorNome == "") {
        if (a == 0) {
            FF++
            console.log(FF);
            IMFREE(1,"Options",a,FF);
            if (FF == 3) {
                FF = 0
                goPewter(1)
            }
        }else if (a == 1) {
            console.log(FF);
            if (FF == 0) {
                IMFREE(1,"Options",a,1);
            }else{
                IMFREE(1,"Options",a,FF);
            }
            if (FF == 3) {
                FF = 0
                goPewter(1)
            }
        }

    }else if (treinadorNome == "Gary") {

        vaiproScript2(a)
    
    }else if(a == 1 && treinadorNome == "Gary_2"){
      showInputAlert("Options")
    }
    else if (treinadorNome == "Brock") {
        console.log(treinadorNome);
        if (a == 0) {
            IMFREE(1,"Options",undefined,4);

        }else if (a == 1) {
            IMFREE(1,"Options",undefined,5);

        }
    }

}

export function vaiproScript2(a) {
    // Chamamos a função, que ativará o evento automaticamente
    console.log(a);
    button1.onclick = goStore;  //Troca o botão pra ser a loja
    button2.onclick = goStore;  //Troca o botão pra ser a loja
    button3.onclick = goStore;  //Troca o botão pra ser a loja

    button2.style.display = 'inline-block';
    button3.style.display = 'inline-block';
    IMFREE(1,"Options",a,FF);
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
        player.capturePokemon(player.name,newPokemon);
        
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
    switch (player.party[0].name.id) {
        case 1:
            r = 4;
            return (r);
        case 4:
            r = 7;
            return (r);
        case 7:
            r = 1;
            return (r);

    }
}

function MovRival(player) {
    let r = 0;
    let MR1 = '', MR2 = '', MR3 = '', MR4 = '';

    switch (player.party[0].name.id) {
        case 1:
            MR1 = 'tackle'; MR2 = 'swords-dance'; MR3 = 'ember'; MR4 = 'splash';
            r = 4;
            break;
        case 4:
            MR1 = 'tackle'; MR2 = 'swords-dance'; MR3 = 'water-gun'; MR4 = 'splash';
            r = 7;
            break;
        case 7:
            MR1 = 'tackle'; MR2 = 'swords-dance'; MR3 = 'vine-whip'; MR4 = 'splash';
            r = 1;
            break;
    }

    // Return the moves as an array
    return [MR1, MR2, MR3, MR4];
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }
  
  export let audio = null; // Variável global para armazenar o áudio

  export function tocarMusica(caminho) {
    if (audio) {
        // Se já houver uma música tocando, faz o fade-out antes de trocar
        let fadeOutInterval = setInterval(() => {
            if (audio.volume > 0.05) {
                audio.volume -= 0.05; // Reduz o volume gradualmente
            } else {
                clearInterval(fadeOutInterval); // Para o fade-out
                audio.pause(); // Pausa a música antiga
                iniciarNovaMusica(caminho); // Inicia a nova música com fade-in
                console.log(caminho)

            }
        }, 100); // Diminui o volume a cada 100ms
    } else {
        // Se não houver música tocando, inicia diretamente com fade-in
        iniciarNovaMusica(caminho);
        console.log()
    }
}

function iniciarNovaMusica(caminho) {
    audio = new Audio(caminho);
    audio.loop = true; // Música em loop
    audio.volume = 0; // Começa silencioso
    audio.play().catch(() => console.log("Autoplay bloqueado."));

    // Fade-in gradual
    let fadeInInterval = setInterval(() => {
        if (audio.volume < 0.20) {
            audio.volume += 0.05; // Aumenta o volume gradualmente
        } else {
            audio.volume = 0.25; // Garante que o volume fique no máximo
            clearInterval(fadeInInterval); // Para o fade-in
        }
    }, 100); // Aumenta o volume a cada 100ms
}
let backgroundElement = document.body; // Alvo da troca de fundo
let currentBackground = null;

export function trocarFundo(caminho) {
    let newBackground = document.createElement("div");
    newBackground.style.position = "fixed";
    newBackground.style.top = "0";
    newBackground.style.left = "0";
    newBackground.style.width = "100vw";
    newBackground.style.height = "100vh";
    newBackground.style.backgroundImage = `url(${caminho})`;
    newBackground.style.backgroundSize = "cover";
    newBackground.style.backgroundPosition = "center";
    newBackground.style.backgroundRepeat = "no-repeat";
    newBackground.style.backgroundAttachment = "fixed";
    newBackground.style.opacity = "0";
    newBackground.style.transition = "opacity 1s ease-in-out";
    newBackground.style.zIndex = "-1"; // Coloca o fundo atrás de tudo
    backgroundElement.appendChild(newBackground);
    
    // Inicia o fade-in
    setTimeout(() => {
        newBackground.style.opacity = "1";
    }, 50);
    
    // Se já houver um fundo, faz o fade-out antes de removê-lo
    if (currentBackground) {
        let oldBackground = currentBackground;
        setTimeout(() => {
            oldBackground.style.opacity = "0";
            setTimeout(() => {
                backgroundElement.removeChild(oldBackground);
            }, 1000); // Tempo do fade-out
        }, 50);
    }
    
    currentBackground = newBackground;
}


export function removerFundo() {
    if (currentBackground) {
        let opacity = 1;
        let fadeOutInterval = setInterval(() => {
            if (opacity > 0.05) {
                opacity -= 0.05;
                currentBackground.style.opacity = opacity;
            } else {
                clearInterval(fadeOutInterval);
                backgroundElement.removeChild(currentBackground); // Remove o fundo dinâmico
                currentBackground = null;
            }
        }, 100);
    }
    
    // Remove qualquer background image definido diretamente no body
    backgroundElement.style.backgroundImage = "none";
}

// Função para exibir um alerta de input e aguardar a resposta do jogador
export function showInputAlert(message) {
    return new Promise((resolve) => {
        const alertBox = document.createElement("div");
        alertBox.classList.add("custom-alert");

        alertBox.innerHTML = `
            <div class="alert-box">
                <p>${message}</p>
                <input type="text" id="alertInput" placeholder="Seu nome aqui">
                <button id="confirmAlert">OK</button>
            </div>
        `;

        document.body.appendChild(alertBox);
        document.getElementById("alertInput").focus();

        document.getElementById("confirmAlert").onclick = function () {
            const name = document.getElementById("alertInput").value.trim();
            alertBox.remove();
            resolve(name || "Jogador"); // Retorna um nome padrão se vazio
        };
    });
}


