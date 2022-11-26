import React from "react";
import { HookableFC, HookWrap } from "../hookableFC";
import { useState } from "../hooks";
import { store } from "../memoryCell";

// Usage Sample
export interface SampleProps {
  initial: number;
} // Propsの型定義は通常通りでいい

// HookableFCで定義するとpropsに`_component_key`が追加される
const HockableSampleComponent: HookableFC<SampleProps> = (props) => {
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
// HookableFCをHookWrapで包むと通常のコンポーネントとして使える
export const Sample: React.FC<SampleProps> = HookWrap(HockableSampleComponent);
