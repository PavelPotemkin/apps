import {randomNum} from "@/utils/randomNum";
import throttle from "lodash/throttle";

const matrixInitData = [
  [11, 12, 13, 14],
  [21, 22, 23, 24],
  [31, 32, 33, 34],
  [41, 42, 43, 44],
]

const itemAnimationMoveTime = 300

type itemType = {
  element: HTMLDivElement,
  position: positionType,
  value: number,
  isUnion?: boolean
}

type matrixItemType = itemType | null

type positionType = { row: number, col: number }

type directionType = 'top' | 'right' | 'bottom' | 'left'

interface farthestPositionType {
  emptyBlockPosition: positionType | null,
  itemData: farthestPositionItemDataType
}

type farthestPositionItemDataType = {
  item: HTMLDivElement | null
  position: positionType | null
}

type optionsType = {
  onScoreUpdate?: (score: number) => void,
  length?: number
}

export class Game2048 {
  private el: HTMLElement
  private itemsEl: Element
  private matrix: (matrixItemType)[][]
  private score: number
  private readonly keysEventListener: OmitThisParameter<(event: KeyboardEvent) => void>
  private readonly length: number
  private readonly onScoreUpdate?: (score: number) => void

  constructor(el: HTMLElement, options: optionsType) {
    this.el = el
    this.score = 0
    this.length = options.length || 4
    this.matrix = Game2048.createMatrix(this.length)
    this.onScoreUpdate = options.onScoreUpdate

    const itemsEl = el.querySelector('.game-2048__items')

    if (itemsEl) {
      this.itemsEl = itemsEl
    } else {
      throw new Error('нет обёртки элементов')
    }

    this.keysEventListener = throttle(this.keysListener.bind(this), 300)
  }

  static createMatrix(length: number): any[][] {
    const matrix = []

    for (let i = 0; i < length; i++) {
      matrix[i] = new Array(length).fill(null)
    }

    return matrix
  }

  resetGame() {
    this.itemsEl.innerHTML = ''
    this.matrix = Game2048.createMatrix(this.length)
    this.score = 0
  }

  startGame() {
    this.resetGame()

    document.addEventListener('keydown', this.keysEventListener)

    this.createRandomCube()
    this.createRandomCube()
  }

  stopGame() {
    document.removeEventListener('keydown', this.keysEventListener)
  }

  keysListener(event: KeyboardEvent) {
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

  createElement(cube: HTMLDivElement) {
    this.itemsEl.append(cube)
    setTimeout(() => {
      cube.firstElementChild!.classList.remove('game-2048__cube--new')
    }, itemAnimationMoveTime)
  }

  createCube(position: positionType, value?: number): HTMLDivElement {
    if (!value) {
      value = this.getRandomCubeValue()
    }

    const element = document.createElement('div');
    const elementInner = document.createElement('div');
    element.classList.add('game-2048__cube', `game-2048__cube--p-${position.row}-${position.col}`)
    element.setAttribute('data-value', String(value))
    elementInner.classList.add('game-2048__cube', 'game-2048__cube-inner', 'game-2048__cube--new', 'game-2048__cube--orange')
    elementInner.innerText = String(value)
    element.append(elementInner)

    return element
  }

  createRandomCube() {
    const pos = this.getRandomEmptyCubePosition()
    if (!pos) {
      this.stopGame();
      return
    }
    const value = this.getRandomCubeValue()
    const cube = this.createCube(pos, value)
    this.matrix[pos.row][pos.col] = {
      element: cube,
      position: pos,
      value: value
    }
    this.createElement(cube)
  }

  updateScore(score: number) {
    this.score += score

    this.onScoreUpdate && this.onScoreUpdate(this.score)
  }

  handleAction(direction: directionType) {
    const length = this.length
    let farthestPositions: positionType[] = []
    let nearestItem: matrixItemType | null = null
    let isAnyItemMoved = false

    const removeCube = (pos: positionType) => {
      this.matrix[pos.row][pos.col] = null
    }

    const removeElement = (item: itemType) => {
      setTimeout(() => {
        item.element.remove()
      }, itemAnimationMoveTime)
    }

    const setCube = (item: itemType, pos: positionType, value: number) => {
      this.matrix[pos.row][pos.col] = item
      item.position = pos
      item.value = value
    }

    const moveCube = (item: itemType, posFrom: positionType, posTo: positionType) => {
      removeCube(posFrom)
      setCube(item, posTo, item.value)
    }

    const moveElement = (item: itemType, posFrom: positionType, posTo: positionType) => {
      item.element.classList.remove(`game-2048__cube--p-${posFrom.row}-${posFrom.col}`)
      item.element.classList.add(`game-2048__cube--p-${posTo.row}-${posTo.col}`)
    }

    const setElement = (item: itemType, value: number) => {
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

    const processItem = (item: matrixItemType, pos: positionType) => {
      if (item) {
        if (nearestItem) {
          if (item.value === nearestItem.value) {
            const newValue = item.value * 2
            moveElement(item, item.position, nearestItem.position)
            removeElement(nearestItem)
            setElement(item, newValue)
            removeCube(item.position)
            removeCube(nearestItem.position)
            setCube(item, nearestItem.position, newValue)
            this.updateScore(newValue)
            farthestPositions.push(pos)
            nearestItem = null
            isAnyItemMoved = true
          } else {
            if (farthestPositions.length) {
              item.position = farthestPositions[0]
              moveCube(item, pos, item.position)
              moveElement(item, pos, item.position)
              farthestPositions.shift()
              farthestPositions.push(pos)
              isAnyItemMoved = true
            }

            nearestItem = item
          }
        } else if (farthestPositions.length) {
          item.position = farthestPositions[0]
          moveCube(item, pos, item.position)
          moveElement(item, pos, item.position)
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

    if (direction === 'top') {
      for (let col = 0; col < length; col++) {
        farthestPositions = []
        nearestItem = null

        for (let row = 0; row < length; row++) {
          processItem(this.matrix[row][col], {row, col})
        }
      }
    } else if (direction === 'right') {
      for (let row = length - 1; row >= 0; row--) {
        farthestPositions = []
        nearestItem = null

        for (let col = length - 1; col >= 0; col--) {
          processItem(this.matrix[row][col], {row, col})
        }
      }
    } else if (direction === 'bottom') {
      for (let col = length - 1; col >= 0; col--) {
        farthestPositions = []
        nearestItem = null

        for (let row = length - 1; row >= 0; row--) {
          processItem(this.matrix[row][col], {row, col})
        }
      }
    } else if (direction === 'left') {
      for (let row = 0; row < length; row++) {
        farthestPositions = []
        nearestItem = null

        for (let col = 0; col < length; col++) {
          processItem(this.matrix[row][col], {row, col})
        }
      }
    }

    if (isAnyItemMoved) {
      setTimeout(() => {
        this.createRandomCube()
      }, itemAnimationMoveTime)
    }
  }
}
