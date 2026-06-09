---
title: 学生党效率提升指南
date: 2025-04-20
category: 兵器谱
tags: [工具, 效率, 学生, VS Code, Git]
excerpt: 聊聊我作为学生党，日常学习和写代码用到的那些神兵利器，用好这些工具，让你效率翻倍，早点写完作业早点玩。
---

# 学生党效率提升指南

> 工欲善其事，必先利其器。这句话，学生党也应该刻在显示器上。

## 先讲个故事

刚上大学的时候，我觉得写代码全靠手速，学习全靠熬夜。

直到我看到我的室友——

他不用鼠标，双手在键盘上飞舞，几秒钟就完成了我要花几分钟的操作。
他考试周一天能复习三门课，还能抽出时间打游戏。

"你这是怎么做到的？"我一脸崇拜。

"工具用得好，效率自然高。"他淡淡地说。

从那以后，我就走上了"收集工具"的不归路。

今天就跟大家聊聊，我作为学生党，日常学习和写代码用到的那些神兵利器。

用好这些工具，效率翻倍不是梦，早点写完作业早点玩。

哦对了，我也是个学生，写的都是自己日常用的，不是什么大佬经验。

## 编辑器：VS Code 天下第一

别争了，VS Code 就是最好用的编辑器，不接受反驳。

但是，光装个 VS Code 没用，你得会配置。

### 必装插件

#### 1. GitLens
```
Name: GitLens
Id: eamodio.gitlens
```

谁用谁知道。

- 每行代码都能看到是谁写的，什么时候写的
- 鼠标悬停就能看到 commit 信息
- 代码 blame 一目了然

做小组作业的时候，谁写的 Bug 一目了然。再也不用"这段谁写的？站出来！"

#### 2. GitHub Copilot
```
Name: GitHub Copilot
Id: GitHub.copilot
```

AI 写代码，真的香。学生可以免费申请！

不是说让它帮你写整个作业，而是：
- 写注释，它帮你补代码
- 写个函数名，它帮你补实现
- 重复代码，它帮你生成

当然，它写的代码你得自己看，Bug 还是要自己改的。作业还是要自己写的，别直接抄。

但是，至少能帮你省 30% 的时间。

#### 3. Prettier + ESLint
```
Name: Prettier
Id: esbenp.prettier-vscode

Name: ESLint
Id: dbaeumer.vscode-eslint
```

保存自动格式化，再也不用跟同学争论"这个括号该不该换行"。

代码风格统一，心情都好了。小组作业的时候特别有用。

#### 4. Path Intellisense
```
Name: Path Intellisense
Id: christian-kohler.path-intellisense
```

写路径的时候自动补全，再也不用"这个文件到底在哪个目录来着？"

#### 5. REST Client
```
Name: REST Client
Id: humao.rest-client
```

不用开 Postman 了，直接在 VS Code 里发请求。

```http
GET https://api.example.com/users/1
Content-Type: application/json

###

POST https://api.example.com/users
Content-Type: application/json

{
  "name": "Denis",
  "email": "denis@example.com"
}
```

写测试用例、调试接口，方便得很。做后端作业的时候特别有用。

#### 6. Code Spell Checker
```
Name: Code Spell Checker
Id: streetsidesoftware.code-spell-checker
```

检查拼写错误，再也不会把 `user` 写成 `usr`，把 `password` 写成 `passowrd`。

写英语论文的时候也能用。

#### 7. Error Lens
```
Name: Error Lens
Id: usernamehw.errorlens
```

错误直接显示在代码行后面，不用再把鼠标移到波浪线上看了。

### 必改配置

打开 settings.json，加上这些：

```json
{
  // 保存自动格式化
  "editor.formatOnSave": true,
  
  // 显示行号
  "editor.lineNumbers": "on",
  
  // 显示空格
  "editor.renderWhitespace": "all",
  
  // 显示缩进参考线
  "editor.guides.indentation": true,
  
  // 括号配对高亮
  "editor.guides.bracketPairs": true,
  
  // 自动保存
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  
  // 字体
  "editor.fontFamily": "JetBrains Mono, Menlo, Monaco, 'Courier New', monospace",
  "editor.fontSize": 14,
  "editor.fontLigatures": true,
  
  // 主题（我用的是 One Dark Pro）
  "workbench.colorTheme": "One Dark Pro",
  
  // 图标主题
  "workbench.iconTheme": "vscode-icons"
}
```

### 必记快捷键

别用鼠标了，真的慢。

| 快捷键 | 功能 |
|--------|------|
| `Cmd + P` | 快速打开文件 |
| `Cmd + Shift + P` | 打开命令面板 |
| `Cmd + D` | 选中下一个相同的词 |
| `Cmd + Shift + L` | 选中所有相同的词 |
| `Option + Shift + 下/上` | 复制当前行到下/上 |
| `Cmd + /` | 注释/取消注释 |
| `Cmd + B` | 显示/隐藏侧边栏 |
| `Ctrl + `` | 打开/关闭终端 |
| `Cmd + Shift + F` | 全局搜索 |
| `Cmd + Shift + H` | 全局替换 |

这些快捷键，记下来，每天用，一周就熟练了。写代码速度直接翻倍。

## 笔记工具：Notion 是真的香

上课记笔记、复习、写作业、做项目管理，我都用 Notion。

别用 Word 了，别用记事本了，Notion 香多了。

### 我用 Notion 做什么

1. **课程笔记**：每门课一个页面，上课记笔记，复习的时候看
2. **作业管理**：记录所有作业的 deadline，避免忘记交
3. **项目管理**：做小组作业的时候，用 Notion 分配任务、跟踪进度
4. **学习计划**：考试周复习计划，每天学什么，学了多久
5. **读书笔记**：看技术书的时候，把重点记下来

### 几个好用的功能

- **模板**：Notion 有很多现成的模板，直接用就行
- **数据库**：可以建表格，管理作业、项目、书单什么的
- **嵌入**：可以嵌入 YouTube 视频、PDF、代码块什么的
- **协作**：小组作业的时候，可以多人一起编辑

学生可以免费升级 Notion Pro，别问我怎么知道的。

## 浏览器：Chrome 插件也很重要

### 1. Octotree
GitHub 代码树，看代码不用一个个点开。看别人的开源项目的时候特别有用。

### 2. GitHub Dark Mode
GitHub 深色模式，保护眼睛。熬夜写代码的时候必备。

### 3. JSON Viewer
JSON 自动格式化，不用再复制到编辑器里格式化了。调接口的时候特别有用。

### 4. AdGuard
去广告，清爽。看视频、逛论坛的时候不用看广告了。

### 5. Vimium
用键盘操作浏览器，不用鼠标。

- `f`：显示链接快捷键，按对应字母打开
- `j/k`：上下滚动
- `gg/G`：到顶部/底部
- `x`：关闭当前标签页
- `X`：恢复关闭的标签页

摸鱼的时候特别好用，老师来了一键关页面。

### 6. 沙拉查词
划词翻译，看英文文档、英文论文的时候特别有用。不用再打开翻译软件了。

## 其他神器

### 1. Alfred
Mac 效率神器，Spotlight 的替代品。

- 快速启动应用
- 快速搜索文件
- 快速计算
- 快速翻译
- 自定义工作流

学生可以用免费版，足够用了。

### 2. Dash
API 文档离线查看，不用联网查文档。写代码的时候查 API 特别快。

学生有教育优惠。

### 3. Figma
UI 设计，跟设计师协作必备。做前端作业的时候，先在 Figma 上画个原型，再写代码，效率高多了。

### 4. Postman
接口调试，虽然 VS Code 有 REST Client，但 Postman 还是更强大。做后端作业的时候必备。

### 5. Docker
不用多说了，开发必备。配环境的时候特别方便，不用在自己电脑上装一堆软件。

### 6. Notion AI
Notion 的 AI 功能，可以帮你写笔记、总结文章、翻译什么的。写作业的时候可以用来当助手，但别直接抄。

### 7. Grammarly
英语语法检查，写英语论文、发邮件的时候特别有用。学生可以免费升级高级版。

## 学习方法也很重要

工具是辅助，学习方法更重要。

### 1. 番茄工作法
25 分钟专注学习，5 分钟休息。
别学一会儿就刷手机，效率特别低。

我用的是一个叫 `Be Focused` 的 App，Mac 上的，挺好用。

### 2. 费曼学习法
学完一个东西，试着用自己的话讲给别人听。
讲不明白，说明你还没懂。

我经常把学到的东西写成博客，或者讲给室友听。

### 3. 主动回忆
别一遍一遍地看笔记，没用。
看完一遍，合上书，试着回忆讲了什么。
回忆不起来的，再回去看。

考试周复习的时候特别有用。

### 4. 间隔重复
学完的东西，定期复习。
第一天学的，第二天复习一次，一周后复习一次，一个月后复习一次。
这样记得牢。

我用 Anki 来做间隔重复，背单词、背知识点都可以。

## 最后：别沉迷工具

工具是用来提升效率的，不是用来收集的。

我见过很多人，装了一堆插件，配置了一堆快捷键，结果代码写得稀烂，考试还挂科。

记住：

- 工具是辅助，核心还是你的学习能力
- 别花太多时间折腾工具，够用就行
- 适合自己的才是最好的

但是，该用的工具还是要用。

毕竟，早点写完作业，打打游戏，陪陪女朋友，不好吗？

哦对了，别忘了锻炼身体。久坐容易出问题，每小时起来活动 5 分钟。

好了，不说了，还有个大作业要写，deadline 就在明天。

---
*写于某个准点写完作业的下午*
