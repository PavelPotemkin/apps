import {randomNum} from "@/utils/randomNum";
import throttle from "lodash/throttle";
import {set} from "lodash";

const matrixInitData = [
  [11, 12, 13, 14],
  [21, 22, 23, 24],
  [31, 32, 33, 34],
  [41, 42, 43, 44],
]

const itemAnimationMoveTime = 300

type itemType = HTMLDivElement

type matrixItemType = HTMLDivElement | null

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

    // this.createCube(this.getRandomEmptyCubePosition()!, 2)
    // this.createCube(this.getRandomEmptyCubePosition()!, 2)
    this.createCube({row: 1, col: 1}, 2)
    this.createCube({row: 1, col: 2}, 2)
    this.createCube({row: 1, col: 3}, 2)
  }

  stopGame() {
    document.removeEventListener('keydown', this.keysEventListener)
  }

  keysListener(event: KeyboardEvent) {
    const code = event.code

    if (['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(code)) {
      switch (code) {
        case 'ArrowUp':
          this.nextTick('top')
          break
        case 'ArrowRight':
          this.nextTick('right')
          break
        case 'ArrowDown':
          this.nextTick('bottom')
          break
        case 'ArrowLeft':
          this.nextTick('left')
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

  createCube(position: positionType, value?: number): HTMLDivElement {
    if (!value) {
      value = this.getRandomCubeValue()
    }
    const cube = document.createElement('div');
    const cubeInner = document.createElement('div');
    cube.classList.add('game-2048__cube', `game-2048__cube--p-${position.row}-${position.col}`)
    cube.setAttribute('data-value', String(value))
    cubeInner.classList.add('game-2048__cube', 'game-2048__cube-inner', 'game-2048__cube--orange')
    cubeInner.innerText = String(value)

    cube.append(cubeInner)

    this.matrix[position.row][position.col] = cube

    this.itemsEl.append(cube)

    return cube
  }

  moveCube(item: HTMLDivElement, position: positionType, emptyBlockPosition: positionType, onlyInterface: boolean = false) {
    if (!onlyInterface) {
      this.matrix[emptyBlockPosition.row][emptyBlockPosition.col] = item
      this.matrix[position.row][position.col] = null
    }

    item.classList.remove(`game-2048__cube--p-${position.row}-${position.col}`)
    item.classList.add(`game-2048__cube--p-${emptyBlockPosition.row}-${emptyBlockPosition.col}`)
  }

  updateScore(score: number) {
    this.score += score

    this.onScoreUpdate && this.onScoreUpdate(this.score)
  }

  unionCubes(
    newItemData: { position: positionType, item: itemType },
    existItemData: { position: positionType, item: itemType },
    newPosition: positionType,
    value: number
  ) {
    const newItem = this.matrix[existItemData.position.row][existItemData.position.col]
    this.matrix[newItemData.position.row][newItemData.position.col] = null
    this.matrix[existItemData.position.row][existItemData.position.col] = null
    this.matrix[newPosition.row][newPosition.col] = newItem

    newItemData.item.classList.remove(`game-2048__cube--p-${newItemData.position.row}-${newItemData.position.col}`)
    newItemData.item.classList.add(`game-2048__cube--p-${newPosition.row}-${newPosition.col}`)

    existItemData.item.classList.remove(`game-2048__cube--p-${existItemData.position.row}-${existItemData.position.col}`)
    existItemData.item.classList.add(`game-2048__cube--p-${newPosition.row}-${newPosition.col}`)

    existItemData.item.setAttribute('data-value', String(value))
    existItemData.item.setAttribute('data-disabled', '1')
    
    this.updateScore(value)
    
    setTimeout(() => {
      console.log(this.matrix)
      newItemData.item.remove()
      // @ts-ignore
      existItemData.item.firstChild!.innerText = String(value)
    }, itemAnimationMoveTime)
  }

  findFarthestPosition(position: positionType, direction: directionType): farthestPositionType {
    let emptyBlockPosition = null
    let itemData: farthestPositionItemDataType = {
      item: null,
      position: null
    }
    let isItemFound = false
    let isEndFound = false
    
    const checkPosition = (pos: positionType) => {
      const el = this.matrix[pos.row][pos.col]

      if (isEndFound) {
        return
      }
      
      if (this.isItem(el)) {
        if (!isItemFound) {
          itemData.item = el as HTMLDivElement
          itemData.position = pos
          isItemFound = true
        } else {
          isEndFound = true
        }
      } else {
        emptyBlockPosition = pos
      }
    }

    if (direction === 'top') {
      for (let i = position.row - 1; i >= 0; i--) {
        const pos = {row: i, col: position.col}

        checkPosition(pos)
      }
    } else if (direction === 'right') {
      for (let i = position.col + 1; i < 4; i++) {
        const pos = {row: position.row, col: i}

        checkPosition(pos)
      }
    } else if (direction === 'left') {
      for (let i = position.col - 1; i >= 0; i--) {
        const pos = {row: position.row, col: i}

        checkPosition(pos)
      }
    } else if (direction === 'bottom') {
      for (let i = position.row + 1; i < 4; i++) {
        const pos = {row: i, col: position.col}

        checkPosition(pos)
      }
    }

    return {
      emptyBlockPosition,
      itemData
    }
  }

  async nextTick(direction: directionType) {
    const length = this.length
    let isAnyCubeMoves = false

    const nextTick = (item: itemType, position: positionType) => {
      const {
        emptyBlockPosition,
        itemData
      } = this.findFarthestPosition(position, direction)

      if (itemData.item && itemData.position) {
        const elValue = itemData.item.dataset.value
        const itemValue = (item as HTMLDivElement).dataset.value
        const isElDisabled = itemData.item.dataset.disabled
        const isItemDisabled = (item as HTMLDivElement).dataset.disabled

        if (!isElDisabled && !isItemDisabled && elValue && itemValue && elValue === itemValue) {
          isAnyCubeMoves = true
          // @ts-ignore
          this.unionCubes(itemData, {
              item,
              position
            },
            itemData.position,
            +elValue + +itemValue)
        } else if (emptyBlockPosition) {
          isAnyCubeMoves = true
          this.moveCube(item as HTMLDivElement, position, emptyBlockPosition)
        }
      } else if (emptyBlockPosition) {
        isAnyCubeMoves = true
        this.moveCube(item as HTMLDivElement, position, emptyBlockPosition)
      }
    }

    if (direction === 'top') {
      for (let row = 0; row < length; row++) {
        for (let col = 0; col < length; col++) {
          const item = this.matrix[row][col]

          if (this.isItem(item)) {
            nextTick(item as HTMLDivElement, {
              row,
              col
            })
          }
        }
      }
    } else if (direction === 'right') {
      for (let col = length - 1; col >= 0; col--) {
        for (let row = 0; row < length; row++) {
          const item = this.matrix[row][col]

          if (this.isItem(item)) {
            nextTick(item as HTMLDivElement, {
              row,
              col
            })
          }
        }
      }
    } else if (direction === 'bottom') {
      for (let row = length - 1; row >= 0; row--) {
        for (let col = 0; col < length; col++) {
          const item = this.matrix[row][col]

          if (this.isItem(item)) {
            nextTick(item as HTMLDivElement, {
              row,
              col
            })
          }
        }
      }
    } else if (direction === 'left') {
      for (let col = 0; col < length; col++) {
        for (let row = 0; row < length; row++) {
          const item = this.matrix[row][col]

          if (this.isItem(item)) {
            nextTick(item as HTMLDivElement, {
              row,
              col
            })
          }
        }
      }
    }

    const createRandomCube = () => {
      const position = this.getRandomEmptyCubePosition()

      if (position) {
        this.createCube(position)
      } else {
        this.stopGame()
        alert('Конец')
      }
    }

    const removeDisabledStatus = () => {
      this.itemsEl.querySelectorAll('.game-2048__cube[data-disabled="1"]').forEach(item => item.removeAttribute('data-disabled'))
    }

    if (isAnyCubeMoves) {
      setTimeout(() => {
        createRandomCube()
        removeDisabledStatus()
      }, itemAnimationMoveTime)
    }
  }

  isItem(item: matrixItemType): boolean {
    return item !== null;
  }
}
