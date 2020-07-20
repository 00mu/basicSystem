module.exports = {
  title: "WEB 前端基础体系梳理",
  description: "进化中...",
  base: "/basicSystem/",
  themeConfig: {
    repo: "bbzz/basicSystem",
    editLinkText: "在 GitHub 上编辑此页",
    editLinks: true,
    docsDir: "docs",
    sidebarDepth: 3,
    // 最后更新时间
    lastUpdated: "Last Updated",
    algolia: {
      apiKey: "15e19f41ccec97797a1834e9e1b94d1f",
      indexName: "bbzz_basicsystem",
    },
    nav: [
      {
        text: "手稿",
        items: [
          {
            text: "基础语法",
            items: [
              { text: "JavaScript", link: "/JavaScript/" },
              { text: "HTML", link: "/basic/HTML/" },
              { text: "CSS", link: "/basic/CSS/" },
            ],
          },
          {
            text: "MVVM",
            items: [
              { text: "VUE", link: "/mvvm/VUE/" },
              { text: "React", link: "/mvvm/React/" },
              { text: "Electron", link: "/mvvm/Electron/" },
            ],
          },
          {
            text: "前端工程",
            items: [{ text: "webpack", link: "/webpack/" }],
          },
        ],
      },
      { text: "专题", link: "/deepLearning/" },
      { text: "Coding", link: "/coding/" },
      { text: "考点", link: "/interview/" },
      {
        text: "工具",
        items: [
          {
            text: "编辑器",
            items: [
              { text: "GIT", link: "/soft/git" },
              { text: "VSCODE", link: "/soft/vscode/" },
            ],
          },
          {
            text: "效率工具",
            items: [{ text: "figma", link: "figma.com" }],
          },
        ],
      },
    ],
    sidebar: {
      // Coding
      "/coding/": ["", "codingFn"],

      // 专题
      "/deepLearning/": [
        "",
        "conversion",
        "scope",
        "prototype",
        "this",
        "eventLoop",
        "render",
        "http",
        "async",
        "cssModel",
        "optimization",
      ],

      // 面试考点
      "/interview/": [
        "",
        "Http",
        "performance",
        "webpack",
        // "HTML",
        "CSS",
        "JS",
        "vue",
      ],

      "/mvvm/": [],

      "/javaScript/": ["", "grammar", "stdlib", "webApi", "ES6"],
      "/html/": [""],
      "/css/": [""],

      // 开发工具
      "/soft/": ["git", "vscode"],

      // 基础手册
      "/": ["", "/coding/", "/deepLearning/"],
    },
  },
};
