import {
  html,
  render,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "./htm@3.1.1-preact-standalone.module.js"; // https://unpkg.com/htm@3.1.1/preact/standalone.module.js

// const BASE= "";
const BASE = "http://localhost:5555";
const wsUri = `ws://${
  BASE
    ? BASE.substring(7) + "/"
    : window.location.host + window.location.pathname
}api/events-ws`;
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

function updateOnEvent(setWsOk, setPack, setOpt) {
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
    if (data.type === "opt") {
      setOpt(data.opt);
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
  const [opt, setOpt] = useState({});

  useEffect(() => {
    updateOnEvent(setWsOk, setPack, setOpt);
  }, []);
  const backendKo = wsOk
    ? null
    : html`<div class="ko">The backend is down !</div>`;
  const [zoom, setZoom] = useState(80);
  return html`
    ${backendKo}
    <${Config} opt=${opt} setOpt=${setOpt} />

    <sl-details open style="box-shadow: var(--sl-shadow-large)">
      <span slot="summary" style="font-size: 25px">
        Live preview : changes in <span class="folder-path">${pack.entrypoint?.path}</span> will update this view
      </span>
      <sl-range label="Zoom" min="1" max="100" value=${zoom} onInput=${(e) =>
    setZoom(
      e.target.value,
    )} style="margin-bottom: 10px; max-width: 400px"></sl-range>
      <div class="preview" style="zoom: ${zoom / 100}">
        <${StageNode} node=${pack.entrypoint} />
      </div>
    </sl-details>
  `;
}

function Config({ opt, setOpt }) {
  const update = useCallback(
    (type) => (event) =>
      setOpt({ ...opt, [type]: event.target.checked ?? event.target.value }),
    [opt],
  );
  // console.log({opt})

  return html`
      <sl-details open style="box-shadow: var(--sl-shadow-large)">
        <div slot="summary" style="font-size: 25px">Configuration</div>
      <div class="config">
        <sl-checkbox checked=${opt.addDelay} onInput=${update("addDelay")}>
          Add 1 second at the beginning and the end of audio files
        </sl-checkbox>
        <sl-checkbox checked=${opt.autoNextStoryTransition} onInput=${
    update("autoNextStoryTransition")
  }>
          Go to next story of group at end of stories
        </sl-checkbox>
        <sl-checkbox checked=${opt.selectNextStoryAtEnd} onInput=${
    update("selectNextStoryAtEnd")
  }>
          Select the next story in the menu at end
        </sl-checkbox>
        <sl-checkbox checked=${opt.nightMode} onInput=${update("nightMode")}>
          Enable night mode : add transitions to an uniq endpoint
        </sl-checkbox>
        <sl-checkbox checked=${opt.skipAudioConvert} onInput=${
    update("skipAudioConvert")
  }>
          Skip convert audio (and skip increase volume)
        </sl-checkbox>
        <sl-checkbox checked=${opt.skipImageConvert} onInput=${
    update("skipImageConvert")
  }>
          Skip image convert
        </sl-checkbox>
        <sl-checkbox checked=${opt.skipAudioItemGen} onInput=${
    update("skipAudioItemGen")
  }>
          Skip audio item generation
        </sl-checkbox>
        <sl-checkbox checked=${opt.skipExtractImageFromMp3} onInput=${
    update("skipExtractImageFromMp3")
  }>
          Skip extract item image from story mp3
        </sl-checkbox>
        <sl-checkbox checked=${opt.skipImageItemGen} onInput=${
    update("skipImageItemGen")
  }>
          Skip image item generation
        </sl-checkbox>
        <sl-checkbox checked=${opt.skipNotRss} onInput=${update("skipNotRss")}>
          Skip all except download RSS files
        </sl-checkbox>
        <sl-checkbox checked=${opt.skipRssImageDl} onInput=${
    update("skipRssImageDl")
  }>
          Skip RSS image download of items
        </sl-checkbox>
        <sl-checkbox checked=${opt.skipWsl} onInput=${update("skipWsl")}>
          Disable WSL usage
        </sl-checkbox>
        <sl-checkbox checked=${opt.skipZipGeneration} onInput=${
    update("skipZipGeneration")
  }>
          Only process item generation, don't create zip
        </sl-checkbox>
        <sl-checkbox checked=${opt.useOpenAiTts} onInput=${
    update("useOpenAiTts")
  }>
          Generate missing audio item with Open AI TTS
        </sl-checkbox>
        <sl-input value=${opt.lang} onInput=${update("lang")}
          clearable label="The lang used to generate menu and items. Auto detected by default"></sl-input>
        <sl-input value=${opt.outputFolder} onInput=${update("outputFolder")}
          clearable label="Zip output folder"></sl-input>
        <sl-input value=${opt.seekStory} onInput=${update("seekStory")}
          clearable label="Cut the beginning of stories: 'HH:mm:ss' format or 'N' sec"></sl-input>
        <sl-input value=${opt.openAiApiKey} onInput=${update("openAiApiKey")}
          clearable label="The OpenAI API key"></sl-input>
        <sl-select value=${opt.openAiModel} onsl-change=${update("openAiModel")}
          label="OpenAi model">
          <sl-option value="tts-1">tts-1</sl-option>
          <sl-option value="tts-1-hd">tts-1-hd</sl-option>
        </sl-select>
        <sl-select value=${opt.openAiVoice} onsl-change=${update("openAiVoice")}
          label="OpenAi voice">
          <sl-option value="alloy">alloy</sl-option>
          <sl-option value="echo">echo</sl-option>
          <sl-option value="fable">fable</sl-option>
          <sl-option value="onyx">onyx</sl-option>
          <sl-option value="nova">nova</sl-option>
          <sl-option value="shimmer">shimmer</sl-option>
        </sl-select>
       <!--  <sl-input value=${opt.storyPath} onInput=${update("storyPath")}
          clearable label="Story path"></sl-input>-->
        <!-- <sl-checkbox>Extract a zip pack (reverse mode)</sl-checkbox>-->
        <!-- <sl-checkbox checked>open GUI (on localhost:3333)</sl-checkboxchecked> -->
</div>
      </sl-details>`;
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
    html`<img src="${BASE}/file?path=${
      clearPath(node.imagePath)
    }&ts=${node.imageTimestamp}"
    title=${node.imagePath}
    />`
  }
        ${
    node.audio &&
    html`<audio
      controls
      src="${BASE}/file?path=${
      clearPath(node.audioPath)
    }&ts=${node.audioTimestamp}"
      title=${node.audioPath}></audio>`
  }
        ${children.length > 1 ? OpenFolder({ node }) : null}
      </div>
      ${
    node.class === "StageNode-StoryItem" &&
    html`
      <div class="story-line">
      <svg width="36" height="20"><path d="M0 10 H36" fill="transparent" stroke="orange" stroke-width="8" /></svg>
      </div>
      <div class="story-audio">
        <audio
          controls
          src="${BASE}/file?path=${
      clearPath(node.path)
    }&ts=${node.pathTimestamp}"
          title=${node.path}></audio>
      </div>`
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
  const onClick = () =>
    fetch(`${BASE}/api/openFolder?path=${clearPath(node.path)}`);
  return html`<button onClick="${onClick}">Open folder</button>`;
}

render(html`<${App}/>`, document.body);
