import {randomNum} from "@/utils/randomNum";
import throttle from "lodash/throttle";

const matrixInitData = [
  [11, 12, 13, 14],
  [21, 22, 23, 24],
  [31, 32, 33, 34],
  [41, 42, 43, 44],
]

const itemAnimationMoveTime = 300

type itemType = HTMLDivElement

type matrixItemType = HTMLDivElement | number

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
      matrix[i] = new Array(length)
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

    this.createCube(this.getRandomEmptyCubePosition()!, 2)
    this.createCube(this.getRandomEmptyCubePosition()!, 2)
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
    const notEmptyRows = this.matrix.filter(row => row.find(item => !this.isItem(item)))
    if (!notEmptyRows.length) {
      return
    }
    const row = randomNum(0, notEmptyRows.length - 1)
    const notEmptyCols = notEmptyRows[row].filter(row => !this.isItem(row))
    if (!notEmptyCols.length) {
      return
    }
    const col = randomNum(0, notEmptyCols.length - 1)
    const item = notEmptyCols[col]

    if (!this.isItem(item)) {
      return this.getPositionFromMatrixItem(item as number)
    } else {
      return
    }
  }

  createCube(position: positionType, value?: number, isUnion: boolean = false): HTMLDivElement {
    if (!value) {
      value = this.getRandomCubeValue()
    }
    const cube = document.createElement('div');
    const cubeInner = document.createElement('div');
    cube.classList.add('game-2048__cube', `game-2048__cube--p-${position.row}-${position.col}`)
    cube.setAttribute('data-value', String(value))
    cubeInner.classList.add('game-2048__cube', 'game-2048__cube-inner', 'game-2048__cube--orange')
    cubeInner.innerText = String(value)

    if (isUnion) {
      cube.setAttribute('data-disabled', '1')
    }

    cube.append(cubeInner)

    this.matrix[position.row][position.col] = cube

    this.itemsEl.append(cube)

    return cube
  }

  moveCube(item: HTMLDivElement, position: positionType, emptyBlockPosition: positionType, onlyInterface: boolean = false) {
    if (!onlyInterface) {
      this.matrix[emptyBlockPosition.row][emptyBlockPosition.col] = item
      this.matrix[position.row][position.col] = this.getMatrixItemFromPosition(position)
    }

    item.classList.remove(`game-2048__cube--p-${position.row}-${position.col}`)
    item.classList.add(`game-2048__cube--p-${emptyBlockPosition.row}-${emptyBlockPosition.col}`)
  }

  updateScore(score: number) {
    this.score += score

    this.onScoreUpdate && this.onScoreUpdate(this.score)
  }

  unionCubes(
    firstItemData: { position: positionType, item: itemType },
    secondItemData: { position: positionType, item: itemType },
    position: positionType,
    value: number
  ): void {
    this.removeCube(firstItemData.item, firstItemData.position)
    this.removeCube(secondItemData.item, secondItemData.position)
    this.createCube(position, value, true)
    this.updateScore(value)
  }

  findFarthestPosition(position: positionType, direction: directionType): farthestPositionType {
    let emptyBlockPosition = null
    let itemData: farthestPositionItemDataType = {
      item: null,
      position: null
    }

    if (direction === 'top') {
      for (let i = position.row - 1; i >= 0; i--) {
        const el = this.matrix[i][position.col]

        if (this.isItem(el)) {
          itemData.item = el as HTMLDivElement
          itemData.position = {row: i, col: position.col}
          break
        } else {
          emptyBlockPosition = this.getPositionFromMatrixItem(el as number)
        }
      }
    } else if (direction === 'right') {
      for (let i = position.col + 1; i < 4; i++) {
        const el = this.matrix[position.row][i]

        if (this.isItem(el)) {
          itemData.item = el as HTMLDivElement
          itemData.position = {row: position.row, col: i}
          break
        } else {
          emptyBlockPosition = this.getPositionFromMatrixItem(el as number)
        }
      }
    } else if (direction === 'left') {
      for (let i = position.col - 1; i >= 0; i--) {
        const el = this.matrix[position.row][i]

        if (this.isItem(el)) {
          itemData.item = el as HTMLDivElement
          itemData.position = {row: position.row, col: i}
          break
        } else {
          emptyBlockPosition = this.getPositionFromMatrixItem(el as number)
        }
      }
    } else if (direction === 'bottom') {
      for (let i = position.row + 1; i < 4; i++) {
        const el = this.matrix[i][position.col]

        if (this.isItem(el)) {
          itemData.item = el as HTMLDivElement
          itemData.position = {row: i, col: position.col}
          break
        } else {
          emptyBlockPosition = this.getPositionFromMatrixItem(el as number)
        }
      }
    }

    return {
      emptyBlockPosition,
      itemData
    }
  }

  getPositionFromMatrixItem(number: number): positionType {
    const [row, col] = String(number).split('').map(item => +item - 1)

    return {row, col}
  }

  getMatrixItemFromPosition(position: positionType): number {
    return +(String(position.row + 1) + String(position.col + 1))
  }

  removeCube(item: HTMLDivElement, position: positionType) {
    item && item.remove()
    this.matrix[position.row][position.col] = this.getMatrixItemFromPosition(position)
  }

  async nextTick(direction: directionType) {
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
          this.moveCube(item as HTMLDivElement, position, itemData.position, true)
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
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          const item = this.matrix[row][col]

          if (this.isItem(item)) {
            const position: positionType = {
              row,
              col
            }

            nextTick(item as HTMLDivElement, position)
          }
        }
      }
    } else if (direction === 'right') {
      for (let col = 3; col >= 0; col--) {
        for (let row = 0; row < 4; row++) {
          const item = this.matrix[row][col]

          if (this.isItem(item)) {
            const position: positionType = {
              row,
              col
            }

            nextTick(item as HTMLDivElement, position)
          }
        }
      }
    } else if (direction === 'bottom') {
      for (let row = 3; row > 0; row--) {
        for (let col = 0; col < 4; col++) {
          const item = this.matrix[row][col]

          if (this.isItem(item)) {
            const position: positionType = {
              row,
              col
            }

            nextTick(item as HTMLDivElement, position)
          }
        }
      }
    } else if (direction === 'left') {
      for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 4; row++) {
          const item = this.matrix[row][col]

          if (this.isItem(item)) {
            const position: positionType = {
              row,
              col
            }

            nextTick(item as HTMLDivElement, position)
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
    return typeof item !== 'number';
  }
}
