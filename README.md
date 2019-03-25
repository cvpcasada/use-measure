# use-measure

It's just a React hook for resize-observer, uses resize-observer-polyfill. Inspired by [react-measure](https://github.com/souporserious/react-measure)

## Install

> Note: React 16.8+ is required for Hooks.

### With npm

```sh
npm i use-measure --save
```

### Or with yarn

```sh
yarn add use-measure
```

## Usage

```jsx
import { useRef } from "react";
import useMeasure from "use-measure";

function MeasuredDiv() {
  const nodeRef = useRef();
  const measurement = useMeasure(nodeRef);
  
  // do whatever you want with measurement obj.
  // note that measurement will only be available after first render.
  return (
    <div ref={nodeRef}>
      /* ... */
    </div>;
  );
}
```
