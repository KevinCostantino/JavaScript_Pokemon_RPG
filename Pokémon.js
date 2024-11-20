export class Pokemon {
    constructor(name, hp, attack, defense, specialAttack, specialDefense, speed, base_exp,currentXP,levelType) {
      this.name = name;
      this.hp = hp;
      this.attack = attack;
      this.defense = defense;
      this.specialAttack = specialAttack;
      this.specialDefense = specialDefense;
      this.speed = speed;
      this.base_exp = base_exp;
      this.currentXP = currentXP;
      this.levelType = levelType;
    }
    static comMoves(move1,move2,move3,move4) {
      this.move1 = move1;
      this.move2 = move2;
      this.move3 = move3;
      this.move4 = move4;
    }
  }
  
  // Criando objetos de formas diferentes
  const pessoa1 = new Pokemon("Maria", 25); // Usando o constructor normal
  console.log(pessoa1); // { nome: 'Maria', idade: 25 }
  
  const pessoa2 = Pokemon.comCidade("João", 30, "São Paulo"); // Usando o método estático
  console.log(pessoa2); // { nome: 'João', idade: 30, cidade: 'São Paulo' }
  