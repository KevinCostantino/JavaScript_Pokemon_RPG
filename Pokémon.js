export class Pokemon {
  constructor(name, currentTotalXP,level, move1, move2, move3, move4,type1,type2) {
    this.name = name;
    this.currentTotalXP = currentTotalXP;
    this.level = level;
    this.moves = [move1, move2, move3, move4]; // Store moves in an array for flexibility
    this.types = [type1, type2];
  }
}


  // Criando objetos de formas diferentes
  //const pessoa1 = new Pokemon("Maria", 25); // Usando o constructor normal
  //console.log(pessoa1); // { nome: 'Maria', idade: 25 }
  //
  //const pessoa2 = Pokemon.comMoves("João", 30, "São Paulo"); // Usando o método estático
  //console.log(pessoa2); // { nome: 'João', idade: 30, cidade: 'São Paulo' }
  