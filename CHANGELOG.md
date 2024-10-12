## [0.5.10](https://github.com/jersou/studio-pack-generator/compare/v0.5.9...v0.5.10) (2024-10-12)

### Features

- customScript fetchRssItemTitle
  ([abc6a62](https://github.com/jersou/studio-pack-generator/commit/abc6a62e8ac97a3c1ffa8ea38d7e6ebbd023efca))
- rssEpisodeNumbers: add RSS episode number to stages
  ([cd5b112](https://github.com/jersou/studio-pack-generator/commit/cd5b1126261ea3badfac66f8b666d6c836183170))
- upgrade to deno 2.0.0

### Bug Fixes

- add podcast metadata to generated story.json
  ([6bd7d48](https://github.com/jersou/studio-pack-generator/commit/6bd7d489263a27513cc9792b9b86593451b2921e))
- catch duration & websocket errors
  ([a7d2db2](https://github.com/jersou/studio-pack-generator/commit/a7d2db254e5b0a1f2ce918b1303e0cdd290292f6))
- extra metadata was not added correctly to story.json
  ([3a26e08](https://github.com/jersou/studio-pack-generator/commit/3a26e08e132735bb4ff6f2cddc6a1250212658f8))

## [0.5.9](https://github.com/jersou/studio-pack-generator/compare/v0.5.7...v0.5.9) (2024-10-07)

### Features

- cache generated TTS file
  ([4c669a8](https://github.com/jersou/studio-pack-generator/commit/4c669a8abe632f9b53ee4842edff05e5a36a0c05))
- story.json export now uses metadata title instead of filename. Ensures all
  characters are there. Also added audio duration (for players needing story
  duration)
  ([0919273](https://github.com/jersou/studio-pack-generator/commit/091927305dc1a5b72b3f0efb1b3eb0e30191d794))
- update GUI with cache options
  ([40750bc](https://github.com/jersou/studio-pack-generator/commit/40750bc305d767c403fa0d6b8ca87a0b35db91d1))
- you can now customize i18n from command line / config
  ([a04ddda](https://github.com/jersou/studio-pack-generator/commit/a04ddda533750aeda57de11c960aae7e8ebd96ed))

### Bug Fixes

- all generateImage to have custom arguments
  ([f7cc943](https://github.com/jersou/studio-pack-generator/commit/f7cc943de5125c59a87d0de4d565b4afd69057d4))
- basic custom module support. For now only for image query
  ([92ac916](https://github.com/jersou/studio-pack-generator/commit/92ac916cfc7b981839ac86c75cd94f2fe726aba3))
- better handling of rss image
  ([8fc4d7f](https://github.com/jersou/studio-pack-generator/commit/8fc4d7f25e2070e2e3a0c9c4c72a936771db3b70))
- fix for when using `skipImageConvert`
  ([b4f0134](https://github.com/jersou/studio-pack-generator/commit/b4f0134efc1f5aaa6cfce4443a38bd58384e32e3))
- fix tests
  ([d9ca768](https://github.com/jersou/studio-pack-generator/commit/d9ca76872750b97a1dcabbef800e0dc382151c9e))
- if there is a itunes:subtitle use that as item title
  ([b109177](https://github.com/jersou/studio-pack-generator/commit/b109177d82d54658ab04a83fe608ac62fa4a7107))
- regression fix for generated images names (would trigger tts again and again)
  ([3a3dbbb](https://github.com/jersou/studio-pack-generator/commit/3a3dbbb97ae473eb4b5440aa4d8fb86a810959fa))
- remove i18n from cli, but keep in the config file
  ([48e4861](https://github.com/jersou/studio-pack-generator/commit/48e48614739c61b301f8650e9e465e85bc552cac))
- store rss items metadata and use that to get the text to tts. this ensure we
  dont rely on file name for tts which will help tts with caracters which would
  have been removed from file name
  ([b3312a1](https://github.com/jersou/studio-pack-generator/commit/b3312a116f53eabe6ccab28165231c66ec86cf4c))
- use ttsCachePath
  ([041d209](https://github.com/jersou/studio-pack-generator/commit/041d2099c32a18a67803641c93f1ba445f658f14))
- deno publish
  ([066b18c](https://github.com/jersou/studio-pack-generator/commit/066b18cf4b140df8cb00b473fec6cdf414248171))

## [0.5.7](https://github.com/jersou/studio-pack-generator/compare/v0.5.6...v0.5.7) (2024-10-06)

### Bug Fixes

- coqui error on windows
  ([2421902](https://github.com/jersou/studio-pack-generator/commit/242190256f9e12716cef06cfff7e184628c0f8b6))
- **GUI:** the GUI config is not used by the backend
  ([9a41b26](https://github.com/jersou/studio-pack-generator/commit/9a41b267b51645007197fd2c6a26e1d41611fa82))

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

- fix(rss/windows): remove Windows forbidden characters \:\*?<>|

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
