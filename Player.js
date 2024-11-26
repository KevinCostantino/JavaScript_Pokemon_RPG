import { Pokemon } from './Pokémon.js';

class Player {

        constructor() {
            this.name = null;
            this.party = []; // Inicializa a party como um array vazio
        }

    capturePokemon(pokemon,currentTotalXP,move1,move2,move3,move4,type1,type2) {
        if (this.party.length < 6) {
            this.party.push(new Pokemon(pokemon, currentTotalXP,move1,move2,move3,move4,type1,type2)); // Adiciona o Pokémon à party
            console.log(`${pokemon.name} foi adicionado à sua equipe!`);
        } else {
            console.log("Sua equipe está cheia! Você precisa substituir um Pokémon.");
            this.replacePokemon(pokemon);
        }
    }

    replacePokemon(newPokemon) {
        console.log("Escolha um Pokémon para substituir:");
        this.party.forEach((p, index) => {
            console.log(`${index + 1}: ${p.name}`);
        });

        const choice = prompt("Digite o número do Pokémon que deseja substituir:");
        
        if (choice !== null) {
            const indexToReplace = parseInt(choice) - 1;
            if (indexToReplace >= 0 && indexToReplace < this.party.length) {
                const replacedPokemon = this.party[indexToReplace];
                this.party[indexToReplace] = newPokemon; // Substitui o Pokémon escolhido
                console.log(`${replacedPokemon.name} foi substituído por ${newPokemon.name}.`);
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
