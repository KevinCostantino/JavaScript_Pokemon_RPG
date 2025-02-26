export class Pokemon {
  constructor(name, currentTotalXP,level, move1, move2, move3, move4,type1,type2,NdeMov) {
    this.name = name;
    this.currentTotalXP = currentTotalXP;
    this.level = level;
    this.moves = [move1, move2, move3, move4]; // Store moves in an array for flexibility 
    this.types = [type1, type2];
    this.NdeMov = NdeMov;

  }
}


