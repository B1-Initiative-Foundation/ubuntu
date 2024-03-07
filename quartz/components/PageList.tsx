import { FullSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
// Removed Date import since it's no longer needed
import { QuartzComponent, QuartzComponentProps } from "./types"
import { GlobalConfiguration } from "../cfg"

// Renamed and updated function to sort only alphabetically
export function byAlphabetical(
  cfg: GlobalConfiguration,
): (f1: QuartzPluginData, f2: QuartzPluginData) => number {
  return (f1, f2) => {
    // Sort lexicographically by title
    const f1Title = f1.frontmatter?.title.toLowerCase() ?? "";
    const f2Title = f2.frontmatter?.title.toLowerCase() ?? "";
    return f1Title.localeCompare(f2Title);
  }
}

type Props = {
  limit?: number
} & QuartzComponentProps

// Updated PageList component to use the new byAlphabetical function
export const PageList: QuartzComponent = ({ cfg, fileData, allFiles, limit }: Props) => {
  let list = allFiles.sort(byAlphabetical(cfg));
  if (limit) {
    list = list.slice(0, limit);
  }

  return (
    <ul class="section-ul">
      {list.map((page) => {
        const title = page.frontmatter?.title;
        const tags = page.frontmatter?.tags ?? [];

        return (
          <li class="section-li">
            <div class="section">
              {/* Removed the date display */}
              <div class="desc">
                <h3>
                  <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                    {title}
                  </a>
                </h3>
              </div>
              <ul class="tags">
                {tags.map((tag) => (
                  <li key={tag}> {/* Added key prop for list items */}
                    <a
                      class="internal tag-link"
                      href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                    >
                      #{tag}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

// Assuming PageList.css remains unchanged
PageList.css = `
.section h3 {
  margin: 0;
}

.section > .tags {
  margin: 0;
}
`
