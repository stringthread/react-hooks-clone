import React, {
  useState as useStateReactOfficial,
  useEffect as useEffectReactOfficial
} from "react";
import { createRoot } from "react-dom/client";
import { v4 as uuid } from "uuid";
import _ from "lodash";

// メモリーセルのデータ構造
type CellValue = any;
type MemoryCell = {
  current: CellValue;
}; // 1つのデータを格納
class CellsForComponent {
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
      current: val
    };
    this.cells.push(newCell);
    return newCell;
  }
}
type ComponentKey = string;
type GlobalStore = Map<ComponentKey, CellsForComponent>;
const store: GlobalStore = new Map(); // 全体のMemoryCellを統括管理するインスタンス

// コンポーネントKeyを生成管理するHook
// React公式が提供するHookに依存している
const useComponentKey = (): ComponentKey => useStateReactOfficial(uuid())[0];
const componentsFinishedFirstRendering: Set<ComponentKey> = new Set();

// 自作Hookを使いたいときのコンポーネント型
type HookableFC<P extends object> = React.FC<P & { _component_key: ComponentKey }>;
// HookableFCを通常のコンポーネントに変換するラッパ
const HookWrap = <P extends object>(Component: HookableFC<P,>): React.FC<P,> => {
  return (props: P) => {
    const key = useComponentKey(); // `react-hooks/rules-of-hooks`でLinterに怒られるが問題ない
    // ここでReact公式が提供するHookを使用
    useEffectReactOfficial(() => {
      componentsFinishedFirstRendering.add(key); // 初回レンダリングが済んだことを通知
    }, []);
    return <Component {...props} _component_key={key} />;
  };
};

const emptyInitializationSymbol = Symbol(); // 初期化専用のSymbol
// MemoryCellそのものを1つ取得する自作Hook
const useCell = (key: ComponentKey): MemoryCell => {
  if (!store.has(key)) store.set(key, new CellsForComponent());
  const cells = store.get(key) as CellsForComponent; // 簡単のため、例外チェックを省略
  if (componentsFinishedFirstRendering.has(key)) {
    return cells.getAndNext(); // 2回目以降なら単にセルを読み出し
  }
  return cells.addCell(emptyInitializationSymbol); // 初回はセルを新規作成で初期化
};

// 強制レンダリングのための関数を返す
const useForceUpdate = () => {
  // ダミーのStateを更新することで再レンダリングを強制 [^2]
  const [_, setDummyState] = useStateReactOfficial(0);
  return () => setDummyState((e) => e + 1);
};

// 自作のUseState Hook
// 初期値に関数を受け取るパターンは対応していない
const useState = <T,>(initial: T, key: ComponentKey): [T, (val: T) => void] => {
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

// Usage Sample
interface Prop {
  initial: number;
}
const HockableCom: HookableFC<Prop> = (props) => {
  const [count, setCount] = useState(props.initial, props._component_key);
  return (
    <>
      <div>{count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
          console.log(
            `called: ${store
              .get(props._component_key)
              ?.cells.map((v) => v.current)}`
          );
        }}
      >
        +1
      </button>
    </>
  );
};
const Com: React.FC<Prop> = HookWrap(HockableCom);

const container = document.getElementById("root");
if (!container) throw Error("No container `#root` found");
const root = createRoot(container);
root.render(
  <>
    <Com initial={1} /> {/* `_component_key`は渡さなくていい */}
  </>
);
