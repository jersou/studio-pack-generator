import { useCallback, useLayoutEffect, useRef, useState } from "preact/hooks";

export function useComponentSize() {
  const [size, setSize] = useState({ height: 0, width: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const onResize = useCallback(() => {
    if (ref.current) {
      const height = ref.current.offsetHeight;
      const width = ref.current.offsetWidth;
      if (height !== size.height || width !== size.width) {
        setSize({ height, width });
      }
    }
  }, [size.height, size.width]);

  useLayoutEffect(() => {
    if (ref?.current) {
      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(ref.current);
      return () => resizeObserver.disconnect();
    }
  }, [ref, onResize]);

  return { ref, size };
}
