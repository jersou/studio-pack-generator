import {useCallback, useState} from "preact/hooks";
import { ChangeEvent } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDropDown";
import {ModOptions} from "../../../types.ts";

export function Config({
  opt,
  setOpt,
}: {
  opt: Partial<ModOptions>;
  setOpt: (o: Partial<ModOptions>) => unknown;
}) {
  const update = useCallback(
    (type: string) => (event: ChangeEvent<HTMLInputElement>) =>
      setOpt({
        ...opt,
        [type]:
          (event.target as HTMLInputElement)?.checked ??
          (event.target as HTMLInputElement)?.value,
      }),
    [opt]
  );
  // console.log({opt})
  const [expanded, setExpanded] = useState(false)

  return (
    <Accordion onChange={(_,exp)=>setExpanded(exp)}>
      <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
        <Stack alignItems="center" direction="row" gap={2}>
          <SettingsIcon />
          <Typography style={{ fontSize: 25 }}> Configuration (click here to {expanded?"hide":"show"})</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <div class="config">
          <FormControlLabel
            control={
              <Checkbox checked={!!opt.addDelay} onChange={update("addDelay")} />
            }
            label="Add 1 second at the beginning and the end of audio files"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!opt.autoNextStoryTransition}
                onChange={update("autoNextStoryTransition")}
              />
            }
            label="Go to next story of group at end of stories"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!opt.selectNextStoryAtEnd}
                onChange={update("selectNextStoryAtEnd")}
              />
            }
            label="Select the next story in the menu at end"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!opt.nightMode}
                onChange={update("nightMode")}
              />
            }
            label="Enable night mode : add transitions to an uniq endpoint"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!opt.skipAudioConvert}
                onChange={update("skipAudioConvert")}
              />
            }
            label="Skip convert audio (and skip increase volume)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!opt.skipImageConvert}
                onChange={update("skipImageConvert")}
              />
            }
            label="Skip image convert"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!opt.skipAudioItemGen}
                onChange={update("skipAudioItemGen")}
              />
            }
            label="Skip audio item generation"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!opt.skipExtractImageFromMp3}
                onChange={update("skipExtractImageFromMp3")}
              />
            }
            label="Skip extract item image from story mp3"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!opt.skipImageItemGen}
                onChange={update("skipImageItemGen")}
              />
            }
            label="Skip image item generation"
          />
          <FormControlLabel
            control={
              <Checkbox checked={!!opt.skipWsl} onChange={update("skipWsl")} />
            }
            label="Disable WSL usage"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!opt.skipZipGeneration}
                onChange={update("skipZipGeneration")}
              />
            }
            label="Only process item generation, don't create zip"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!opt.useOpenAiTts}
                onChange={update("useOpenAiTts")}
              />
            }
            label="Generate missing audio item with Open AI TTS"
          />

          <TextField
            variant="standard"
            value={opt.lang}
            onChange={update("lang")}
            label="The lang used to generate menu and items. Auto detected by default"
          ></TextField>
          <TextField
            variant="standard"
            value={opt.outputFolder}
            onChange={update("outputFolder")}
            label="Zip output folder"
          ></TextField>
          <TextField
            variant="standard"
            value={opt.seekStory}
            onChange={update("seekStory")}
            label="Cut the beginning of stories: 'HH:mm:ss' format or 'N' sec"
          ></TextField>
          <TextField
            variant="standard"
            value={opt.openAiApiKey}
            onChange={update("openAiApiKey")}
            label="The OpenAI API key"
          ></TextField>

          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="openAiModel-label">OpenAi model</InputLabel>
            <Select
              variant="standard"
              labelId="openAiModel-label"
              value={opt.openAiModel??""}
              onsl-change={update("openAiModel")}
              label="OpenAi model"
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="tts-1">tts-1</MenuItem>
              <MenuItem value="tts-1-hd">tts-1-hd</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="openAiVoice-label">OpenAi voice</InputLabel>
            <Select
              variant="standard"
              labelId="openAiVoice-label"
              value={opt.openAiVoice??""}
              onsl-change={update("openAiVoice")}
              label="OpenAi voice"
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="alloy">alloy</MenuItem>
              <MenuItem value="echo">echo</MenuItem>
              <MenuItem value="fable">fable</MenuItem>
              <MenuItem value="onyx">onyx</MenuItem>
              <MenuItem value="nova">nova</MenuItem>
              <MenuItem value="shimmer">shimmer</MenuItem>
            </Select>
          </FormControl>
          {/*<TextField value={opt.storyPath} onInput=${update("storyPath")}*/}
          {/*   clearable label="Story path"></TextField>*/}
          {/*<Checkbox>Extract a zip pack (reverse mode)</Checkbox>*/}
          {/*<Checkbox checked>open GUI (on localhost:3333)</Checkboxchecked> */}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
