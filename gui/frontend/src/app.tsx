import { useCallback, useState } from "preact/hooks";
import { Config } from "./config.tsx";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  TextField,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import DownloadIcon from "@mui/icons-material/Download";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import type { CliOptions } from "../../../common-types.ts";

const BASE = ""; // Relative to where it is served

export function App() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [mode, setMode] = useState<"start" | "config" | "generating" | "done">("start");
  const [opt, setOpt] = useState<Partial<CliOptions>>({});
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  if (mode === "start") {
    return (
      <StartScreen
        onSession={(id) => {
          setSessionId(id);
          setMode("config");
          setError("");
        }}
        onError={setError}
      />
    );
  }

  const generate = async () => {
    setMode("generating");
    setError("");
    try {
      const res = await fetch(`${BASE}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, options: opt }),
      });
      const data = await res.json();
      if (data.success) {
        setDownloadUrl(data.downloadUrl);
        setMode("done");
      } else {
        setError(data.message || "Generation failed");
        setMode("config");
      }
    } catch (e: any) {
      setError(e.message || "Network error");
      setMode("config");
    }
  };

  const restart = () => {
      setSessionId(null);
      setMode("start");
      setOpt({});
      setDownloadUrl("");
      setError("");
  };

  return (
    <Container maxWidth="md" style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>
        Studio Pack Generator (Web)
      </Typography>

      {error && <Alert severity="error" style={{marginBottom: 20}}>{error}</Alert>}

      {mode === "config" && (
        <>
          <Config opt={opt} setOpt={setOpt} />
          <Card style={{ marginTop: 20 }}>
            <CardContent>
               <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={generate}
                  startIcon={<PlayArrowIcon />}
                  fullWidth
                >
                  Generate Pack
                </Button>
            </CardContent>
          </Card>
        </>
      )}

      {mode === "generating" && (
         <Card style={{ marginTop: 20, textAlign: "center", padding: 40 }}>
            <CircularProgress />
            <Typography variant="h6" style={{marginTop: 20}}>Generating your pack, please wait...</Typography>
         </Card>
      )}

      {mode === "done" && (
        <Card style={{ marginTop: 20, textAlign: "center", padding: 40 }}>
           <Typography variant="h5" gutterBottom>Success!</Typography>
           <Button
              variant="contained"
              color="success"
              size="large"
              href={downloadUrl}
              startIcon={<DownloadIcon />}
              style={{ fontSize: 20, padding: 20 }}
           >
              Download ZIP
           </Button>
           <br/><br/>
           <Button onClick={restart}>Start Over</Button>
        </Card>
      )}
    </Container>
  );
}

function StartScreen({ onSession, onError }: { onSession: (id: string) => void, onError: (msg: string) => void }) {
  const [rssUrl, setRssUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${BASE}/api/upload`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        onSession(data.sessionId);
      } else {
        onError("Upload failed");
      }
    } catch (e) {
      onError("Network error during upload");
    } finally {
      setUploading(false);
    }
  };

  const handleRssSubmit = async () => {
      if (!rssUrl) return;
      setUploading(true);
      try {
          const res = await fetch(`${BASE}/api/rss`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ url: rssUrl }),
          });
          if (res.ok) {
              const data = await res.json();
              onSession(data.sessionId);
          } else {
              onError("RSS download failed");
          }
      } catch (e) {
          onError("Network error during RSS download");
      } finally {
          setUploading(false);
      }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 50 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create Lunii Pack
      </Typography>

      <Card style={{ marginBottom: 20 }}>
        <CardContent>
           <Stack spacing={3} alignItems="center">
              <Typography variant="h6">Option 1: Upload a ZIP</Typography>
              <Typography variant="body2" color="textSecondary">
                 Upload a zip containing your audio files folder structure.
              </Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                disabled={uploading}
              >
                Select ZIP File
                <input type="file" hidden accept=".zip" onChange={handleFileUpload} />
              </Button>
           </Stack>
        </CardContent>
      </Card>

      <Typography variant="h6" align="center" style={{margin: "20px 0"}}>OR</Typography>

      <Card>
        <CardContent>
           <Stack spacing={3} alignItems="center">
              <Typography variant="h6">Option 2: RSS Feed</Typography>
              <TextField
                label="RSS URL"
                fullWidth
                value={rssUrl}
                onChange={(e) => setRssUrl((e.target as any).value)}
                disabled={uploading}
              />
              <Button
                variant="contained"
                startIcon={<RssFeedIcon />}
                onClick={handleRssSubmit}
                disabled={uploading || !rssUrl}
              >
                Import from RSS
              </Button>
           </Stack>
        </CardContent>
      </Card>

      {uploading && (
          <div style={{textAlign: "center", marginTop: 20}}>
              <CircularProgress />
              <Typography>Uploading / Downloading...</Typography>
          </div>
      )}
    </Container>
  );
}
