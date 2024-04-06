import { render } from "preact";
import "./styles.css";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import {
  Accordion,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  LinearProgress,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import InventoryIcon from "@mui/icons-material/Inventory";
import {ChangeEvent, StrictMode} from "preact/compat";
import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "preact/hooks";
import SyncIcon from "@mui/icons-material/Sync";
import { Pack, StoryItem } from "../../serialize/types";
import SettingsIcon from "@mui/icons-material/Settings";
import {Entrypoint, Menu,  ZipMenu} from "../../serialize/types.ts";
import { ModOptions } from "../../gen_pack.ts";


// const BASE= "";
const BASE = "http://localhost:5555";
const wsUri = `ws://${
  BASE
    ? BASE.substring(7) + "/"
    : window.location.host + window.location.pathname
}api/events-ws`;

function notify(
  message: string,
  variant:
    | "error"
    | "default"
    | "success"
    | "warning"
    | "info"
    | undefined = "default",
  autoHideDuration = 3000
) {
  enqueueSnackbar(message, { variant, autoHideDuration });
}

function useComponentSize() {
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

function updateOnEvent(
  setWsOk: (b: boolean) => unknown,
  setPack?: (p: any) => unknown,
  setOpt?: (p: any) => unknown,
  setInProgress?: (p: boolean) => unknown
) {
  const socket = new WebSocket(wsUri);
  socket.addEventListener("open", () => {
    console.log("WebSocket: open");
    setWsOk(true);
  });
  socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    console.log("WebSocket", data.type);
    if (data.type === "fs-update") {
      setPack?.(data.pack);
    }
    if (data.type === "opt") {
      setOpt?.(data.opt);
    }
    if (data.type === "SPG-start") {
      notify("Start the generation");
      setInProgress?.(true);
    }
    if (data.type === "SPG-end") {
      if (data.ok) {
        notify("Generation success !", "success");
      } else {
        notify("Generation error !", "error");
      }
      setInProgress?.(false);
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
  const [pack, setPack] = useState<Pack>({
    title: "",
    description: "",
    format: "",
    version: 0,
    nightModeAvailable: false,
    entrypoint: {
      class: "StageNode-Entrypoint",
      name: "",
      okTransition: {
        class: "ActionNode",
        name: "",
        options: [],
      },
      image: null,
      audio: null,
    },
  });
  const [opt, setOpt] = useState<Partial<ModOptions>>({});
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    updateOnEvent(setWsOk, setPack, setOpt, setInProgress);
  }, []);
  const backendKo = wsOk ? null : <div class="ko">The backend is down !</div>;
  const [zoom, setZoom] = useState(50);

  const runSpg = useCallback(() => {
    fetch(`${BASE}/api/runSpg`, {
      method: "POST",
      body: JSON.stringify(opt),
    });
  }, [opt]);

  return (
    <>
      {backendKo}
      <Config opt={opt} setOpt={setOpt} />

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
        </CardContent>
      </Card>

      <Card style={{ width: "100%" }}>
        <CardContent>
          <div style={{ alignItems: "center", display: "flex" }}>
            <Button size="large" onClick={runSpg} disabled={inProgress}>
              <InventoryIcon />
              Generate the pack
            </Button>
            {inProgress ? (
              <LinearProgress style={{ marginLeft: 10, minWidth: 800 }} />
            ) : (
              <LinearProgress
                variant="determinate"
                value={0}
                style={{ marginLeft: 10, minWidth: 800 }}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <Accordion open>
        <AccordionSummary
          style={{ fontSize: 25, display: "flex", alignItems: "center" }}
        >
          <SyncIcon /> Live preview : changes in{" "}
          <OpenFolder path={pack.entrypoint?.path as string} />
          will update this view
        </AccordionSummary>
        <div class="zoom">
          Zoom :
          <Slider
            min={1}
            max={100}
            value={zoom}
            onChange={(_, v) => setZoom(v as number)}
            style={{ marginBottom: 10, maxWidth: 400 }}
          />
        </div>

        <div class="preview" style="zoom: ${zoom / 100}">
          <StageNode node={pack.entrypoint} />
        </div>
      </Accordion>
    </>
  );
}

function Config({ opt, setOpt }:{ opt:Partial<ModOptions>, setOpt :(o:Partial<ModOptions>)=>unknown}) {
  const update = useCallback(
    (type:string) => (event:ChangeEvent<HTMLInputElement>) =>
      setOpt({ ...opt, [type]: (event.target as HTMLInputElement)?.checked ?? (event.target as HTMLInputElement)?.value }),
    [opt]
  );
  // console.log({opt})

  return (
    <Accordion defaultExpanded>
      <div
        slot="summary"
        style="font-size: 25px; display: flex; align-items: center;"
      >
        <SettingsIcon />
        Configuration
      </div>
      <div class="config">
        <FormControlLabel
          control={
            <Checkbox checked={opt.addDelay} onChange={update("addDelay")} />
          }
          label="Add 1 second at the beginning and the end of audio files"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={opt.autoNextStoryTransition}
              onChange={update("autoNextStoryTransition")}
            />
          }
          label="Go to next story of group at end of stories"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={opt.selectNextStoryAtEnd}
              onChange={update("selectNextStoryAtEnd")}
            />
          }
          label="Select the next story in the menu at end"
        />
        <FormControlLabel
          control={
            <Checkbox checked={opt.nightMode} onChange={update("nightMode")} />
          }
          label="Enable night mode : add transitions to an uniq endpoint"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={opt.skipAudioConvert}
              onChange={update("skipAudioConvert")}
            />
          }
          label="Skip convert audio (and skip increase volume)"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={opt.skipImageConvert}
              onChange={update("skipImageConvert")}
            />
          }
          label="Skip image convert"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={opt.skipAudioItemGen}
              onChange={update("skipAudioItemGen")}
            />
          }
          label="Skip audio item generation"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={opt.skipExtractImageFromMp3}
              onChange={update("skipExtractImageFromMp3")}
            />
          }
          label="Skip extract item image from story mp3"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={opt.skipImageItemGen}
              onChange={update("skipImageItemGen")}
            />
          }
          label="Skip image item generation"
        />
        <FormControlLabel
          control={
            <Checkbox checked={opt.skipWsl} onChange={update("skipWsl")} />
          }
          label="Disable WSL usage"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={opt.skipZipGeneration}
              onChange={update("skipZipGeneration")}
            />
          }
          label="Only process item generation, don't create zip"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={opt.useOpenAiTts}
              onChange={update("useOpenAiTts")}
            />
          }
          label="Generate missing audio item with Open AI TTS"
        />

        <TextField
          value={opt.lang}
          onChange={update("lang")}
          label="The lang used to generate menu and items. Auto detected by default"
        ></TextField>
        <TextField
          value={opt.outputFolder}
          onChange={update("outputFolder")}
          label="Zip output folder"
        ></TextField>
        <TextField
          value={opt.seekStory}
          onChange={update("seekStory")}
          label="Cut the beginning of stories: 'HH:mm:ss' format or 'N' sec"
        ></TextField>
        <TextField
          value={opt.openAiApiKey}
          onChange={update("openAiApiKey")}
          label="The OpenAI API key"
        ></TextField>
        <Select
          value={opt.openAiModel}
          onsl-change={update("openAiModel")}
          label="OpenAi model"
        >
          <MenuItem value="tts-1">tts-1</MenuItem>
          <MenuItem value="tts-1-hd">tts-1-hd</MenuItem>
        </Select>
        <Select
          value={opt.openAiVoice}
          onsl-change={update("openAiVoice")}
          label="OpenAi voice"
        >
          <MenuItem value="alloy">alloy</MenuItem>
          <MenuItem value="echo">echo</MenuItem>
          <MenuItem value="fable">fable</MenuItem>
          <MenuItem value="onyx">onyx</MenuItem>
          <MenuItem value="nova">nova</MenuItem>
          <MenuItem value="shimmer">shimmer</MenuItem>
        </Select>
        {/*<TextField value={opt.storyPath} onInput=${update("storyPath")}*/}
        {/*   clearable label="Story path"></TextField>*/}
        {/*<Checkbox>Extract a zip pack (reverse mode)</Checkbox>*/}
        {/*<Checkbox checked>open GUI (on localhost:3333)</Checkboxchecked> */}
      </div>
    </Accordion>
  );
}

function clearPath(path: string) {
  return encodeURIComponent(path.replaceAll("//", "/"));
}

function Line({ last, first }: { last: boolean|undefined; first: boolean|undefined }) {
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
            d="M0 40 Q 40 40, 40 ${height + 1}"
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
            y2="${height + 1}"
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

function StageNode({
  node,
  last,
  first,
}: {
  node: Menu |  StoryItem |  Entrypoint; // TODO type node
  last?: boolean;
  first?: boolean;
}) {
  const children = node?.okTransition?.options?.filter(
    (o) => o.class !== "StageNode-Story"
  );

  return (
    node && (
      <div
        class="story"
        title={(node as unknown as ZipMenu).class === "ZipMenu" ? node.path : undefined}
      >
        {node.class !== "StageNode-Entrypoint" && Line({ last, first })}
        <div
          class={`item ${node.class} ${children && children.length > 1 ? "several" : ""}`}
        >
          <div class="card">
            {(node as unknown as ZipMenu).class === "ZipMenu" ? (
              <InventoryIcon />
            ) : (
              !node.image && !node.audio && <div class="empty"></div>
            )}
            {node.image && (
              <img
                src={`${BASE}/file?path=${clearPath(node.imagePath??"")}&ts=${node.imageTimestamp}`}
                title={node.imagePath}
              />
            )}
            {node.audio && (
              <audio
                controls
                src={`${BASE}/file?path=${clearPath(
                  node.audioPath??""
                )}&ts=${node.audioTimestamp}`}
                title={node.audioPath}
              ></audio>
            )}
            {children && children.length > 1
              ? OpenFolder({ path: node.path??"", icon: true })
              : null}
          </div>
          {node.class === "StageNode-StoryItem" && (
            <>
              <div class="story-line">
                <svg width="36" height="20">
                  <path
                    d="M0 10 H36"
                    fill="transparent"
                    stroke="orange"
                    stroke-width="8"
                  />
                </svg>
              </div>
              <div class="story-audio">
                <audio
                  controls
                  src={`${BASE}/file?path=${clearPath(node.path??"")}&ts= ${node.pathTimestamp}`}
                  title={node.path}
                ></audio>
              </div>
            </>
          )}
        </div>
        {children && (
          <div class="children">
            {children.map((o, i: number) => (
              <StageNode
                key={i}
                node={o as Menu}
                first={i === 0}
                last={children.length === i + 1}
              />
            ))}
          </div>
        )}
      </div>
    )
  );
}

function OpenFolder({ path, icon }: { path: string; icon?: boolean }) {
  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    fetch(`${BASE}/api/openFolder?path=${clearPath(path)}`);
  };
  return icon ? (
    <IconButton aria-label="Open the folder" onClick={onClick}>
      <FolderOpenIcon />
    </IconButton>
  ) : (
    <Button size="large" onClick={onClick} startIcon={<FolderOpenIcon />}>
      <span class="folder-path">{path}</span>
    </Button>
  );
}

render(
  <StrictMode>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </StrictMode>,
  document.getElementById("root")!
);
