import { useComponentSize } from "./useComponentSize.tsx";

export function Line({
  last,
  first,
}: {
  last: boolean | undefined;
  first: boolean | undefined;
}) {
  const {
    ref,
    size: { width, height },
  } = useComponentSize();
  return (
    <div class="line" ref={ref}>
      <svg width={width} height={height + 1}>
        {first && (
          <line
            x1="0"
            x2="80"
            y1="40"
            y2="40"
            stroke="orange"
            stroke-width="8"
          />
        )}
        {first && !last && (
          <path
            d={`M0 40 Q 40 40, 40 ${height + 1}`}
            fill="transparent"
            stroke="orange"
            stroke-width="8"
          />
        )}
        {!first && !last && (
          <line
            x1="40"
            x2="40"
            y1="0"
            y2={height + 1}
            stroke="orange"
            stroke-width="8"
          />
        )}
        {!first && (
          <path
            d="M40 0 Q 40 40, 80 40"
            fill="transparent"
            stroke="orange"
            stroke-width="8"
          />
        )}
      </svg>
    </div>
  );
}
