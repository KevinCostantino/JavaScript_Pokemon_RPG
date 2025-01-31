import { Pokemon } from './Pokémon.js';
import { updateIcon,AjustaMove } from './script.js';

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

    replacePokemon(newPokemon,currentTotalXP,level,move1,move2,move3,move4,type1,type2,NdeMov) {
        
        console.log("Escolha um Pokémon para substituir:");
        this.party.forEach((p, index) => {
            console.log(`${index + 1}: ${p.name}`);
        });

        const choice = prompt("Digite o número do Pokémon que deseja substituir:");
        setTimeout(() => {}, 150);
        if (choice !== null) {
            const indexToReplace = parseInt(choice) - 1;
            if (indexToReplace >= 0 && indexToReplace < this.party.length) {
                const replacedPokemon = this.party[indexToReplace];
                this.party[indexToReplace] = new Pokemon(newPokemon, currentTotalXP,level,move1,move2,move3,move4,type1,type2,NdeMov); // Substitui o Pokémon escolhido
                //AjustaMove(this.party[indexToReplace])
                console.log(this.party[indexToReplace])
                console.log(choice)
                updateIcon(newPokemon,choice)
                console.log(`${replacedPokemon.name} foi substituído por ${newPokemon.name}.`);
                return choice
            } else {
                console.log("Escolha inválida! Nenhum Pokémon foi substituído.");
            }
        } else {
            console.log("Nenhuma escolha feita. Nenhum Pokémon foi substituído.");
        }
      
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
