import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { QuartzPluginData } from "./quartz/plugins/vfile"

const recentNotes = [
  Component.RecentNotes({
    title: "Recent Posts",
    limit: 4,
    linkToMore: "/posts",
    filter: (f) => f.filePath?.includes("posts") && !f.filePath?.endsWith("index.md")
  }),
  Component.RecentNotes({
    title: "Recent Fleetings",
    limit: 4,
    linkToMore: "/fleetings",
    filter: (f) => f.filePath?.includes("fleetings") && !f.filePath?.endsWith("index.md")
  }),
  Component.RecentNotes({
    title: "Recent Annotations",
    limit: 4,
    linkToMore: "/annotations",
    filter: (f) => f.filePath?.includes("annotations") && !f.filePath?.endsWith("index.md")
  })
]

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [...recentNotes.map((c) => Component.MobileOnly(c))],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
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
    ...recentNotes.map((c) => Component.MobileOnly(c))
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
    ...recentNotes.map((c) => Component.DesktopOnly(c)),
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
    ...recentNotes.map((c) => Component.DesktopOnly(c)),
  ],
  right: [],
}
