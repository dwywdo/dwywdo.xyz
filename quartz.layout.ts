import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { QuartzPluginData } from "./quartz/plugins/vfile"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

let postFilter = function(f: QuartzPluginData): boolean {
  return f.filePath?.includes("posts") && !f.filePath?.endsWith("index.md") 
}


let fleetingFilter = function(f: QuartzPluginData): boolean {
  return f.filePath?.includes("fleetings") && !f.filePath?.endsWith("index.md") 
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: 'dwywdo/blog.dwywdo.dev',
        // from data-repo-id
        repoId: 'R_kgDOPJjWjw',
        // from data-category
        category: 'Announcements',
        // from data-category-id
        categoryId: 'DIC_kwDOPJjWj84Cstsh',
        // from data-lang
        lang: 'en'
      }
    }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.RecentNotes({ title: "Recent Posts", limit: 4, linkToMore: "/posts", filter: postFilter}),
    Component.RecentNotes({ title: "Recent Fleetings", limit: 4, linkToMore: "/fleetings", filter: fleetingFilter}),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.RecentNotes({ title: "Recent Posts", limit: 4, linkToMore: "/posts", filter: postFilter}),
    Component.RecentNotes({ title: "Recent Fleetings", limit: 4, linkToMore: "/fleetings", filter: fleetingFilter}),
  ],
  right: [],
}
