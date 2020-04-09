module.exports = {
    title: 'WEB 前端基础知识体系梳理',
    description: '进化中...',
    base: "/basicSystem/",
    themeConfig: {
      repo: 'bbzz/basicSystem',
      editLinkText: '在 GitHub 上编辑此页',
      editLinks: true,
      docsDir: 'docs',
      sidebarDepth: 1,
      displayAllHeaders: true,
      // 最后更新时间
      lastUpdated: 'Last Updated',
      sidebar: [
        '/',
        {
          title: 'Web 标准',
          collapsable: false,
          children: [
            {
              title: 'W3C 规范',
              collapsable: false,
              children: [
                '/w3c/HTML',
                '/w3c/CSS',
                '/w3c/WEB-API'
              ]
            },
            '/javaScript/grammar',
            '/javaScript/stdlib',
            '/javaScript/ES6',
          ]
        },
        {
          title: '深入理解系列',
          collapsable: false,
          children: [
            '/deepLearning/conversion',
            '/deepLearning/scope',
            '/deepLearning/prototype',
            '/deepLearning/cssModel',
            '/deepLearning/render',
            '/deepLearning/eventLoop',
            '/deepLearning/async',
            '/deepLearning/optimization',
            '/deepLearning/http',
          ]
        },
        '/interview/interview'
      ],
    }
  }