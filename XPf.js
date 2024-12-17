import { player } from './script.js';

async function loadXPData() {
    try {
        const response = await fetch('./XP.json');
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo XP.json: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
    
}
async function XPNovoLV(currentXP,levelType,gainedXP) {
    const XP = await loadXPData();
    if (!XP) {
        console.error('Falha ao carregar os dados de experiência.');
        return;
    }
// Função para encontrar a tabela de experiência pelo tipo de nível
function getExperienceTable(levelType) {
    return XP.Pasta1.find(table => table.Level === levelType);
}

// Função para calcular o nível com base na experiência atual
function calculateLevel(experience, levelType) {
    const table = getExperienceTable(levelType);
    if (!table) {
        throw new Error(`Tabela de experiência para o tipo "${levelType}" não encontrada.`);
    }

    for (let i = 1; i <= 100; i++) {
        const expRequired = table[i.toString()];
        const nextExpRequired = table[(i + 1).toString()];

        // Verificar se é o último nível
        if (i === 100 || !nextExpRequired || nextExpRequired === '-') {
            if (experience >= expRequired) return 100; // Nível máximo
        }

        if (experience >= expRequired && experience < nextExpRequired) {
            return i;
        }
    }

    return 1; // Nível mínimo padrão
}

// Função para adicionar XP e verificar se o nível mudou
function addExperience(currentXP, gainedXP, levelType) {
    const table = getExperienceTable(levelType);
    if (!table) {
        throw new Error(`Tabela de experiência para o tipo "${levelType}" não encontrada.`);
    }

    const newXP = currentXP + gainedXP;
    const oldLevel = calculateLevel(currentXP, levelType);
    const newLevel = calculateLevel(newXP, levelType);

    const levelsGained = newLevel - oldLevel;

    // Verifica se é o último nível
    if (newLevel === 100) {
        return {
            newXP,
            oldLevel,
            newLevel,
            levelsGained,
            xpToNextLevel: 0
        };
    }

    const nextLevelXP = table[(newLevel + 1).toString()];
    const xpToNextLevel = nextLevelXP - newXP;

    return {
        newXP,
        oldLevel,
        newLevel,
        levelsGained,
        xpToNextLevel
    };
}

// Testando com valores de exemplo
//const levelType = 'T_Fast'; // Tipo da tabela de experiência
//let currentXP = 2195; // Experiência atual do Pokémon
//let gainedXP = 0; // Experiência ganha na batalha

try {
    console.log(`XP atual: ${currentXP}`);
    console.log(`XP ganho: ${gainedXP}`);
    console.log(`Tipo da tabela: "${levelType}"`);

    const { newXP, oldLevel, newLevel, levelsGained, xpToNextLevel } = addExperience(currentXP, gainedXP, levelType);

    console.log(`Nível antigo: ${oldLevel}`);
    console.log(`Novo XP: ${newXP}`);
    console.log(`Novo nível: ${newLevel}`);
    if (levelsGained > 0) {
        console.log(`O Pokémon subiu ${levelsGained} nível(is)!`);
    } else {
        console.log('O Pokémon não subiu de nível.');
    }

    if (newLevel === 100) {
        console.log('O Pokémon atingiu o nível máximo!');
    } else {
        console.log(`Faltam ${xpToNextLevel} XP para alcançar o próximo nível.`);
    }
} catch (error) {
    console.error(error.message);
}
}

export function XPInicial(level, levelType) {
// Função para encontrar a tabela de experiência pelo tipo de nível
function getExperienceTable(levelType) {
    return XP.Pasta1.find(table => table.Level === levelType);
}

// Função para obter a XP total de um nível e a necessária para o próximo nível
function getExperienceDetails(level, levelType) {
    const table = getExperienceTable(levelType);
    if (!table) {
        throw new Error(`Tabela de experiência para o tipo "${levelType}" não encontrada.`);
    }

    if (level < 1 || level > 100) {
        throw new Error('O nível deve estar entre 1 e 100.');
    }

    const totalXP = table[level.toString()];
    const nextLevelXP = table[(level + 1).toString()] || '-'; // '-' para o nível 100 (último nível)

    if (totalXP === undefined) {
        throw new Error(`XP total não encontrado para o nível ${level} no tipo "${levelType}".`);
    }

    const xpToNextLevel = nextLevelXP !== '-' ? nextLevelXP - totalXP : null;

    return {
        totalXP,
        xpToNextLevel: xpToNextLevel !== null ? xpToNextLevel : 'Nível máximo atingido'
    };
}

// Testando com valores de exemplo
//const levelType = 'T_Medium Slow'; // Tipo da tabela de experiência
//const level = 5; // Nível desejado

try {
    console.log(`Tipo da tabela: "${levelType}"`);
    console.log(`Nível escolhido: ${level}`);

    const { totalXP, xpToNextLevel } = getExperienceDetails(level, levelType);

    console.log(`XP total no nível ${level}: ${totalXP}`);
    console.log(`XP necessária para subir para o próximo nível: ${xpToNextLevel}`);
} catch (error) {
    console.error(error.message);
}
}

export async function XPDX(currentXP,levelType,gainedXP,level,Elevel,N0){
// Função para encontrar a tabela de experiência pelo tipo de nível

console.log(`Bora ver: ${Elevel}`);
const NlevelType = "N_"+levelType
const XP = await loadXPData();
if (!XP) {
    console.error('Falha ao carregar os dados de experiência.');
    return;
}
function getExperienceTable(NlevelType) {
    return XP.Pasta1.find(table => table.Level === NlevelType);
}

// Função para calcular o nível com base na experiência atual
function calculateLevel(currentXP, gainedXP, levelType, level) {
    const table = getExperienceTable(levelType);
    if (!table) {
        throw new Error(`Tabela de experiência para o tipo "${levelType}" não encontrada.`);
    }

    const newXP = currentXP + gainedXP;

    // Verifica se o Pokémon já está no nível máximo
    if (level === 100) {
        return {
            level: 100,
            remainingXP: 0,
            totalXP: newXP,
        }; // Nível máximo
    }

    // Pega os valores da tabela para o nível atual e o próximo
    const currentLevelXP = table[level.toString()];
    const nextLevelXP = table[(level + 1).toString()];
   console.log('faf',gainedXP)
    // Verifica se a experiência acumulada ultrapassa o próximo nível
    if (newXP >= currentLevelXP) {
        // Aumenta o nível e continua recursivamente
        console.log('Subiu de nível!');;
        return calculateLevel(0, newXP-currentLevelXP, levelType, level+1);
    }

    // Retorna o nível atualizado e a experiência restante para o próximo nível
    return {
        newLevel: level,
        remainingXP: currentLevelXP - newXP,
        totalXP: newXP,
    };
}


// Função para adicionar XP e verificar se o nível mudou
function addExperience(currentXP, gainedXP, levelType, currentLevel,Elevel) {
    const table = getExperienceTable(levelType);
    if (!table) {
        throw new Error(`Tabela de experiência para o tipo "${levelType}" não encontrada.`);
    }

    const xpFormula = Math.floor((gainedXP*(Elevel/7))*1.5); //1.5 é só contra treinador
    console.log('xpFormula',xpFormula);
    const newXP = currentXP + xpFormula;
    const {newLevel,remainingXP,totalXP} = calculateLevel(currentXP, xpFormula, levelType, currentLevel);
    const levelsGained = newLevel - currentLevel;

    // Verifica se está no nível máximo
    if (newLevel === 100) {
        return {
            newXP,
            oldLevel: currentLevel,
            newLevel,
            levelsGained,
            xpToNextLevel: 0
        };
    }

    const LevelUpXP = table[newLevel.toString()];
    //console.log('adas',LevelUpXP,totalXP);
    const nextLevelXP = table[(newLevel + 1).toString()];
    const xpToNextLevel = LevelUpXP - totalXP;

    return {
        newXP,
        oldLevel: currentLevel,
        newLevel,
        levelsGained,
        xpToNextLevel
    };
}

function upou(Nup) {
    player.party[Nup].name.level = player.party[Nup].name.level + 1
    console.log(player.party[Nup].name.level);
}
// Testando com valores de exemplo
//const levelType = 'T_Fast'; // Tipo da tabela de experiência
//let currentXP = 2195; // Experiência atual do Pokémon
//let gainedXP = 0; // Experiência ganha na batalha

try {
    console.log(`Nível atual ${level}`);
    console.log(`XP atual: ${currentXP}`);
    console.log(`XP ganho: ${Math.floor((gainedXP*(5/7))*1.5)}`);
    console.log(`Tipo da tabela: "${NlevelType}"`);

    const { newXP, oldLevel, newLevel, levelsGained, xpToNextLevel } = addExperience(currentXP, gainedXP, NlevelType,level,Elevel);

    if (levelsGained > 0) {
        console.log(`O Pokémon subiu ${levelsGained} nível(is)!`);
        console.log(`Novo nível: ${newLevel}`);
        upou(N0);
    } else {
        console.log('O Pokémon não subiu de nível.');
    }

    if (newLevel === 100) {
        console.log('O Pokémon atingiu o nível máximo!');
    } else {
        console.log(`Faltam ${xpToNextLevel} XP para alcançar o próximo nível.`);
    }
} catch (error) {
    
    console.error(error.message);
}
}

export async function getPokemonGrowthRate(pokemonId) {
        // Faz a chamada à API para obter a espécie do Pokémon
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
        if (!speciesResponse.ok) {
            throw new Error(`Erro ao buscar os dados da espécie do Pokémon. ID: ${pokemonId}`);
        }

        const speciesData = await speciesResponse.json();
        
        // Obtém a URL da taxa de crescimento
        const growthRateUrl = speciesData.growth_rate.url;

        // Faz a chamada para obter os dados da taxa de crescimento
        const growthRateResponse = await fetch(growthRateUrl);
        if (!growthRateResponse.ok) {
            throw new Error('Erro ao buscar os dados da taxa de crescimento.');
        }

        const growthRateData = await growthRateResponse.json();
        // Retorna o nome da taxa de crescimento
        return growthRateData;
    }

export async function getXPGrowthRate(pokemonId) {
            const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
            const speciesData = await speciesResponse.json();
            
            const growthRateUrl = speciesData.growth_rate.url;
            const growthRateResponse = await fetch(growthRateUrl);
            const growthRateData = await growthRateResponse.json();
            //console.log("BF",growthRateData.name);    

            return growthRateData;

    }

    