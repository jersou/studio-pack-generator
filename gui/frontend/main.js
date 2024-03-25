import {
  html,
  render,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "./htm@3.1.1-preact-standalone.module.js"; // https://unpkg.com/htm@3.1.1/preact/standalone.module.js

const wsUri =
  `ws://${window.location.host}${window.location.pathname}api/events-ws`;

function useComponentSize() {
  const [size, setSize] = useState({ height: 0, width: 0 });
  const ref = useRef();

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

function updateOnEvent(setWsOk, setPack) {
  const socket = new WebSocket(wsUri);
  socket.addEventListener("open", () => {
    console.log("WebSocket: open");
    setWsOk(true);
  });
  socket.addEventListener("message", (event) => {
    console.log("WebSocket: message from server");
    const data = JSON.parse(event.data);
    if (data.type === "fs-update") {
      setPack(data.pack);
    }
  });
  socket.addEventListener("error", (event) => {
    console.log("WebSocket: error event", event);
    setWsOk(false);
  });
  socket.addEventListener("close", (event) => {
    console.log("WebSocket: close event", event);
    setWsOk(false);
    // retry in 5s
    setTimeout(() => updateOnEvent(setWsOk), 5000);
  });
}

function App() {
  const [wsOk, setWsOk] = useState(true);
  // example
  const [pack, setPack] = useState({});

  useEffect(() => {
    updateOnEvent(setWsOk, setPack);
  }, []);
  const backendKo = wsOk
    ? null
    : html`<div class="ko">The backend is down !</div>`;
  return html`
    ${backendKo}
    <div class="preview">
      <h1>Live preview :</h1>
      <${StageNode} node=${pack.entrypoint} />
    </div>
  `;
}

function dirname(path) {
  const res = path?.match(/^(.*)(\/[^\/]+)$/)?.[1];
  return res ?? path;
}
function clearPath(path) {
  return encodeURIComponent(path.replaceAll("//", "/"));
}

function Line({ last, first }) {
  const { ref, size: { width, height } } = useComponentSize();
  console.log({ width, height });
  return html`<div class="line" ref=${ref}>
    <svg  width=${width} height=${height + 1}>
      ${
    first &&
    html`<line x1="0" x2="80" y1="40" y2="40" stroke="orange" stroke-width="8"/>`
  }
      ${
    first && !last &&
    html`<path d="M0 40 Q 40 40, 40 ${
      height + 1
    }"  fill="transparent" stroke="orange" stroke-width="8"/>`
  }
      ${
    !first && !last &&
    html`<line x1="40" x2="40" y1="0" y2="${
      height + 1
    }" stroke="orange" stroke-width="8"/>`
  }
      ${
    !first &&
    html`<path d="M40 0 Q 40 40, 80 40"  fill="transparent" stroke="orange" stroke-width="8"/>`
  }
    </svg>
  </div>`;
}

function StageNode({ node, last, first }) {
  const children = node?.okTransition?.options?.filter((o) =>
    o.class !== "StageNode-Story"
  );

  return node && html`<div class="story">
    ${node.class !== "StageNode-Entrypoint" && Line({ last, first })}
    <div class="item ${node.class} ${children.length > 1 ? "several" : ""}">
      <div class="card">
        ${!node.image && !node.audio && html`<div class="empty"></div>`}

        ${
    node.image &&
    html`<img src="/file?path=${
      clearPath(dirname(node.path) + "/" + node.image)
    }"
    title=${dirname(node.path) + node.image}
    />`
  }
        ${
    node.audio &&
    html`<audio controls src="/file?path=${
      clearPath(dirname(node.path) + "/" + node.audio)
    }"
    title=${dirname(node.path) + node.audio}
    ></audio>`
  }
        ${children.length > 1 ? OpenFolder({ node }) : null}
      </div>
      ${
    node.class === "StageNode-StoryItem" &&
    html`
      <div class="story-line">
      <svg width="36" height="20"><path d="M0 10 H36" fill="transparent" stroke="orange" stroke-width="8" /></svg>
      </div>
      <div class="story-audio"><audio controls src="/file?path=${
      clearPath(node.path)
    }"
    title=${node.path}></audio></div>`
  }
    </div>
    ${
    children && html`<div class="children">${
      children.map((o, i) =>
        StageNode({ node: o, first: i === 0, last: children.length === i + 1 })
      )
    }</div>`
  }
  </div>`;
}

function OpenFolder({ node }) {
  const onClick = () => fetch(`/api/openFolder?path=${clearPath(node.path)}`);
  return html`<button onClick="${onClick}">Open folder</button>`;
}

render(html`<${App}/>`, document.body);
