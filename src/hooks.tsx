import { useState as useStateReactOfficial } from "react";
import _ from "lodash";
import { ComponentKey, MemoryCell, CellsForComponent, store } from "./memoryCell";
import { componentsFinishedFirstRendering } from "./hookableFC";

export const emptyInitializationSymbol = Symbol(); // 初期化専用のSymbol

// MemoryCellそのものを1つ取得する自作Hook
export const useCell = (key: ComponentKey): MemoryCell => {
  if (!store.has(key)) store.set(key, new CellsForComponent());
  const cells = store.get(key) as CellsForComponent;
  if (componentsFinishedFirstRendering.has(key)) {
    return cells.getAndNext();
  }
  return cells.addCell(emptyInitializationSymbol);
};

// 強制レンダリングのための関数を返す
// React公式が提供するHookを使用
const useForceUpdate = () => {
  // ダミーのStateを更新することで再レンダリングを強制
  // Inspired from: https://dev-k.hatenablog.com/entry/how-to-force-re-rendering-of-react-components-dev-k
  const [_, setDummyState] = useStateReactOfficial(0);
  return () => setDummyState(prev => prev + 1);
};

// 自作のUseState Hook
// 初期値に関数を受け取るパターンは対応していない
export const useState = <T>(initial: T, key: ComponentKey): [T, (val: T) => void] => {
  const cell = useCell(key);
  if (cell.current === emptyInitializationSymbol) {
    cell.current = initial;
  }
  const forceUpdate = useForceUpdate();
  const setter = (val: T): void => {
    cell.current = val;
    forceUpdate();
  };
  return [_.cloneDeep(cell.current), setter];
};
