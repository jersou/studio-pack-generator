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

// Always escape HTML for text arguments!
function escapeHtml(html) {
  const div = document.createElement("div");
  div.textContent = html;
  return div.innerHTML;
}

// Custom function to emit toast notifications
function notify(
  message,
  variant = "primary",
  icon = "info-circle",
  duration = 3000,
) {
  const alert = Object.assign(document.createElement("sl-alert"), {
    variant,
    closable: true,
    duration: duration,
    innerHTML: `
        <sl-icon name="${icon}" slot="icon"></sl-icon>
        ${escapeHtml(message)}
      `,
  });

  document.body.append(alert);
  return alert.toast();
}

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

function updateOnEvent(setWsOk, setPack, setOpt, setInProgress) {
  const socket = new WebSocket(wsUri);
  socket.addEventListener("open", () => {
    console.log("WebSocket: open");
    setWsOk(true);
  });
  socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    console.log("WebSocket", data.type);
    if (data.type === "fs-update") {
      setPack(data.pack);
    }
    if (data.type === "opt") {
      setOpt(data.opt);
    }
    if (data.type === "SPG-start") {
      notify("Start the pach generation");
      setInProgress(true);
    }
    if (data.type === "SPG-end") {
      if (data.ok) {
        notify("Generation success !", "success");
      } else {
        notify("Generation error !", "danger");
      }
      setInProgress(false);
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
  const [pack, setPack] = useState({});
  const [opt, setOpt] = useState({});
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    updateOnEvent(setWsOk, setPack, setOpt, setInProgress);
  }, []);
  const backendKo = wsOk
    ? null
    : html`<div class="ko">The backend is down !</div>`;
  const [zoom, setZoom] = useState(50);

  const runSpg = useCallback(() => {
    fetch(`${BASE}/api/runSpg`, {
      method: "POST",
      body: JSON.stringify(opt),
    });
  }, [opt]);

  return html`
    ${backendKo}
    <${Config} opt=${opt} setOpt=${setOpt} />

    <sl-card class="card-basic" style="width: 100%">
      <div style="align-items: center; display: flex">
      <sl-button variant="default" size="large" onClick=${runSpg} disabled=${inProgress}>
          <sl-icon slot="prefix" name="box-seam-fill"></sl-icon>
          Generate the pack
        </sl-button>
        ${
    inProgress
      ? html`<sl-progress-bar indeterminate style="margin-left:10px; min-width: 800px;"></sl-progress-bar>`
      : html`<sl-progress-bar value="0" style="margin-left:10px; min-width: 800px;"></sl-progress-bar>`
  }
      </div>
    </sl-card>

    <sl-details open style="box-shadow: var(--sl-shadow-large)">
      <span slot="summary" style="font-size: 25px; display: flex; align-items: center;">
      <sl-icon name="arrow-repeat" style="margin-right: 10px">

      </sl-icon> Live preview : changes in <${OpenFolder} path=${pack.entrypoint?.path}/>
          will update this view
      </span>
      <div class="zoom">
        Zoom :
        <sl-range tooltip="bottom"
                  min="1"
                  max="100"
                  value=${zoom}
                  onInput=${(e) => setZoom(e.target.value)}
                  style="margin-bottom: 10px; max-width: 400px"></sl-range>
      </div>

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
        <div slot="summary" style="font-size: 25px; display: flex; align-items: center;">
          <sl-icon name="gear-fill" style="margin-right: 10px"></sl-icon>
          Configuration
        </div>
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

  return node &&
    html`<div class="story" title=${
      node.class === "ZipMenu" ? node.path : undefined
    }>
    ${node.class !== "StageNode-Entrypoint" && Line({ last, first })}
    <div class="item ${node.class} ${
      children && children.length > 1 ? "several" : ""
    }">
      <div class="card">
        ${
      node.class === "ZipMenu"
        ? html`<sl-icon name="box-seam-fill"></sl-icon>`
        : (!node.image && !node.audio && html`<div class="empty"></div>`)
    }

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
        ${
      children && children.length > 1
        ? OpenFolder({ path: node.path, icon: true })
        : null
    }
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
          html`<${StageNode}
          key=${i}
          node=${o}
          first=${i === 0}
          last=${children.length === i + 1} />`
        )
      }</div>`
    }
  </div>`;
}

function OpenFolder({ path, icon }) {
  const onClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    fetch(`${BASE}/api/openFolder?path=${clearPath(path)}`);
  };
  return icon
    ? html`<sl-icon-button name="folder2-open" label="Open the folder" style="font-size: 2rem;" onClick="${onClick}"/>`
    : html`
    <sl-button variant="text" size="large" onClick=${onClick}>
      <sl-icon slot="prefix" name="folder2-open"></sl-icon>
      <span CLASS="folder-path">${path}</span>
    </sl-button>
  `;
}

render(html`<${App}/>`, document.body);
