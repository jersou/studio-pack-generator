### v0.2.4 / xxxx.xx.xx

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

- Add seekStory parameter in convertAudioOfFolder by @GuillaumeFege in
  https://github.com/jersou/studio-pack-generator/pull/9

```
-c, --seek-story    cut the beginning of stories: 'HH:mm:ss' format or 'N' sec  [string]
```

#### New Contributors

- @GuillaumeFege made their first contribution in
  https://github.com/jersou/studio-pack-generator/pull/9

### v0.1.16 / 2022.02.03

- feat: add "add-delay" option
- feat: add "night-mode" option

### v0.1.12 / 2021.12.29

- fix(super pack): use useWebWorkers=false option to fix standalone bin unzip
- compatibility with .opus audio format by @JulienMaille in
  https://github.com/jersou/studio-pack-generator/pull/5
- fix: correct settings for 'say' Mac TTS by @dmaxime in
  https://github.com/jersou/studio-pack-generator/pull/6

#### New Contributors

- @JulienMaille made their first contribution in
  https://github.com/jersou/studio-pack-generator/pull/5
- @dmaxime made their first contribution in
  https://github.com/jersou/studio-pack-generator/pull/6

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
