# 贡献指南

感谢您对 **Denis-website** 个人网站项目的关注！我们欢迎任何形式的贡献，无论是提交 Bug 报告、提出功能建议，还是直接贡献代码。

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
  - [提交 Issue](#提交-issue)
  - [提交 Pull Request](#提交-pull-request)
- [代码规范](#代码规范)
- [开发环境](#开发环境)
- [贡献类型](#贡献类型)

## 行为准则

本项目遵循 [Contributor Covenant](.github/CODE_OF_CONDUCT.md) 行为准则。参与项目即表示您同意遵守其条款。

## 如何贡献

### 提交 Issue

如果您发现了 Bug 或有新功能建议，请通过 Issue 告诉我们：

1. **Bug 报告**：请包含以下信息
   - 问题描述（清晰简洁）
   - 复现步骤
   - 预期行为
   - 实际行为
   - 环境信息（操作系统、浏览器版本等）
   - 错误日志或截图（如适用）

2. **功能建议**：请包含以下信息
   - 功能描述
   - 为什么需要这个功能
   - 实现思路（可选）
   - 相关的参考资料（如适用）

### 提交 Pull Request

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

**PR 规范：**
- 标题清晰描述改动内容，使用中文或英文均可
- 详细说明改动的原因和内容
- 关联相关的 Issue（如 `Fixes #123`）
- 确保代码通过所有检查
- 更新相关文档（如 README、CHANGELOG）

## 代码规范

项目使用以下工具进行代码规范管理：

- **Prettier** - 代码格式化
- **EditorConfig** - 统一编辑器配置

**代码规范：**
- 使用 2 空格缩进
- 变量和函数使用 camelCase
- 类名使用 PascalCase
- CSS 类名使用 kebab-case
- 语义化 HTML 标签
- 注释清晰，说明复杂逻辑

**运行代码检查：**
```bash
# 格式化代码
npx prettier --write .

# 检查格式
npx prettier --check .
```

## 代码风格指南

### Git 提交规范

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**提交类型（type）：**
- `feat` - 新功能、新页面
- `fix` - Bug 修复
- `docs` - 文档更新
- `style` - 代码格式（不影响代码运行）
- `refactor` - 重构（既不是新增功能，也不是修改 bug）
- `perf` - 性能优化
- `test` - 增加测试
- `chore` - 构建过程或辅助工具的变动
- `ci` - CI/CD 配置变更
- `revert` - 回退提交

**示例：**
```
feat(about): add skills section with animation

- Add skills showcase section
- Implement progress bar animations
- Add responsive layout for mobile
- Update README with new feature

Closes #123
```

**提交规范：**
- 标题不超过 72 个字符
- 使用中文或英文均可，但要保持一致
- 标题使用祈使句（"添加" 而不是 "添加了"）
- 正文详细说明改动的原因和内容
- 关联相关 Issue（如 `Closes #123`、`Fixes #456`）

### 命名约定

#### JavaScript
```javascript
// 变量/函数 - camelCase
const userName = 'Denis'
let currentSection = 'home'

function scrollToSection(sectionId) {
  // ...
}

// 常量 - UPPER_SNAKE_CASE
const NAV_ITEMS = ['home', 'about', 'projects', 'contact']
const ANIMATION_DURATION = 300
const BREAKPOINT_MOBILE = 768

// 类名 - PascalCase
class TypeWriter {
  constructor(element, options) {
    this.element = element
  }
}
```

#### HTML/CSS
```html
<!-- 类名 - kebab-case，语义化命名 -->
<header class="site-header">
  <nav class="main-nav">
    <ul class="nav-list">
      <li class="nav-item"><a href="#home">首页</a></li>
    </ul>
  </nav>
</header>

<main class="main-content">
  <section class="hero-section">
    <h1 class="hero-title">...</h1>
  </section>
</main>

<footer class="site-footer">
  <div class="footer-content">...</div>
</footer>
```

```css
/* BEM 命名规范 */
.site-header { }                /* Block */
.site-header__logo { }          /* Element */
.site-header--sticky { }        /* Modifier */

/* 状态类 */
.is-active { }
.is-visible { }
.is-hidden { }
.is-loading { }

/* 工具类 */
.text-center { }
.container { }
.flex { }
```

#### 文件命名
```
# HTML 页面 - kebab-case
index.html
about.html
projects.html

# 样式文件 - kebab-case
main.css
hero-section.css
responsive.css

# 脚本文件 - camelCase
main.js
typeWriter.js
scrollAnimation.js

# 图片资源 - kebab-case
profile-photo.jpg
project-thumbnail.svg
icon-github.png
```

### 注释规范

#### JavaScript 注释
```javascript
/**
 * 打字机效果类
 * @param {HTMLElement} element - 目标元素
 * @param {Object} options - 配置选项
 * @param {number} options.speed - 打字速度（毫秒）
 * @param {string[]} options.texts - 要显示的文本数组
 * @example
 * const tw = new TypeWriter(element, { speed: 100, texts: ['Hello', 'World'] })
 * tw.start()
 */
class TypeWriter {
  constructor(element, options) {
    // ...
  }
}

// ✅ 好的注释 - 解释为什么这样做
// 使用 requestAnimationFrame 实现平滑滚动，避免 setInterval 的抖动
function smoothScrollTo(targetY) {
  // ...
}

// ✅ 好的注释 - 解释浏览器兼容性
// 使用 IntersectionObserver 实现滚动动画，降级到 scroll 事件监听
if ('IntersectionObserver' in window) {
  // 现代浏览器
} else {
  // 降级方案
}

// ❌ 不好的注释 - 重复代码内容
// 定义变量
let count = 0
```

#### HTML 注释
```html
<!-- ✅ 好的注释 - 说明区块用途 -->
<!-- 页面头部导航 -->
<header class="site-header">...</header>

<!-- 主要内容区域 -->
<main class="main-content">...</main>

<!-- 页脚 -->
<footer class="site-footer">...</footer>
```

### 性能优化规范

```javascript
// ✅ 缓存 DOM 查询
const header = document.querySelector('.site-header')
const navItems = document.querySelectorAll('.nav-item')

// ✅ 使用事件委托
document.querySelector('.nav-list').addEventListener('click', (e) => {
  if (e.target.matches('.nav-item a')) {
    // 处理点击
  }
})

// ✅ 防抖函数
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// ✅ 使用 CSS 动画代替 JS 动画
.element {
  transition: transform 0.3s ease;
}
.element:hover {
  transform: translateY(-5px);
}
```

### 可访问性规范

```html
<!-- ✅ 语义化 HTML -->
<header>
  <nav aria-label="主导航">
    <ul role="menubar">
      <li role="menuitem"><a href="#home">首页</a></li>
    </ul>
  </nav>
</header>

<main>
  <section aria-labelledby="about-title">
    <h2 id="about-title">关于我</h2>
  </section>
</main>

<!-- ✅ 图片 alt 文本 -->
<img src="profile.jpg" alt="Denis 的个人照片" />

<!-- ✅ 按钮有明确的文本或 aria-label -->
<button aria-label="关闭菜单" class="menu-toggle">
  <span class="icon"></span>
</button>
```

## 开发环境

本项目是纯前端项目，无需复杂的开发环境：

1. **克隆仓库**
   ```bash
   git clone https://github.com/lccuhk/Denis-website.git
   cd Denis-website
   ```

2. **启动本地服务器（可选）**
   ```bash
   # 使用 Python
   python3 -m http.server 8000
   
   # 或使用 Node.js
   npx serve .
   ```

3. **在浏览器中访问**
   ```
   http://localhost:8000
   ```

4. **开始开发**
   - 修改 HTML、CSS、JavaScript 文件
   - 刷新浏览器查看效果
   - 确保在主流浏览器（Chrome、Firefox、Safari）中正常运行

## 贡献类型

我们欢迎各种类型的贡献：

### 🐛 Bug 修复
- 修复页面布局问题
- 修复 JavaScript 交互错误
- 修复响应式设计问题
- 修复浏览器兼容性问题
- 修复链接错误

### ✨ 新功能
- 添加新的页面或章节
- 添加动画效果
- 添加交互功能
- 添加新的主题或配色方案
- 添加多语言支持
- 添加博客功能
- 添加项目展示模块

### 📚 文档
- 改进 README 文档
- 添加使用教程
- 补充代码注释
- 翻译文档
- 添加部署指南

### 🎨 设计
- 改进 UI/UX 设计
- 优化配色方案
- 添加新的图标或图片
- 优化动画效果
- 改进响应式设计

### 🌐 内容
- 更新个人信息
- 添加新的项目展示
- 更新博客文章
- 翻译页面内容

### 🚀 性能优化
- 优化图片加载
- 压缩 CSS/JavaScript
- 改进页面加载速度
- 优化动画性能

## 问题？

如果您在贡献过程中遇到任何问题，欢迎通过以下方式联系我们：

- 提交 [Issue](https://github.com/lccuhk/Denis-website/issues)
- 查看 [README.md](README.md) 了解更多项目信息
- 查看 [CHANGELOG.md](CHANGELOG.md) 了解版本历史

再次感谢您的贡献！🎉
