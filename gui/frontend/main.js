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
  socket.addEventListener("open", (event) => {
    console.log("WebSocket: open");
    setWsOk(true);
  });
  socket.addEventListener("message", (event) => {
    console.log("WebSocket: message from server");
    const data = JSON.parse(event.data)
    if(data.type==="fs-update"){
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

  useEffect(async () => {
    updateOnEvent(setWsOk, setPack);
  }, []);
  const backendKo = wsOk
    ? null
    : html`<div class="ko">The backend is down !</div>`;
  return html`
    ${backendKo}
    <div class="app">
      <h1>Studio Pack Generator</h1>
      <${StageNode} node=${pack.entrypoint} />
    </div>
  `;
}

function dirname(path) {
  const res = path?.match(/^(.*)(\/[^\/]+)$/)?.[1];
  console.log({path,res})
  return res??path;
}
function clearPath(path){
  return path.replaceAll("//","/")
}

function StageNode({node}) {
  const children=node?.okTransition?.options?.filter(o=>o.class!=="StageNode-Story").map(o=> StageNode({node:o}))
  return node && html`<div class="story">
    <div class="item">
      <div>class : ${node.class}</div>
      ${node.image && html`<img src="/file?path=${clearPath(dirname(node.path)+"/"+node.image)}" />`}
      ${node.audio && html`<audio controls src="/file?path=${clearPath(dirname(node.path)+"/"+node.audio)}"></audio>`}
      ${node.class==="StageNode-StoryItem" && html`<div class="story-audio"><audio controls src="/file?path=${clearPath(node.path)}"></audio></div>`}
    </div>
    <div class="children">${node.okTransition?.options?.map(o=> StageNode({node:o}))}</div>
  </div>`
}

render(html`<${App}/>`, document.body);
