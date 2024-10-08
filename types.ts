import type { RssItem } from "./generate/rss_parser.ts";
import type { CliOptions } from "./common-types.ts";

export interface CustomModule {
  fetchRssItemImage?: (item: RssItem, opt: ModOptions) => Promise<string>;
}

export type ModOptions = CliOptions & {
  customModule?: CustomModule;
  metadata?: {
    title?: string;
    description?: string;
    format?: string;
    version?: number;
    nightModeAvailable?: boolean;
    [k: string]: string | number | boolean | undefined | object;
  };
  i18n?: Record<string, string>;
};
