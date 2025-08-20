---
title: Dynamic Rendering as a workaround | Google Search Central | Documentation
description: 
draft: false
tags:
  - annotation
aliases: 
permalink: 
date: 2025-08-17
---
[Source](https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering) 
# Dynamic rendering as a workaround
---
**p.** "On some websites, JavaScript loads additional content when the page is open in a browser. This is called [client-side rendering](https://web.dev/articles/rendering-on-the-web#client-side)."

**p.** "there are some [limitations for JavaScript in Google Search](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics#write-compatible-code) and some pages may encounter problems with content not showing up in the rendered HTML."

**p.** "Dynamic rendering is a workaround for websites where JavaScript-generated content is not available to search engines."



> [!QUOTE] 검색 엔진 등 봇에게는 서버에 의해 Javascript가 실행된 버전의 렌더링된 HTML을, 실제 사용자에게는 일반 페이지를 보여준다.

 
## Sites that might use dynamic rendering
---


> [!QUOTE] Dynamic Rendering was a workaround for indexable / public JavaScript-generated content that changes rapidly, or content that uses [JavaScript features that aren't supported by the crawlers](https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript) you care about

**p.** "Not all sites need to use dynamic rendering, and there are better solutions than dynamic rendering as explained in an [overview of rendering on the web](https://web.dev/articles/rendering-on-the-web)."

 
## Understand how dynamic rendering works
---
**p.** "Dynamic rendering requires your web server to detect crawlers (for example, by checking the user agent)"

**p.** "When your web server identifies a request from a crawler that does not support JavaScript or the JavaScript features required to render your content, this request is routed to a rendering server."

**p.** "The rendering server responds to requests with a version of the content that&#39;s suitable to the crawler, for example, it may serve a static HTML version."

 
## Dynamic rendering is not cloaking
---
**p.** "Googlebot generally doesn&#39;t consider dynamic rendering as [cloaking](https://developers.google.com/search/docs/essentials/spam-policies#cloaking)."


