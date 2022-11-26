// メモリーセルのデータ構造

export type CellValue = any;

// 1つのデータを格納
export type MemoryCell = {
  current: CellValue;
};

// コンポーネント1つ分のMemoryCellたち
export class CellsForComponent {
  index: number = 0; // データ群上の位置
  cells: MemoryCell[] = []; // データ群
  // データ取得関数
  getAndNext(): MemoryCell {
    if (this.cells.length === 0) throw RangeError("No cells now.");
    const prev_index = this.index;
    this.index++;
    if (this.index >= this.cells.length) {
      this.index = 0;
    }
    return this.cells[prev_index];
  }
  // 初期値を持ったMemoryCellを作ることで初期化
  addCell(val: CellValue): MemoryCell {
    const newCell: MemoryCell = {
      current: val,
    };
    this.cells.push(newCell);
    return newCell;
  }
}
export type ComponentKey = string;
export type GlobalStore = Map<ComponentKey, CellsForComponent>; // 全体のMemoryCellを統括管理するオブジェクトの型
export const store: GlobalStore = new Map(); // 全体のMemoryCellを統括管理するインスタンス
