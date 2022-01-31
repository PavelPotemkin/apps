import '@/assets/scss/pages/2048.scss'
import {Game2048} from "@/components/game2048";

type resultType = {
  score: number,
  date: string
}

function init() {
  const gameWrapper = document.getElementById('game-2048')!
  const resultsWrapper = document.getElementById('game-2048-results')!

  let resultsData: any = localStorage.getItem('game-2048')

  if (resultsData) {
    resultsData = JSON.parse(resultsData)
  } else {
    resultsData = []
  }

  const scoreEl = document.getElementById('game-2048-score')

  const onScoreUpdate = (score: number) => {
    scoreEl && (scoreEl.innerText = String(score))
  }

  const onGameEnd = (score: number) => {
    const date = [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()].join(', ')
    const result = {
      score,
      date
    }
    resultsData.push(result)

    localStorage.setItem('game-2048', JSON.stringify(resultsData))

    updateRecordsTable()
  }

  const onGameBreak = (matrix: any) => {
    localStorage.setItem('game-2048-saves', JSON.stringify(matrix))
  }

  const updateRecordsTable = () => {
    let inner = ''

    resultsData.forEach( (result: resultType) => {
      inner += `<div>${result.score} | ${result.date}</div>`
    })
    
    resultsWrapper.innerHTML = inner
  }

  const game = new Game2048(gameWrapper, {onScoreUpdate, onGameEnd, onGameBreak})

  const startBtn = document.getElementById('game-2048-start')
  
  const gameSaves = localStorage.getItem('game-2048-saves')
  
  if (gameSaves) {
    game.setData(JSON.parse(gameSaves))
  }

  startBtn?.addEventListener('click', game.startGame.bind(game))

  updateRecordsTable()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    init()
  })
} else {
  init()
}
