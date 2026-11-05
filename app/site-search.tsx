import { PROJECT_LIST } from "./portfolio-data";
import { buildSearchIndex } from "./site-search.mjs";
import SiteSearchClient from "./site-search-client";

/** Build a lightweight search index on the server; avoid shipping case-study data
 * and the full portfolio source object in the JavaScript bundle of every page.
 */
export default function SiteSearch() {
  return <SiteSearchClient items={buildSearchIndex(PROJECT_LIST)} />;
}
