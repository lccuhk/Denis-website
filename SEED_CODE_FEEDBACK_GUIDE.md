# 🎯 Seed Code 模型反馈活动指南

通过 Super-Relay 接入 Seed Code 最新模型 API，使用后提交反馈获得 BM 豆奖励！

---

## 📋 活动概览

| 项目 | 说明 |
|------|------|
| **活动名称** | Seed Code 模型反馈活动 |
| **参与方式** | 使用 Relay 模型 + 提交反馈 |
| **奖励** | 300 BM豆/条有效反馈 |
| **上限** | 每人每月 6000 BM豆 |
| **发放时间** | 月末集中发放 |
| **最低发放** | 月累计 100 BM豆以上 |

---

## ⚙️ 配置步骤

### Step 1：获取 Relay Key 和 Model ID

#### 1. 打开 Relay 控制台
访问：https://super-relay.byted.org

#### 2. 获取 API Key
1. 切换到你的工作区
2. 进入 **API Keys** 页面
3. 复制 **Default API Key**（首次会自动创建）

#### 3. 获取 Model ID
1. 进入 **Models** 页面
2. 筛选下表所列的实验模型
3. 复制目标模型的 **Canonical Model ID**

---

## 🤖 可用模型列表

| Model ID | 链接 |
|----------|------|
| `model_api/experimental_0717` | [查看](https://super-relay.byted.org/models/model_api/model_api%2Fexperimental_0717) |
| `model_api/experimental_0723` | [查看](https://super-relay.byted.org/models/model_api/model_api%2Fexperimental_0723) |
| `auto_model/alwaysday1` | [查看](https://super-relay.byted.org/models/auto_model/alwaysday1) |
| `auto_model/alwaysday1_max` | [查看](https://super-relay.byted.org/models/auto_model/alwaysday1_max) |

> ⚠️ **注意**：不同用户权限不一样，请使用自己能访问的模型。模型列表不定时更新，请关注活动群内通知。

---

## 👤 我的可用模型

根据你的 Relay 账号，你能访问的模型：

| 模型名称 | Model ID | 类型 | 参与活动 | 推荐度 |
|----------|----------|------|----------|--------|
| **experimental_0717** | `model_api/experimental_0717` | Model API | ✅ 可以 | ⭐⭐⭐⭐⭐ 首选 |
| **alwaysday1** | `auto_model/alwaysday1` | Auto Model | ✅ 可以 | ⭐⭐⭐⭐ 备选 |
| experimental_0630 | `model_api/experimental_0630` | Model API | ⚠️ 不在活动列表 | ⭐⭐ |
| glm5.2 | `opensource/glm5.2` | Open Source | ❌ 不计入 | ⭐ |

**推荐使用顺序：**
1. 🥇 `model_api/experimental_0717` - 最新实验模型，优先奖励
2. 🥈 `auto_model/alwaysday1` - 备选模型

---

## 🔧 环境配置

### 方式一：环境变量（推荐）

```bash
# 设置环境变量
export RELAY_BASE_URL="https://super-relay.byted.org"
export RELAY_API_KEY="<YOUR_RELAY_API_KEY>"
export RELAY_MODEL_ID="<COPY_FROM_MODELS_PAGE>"
```

### 方式二：配置文件

创建 `.env` 文件：
```env
RELAY_BASE_URL=https://super-relay.byted.org
RELAY_API_KEY=your_api_key_here
RELAY_MODEL_ID=model_api/experimental_0723
```

---

## 💻 客户端接入

### 方式一：Claude Code / Codex

详细配置步骤请参考：
[(长期更新) Relay 使用指南 & 公司内使用 Code Agent 指南](https://super-relay.byted.org/docs)

### 方式二：直接调用 API

```python
import os
import requests

# 从环境变量读取配置
base_url = os.environ.get("RELAY_BASE_URL", "https://super-relay.byted.org")
api_key = os.environ.get("RELAY_API_KEY")
model_id = os.environ.get("RELAY_MODEL_ID")

def chat_with_model(messages):
    """调用 Relay 模型对话"""
    url = f"{base_url}/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "model": model_id,
        "messages": messages
    }
    response = requests.post(url, headers=headers, json=data)
    return response.json()

# 使用示例
messages = [
    {"role": "user", "content": "你好，请介绍一下你自己"}
]
result = chat_with_model(messages)
print(result)
```

---

## 📮 反馈方式（Relay Trace）

完成模型对话后，通过 Relay Trace 页面提交反馈评分和评论。

### 方式一：通过邮箱搜索找到 Trace

1. 打开 [Relay Trace 列表页](https://super-relay.byted.org/trace)
2. 输入你的邮箱进行搜索，找到对应的 Trace 记录
3. 点击跳转 Trace 详情页
4. 在详情页左侧或 messages 列表最底部找到 feedback 入口
5. 填写得分和评论，提交即可

### 方式二：已知 Trace ID 直接反馈

1. 直接拼接 URL 访问 Trace 详情页：
   `https://super-relay.byted.org/trace/:traceid`
2. 在详情页左侧或 messages 列表底部的 feedback 入口提交反馈

### 方式三：通过 Session ID 筛选

1. 打开 [Relay Trace 列表页](https://super-relay.byted.org/trace)
2. 点击「更多筛选」
3. 将本地客户端的会话 ID（Session ID / Conversation ID）填入 Session ID 筛选条件
4. 点击跳转 Trace 详情页，在 feedback 入口提交反馈

---

## 💡 反馈填写技巧

### ✅ 高质量反馈（更容易获得奖励）

**好的反馈应该包含：**
1. **具体场景** - 你在做什么任务
2. **问题描述** - 模型哪里表现不好
3. **期望行为** - 你期望的正确结果是什么
4. **复现步骤** - 如何复现这个问题

**示例：**
```
得分：3分（一般）

评论：
在编写 Python 异步代码的任务中，模型生成的代码有以下问题：
1. 没有正确处理异常情况
2. 缺少类型提示
3. 代码风格不符合 PEP 8 规范

期望的行为：
- 应该包含完整的异常处理
- 应该添加类型注解
- 应该遵循 PEP 8 代码风格

使用场景：
我在让模型帮我写一个异步 HTTP 请求的工具函数。
```

### ❌ 无效反馈（不计入奖励）

- 评分与实际对话内容明显不符
- 评论为无意义内容（如"好""差""111"）
- 对同一 Trace 重复提交反馈
- 短时间内批量提交无实际使用场景的对话

---

## 🎁 活动奖励

### 基础奖励

| 任务内容 | 奖励内容 |
|----------|----------|
| Seed experimental 最新版模型有效反馈（含得分 + 评论） | 300 BM豆/条 |

### 额外奖励

- 积极参与活动的同学
- 反馈的 Case 为严重 Bug 的同学
- 有机会获得 Seed 实体周边、千元现金等奖励

### 奖励规则

| 规则 | 说明 |
|------|------|
| 发放时间 | BM豆将在月末集中发放 |
| 发放限制 | 不在活动群里，或月度低于100BM豆不予发放 |
| 每月上限 | 每人每月上限领取 6000 BM豆 |
| 周边限制 | 每人每种周边仅可获取一次 |

---

## ⚠️ 反馈规范与违规处理

### 违规类型

| 违规类型 | 具体表现 |
|----------|----------|
| **刷分** | 对同一 Trace 重复提交反馈；短时间内批量提交无实际使用场景的对话 |
| **无效反馈** | 评分与实际对话内容明显不符；评论为无意义内容（如"好""差""111"） |
| **刷题/凑数** | 使用极简 prompt（如"hello""1+1"）制造大量无信息量的 Trace |
| **抄袭/复制** | 多人提交雷同评论内容，或复制他人反馈 |

### 处罚机制

- **首次发现**：该批次反馈作废，不计BM豆
- **累计 3 次**：取消当月全部奖励
- **情节严重（如批量脚本刷量）**：永久取消活动参与资格，并在群内通报

---

## ❓ FAQ

### Q1：哪些模型可以参与有奖反馈？
Relay Models 页面中所有标记为 experimental 状态的 Seed Code 模型均可参与，会优先奖励使用最新版模型的反馈。其他模型也可以反馈，我们会收集跟进，但无法直接优化。

### Q2：我在哪里能看到 experimental 模型？
打开 Relay 控制台 → Models 页面，使用状态筛选器选择 experimental 即可查看。

### Q3：提交反馈后如何确认是否成功？
在 Trace 详情页提交 feedback 后，页面会显示已提交状态。你也可以在 Trace 列表中看到带有你评分标记的记录。

### Q4：如何找到我的 Trace 记录？
三种方式：
1. 用你的邮箱在 Trace 列表搜索
2. 如果知道 Trace ID，直接拼 URL 访问
3. 如果知道 Session ID（客户端中可查看），通过「更多筛选」条件定位

### Q5：混合模式（自有订阅 + Relay 模型）的反馈也算吗？
只有使用 Relay 目录中的 experimental 模型（托管通道）的 Trace 才计入有效反馈。中转通道（使用自有订阅调用裸模型）不计入。

---

## 🚀 快速开始

### 第1步：配置环境
1. 访问 Relay 控制台获取 API Key
2. 选择一个能访问的实验模型
3. 设置环境变量

### 第2步：使用模型
1. 用 Claude Code / Codex 接入 Relay 模型
2. 完成一些真实的开发任务
3. 记录遇到的问题

### 第3步：提交反馈
1. 打开 Relay Trace 页面
2. 找到对应的对话记录
3. 提交评分和详细评论
4. 获得 BM 豆奖励！

---

## 📞 加入活动群

配置完成模型后，截图私信 @林一，邀请进入新一期活动群！

### 群内福利：
- 📢 第一时间掌握模型更新
- 💬 交流模型使用体验
- 🎁 不定期社区活动和专属福利
- 🏆 社区贡献激励机会

---

## 💪 参与建议

### 提高反馈质量的技巧
1. **用真实任务测试** - 用你实际的开发任务来测试
2. **详细描述问题** - 越具体越好
3. **提供期望结果** - 说明你期望的正确行为
4. **记录复现步骤** - 让开发团队能复现问题
5. **持续参与** - 多试不同的任务场景

### 每月目标建议
- 每周提交 2-3 条有效反馈
- 每月约 8-12 条
- 预计获得 2400-3600 BM豆
- 既能帮助改进模型，又能获得奖励！

---

## 📝 注意事项

1. ✅ 使用 experimental 模型
2. ✅ 提交有质量的反馈
3. ✅ 遵守活动规则
4. ✅ 加入活动群（必须，否则不发放奖励）
5. ⚠️ 不要刷分/刷题
6. ⚠️ 月末统一发放奖励

---

*积极参与模型反馈，帮助改进 Seed Code，同时获得丰厚奖励！* 🎉✨
