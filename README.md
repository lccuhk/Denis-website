# ⚔️ 侠客江湖 - 个人网站

<p align="center">
  <img src="https://img.shields.io/github/stars/lccuhk/Denis-website?style=for-the-badge&color=00D9FF" />
  <img src="https://img.shields.io/github/forks/lccuhk/Denis-website?style=for-the-badge&color=00FF88" />
  <img src="https://img.shields.io/github/issues/lccuhk/Denis-website?style=for-the-badge&color=FF6B6B" />
  <img src="https://img.shields.io/github/license/lccuhk/Denis-website?style=for-the-badge&color=FFD93D" />
  <img src="https://img.shields.io/github/last-commit/lccuhk/Denis-website?style=for-the-badge&color=9B59B6" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/🎨_主题-4种-purple?style=for-the-badge" />
</p>

<p align="center">
  <a href="https://lccuhk.github.io/Denis-website/">
    <img src="https://img.shields.io/badge/🚀_在线访问-GitHub_Pages-00D9FF?style=for-the-badge" />
  </a>
</p>

一个具有侠客风格的个人主页网站，展示你的 GitHub 项目和个人信息，支持多个主题切换！

## ✨ 网站特色

- 🎨 **侠客主题系统**：四种精美主题 - 墨韵黑、侠义红、江湖蓝、侠客浅
- 📱 **响应式设计**：完美适配各种屏幕尺寸
- 📊 **GitHub 项目集成**：自动展示你的 GitHub 仓库
- 🎯 **动态主题加载**：基于 JSON 配置文件，方便添加新主题
- 💾 **主题记忆功能**：自动保存你的主题选择
- 🎭 **精美的 UI 动画**：侠客风格的视觉设计

## 🎨 主题预览

| 主题名称 | 颜色风格 |
|---------|---------|
| ⚫ 墨韵黑 | 金色 + 深色背景 |
| 🔴 侠义红 | 红色 + 深色背景 |
| 🔵 江湖蓝 | 蓝色 + 深色背景 |
| ⚪ 侠客浅 | 棕色 + 浅色背景 |

## 🚀 快速开始

### 方法一：直接打开（最简单）

1. 双击 `index.html` 文件
2. 用浏览器打开即可查看

### 方法二：本地服务器运行（推荐）

```bash
# 进入项目目录
cd Denis-website

# 启动本地服务器（Python 3）
python3 -m http.server 8000
```

然后在浏览器中访问：`http://localhost:8000/index.html`

### 方法三：GitHub Pages

1. 开启仓库的 GitHub Pages 功能
2. 访问：`https://<your-username>.github.io/Denis-website/index.html`

## 📁 项目结构

```
Denis-website/
├── index.html              # 主页
├── about.html              # 关于我
├── projects.html           # 项目展示
├── themes.json             # 主题配置文件
├── theme-manager.js        # 主题管理器
├── README.md               # 项目说明文档
└── hero-website/           # 备份目录
    ├── index.html
    ├── about.html
    ├── projects.html
    ├── themes.json
    └── theme-manager.js
```

## 🎯 使用说明

### 主题切换

1. 点击右下角的 🎨 图标打开主题面板
2. 选择你喜欢的侠客主题
3. 主题选择会自动保存到浏览器本地存储

### 添加新主题

在 `themes.json` 文件中添加新主题配置：

```json
{
  "id": "your-theme-id",
  "name": "主题名称",
  "emoji": "🎭",
  "colors": {
    "primary": "#颜色代码",
    "primaryDark": "#颜色代码",
    "primaryLight": "#颜色代码",
    "bgPrimary": "#颜色代码",
    "bgSecondary": "#颜色代码",
    "bgTertiary": "#颜色代码",
    "textPrimary": "#颜色代码",
    "textSecondary": "#颜色代码",
    "textMuted": "#颜色代码",
    "borderColor": "rgba()",
    "bgOverlay": "rgba()",
    "bgCard": "rgba()",
    "bgNav": "linear-gradient()",
    "bgFooter": "rgba()",
    "bgPattern": "url()"
  }
}
```

同时在 `theme-manager.js` 的 `getEmbeddedThemes()` 方法中也添加相同配置作为备份。

## 🛠️ 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画效果
- **JavaScript (ES6+)** - 交互逻辑
- **GitHub API** - 获取项目数据

## 📝 页面介绍

### 主页 (index.html)

- 个人简介
- 技能展示
- 快速导航

### 关于我 (about.html)

- 详细的个人信息
- 教育背景
- 工作经历

### 项目展示 (projects.html)

- 集成 GitHub API，自动拉取项目
- 项目卡片展示
- 项目分类筛选

## 🎮 浏览器兼容性

| 浏览器 | 最低版本 | 推荐版本 |
|--------|----------|----------|
| Chrome | 70+ | 最新版 |
| Firefox | 65+ | 最新版 |
| Safari | 13+ | 最新版 |
| Edge | 79+ | 最新版 |

## 📋 常用命令

```bash
# 启动本地服务器
python3 -m http.server 8000

# 查看 git 状态
git status

# 添加所有修改
git add .

# 提交修改
git commit -m "描述你的修改"

# 推送到远程仓库
git push
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT License
