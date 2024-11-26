async function playerTurn(choice) {
    if (player.party[0].name.hp <= 0 || rival.party[0].name.hp <= 0) return;
  
    // Player escolhe o movimento
    const playerMove = player.party[0].moves[choice];
    if (!playerMove) return;
  
    await resolveTurn(playerMove); // Passa o movimento escolhido para resolver o turno
  }
  
  async function resolveTurn(playerMove) {
    const playerSpeed = player.party[0].name.extra.stats.speed;
    const rivalSpeed = rival.party[0].name.extra.stats.speed;
  
    // Determina a ordem de ataque com base na velocidade
    if (playerSpeed >= rivalSpeed) {
      // Jogador ataca primeiro
      await executeAttack(player.party[0], rival.party[0], playerMove);
      if (rival.party[0].name.hp > 0) {
        const rivalMove = getRandomMove(rival.party[0]);
        await executeAttack(rival.party[0], player.party[0], rivalMove);
      }
    } else {
      // Rival ataca primeiro
      const rivalMove = getRandomMove(rival.party[0]);
      await executeAttack(rival.party[0], player.party[0], rivalMove);
      if (player.party[0].name.hp > 0) {
        await executeAttack(player.party[0], rival.party[0], playerMove);
      }
    }
  
    checkBattleStatus(); // Verifica se a batalha terminou
  }
  
  // Função para executar um ataque
  async function executeAttack(attacker, defender, move) {
    const { damage } = await calculateDamage(attacker, defender, move);
    defender.name.hp -= damage;
  
    logMessage(`${attacker.name.name} usou ${move.name}! Causou ${damage} de dano!`);
    updateStatus(player.party[0].name, rival.party[0].name);
  
    if (defender.name.hp <= 0) {
      logMessage(`${defender.name.name} foi derrotado!`);
    }
  }
  
  // Função auxiliar para pegar um movimento aleatório
  function getRandomMove(pokemon) {
    return pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)];
  }
  
  // Verifica o estado da batalha
  function checkBattleStatus() {
    if (player.party[0].name.hp <= 0) {
      logMessage('Você perdeu a batalha!');
      endBattle('rival');
    } else if (rival.party[0].name.hp <= 0) {
      logMessage('Você venceu a batalha!');
      endBattle('player');
    }
  }
  
  // Função de fim de batalha
  function endBattle(winner) {
    setTimeout(() => {
      console.log(winner === 'player' ? 'Você venceu!' : 'Você perdeu!');
    }, 1000);
  }
  