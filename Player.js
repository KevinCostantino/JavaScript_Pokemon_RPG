import { Pokemon } from './Pokémon.js';
import { updateIcon,AjustaMove } from './script.js';
import { showInputAlert } from './pokeapiF.js';

class Player {

        constructor() {
            this.treinador = null;
            this.name = null;
            this.party = []; // Inicializa a party como um array vazio
        }

    capturePokemon(treinador,pokemon,currentTotalXP,level,move1,move2,move3,move4,type1,type2,NdeMov) {
        this.treinador = treinador;
        this.NdeMov = NdeMov
        console.log(this.party.length,this.party)
        console.log("player.party[5]",this.party[5]);

        if (this.party.length < 6) {
            this.party.push(new Pokemon(pokemon, currentTotalXP,level,move1,move2,move3,move4,type1,type2,4)); // Adiciona o Pokémon à party
            //console.log(treinador, " e ",pokemon," e ",pokemon.name)
            console.log(`${pokemon.name} foi adicionado à sua equipe!`);

        } else {
            console.log("player.party[5]",this.party[5]);
            console.log("Sua equipe está cheia! Você precisa substituir um Pokémon.");
            let idEscolhido = this.replacePokemon(pokemon,currentTotalXP,level,move1,move2,move3,move4,type1,type2,4);
            console.log(idEscolhido)
            console.log("player.party[5]",this.party[5]);

            return idEscolhido
        }
    }

    //o numero escolhido é visto como toda a promise, fazendo a batalha não se encerrar
    //para resolver, usar prompt invés
    async replacePokemon(newPokemon, currentTotalXP, level, move1, move2, move3, move4, type1, type2, NdeMov) {
        console.log("Escolha um Pokémon para substituir:");
        this.party.forEach((p, index) => {
            console.log(`${index + 1}: ${p.name}`);
        });
    
        const escolha = async () => {
            while (true) {
                // Obtém a escolha do usuário usando showInputAlert
                const choice = await showInputAlert("Digite o número do Pokémon que deseja substituir:");
    
                // Converte a escolha para número
                const choiceNumber = parseInt(choice);
    
                // Valida a escolha
                if (choiceNumber >= 1 && choiceNumber <= 6) { // Garante que seja um número válido
                    const indexToReplace = choiceNumber - 1;
                    if (indexToReplace >= 0 && indexToReplace < this.party.length) {
                        const replacedPokemon = this.party[indexToReplace];
                        this.party[indexToReplace] = new Pokemon(newPokemon, currentTotalXP, level, move1, move2, move3, move4, type1, type2, NdeMov);
                        updateIcon(newPokemon, choiceNumber);
                        console.log(`${replacedPokemon.name} foi substituído por ${newPokemon.name}.`);
                        return choiceNumber; // Retorna a escolha válida
                    } else {
                        console.log("Escolha inválida! Nenhum Pokémon foi substituído.");
                    }
                } else {
                    console.log("Escolha inválida! Por favor, selecione uma posição válida.");
                }
            }
        };
    
        // Inicia o processo de escolha
        return escolha().catch((error) => {
            console.error("Ocorreu um erro:", error);
            return null; // Retorna null em caso de erro
        });
    }
    
    

    showParty() {
        const str = "name";
        const modStr = str[0].toUpperCase() + str.slice(1);
        console.log("Sua equipe:");
        this.party.forEach(p => console.log(p.name.charAt(0).toUpperCase() + p.name.slice(1)));
    }
}


// Para exportar a classe Player
export default Player;
