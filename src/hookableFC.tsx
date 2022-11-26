import React, {
  useState as useStateReactOfficial,
  useEffect as useEffectReactOfficial,
} from "react";
import { v4 as uuid } from "uuid";
import { ComponentKey } from "./memoryCell";

// コンポーネントKeyを生成管理するHook
// React公式が提供するHookに依存している
export const useComponentKey = (): ComponentKey =>
  useStateReactOfficial(uuid())[0];
export const componentsFinishedFirstRendering: Set<ComponentKey> = new Set();

// 自作Hookを使いたいときのコンポーネント型
export type HookableFC<P extends object> = React.FC<
  P & { _component_key: ComponentKey }
>;
// HookableFCを通常のコンポーネントに変換するラッパ
export const HookWrap = <P extends object>(
  Component: HookableFC<P>
): React.FC<P> => {
  return (props: P) => {
    const key = useComponentKey(); // `react-hooks/rules-of-hooks`でLinterに怒られるが問題ない
    // ここでReact公式が提供するHookを使用
    useEffectReactOfficial(() => {
      componentsFinishedFirstRendering.add(key); // 初回レンダリングが済んだことを通知
    }, []);
    return <Component {...props} _component_key={key} />;
  };
};
