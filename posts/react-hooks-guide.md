---
title: React Hooks 修炼指南
date: 2025-02-20
category: 前端剑术
tags: [React, Hooks, 前端]
excerpt: 深入解析 React Hooks 的使用技巧和最佳实践，助你修炼更上层楼。
---

# React Hooks 修炼指南

> 前端剑术，以 React 为尊。Hooks 一出，谁与争锋。

## 什么是 React Hooks

React Hooks 是 React 16.8 引入的新特性，让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## 常用 Hooks 详解

### 1. useState - 状态管理

```javascript
const [count, setCount] = useState(0);

// 函数式更新
setCount(prevCount => prevCount + 1);

// 惰性初始化
const [state, setState] = useState(() => {
  const initialState = expensiveComputation();
  return initialState;
});
```

**最佳实践：**
- 多个相关状态使用对象或 useReducer
- 避免在循环、条件或嵌套函数中调用 Hook

### 2. useEffect - 副作用处理

```javascript
// 组件挂载时执行
useEffect(() => {
  console.log('组件已挂载');
  return () => {
    console.log('组件将卸载');
  };
}, []);

// 依赖变化时执行
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

**常见陷阱：**
- 忘记添加依赖数组
- 依赖数组中包含不稳定的值
- 无限循环

### 3. useCallback - 函数记忆化

```javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

### 4. useMemo - 值记忆化

```javascript
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b],
);
```

## 自定义 Hooks

### 示例：useLocalStorage

```javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

## Hooks 性能优化技巧

1. **合理拆分状态**：将不相关的状态拆分到不同的 useState
2. **使用 useMemo/useCallback**：避免不必要的重渲染
3. **状态提升**：将共享状态提升到最近的共同祖先
4. **使用 useReducer**：复杂状态逻辑使用 useReducer

## 常见问题

### Q: 为什么我的 useEffect 执行了两次？
A: React 18 的 StrictMode 会在开发环境下双重调用 useEffect，这是正常的。

### Q: 如何在 useEffect 中使用 async/await？
A: 不能直接在 useEffect 回调中使用 async，需要在内部定义 async 函数。

```javascript
useEffect(() => {
  const fetchData = async () => {
    const result = await fetch('/api/data');
    setData(await result.json());
  };
  fetchData();
}, []);
```

## 结语

React Hooks 是前端开发的利器，掌握它可以让你的代码更加简洁、优雅。
勤加练习，必能修炼成前端剑术高手！

---
*前端剑术，精益求精。代码之道，存乎一心。*
