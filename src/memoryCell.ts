// メモリーセルのデータ構造

export type CellValue = any;

// 1つのデータを格納
export type MemoryCell = {
  current: CellValue;
};

// コンポーネント1つ分のMemoryCellたち
export class CellsForComponent {
  private cells: MemoryCell[];

  constructor() {
    this.cells = [];
  }

  // 新しいセルを追加してその値を返す
  addCell(initialValue: CellValue): MemoryCell {
    const cell: MemoryCell = { current: initialValue };
    this.cells.push(cell);
    return cell;
  }

  // 現在のセルの値を取得し、次のセルを返す
  getAndNext(): MemoryCell {
    const currentCell = this.cells.shift();
    if (currentCell) {
      const nextCell = this.cells[0];
      if (!nextCell) {
        throw new Error("MemoryCell: No next cell found.");
      }
      return nextCell;
    } else {
      throw new Error("MemoryCell: No current cell found.");
    }
  }
}

// コンポーネントごとのMemoryCellを格納するMap
export const store = new Map<ComponentKey, CellsForComponent>();

// 初回レンダリングが終了したコンポーネントのComponentKeyを格納するSet
export const componentsFinishedFirstRendering = new Set<ComponentKey>();
