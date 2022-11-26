import React from "react";
import { createRoot } from "react-dom/client";
import { Sample } from "./sampleComponent";

// Usage Sample
const container = document.getElementById("root");
if (!container) throw Error("No container `#root` found");
const root = createRoot(container);
root.render(
  <>
    <Sample initial={1} /> {/* `_component_key`は渡さなくていい */}
  </>
);
