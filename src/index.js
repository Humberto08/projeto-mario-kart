// // ======= Constantes =======
const TOTAL_RODADAS = 5;
const TIPOS_BLOCOS = ["RETA", "CURVA", "CONFRONTO"];

// ======= Classe Jogador =======
class Player {
  constructor(nome, velocidade, manobrabilidade, poder) {
    this.nome = nome;
    this.velocidade = velocidade;
    this.manobrabilidade = manobrabilidade;
    this.poder = poder;
    this.pontos = 0;
  }
}

// ======= Utilitários =======
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function getRandomBlock() {
  const r = Math.random();
  if (r < 0.33) return "RETA";
  if (r < 0.66) return "CURVA";
  return "CONFRONTO";
}

function logRollResult(nome, atributo, dado, valorAtributo) {
  console.log(`${nome} 🎲 rolou um dado de ${atributo} ${dado} + ${valorAtributo} = ${dado + valorAtributo}`);
}

function testSkill(player, dice, attributeName) {
  const value = player[attributeName];
  const total = dice + value;
  logRollResult(player.nome, attributeName, dice, value);
  return total;
}

// ======= Motor da Corrida =======
function playRaceEngine(player1, player2) {
  for (let round = 1; round <= TOTAL_RODADAS; round++) {
    console.log(`\n🏁 Rodada ${round}`);
    const bloco = getRandomBlock();
    console.log(`--- 🧭 Bloco da vez: ${bloco} ---`);

    const dice1 = rollDice();
    const dice2 = rollDice();

    let total1 = 0;
    let total2 = 0;

    if (bloco === "RETA") {
      total1 = testSkill(player1, dice1, "velocidade");
      total2 = testSkill(player2, dice2, "velocidade");
    } else if (bloco === "CURVA") {
      total1 = testSkill(player1, dice1, "manobrabilidade");
      total2 = testSkill(player2, dice2, "manobrabilidade");
    } else if (bloco === "CONFRONTO") {
      const power1 = testSkill(player1, dice1, "poder");
      const power2 = testSkill(player2, dice2, "poder");

      console.log(`${player1.nome} confrontou com ${player2.nome}! 🥊`);

      if (power1 > power2 && player2.pontos > 0) {
        console.log(`${player1.nome} venceu o confronto! ${player2.nome} perdeu 1 ponto 🐢`);
        player2.pontos--;
      } else if (power2 > power1 && player1.pontos > 0) {
        console.log(`${player2.nome} venceu o confronto! ${player1.nome} perdeu 1 ponto 🐢`);
        player1.pontos--;
      } else {
        console.log("Confronto empatado! Nenhum ponto foi perdido.");
      }

      // Confronto não dá ponto extra, pula para próxima rodada
      continue;
    }

    if (total1 > total2) {
      player1.pontos++;
      console.log(`${player1.nome} marcou um ponto! 🏎️`);
    } else if (total2 > total1) {
      player2.pontos++;
      console.log(`${player2.nome} marcou um ponto! 🏎️`);
    } else {
      console.log("Empate na rodada! Nenhum ponto marcado.");
    }

    console.log(`📊 Placar parcial: ${player1.nome} ${player1.pontos} x ${player2.pontos} ${player2.nome}`);
  }
}

// ======= Resultado Final =======
function declareWinner(p1, p2) {
  console.log("\n🏁 Resultado final:");
  console.log(`${p1.nome}: ${p1.pontos} ponto(s)`);
  console.log(`${p2.nome}: ${p2.pontos} ponto(s)`);

  if (p1.pontos > p2.pontos) {
    console.log(`\n${p1.nome} venceu a corrida! 🏆`);
  } else if (p2.pontos > p1.pontos) {
    console.log(`\n${p2.nome} venceu a corrida! 🏆`);
  } else {
    console.log("A corrida terminou em empate! 🤝");
  }
}

// ======= Execução Principal =======
(function main() {
  const mario = new Player("Mario", 4, 3, 3);
  const luigi = new Player("Luigi", 3, 4, 4);

  console.log(`\n🏎️ Corrida entre ${mario.nome} e ${luigi.nome} começando...`);
  playRaceEngine(mario, luigi);
  declareWinner(mario, luigi);
})();
