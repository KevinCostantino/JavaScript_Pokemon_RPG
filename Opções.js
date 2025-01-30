import {captura, troca, bolsaPotion, trocatela } from './script.js';
import './Batalha.js';
import {logMessage,updateStatus,calculateDamage,updatePlayerHealth,turnaum} from './Batalha.js';
import { endBattleF } from './pokeapiF.js'; 

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");

const handleBtn1Click = () => options(btn1, turnoAtual, player.party[0], rival.party[0], player, rival);
const handleBtn2Click = () => options(btn2, turnoAtual, player.party[0], rival.party[0], player, rival);
const handleBtn3Click = () => options(btn3, turnoAtual, player.party[0], rival.party[0], player, rival);


const oioioi = 0

export async function options(btn,turnoAtual,player,rival,playerOG,rivalOG) {
  //player = player.party[0]
  //rival = rival.party[0]
btn1.removeEventListener("click", handleBtn1Click);
btn2.removeEventListener("click", handleBtn2Click);
btn3.removeEventListener("click", handleBtn3Click);
const P2 = document.getElementById("P2");
const P3 = document.getElementById("P3");
const P4 = document.getElementById("P4");
const P5 = document.getElementById("P5");
const P6 = document.getElementById("P6");
  console.log("OI",btn,P2)
  let vidaAntigaP = player.name.hp;
  let vidaAntigaO = rival.name.hp;

         var AM = 1; //Adapatador de movimento
         
         console.log("merda",btn)

         if (btn == btn3) {
          captura(rival); // Chama a função captura
          console.log("ada",playerOG.party[5])
            const a = playerOG.party.length; // Calcula o comprimento da party no momento do clique
            //console.log("dsSF", playerOG.party[a - 1].name); // Exibe o nome do Pokémon recém-adicionado

            setTimeout(() => { }, 1000); // 1 segundo de cooldown
        logMessage(`Turno ${turnoAtual}:`);
        logMessage(`${LetraM1(player.name.name)} capturou!`);
        console.log("capturou");
        //return { damage: 0 };
         exampleUsage("btn3");

        }
         else if (btn == btn2) {
          
          bolsaPotion(player); // Chama a função captura

          // Associa a função 'bolsaPotion' ao evento de clique
          //btn2.addEventListener("click", () => bolsaPotion(player.party[0]));

          // Associa a função 'updatePlayerHealth' ao evento de clique
          updatePlayerHealth(player.name, null, "rival", rival.name);

            setTimeout(() => { }, 1000); // 1 segundo de cooldown
          
          logMessage(`Turno ${turnoAtual}:`);
          logMessage(`${LetraM1(player.name.name)} curou!`);
          console.log("curou");
          //return { damage: 0 };
          exampleUsage("btn2");
        }  
         else if (btn == btn1) {
          //console.log("MERDA",rival)
    // Remover o evento de clique para evitar a duplicação da função
          //btn1.addEventListener("click", () => exampleUsage("btn1"));
          const ajuda = turnoAtual;
          //troca(playerOG.party,playerOG, rivalOG,ajuda); // Função anônima garante que 'captura' será chamada apenas no clique
          trocatela();
          setTimeout(() => {}, 100)
          AM = 0;
        }else if ([P2, P3, P4, P5, P6].includes(btn))  {
          console.log("merda",btn)
          const id = btn.id; // Supondo que btn tenha um ID como "P2", "P3", etc.
          const numero = Number(id.slice(1)); // Extrai o número e converte para número          exampleUsage("btn1");
          const pokemonButtons = [P2, P3, P4, P5, P6];
          if (pokemonButtons.includes(btn)) {
            const index = pokemonButtons.indexOf(btn);
            console.log(playerOG.party[numero])
            troca(playerOG.party, numero-1, rivalOG, turnoAtual);
          }
          
          logMessage(`Turno ${turnoAtual}:`);
          logMessage(`${LetraM1(player.name.name)} trocou!`);
          turnoAtual = turnoAtual + 1;
        } else {
          console.error("O botão não foi encontrado!");
        }


  

  async function exampleUsage(he) {
  
    console.log("Aguardando clique no botão"+he+"...");
    //console.log(he);
    setTimeout(() => {}, 1000)
    if (he === "btn1" || he === btn1) {
    he = "btn1"
    //console.log("...");
    await waitForClick(he); // Aguarda o clique no botão btn1
    //console.log("Botão btn1 clicado! Agora a próxima ação será liberada.");
    } else if (he === "btn2" || he === btn2) {
    he = "btn2"
    //console.log("...");
    await waitForClick(he); // Aguarda o clique no botão btn2
    //console.log("Botão btn2 clicado! Agora a próxima ação será liberada.");
    } else if (he === "btn3" || he === btn3) {
    he = "btn3"
    //console.log("...");
    await waitForClick(he); // Aguarda o clique no botão bt)3
    //console.log("Botão btn3 clicado! Agora a próxima ação será liberada.");
    }
    // Ação a ser executada após o clique
    //console.log("Ação executada!");

    resolveTurn(he); // Substitua por sua lógica
  } 
  function removeListener() {
    btn3.removeEventListener("click", () => {
      const a = player.party.length; // Calcula o comprimento da party no momento do clique
      console.log("dsSF", player.party[a - 1].name); // Exibe o nome do Pokémon recém-adicionado
      
      setTimeout(() => {rival.party[0].moves = movimentosEnemyDebug;}, 100)
   })
   btn3.removeEventListener("click", () => exampleUsage("btn3")
  );
  btn2.removeEventListener("click", () => updatePlayerHealth(player.party[0].name, null, "rival", rival.party[0].name));
  
  btn2.removeEventListener("click", () => exampleUsage("btn2"));
  btn1.removeEventListener("click", () => AM = 0);
  btn1.removeEventListener("click", () => exampleUsage("btn1"));

  }

  // Função que aguarda o clique no botões btn
  function waitForClick(buttonId) {
    
    return new Promise((resolve) => {
      const button = document.getElementById(buttonId);
      if (!button) {
        //console.error(`Botão com ID "${buttonId}" não encontrado!`);
        return;
      }
      else if(button){
        //console.log(`Botão com ID "${buttonId}" encontrado!`);
      }
      // Adiciona um evento de clique que resolve a Promise
      const handleClick = () => {
        button.removeEventListener("click", handleClick); // Remove o listener após o clique
        resolve(); // Libera a execução
      };
      handleClick();
    });
  }


  async function resolveTurn(playerMove) {

    (player.name, rival.name);
    if (isBattleOver()) return; // Verifica novamente se a batalha já acabou
  
    const playerSpeed = player.name.extra.stats.Speed;
    //console.log(playerSpeed);
    const rivalSpeed = rival.name.extra.stats.Speed;
  
    //let dano, vidaAntiga, atacante;
    let vidaAntiga, atacante;

      // Jogador age primeiro já que botão tem prioridade
      console.log("Jogador ataca primeiro");
      // Executa o ataque do jogador
      const dano = 0;
      //dano = result.damage;
      if (playerMove != ("btn2"||"btn3"||"btn1")) {

      //vidaAntigaO = result.vidaAntiga;
      atacante = "player";
      
      // Atualiza o status após o ataque do jogador
      updateStatus(player.name, rival.name, dano, vidaAntigaP,vidaAntigaO,atacante);      // Atualize o status no início
    
      }

      // Verifica se a batalha não acabou, então o rival ataca
      if (!isBattleOver()) {
        const rivalMove = getRandomMove(rival);

        const dano = await executeAttack(rival, player, rivalMove);
        //dano = resultRival.damage;
        //vidaAntigaP = resultRival.vidaAntiga;
        atacante = "rival";

        // Atualiza o status após o ataque do rival
        console.log("rival.party[0]: e player.party[0]",rival,player);

        updateStatus(player.name, rival.name, dano, vidaAntigaP,vidaAntigaO,atacante);      // Atualize o status no início

      }
    

    // Aumenta o turno para a próxima rodada
    //console.log(`BTurno ${turnoAtual} finalizado. Último ataque realizado por: ${atacante}`);
    //console.log("Paerty ",playerOG);
    turnoAtual++;
    
    // Verifica o status da batalha no final do turno
    checkBattleStatus();
  }
  function isBattleOver() {
    // Verifica se qualquer Pokémon tem HP 0 ou menos
    return player.name.hp <= 0 || rival.name.hp <= 0;
  }
  function getRandomMove(pokemon) {
    return pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)];
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
  function checkBattleStatus() {
          if (player.name.hp <= 0) {
            logMessage('Você perdeu a batalha!');
  
            endBattle('rival');
          } else if (rival.name.hp <= 0) {
  
           
          //console.log("rival.party.length:",rival.party.length);
            if (rival.party.length > 1) {
              
              XPDX(player.name.currentXP,player.name.levelType,rival.name.base_exp,player.party[0].name.level,rival.party[0].name.level,0)
              //console.log("rival.party[0]:",rival,player);
  
              //const reserva = player.party[0];
              rivalOG.party[0] = rivalOG.party[1];
              rivalOG.party[1] = null;
              //console.log("rival.party[0]:",rivalOG.party[0],playerOG.party[0]);
  
              const div = document.getElementById("controls");
              const buttonsA = div.querySelectorAll("button"); // Seleciona todos os <button> dentro do <div>
              buttonsA.forEach(button => button.remove()); // Remove cada botão encontrado
              
  
  
              setTimeout(() => updateRivalHealth(null, null, "rival",rival.name), 1500);
              rival.party.pop();
              //AM = 1; //Adapatador de movimento
              handleClick();
              setTimeout(() => PBattle(playerOG,rivalOG), 1500);
              
            }
            else{
              console.log("player.party[0]",player );
  
  
  
              XPDX(player.name.currentXP,player.name.levelType,rival.name.base_exp,player.name.level,rival.name.level,0)
              logMessage('Você venceu a batalha! Parabéns!');
              handleClick();
              turnoAtual = 1
              endBattle('player');
            }
            //console.log("XP inicial:",player.party[0]);
  
          }
        }
  function LetraM1(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function clearLog() {
    const log = document.getElementById('battle-log');
    log.innerHTML = ''; // Remove todo o conteúdo
    log.style.display = 'none'; // Opcional: Esconde o log novamente
  }
function endBattle(winner) {
    // Atualiza o nível do Pokémon do jogador com um pequeno atraso
    setTimeout(() => updateLV(playerOG.party[0].name), 100);

    // Exibe o resultado da batalha após 1 segundo
    setTimeout(() => {
        const message = winner === 'player' ? 'Você venceu!' : 'Você perdeu!';
        console.log(message);
        alert(message);
        //removeListener();        
        // Chama a função de finalização com base no vencedor
        if (winner === 'player') {
          turnoAtual = 1
          for (let index = 0; index < playerOG.party.length; index++) {
            playerOG.party[index].name.hp = playerOG.party[index].name.TotalHP;            
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
  console.log("UH?:",playerOG.party[0].name.level);
  document.getElementById('pokeLv').innerHTML = 
  `<p><strong>Lv.${PokeP.level}</strong></p>
   `;
  
      }   
}