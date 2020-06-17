module.exports = {
  title: "WEB 前端基础体系梳理",
  description: "进化中...",
  base: "/basicSystem/",
  themeConfig: {
    repo: "bbzz/basicSystem",
    editLinkText: "在 GitHub 上编辑此页",
    editLinks: true,
    docsDir: "docs",
    sidebarDepth: 2,
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
        children: [
          "/interview/JS",
          "/interview/Vue",
          "/interview/React",
          "/interview/Webpack",
          "/interview/Http",
          "/interview/DesignPatterns",

          "/interview/Html",
          "/interview/CSS",
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
            children: [],
          },
          "/javaScript/grammar",
          "/javaScript/stdlib",
          "/javaScript/ES6",
        ],
      },
    ],
  },
};
