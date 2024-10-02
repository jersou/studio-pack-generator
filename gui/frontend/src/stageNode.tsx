import InventoryIcon from "@mui/icons-material/Inventory";
import { OpenFolder } from "./openFolder.tsx";
import { Menu, StoryItem, Entrypoint, ZipMenu } from "../../../serialize/types";
import { Line } from "./line.tsx";
import { clearPath } from "./utils.tsx";
import { BASE } from "./app.tsx";

export function StageNode({
  node,
  last,
  first,
}: {
  node: Menu | StoryItem | Entrypoint;
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
        title={
          (node as unknown as ZipMenu).class === "ZipMenu"
            ? node.path
            : undefined
        }
      >
        {node.class !== "StageNode-Entrypoint" && <Line {...{ last, first }}/>}
        <div
          class={`item ${node.class} ${children && children.length > 1 ? "several" : ""}`}
          title={node.path ?? ""}
        >
          <div class="card">
            {(node as unknown as ZipMenu).class === "ZipMenu" ? (
              <InventoryIcon />
            ) : (
              !node.image && !node.audio && <div class="empty"></div>
            )}
            {node.image && (
              <img
                src={`${BASE}/file?path=${clearPath(node.imagePath ?? "")}&ts=${node.imageTimestamp}`}
                title={node.imagePath}
              />
            )}
            {node.audio && (
              <audio
                preload="metadata"
                controls
                src={`${BASE}/file?path=${clearPath(
                  node.audioPath ?? ""
                )}&ts=${node.audioTimestamp}`}
                title={node.audioPath}
              ></audio>
            )}
            {children && children.length
              ? OpenFolder({ path: node.path ?? "", icon: true })
              : null}
          </div>
          {node.class === "StageNode-StoryItem" && (
            <>
              <div class="story-line">
                <svg width="36" height="20" class="story-node-svg">
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
                  preload="metadata"
                  controls
                  src={`${BASE}/file?path=${clearPath(node.path ?? "")}&ts= ${node.pathTimestamp}`}
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
                key={(o.path??(o.class+i))}
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
