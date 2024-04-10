import { useCallback, useEffect, useState } from "preact/hooks";
import { Config } from "./config.tsx";
import {
  Accordion, AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Slider, Stack, Typography,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import SyncIcon from "@mui/icons-material/Sync";
import { OpenFolder } from "./openFolder.tsx";
import { StageNode } from "./stageNode.tsx";
import { Pack } from "../../serialize/types";
import { enqueueSnackbar } from "notistack";
import {ModOptions} from "../../types.ts";
import { listen } from '@tauri-apps/api/event'
import {clearPath} from "./utils.tsx";

// const BASE= "";
export const BASE = "http://localhost:5555";
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
listen('tauri://file-drop', event => {
  console.log(event)
  fetch(`${BASE}/api/storyPath?path=${clearPath((event.payload as string[])[0])}`);
})

export function updateOnEvent(
  setWsOk: (b: boolean) => unknown,
  setPack?: (p: any) => unknown,
  setOpt?: (p: any) => unknown,
  setInProgress?: (p: boolean) => unknown,
  setUpdatePackInProgress?: (p: boolean) => unknown
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
      setUpdatePackInProgress?.(true)
      setTimeout(()=> setPack?.(data.pack), 500)
      setTimeout(()=> setUpdatePackInProgress?.(false), 1000)
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
    setTimeout(() => {
      console.log("Timeout")
      updateOnEvent(setWsOk)
    }, 5000);
  });

  return ()=> socket.close();
}

export function App() {
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
  const [updatePackInProgress, setUpdatePackInProgress] = useState(false);

  useEffect(() => {
    return updateOnEvent(setWsOk, setPack, setOpt, setInProgress,setUpdatePackInProgress);
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

      <Card style={{ width: "100%" }}>
        <CardContent>
          <div style={{ alignItems: "center", display: "flex" }}>
            <Button size="large" onClick={runSpg} disabled={inProgress} startIcon={<InventoryIcon />}>
              Generate the pack
            </Button>
            {inProgress ? (
              <LinearProgress style={{ marginLeft: 10, minWidth: 500 }} />
            ) : (
              <LinearProgress
                variant="determinate"
                value={0}
                style={{ marginLeft: 10, minWidth: 500 }}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <Accordion defaultExpanded>
        <AccordionSummary
          style={{ fontSize: 25, display: "flex", alignItems: "center" }}
        >
          <Stack alignItems="center" direction="row" gap={2}>
            <SyncIcon />
            <Typography style={{ fontSize: 25 }}> Live preview</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          changes in{" "}
          <OpenFolder path={pack.entrypoint?.path as string} />
          will update this view
        <div class="zoom">
          Zoom :
          <Slider
            min={1}
            max={100}
            step={10}
            marks
            value={zoom}
            onChange={(_, v) => setZoom(v as number)}
            style={{ marginBottom: 10, maxWidth: 400 }}
          />
        </div>
          {updatePackInProgress ? (
            <div style={{backgroundColor:"red"}}>update-pack-in-progress</div>
            ):null }

        <div class="preview" style={{ zoom: zoom / 100}}>
          <StageNode node={pack.entrypoint} />
        </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
