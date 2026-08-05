#!/bin/bash

# ============================================================
# Seed Code Relay 环境配置脚本
# ============================================================
# 使用方法:
#   1. 复制此文件: cp setup_relay_env.sh setup_relay_env.local.sh
#   2. 填写你的 API Key 和 Model ID
#   3. 运行: source setup_relay_env.local.sh
# ============================================================

# Relay 基础 URL（不需要修改）
export RELAY_BASE_URL="https://super-relay.byted.org"

# ============================================================
# 👇 请填写你的配置 👇
# ============================================================

# 你的 Relay API Key
# 获取方式: Relay 控制台 → API Keys → Default API Key
export RELAY_API_KEY="YOUR_API_KEY_HERE"

# 你要使用的模型 ID
# 可选模型:
#   - model_api/experimental_0717
#   - model_api/experimental_0723
#   - auto_model/alwaysday1
#   - auto_model/alwaysday1_max
export RELAY_MODEL_ID="model_api/experimental_0723"

# ============================================================
# 👆 配置结束 👆
# ============================================================

# 检查配置
echo "=========================================="
echo "🎯 Seed Code Relay 配置"
echo "=========================================="
echo ""

if [ "$RELAY_API_KEY" = "YOUR_API_KEY_HERE" ]; then
    echo "⚠️  警告: 请先填写你的 RELAY_API_KEY!"
    echo "   编辑此文件，将 YOUR_API_KEY_HERE 替换为你的真实 API Key"
    echo ""
    echo "   获取方式:"
    echo "   1. 访问 https://super-relay.byted.org"
    echo "   2. 进入 API Keys 页面"
    echo "   3. 复制 Default API Key"
    echo ""
else
    echo "✅ RELAY_BASE_URL: $RELAY_BASE_URL"
    echo "✅ RELAY_API_KEY: 已配置 (${#RELAY_API_KEY} 字符)"
    echo "✅ RELAY_MODEL_ID: $RELAY_MODEL_ID"
    echo ""
    echo "🎉 配置完成！"
    echo ""
    echo "📝 快速链接:"
    echo "   - Relay 控制台: https://super-relay.byted.org"
    echo "   - Trace 列表: https://super-relay.byted.org/trace"
    echo "   - 模型列表: https://super-relay.byted.org/models"
fi

echo ""
echo "=========================================="
