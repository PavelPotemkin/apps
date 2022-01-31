import {randomNum} from "@/utils/randomNum";
import throttle from "lodash/throttle";

const itemAnimationMoveTime = 200

type positionType = { row: number, col: number }

type directionType = 'top' | 'right' | 'bottom' | 'left'

type itemType = {
  element: HTMLDivElement,
  position: positionType,
  value: number
}

type matrixItemType = itemType | null

type optionsType = {
  onScoreUpdate?: (score: number) => void,
  onGameEnd?: (score: number) => void,
  onGameBreak?: (data: (matrixItemType)[][]) => void,
  length?: number,
  newCubesCount?: number
}

export class Game2048 {
  private el: HTMLElement
  private itemsEl: HTMLElement
  private innerEl: HTMLElement
  private matrix: (matrixItemType)[][]
  private score: number
  private isGameStart: boolean
  private readonly keysEventListener: OmitThisParameter<(event: KeyboardEvent) => void>
  private readonly length: number
  private readonly newCubesCount: number
  private readonly onScoreUpdate?: (score: number) => void
  private readonly onGameEnd?: (score: number) => void
  private readonly onGameBreak?: (data: (matrixItemType)[][]) => void

  constructor(el: HTMLElement, options: optionsType) {
    this.el = el
    this.score = 0

    options = Object.assign({length: 4, newCubesCount: 4}, options)

    if (
      options.length &&
      !Number.isNaN(options.length) &&
      options.length > 1
    ) {
      this.length = options.length
    } else {
      throw new Error('Неверная длина матрицы')
    }

    if (
      options.newCubesCount &&
      !Number.isNaN(options.newCubesCount) &&
      options.newCubesCount > 0
    ) {
      this.newCubesCount = options.newCubesCount
    } else {
      throw new Error('Неверное количество новых элементов')
    }

    this.matrix = Game2048.createMatrix(this.length)
    this.isGameStart = false
    this.onScoreUpdate = options.onScoreUpdate
    this.onGameEnd = options.onGameEnd
    this.onGameBreak = options.onGameBreak

    const itemsEl = el.querySelector('.game-2048__items') as HTMLElement
    const innerEl = el.querySelector('.game-2048__inner') as HTMLElement

    if (itemsEl) {
      this.itemsEl = itemsEl
    } else {
      throw new Error('нет обёртки элементов')
    }

    if (innerEl) {
      this.innerEl = innerEl
    } else {
      throw new Error('нет обёртки статических элементов')
    }

    this.fillCubesInner()

    this.keysEventListener = throttle(this.keysListener.bind(this), itemAnimationMoveTime)

    window.addEventListener('unload', () => this.breakGame())
  }

  static createMatrix(length: number): matrixItemType[][] {
    const matrix = []

    for (let i = 0; i < length; i++) {
      matrix[i] = new Array(length).fill(null)
    }

    return matrix
  }

  static createCubeElement(position: positionType, value: number): HTMLDivElement {
    const element = document.createElement('div');
    const elementInner = document.createElement('div');
    element.classList.add('game-2048__cube', `game-2048__cube--p-${position.row}-${position.col}`)
    element.setAttribute('data-value', String(value))
    elementInner.classList.add('game-2048__cube', 'game-2048__cube-inner', 'game-2048__cube--new')
    elementInner.innerText = String(value)
    element.append(elementInner)

    return element
  }
  // TODO - добавить метод getData и вынести логику с localstorage
  setData(data: (matrixItemType)[][]) {
    const length = data.length

    for (let row = 0; row < length; row++) {
      for (let col = 0; col < length; col++) {
        const item: matrixItemType = data[row][col]

        if (item) {
          item.element = Game2048.createCubeElement(item.position, item.value)
          this.insertCubeElement(item.element)
        }
      }
    }

    this.matrix = data

    this.isGameStart = true

    document.addEventListener('keydown', this.keysEventListener)
  }
  
  fillCubesInner() {
    this.innerEl.style.gridTemplateColumns = `repeat(${this.length}, 1fr)`

    let inner = ''
    const cubesCount = this.length * this.length

    for (let i = 0; i < cubesCount; i++) {
      inner += '<div class="game-2048__cube game-2048__cube--darkgrey"></div>'
    }

    this.innerEl.innerHTML = inner
  }

  removeCubeItem(pos: positionType) {
    this.matrix[pos.row][pos.col] = null
  }

  removeCubeElement(item: itemType) {
    setTimeout(() => {
      item.element.remove()
    }, itemAnimationMoveTime)
  }

  setCubeItem(item: itemType, pos: positionType, value: number) {
    this.matrix[pos.row][pos.col] = item
    item.position = pos
    item.value = value
  }

  moveCubeItem(item: itemType, posFrom: positionType, posTo: positionType) {
    this.removeCubeItem(posFrom)
    this.setCubeItem(item, posTo, item.value)
  }

  moveCubeElement(item: itemType, posFrom: positionType, posTo: positionType) {
    item.element.classList.remove(`game-2048__cube--p-${posFrom.row}-${posFrom.col}`)
    item.element.classList.add(`game-2048__cube--p-${posTo.row}-${posTo.col}`)
  }

  setCubeElement(item: itemType, value: number) {
    const element = item.element

    setTimeout(() => {
      element.dataset.value = String(value)
      element.firstElementChild!.innerHTML = String(value)
      element.firstElementChild!.classList.add('game-2048__cube--union')

      setTimeout(() => {
        element.firstElementChild!.classList.remove('game-2048__cube--union')
      }, itemAnimationMoveTime)
    }, itemAnimationMoveTime)
  }

  insertCubeElement(cube: HTMLDivElement): void {
    this.itemsEl.append(cube)
    setTimeout(() => {
      cube.firstElementChild!.classList.remove('game-2048__cube--new')
    }, itemAnimationMoveTime)
  }

  resetGame(): void {
    this.itemsEl.innerHTML = ''
    this.matrix = Game2048.createMatrix(this.length)
    this.score = 0
  }

  startGame(): void {
    this.isGameStart = true
    this.resetGame()
    document.addEventListener('keydown', this.keysEventListener)
    this.createRandomCubes()
  }

  stopGame(): void {
    document.removeEventListener('keydown', this.keysEventListener)
    if (this.isGameStart && this.onGameEnd) {
      this.onGameEnd(this.score)
    }
    this.isGameStart = false
  }

  breakGame(): void {
    if (this.isGameStart && this.onGameBreak) {
      this.onGameBreak(this.matrix)
    }
  }

  updateScore(score: number): void {
    this.score += score

    this.onScoreUpdate && this.onScoreUpdate(this.score)
  }

  keysListener(event: KeyboardEvent): void {
    const code = event.code

    if (['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(code)) {
      switch (code) {
        case 'ArrowUp':
          this.handleAction('top')
          break
        case 'ArrowRight':
          this.handleAction('right')
          break
        case 'ArrowDown':
          this.handleAction('bottom')
          break
        case 'ArrowLeft':
          this.handleAction('left')
          break
      }
    }
  }

  createRandomCube(): itemType['element'] | undefined {
    const pos = this.getRandomEmptyCubePosition()
    if (!pos) {
      return
    }
    const value = this.getRandomCubeValue()
    const cube = Game2048.createCubeElement(pos, value)
    this.matrix[pos.row][pos.col] = {
      element: cube,
      position: pos,
      value: value
    }
    this.insertCubeElement(cube)

    return cube
  }

  getRandomCubeValue(): number {
    return Math.random() < 0.9 ? 2 : 4
  }

  getRandomEmptyCubePosition(): undefined | positionType {
    const vars = []

    for (let i = 0; i < this.length; i++) {
      for (let a = 0; a < this.length; a++) {
        if (!this.matrix[i][a]) {
          vars.push([i, a])
        }
      }
    }

    if (!vars.length) {
      return
    }

    const [row, col] = vars[randomNum(0, vars.length - 1)]

    return {
      row,
      col
    }
  }

  createRandomCubes() {
    for (let i = 0; i < this.newCubesCount; i++) {
      this.createRandomCube()
    }
  }

  handleAction(direction: directionType): void {
    const length = this.length
    let farthestPositions: positionType[] = []
    let nearestItem: matrixItemType | null = null
    let isAnyItemMoved = false
    let hasVars = false

    const processItem = (item: matrixItemType, pos: positionType, onlyCheck = false) => {
      if (item) {
        if (nearestItem) {
          if (item.value === nearestItem.value) {
            if (onlyCheck) {
              hasVars = true
              return;
            }
            const newValue = item.value * 2
            this.moveCubeElement(item, item.position, nearestItem.position)
            this.removeCubeElement(nearestItem)
            this.setCubeElement(item, newValue)
            this.removeCubeItem(item.position)
            this.removeCubeItem(nearestItem.position)
            this.setCubeItem(item, nearestItem.position, newValue)
            this.updateScore(newValue)
            farthestPositions.push(pos)
            nearestItem = null
            isAnyItemMoved = true
          } else {
            if (farthestPositions.length) {
              if (onlyCheck) {
                hasVars = true
                return;
              }
              item.position = farthestPositions[0]
              this.moveCubeItem(item, pos, item.position)
              this.moveCubeElement(item, pos, item.position)
              farthestPositions.shift()
              farthestPositions.push(pos)
              isAnyItemMoved = true
            }

            nearestItem = item
          }
        } else if (farthestPositions.length) {
          if (onlyCheck) {
            hasVars = true
            return;
          }
          item.position = farthestPositions[0]
          this.moveCubeItem(item, pos, item.position)
          this.moveCubeElement(item, pos, item.position)
          farthestPositions.shift()
          farthestPositions.push(pos)
          nearestItem = item
          isAnyItemMoved = true
        } else {
          nearestItem = item
        }
      } else {
        farthestPositions.push(pos)
      }
    }

    const processDirection = (direction: directionType, onlyCheck = false) => {
      if (direction === 'top') {
        for (let col = 0; col < length; col++) {
          farthestPositions = []
          nearestItem = null

          for (let row = 0; row < length; row++) {
            processItem(this.matrix[row][col], {row, col}, onlyCheck)
          }
        }
      } else if (direction === 'right') {
        for (let row = length - 1; row >= 0; row--) {
          farthestPositions = []
          nearestItem = null

          for (let col = length - 1; col >= 0; col--) {
            processItem(this.matrix[row][col], {row, col}, onlyCheck)
          }
        }
      } else if (direction === 'bottom') {
        for (let col = length - 1; col >= 0; col--) {
          farthestPositions = []
          nearestItem = null

          for (let row = length - 1; row >= 0; row--) {
            processItem(this.matrix[row][col], {row, col}, onlyCheck)
          }
        }
      } else if (direction === 'left') {
        for (let row = 0; row < length; row++) {
          farthestPositions = []
          nearestItem = null

          for (let col = 0; col < length; col++) {
            processItem(this.matrix[row][col], {row, col}, onlyCheck)
          }
        }
      }
    }

    processDirection(direction)

    const checkEndGame = () => {
      hasVars = false
      const directions: directionType[] = ['bottom', 'left', 'top', 'right']

      directions.forEach(item => {
        processDirection(item, true)
      })

      if (!hasVars) {
        this.stopGame()
        return true
      }

      return false
    }

    if (isAnyItemMoved) {
      if (!checkEndGame()) {
        setTimeout(() => {
          this.createRandomCubes()

          checkEndGame()
        }, itemAnimationMoveTime)
      }
    } else {
      checkEndGame()
    }
  }
}
