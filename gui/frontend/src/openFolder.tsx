import { Button, IconButton } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { clearPath } from "./utils.tsx";
import { BASE } from "./app.tsx";

export function OpenFolder({ path, icon }: { path: string; icon?: boolean }) {
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
