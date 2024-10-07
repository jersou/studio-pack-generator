### v0.5.8 / ??.??.??

- feat: cache generated TTS file

### v0.5.7 / 2024.10.06

- fix: coqui-tts error on windows
- fix: the GUI config is not used by the backend

### v0.5.6 / 2024.10.06

- fix: coqui TTS on Windows in some cases
- fix RSS genration after the v0.5.0 refactor
- upgrade: deno.land/x/xml@2.1.3 → @libs/xml@6.0.0

### v0.5.5 / 2024.10.05

- feat: Studio Pack Generator GUI !
- feat: json config file
- update dependencies, refactor, use jsr
- feat: zip suffix: ts → date
- fix: fix open in browser
- fix(zip): Unhandled error in child worker

### v0.4.4 / 2024.10.02

- feat: now support split by season with many new options by @farfromrefug. See
  readme for added options :

```
--rss-split-seasons            RSS create different packs per season                    [boolean] [default: false]
--rss-min-duration             RSS min episode duration                                      [number] [default: 0]
--rss-use-image-as-thumbnail   Use rss image (first item with image) as thumbnail       [boolean] [default: false]
```

The default behaviour stays the same. Also marked generated images (from text)
as generated in the name for easier filtering (should not break anything).

### v0.4.3 / 2024.09.30

- fix: exit if nightMode && (autoNextStoryTransition || selectNextStoryAtEnd)
- fix #25: metadata.json "nightmode" is not extracted correctly by @lasconic and
  @jersou in #26
- feat #27: Coqui TTS and stage name cleanup by @farfromrefug

#### New Contributors

- @lasconic made their first contribution in #26
- @farfromrefug made their first contribution in #27

### v0.4.2 / 2024.03.04

- fix(extract): use child node for item name

### v0.4.1 / 2024.03.04

- fix(extract): remove unnecessary root dir in extract
- fix(extract): add metadata.json in extract #24

### v0.4.0 / 2024.03.01

- breaking: opt "--open-ai-voice" -h → -p
- feat: extract pack from zip (reverse process)

### v0.3.3 / 2024.02.25

- upgrade deno to 1.41.0 (smaller deno compile binaries)

### v0.3.2 / 2024.02.17

- feat: use LANG cache (speeds up generation on Windows)

### v0.3.1 / 2024.02.17

- feat: add openAI TTS
- refactor: use Dax, update dependencies and to deno 1.40.5, clean

### v0.2.10 / 2023.12.27

- use deno 1.39.1
- add metadata.json to overwrite story.json metadata

### v0.2.9 / 2023.07.28

- feat: add images convertion #21

### v0.2.8 / 2023.07.15

- fix(serializer): fix pack aggregation

### v0.2.7 / 2023.06.03

- feat: add "-fflags +bitexact -flags:v +bitexact -flags:a +bitexact" to ffmpeg
  command

### v0.2.6 / 2023.06.03

- feat: add "select the next story in the menu at end" option

### v0.2.5 / 2023.04.30

- fix(rss): fix (Windows) filenames

### v0.2.4 / 2023.03.08

- feat: add SPG version in help and zip releases

### v0.2.3 / 2023.03.08

- feat(serializer): use item image #20

### v0.2.2 / 2023.02.02

- fix: fix home transition #19
- feat: add `--output-folder` option

### v0.2.1 / 2023.02.01

- fix: get file image/Audio item: rm diacritic

### v0.2.0 / 2023.02.01

- feat: use item image #11
- feat: add --skip-wsl option #14
- update dep, use deno 1.30.0, deno.json, deno_std@0.158.0
- fix "only DEFLATED entries can have EXT descriptor" from Studio #10

2 new options :

```
-w, --skip-wsl                     disable WSL usage                                        [boolean] [default: false]
    --skip-rss-image-dl            skip RSS image download of items                         [boolean] [default: false]
```

### v0.1.17 / 2022.02.09

- Add seekStory parameter in convertAudioOfFolder by @GuillaumeFege in #9

```
-c, --seek-story    cut the beginning of stories: 'HH:mm:ss' format or 'N' sec  [string]
```

#### New Contributors

- @GuillaumeFege made their first contribution in #9

### v0.1.16 / 2022.02.03

- feat: add "add-delay" option
- feat: add "night-mode" option

### v0.1.12 / 2021.12.29

- fix(super pack): use useWebWorkers=false option to fix standalone bin unzip
- compatibility with .opus audio format by @JulienMaille in #5
- fix: correct settings for 'say' Mac TTS by @dmaxime in #6

#### New Contributors

- @JulienMaille made their first contribution in #5
- @dmaxime made their first contribution in #6

### v0.1.11 / 2021.12.25

- feat: add zip as menu entry, pack aggregation #1
- feat(TTS/MacOS): use 'say' cmd if there is no 'pico2wave' #3

### v0.1.10 / 2021.12.19

- fix(rss/windows): remove Windows forbidden characters \:*?<>|

### v0.1.9 / 2021.12.19

- fix(Windows): run cmd hang il await status before stderrOutput
- fix(Windows): fix getInstallDir if use from "deno run http..."

### v0.1.8 / 2021.12.18

- feat: standalone Windows version: add tools/
- feat(windows): check pico2wave by WSL
- fix(rss): fix if no image

### v0.1.7 / 2021.12.10

- feat: Windows: remove WSL usage, add & use Windows binary of ffmpeg &
  ImageMagick, use Windows TTS service

### v0.1.6 / 2021.12.08

- fix: fix SIGTRAP, use Deno v16 → v15
  ([deno issue 12885](https://github.com/denoland/deno/issues/12885))

### v0.1.5 / 2021.12.04

- fix: disable autoplay for entrypoint

### v0.1.4 / 2021.11.17

- feat: add -n /--auto-next-story-transition option

### v0.1.3 / 2021.11.17

- build(rss): update xml@v1.0.3 → xml@2.0.1
- fix(rss): remove xml-stylesheet line
- fix: use bgGreen for getFfmpegInfo info
- fix(rss): fix too long name if url contains ? like http...file.mp3?efefe...)

### v0.1.2 / 2021.11.17

- doc: add apt update && apt install -y, remove wsl2
- fix: fix convWindowsWslPath if RSS usage or relatve path
- fix(i8n): fix partQuestion && detect lang on Windows
- fix(i8n): fix detect lang on Windows

### v0.1.0 / 2021.10.04
