import {
  html,
  render,
  useEffect,
  useState,
} from "./htm@3.1.1-preact-standalone.module.js"; // https://unpkg.com/htm@3.1.1/preact/standalone.module.js

const wsUri =
  `ws://${window.location.host}${window.location.pathname}api/events-ws`;

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
    <h1>Studio Pack Generator</h1>
    <div class="app">
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

function StageNode({ node }) {
  const children = node?.okTransition?.options?.filter((o) =>
    o.class !== "StageNode-Story"
  );
  return node && html`<div class="story">
    <div class="item ${node.class} ${children.length > 1 ? "several" : ""}">
      <div class="card">
        ${
    node.image &&
    html`<img src="/file?path=${
      clearPath(dirname(node.path) + "/" + node.image)
    }" />`
  }
        ${
    node.audio &&
    html`<audio controls src="/file?path=${
      clearPath(dirname(node.path) + "/" + node.audio)
    }"></audio>`
  }
        ${children.length > 1 ? Openfolder({ node }) : null}
      </div>
      ${
    node.class === "StageNode-StoryItem" &&
    html`<div class="story-audio"><audio controls src="/file?path=${
      clearPath(node.path)
    }"></audio></div>`
  }
    </div>
    ${
    children && html`<div class="children">${
      children.map((o) => StageNode({ node: o }))
    }</div>`
  }
  </div>`;
}

function Openfolder({ node }) {
  const onClick = () => fetch(`/api/openFolder?path=${clearPath(node.path)}`);
  return html`<button onClick="${onClick}">Open folder</button>`;
}

render(html`<${App}/>`, document.body);
