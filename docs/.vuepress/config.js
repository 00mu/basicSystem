module.exports = {
  title: "WEB 前端基础体系梳理",
  description: "进化中...",
  base: "/basicSystem/",
  themeConfig: {
    repo: "bbzz/basicSystem",
    editLinkText: "在 GitHub 上编辑此页",
    editLinks: true,
    docsDir: "docs",
    // sidebarDepth: 0,
    displayAllHeaders: true,
    // 最后更新时间
    lastUpdated: "Last Updated",
    algolia: {
      apiKey: "15e19f41ccec97797a1834e9e1b94d1f",
      indexName: "bbzz_basicsystem",
    },
    sidebar: [
      "/",
      {
        title: "面试点梳理",
        collapsable: false,
        sidebarDepth: 4,
        children: [
          "/interview/JS",
          "/interview/Vue",
          "/interview/React",
          "/interview/Http",
          "/interview/Html",
          "/interview/CSS",
          "/interview/Webpack",
          // "/interview/project",
          // "/interview/coding",
        ],
      },
      {
        title: "深入浅出系列",
        collapsable: false,
        children: [
          "/deepLearning/conversion",
          "/deepLearning/scope",
          "/deepLearning/prototype",
          "/deepLearning/this",
          "/deepLearning/eventLoop",
          "/deepLearning/render",
          "/deepLearning/http",
          "/deepLearning/async",
          "/deepLearning/cssModel",
          "/deepLearning/optimization",
        ],
      },
      {
        title: "手册",
        collapsable: true,
        children: [
          {
            title: "W3C 规范",
            collapsable: false,
            children: ["/w3c/HTML", "/w3c/CSS", "/w3c/WEB-API"],
          },
          "/javaScript/grammar",
          "/javaScript/stdlib",
          "/javaScript/ES6",
        ],
      },
    ],
  },
};
