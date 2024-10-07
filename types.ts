import type { RssItem } from "./generate/rss_parser.ts";
import type { CliOptions } from "./common-types.ts";

export interface CustomModule {
  fetchRssItemImage?: (item: RssItem, opt: ModOptions) => Promise<string>;
}

export type ModOptions = CliOptions & {
  customModule?: CustomModule;
  i18n?: Record<string, string>;
};
