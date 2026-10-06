/*
 * 个人内容配置：以后更新简介、项目或联系方式时，优先从这里修改。
 * 留空的联系方式会在页面上以“待补充”显示，不会生成无效链接。
 */
window.SITE_CONTENT = {
  person: {
    name: "黎婷",
    greeting: "嗨，我是黎婷。",
    subtitle: "把想法，做成有用的小产品。",
    intro: "探索 AI，记录实践，也给生活留一点好奇心。"
  },
  character: {
    // 原始单角色图保留为 fallback；动画帧也使用相对路径，兼容 GitHub Pages。
    src: "assets/character/selected.png",
    alt: "黎婷的猫耳女生角色",
    frames: [
      { src: "assets/character/neutral-tail.png", duration: 2800 },
      { src: "assets/character/sway-wave.png", duration: 1150 },
      { src: "assets/character/neutral-tail.png", duration: 2400 },
      { src: "assets/character/wink-wave.png", duration: 850 },
      { src: "assets/character/neutral-tail.png", duration: 3200 }
    ]
  },
  projects: [
    {
      title: "AI 评论洞察助手",
      summary: "探索如何把零散的用户评论，整理成清晰的产品优化线索。",
      status: "持续完善中",
      type: "feature",
      links: []
    },
    {
      title: "下一个小实验",
      summary: "一个正在寻找问题的空白位置，等有趣的想法长出来。",
      status: "待补充",
      type: "placeholder",
      links: []
    },
    {
      title: "学习记录与灵感收集箱",
      summary: "把沿途遇到的工具、方法和小发现，慢慢整理成可回看的笔记。",
      status: "待补充",
      type: "notes",
      links: []
    }
  ],
  contact: {
    email: "",
    github: ""
  }
};
