import '@/assets/scss/pages/2048.scss'
import {Game2048} from "@/components/game2048";

function init() {
  const gameWrapper = document.getElementById('game-2048')

  if (gameWrapper) {
    const scoreEl = document.getElementById('game-2048-score')
    
    const updateScore = (score: number) => {
      scoreEl && (scoreEl.innerText = String(score))
    }
    
    const game = new Game2048(gameWrapper, {onScoreUpdate: updateScore})

    const startBtn = document.getElementById('game-2048-start')

    startBtn?.addEventListener('click', game.startGame.bind(game))
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    init()
  })
} else {
  init()
}
