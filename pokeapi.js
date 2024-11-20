// pokeapi.js
export async function Poke(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    
    return {
        name: data.name,
        level: 5, // Você pode adicionar lógica para determinar o nível, se necessário
        // Adicione outros atributos conforme necessário
    };
}
