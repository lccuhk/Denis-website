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
