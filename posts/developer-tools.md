---
title: 程序员效率提升指南
date: 2025-04-20
category: 兵器谱
tags: [工具, 效率, VS Code, Git]
excerpt: 聊聊我日常开发中用到的那些神兵利器，用好这些工具，让你效率翻倍，早点下班。
---

# 程序员效率提升指南

> 工欲善其事，必先利其器。这句话，程序员应该刻在显示器上。

## 先讲个故事

刚工作的时候，我觉得写代码全靠手速。

直到我看到我的导师——

他不用鼠标，双手在键盘上飞舞，几秒钟就完成了我要花几分钟的操作。

"你这是怎么做到的？"我一脸崇拜。

"快捷键。"他淡淡地说。

从那以后，我就走上了"收集工具"的不归路。

今天就跟大家聊聊，我日常开发中用到的那些神兵利器。

用好这些工具，效率翻倍不是梦，早点下班不是梦。

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

再也不用"这段谁写的？站出来！"

#### 2. GitHub Copilot
```
Name: GitHub Copilot
Id: GitHub.copilot
```

AI 写代码，真的香。

不是说让它帮你写整个项目，而是：
- 写注释，它帮你补代码
- 写个函数名，它帮你补实现
- 重复代码，它帮你生成

当然，它写的代码你得自己看，Bug 还是要自己改的。

但是，至少能帮你省 30% 的时间。

#### 3. Prettier + ESLint
```
Name: Prettier
Id: esbenp.prettier-vscode

Name: ESLint
Id: dbaeumer.vscode-eslint
```

保存自动格式化，再也不用跟同事争论"这个括号该不该换行"。

代码风格统一，心情都好了。

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

写测试用例、调试接口，方便得很。

#### 6. Code Spell Checker
```
Name: Code Spell Checker
Id: streetsidesoftware.code-spell-checker
```

检查拼写错误，再也不会把 `user` 写成 `usr`，把 `password` 写成 `passowrd`。

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

这些快捷键，记下来，每天用，一周就熟练了。

## 终端：iTerm2 + Oh My Zsh

Mac 自带的终端能用，但不好用。

换成 iTerm2 + Oh My Zsh，你会爱上终端的。

### iTerm2 配置

1. 下载安装：https://iterm2.com/
2. 配色方案：选 Solarized Dark 或者 Dracula
3. 快捷键：
   - `Cmd + T`：新建标签页
   - `Cmd + D`：垂直分屏
   - `Cmd + Shift + D`：水平分屏
   - `Cmd + [ / ]`：切换分屏

### Oh My Zsh

1. 安装：
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

2. 主题：我用的是 `agnoster`
```bash
# 在 ~/.zshrc 中修改
ZSH_THEME="agnoster"
```

3. 必装插件：
```bash
# 在 ~/.zshrc 中修改
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
  web-search
  jsontools
)
```

- `git`：一堆 git 别名，`gco` = `git checkout`，`gp` = `git push`
- `zsh-autosuggestions`：自动提示历史命令，按右方向键补全
- `zsh-syntax-highlighting`：命令语法高亮，输错了会变红
- `web-search`：`google 关键词` 直接搜索
- `jsontools`：`pp_json` 格式化 JSON

### 其他终端工具

#### 1. bat
`cat` 的替代品，带语法高亮。

```bash
# 安装
brew install bat

# 使用
bat README.md
```

#### 2. exa
`ls` 的替代品，更好看，信息更全。

```bash
# 安装
brew install exa

# 使用
exa -l
exa -T  # 树状显示
```

#### 3. fd
`find` 的替代品，更快，更简单。

```bash
# 安装
brew install fd

# 使用
fd "*.md"  # 找所有 md 文件
```

#### 4. ripgrep (rg)
`grep` 的替代品，更快。

```bash
# 安装
brew install ripgrep

# 使用
rg "关键词"  # 在当前目录搜索
```

#### 5. tldr
`man` 的替代品，更简单，更实用。

```bash
# 安装
brew install tldr

# 使用
tldr git  # 看 git 常用命令
tldr tar  # 看 tar 常用命令
```

## Git：别只会 commit 和 push

Git 是程序员的基本功，但很多人只会 `commit` 和 `push`。

分享几个我常用的高级操作。

### 1. 交互式 rebase
```bash
git rebase -i HEAD~3
```

合并多个 commit，修改 commit message，神器。

### 2. stash
```bash
# 暂存当前修改
git stash

# 查看暂存列表
git stash list

# 恢复暂存
git stash pop

# 恢复指定暂存
git stash pop stash@{1}
```

写代码写到一半，突然要切分支改 Bug，用 stash 暂存一下。

### 3. cherry-pick
```bash
# 把某个 commit 应用到当前分支
git cherry-pick <commit-hash>
```

### 4. reflog
```bash
# 查看所有操作记录
git reflog
```

不小心 reset 错了？reflog 能救你。

### 5. blame
```bash
# 查看某行代码是谁写的
git blame -L 10,20 file.js
```

配合 VS Code 的 GitLens，更香。

### 6. 别名
在 `~/.gitconfig` 里加这些：

```ini
[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
    lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
    last = log -1 HEAD
    unstage = reset HEAD --
    amend = commit --amend
```

然后 `git lg` 就能看到漂亮的提交历史了。

## 浏览器：Chrome 插件也很重要

### 1. Octotree
GitHub 代码树，看代码不用一个个点开。

### 2. GitHub Dark Mode
GitHub 深色模式，保护眼睛。

### 3. JSON Viewer
JSON 自动格式化，不用再复制到编辑器里格式化了。

### 4. AdGuard
去广告，清爽。

### 5. Vimium
用键盘操作浏览器，不用鼠标。

- `f`：显示链接快捷键，按对应字母打开
- `j/k`：上下滚动
- `gg/G`：到顶部/底部
- `x`：关闭当前标签页
- `X`：恢复关闭的标签页

## 其他神器

### 1. Alfred
Mac 效率神器，Spotlight 的替代品。

- 快速启动应用
- 快速搜索文件
- 快速计算
- 快速翻译
- 自定义工作流

### 2. Dash
API 文档离线查看，不用联网查文档。

### 3. Notion
笔记、任务管理、知识库，全能选手。

### 4. Figma
UI 设计，跟设计师协作必备。

### 5. Postman
接口调试，虽然 VS Code 有 REST Client，但 Postman 还是更强大。

### 6. Docker
不用多说了，开发必备。

## 最后：别沉迷工具

工具是用来提升效率的，不是用来收集的。

我见过很多人，装了一堆插件，配置了一堆快捷键，结果代码写得稀烂。

记住：

- 工具是辅助，核心还是你的技术能力
- 别花太多时间折腾工具，够用就行
- 适合自己的才是最好的

但是，该用的工具还是要用。

毕竟，早点下班，陪陪家人，打打游戏，不好吗？

好了，不说了，改 Bug 去了。

---
*写于某个准点下班的下午*
