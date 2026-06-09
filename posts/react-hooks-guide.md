---
title: React Hooks 踩坑指南
date: 2025-02-20
category: 前端剑术
tags: [React, Hooks, 前端, 踩坑, 学生]
excerpt: 聊聊我学 React Hooks 踩过的那些坑，从啥也不会到慢慢搞懂，都是血和泪的教训。别问，问就是作业写多了。
---

# React Hooks 踩坑指南

> 如果你没被 useEffect 的依赖数组坑过，那你一定不是一个合格的 React 初学者。

## 先讲个故事

记得 Hooks 刚火的时候，我还在写 class 组件。

"好好的 class 组件不用，搞什么函数组件？"

"这 useEffect 什么玩意儿？怎么比 componentDidMount 还难用？"

"闭包陷阱？什么鬼？"

然后……真香。

现在我写 React，已经想不起来 class 组件怎么写了。

但是，Hooks 虽好，坑也不少。今天就跟大家聊聊我学 React 踩过的那些坑，希望你们别再踩了。

哦对了，我也是个学生，写的都是自己踩过的坑，不是什么大佬经验。

## 第一坑：useEffect 依赖数组

这绝对是 Hooks 第一大坑，没有之一。我写作业的时候不知道被坑了多少次。

### 场景一：无限循环

```javascript
// 错误示范
const [count, setCount] = useState(0);

useEffect(() => {
  setCount(count + 1);
}, [count]); // 死循环！
```

别笑，我写作业的时候真写过。

页面一打开，浏览器直接卡成 PPT。打开控制台一看，count 已经涨到几万了。

**为什么？**
- useEffect 依赖 count
- 每次执行 setCount，count 变化
- count 变化，触发 useEffect
- useEffect 又执行 setCount
- 无限循环……

**怎么破？**
用函数式更新：

```javascript
// 正确示范
useEffect(() => {
  setCount(prev => prev + 1); // 不依赖 count
}, []); // 空依赖数组
```

### 场景二：依赖漏了

```javascript
// 错误示范
const [user, setUser] = useState(null);
const [id, setId] = useState(1);

useEffect(() => {
  fetchUser(id).then(data => {
    setUser(data);
    console.log(user.name); // user 还是旧的！
  });
}, [id]); // 漏了 user？不，这里不需要 user
```

等等，这个是对的。那问题出在哪？

看这个，我写课程项目的时候踩的坑：

```javascript
// 错误示范
const fetchData = () => {
  fetch(`/api/user/${id}`).then(/* ... */);
};

useEffect(() => {
  fetchData();
}, []); // 漏了 id 和 fetchData！
```

id 变了，fetchData 里用的还是旧的 id。

当时调了一个下午，差点把电脑砸了。

**怎么破？**
要么把依赖加上，要么用 useCallback 包一下。

### 场景三：依赖太多

```javascript
// 看着就头疼
useEffect(() => {
  // 一大堆逻辑
}, [a, b, c, d, e, f, g]);
```

依赖数组一长，迟早出问题。哪天加个变量忘了加依赖，Bug 就来了。

我写大作业的时候，一个 useEffect 写了快 100 行，依赖数组 8 个变量，出了 Bug 根本找不到在哪。

**怎么破？**
拆分 useEffect，一个 useEffect 只做一件事。

## 第二坑：闭包陷阱

这个坑，新手必踩，我踩了 N 次。

```javascript
// 经典面试题，也是我作业里的坑
const [count, setCount] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    console.log(count); // 永远是 0！
  }, 1000);
  
  return () => clearInterval(timer);
}, []);
```

为什么？因为 useEffect 捕获了第一次渲染时的 count，也就是 0。之后 count 再怎么变，定时器里的 count 永远是 0。

我当时做一个倒计时功能，怎么都不对，查了好久才发现是这个问题。

**解法一：加依赖**

```javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count);
  }, 1000);
  
  return () => clearInterval(timer);
}, [count]); // 加上 count
```

但这样每次 count 变都会重新创建定时器，有点浪费。

**解法二：用 ref**

```javascript
const countRef = useRef(count);

useEffect(() => {
  countRef.current = count;
}, [count]);

useEffect(() => {
  const timer = setInterval(() => {
    console.log(countRef.current); // 永远是最新的
  }, 1000);
  
  return () => clearInterval(timer);
}, []);
```

**解法三：函数式更新**

```javascript
useEffect(() => {
  const timer = setInterval(() => {
    setCount(prev => prev + 1); // 不需要读取 count
  }, 1000);
  
  return () => clearInterval(timer);
}, []);
```

看场景选方案。我一般用解法三，最简单。

## 第三坑：useCallback 和 useMemo 滥用

很多人（包括我）一上来就把所有函数都用 useCallback 包起来，所有值都用 useMemo 包起来。

"性能优化嘛，多多益善。"

大错特错！

useCallback 和 useMemo 本身也是有开销的。你包一下，React 就要做一次比较，反而更慢。

我之前写项目，不管什么函数都用 useCallback 包，结果代码又长又难读，性能也没见提升。

**什么时候用 useCallback？**
- 函数传给子组件，子组件用了 React.memo
- 函数作为 useEffect 的依赖

**什么时候用 useMemo？**
- 计算量很大（比如遍历大数组、复杂计算）
- 值传给子组件，子组件用了 React.memo

其他时候，别瞎用。

```javascript
// 没必要
const handleClick = useCallback(() => {
  setCount(prev => prev + 1);
}, []);

// 直接这样就行
const handleClick = () => {
  setCount(prev => prev + 1);
};
```

## 第四坑：useEffect 里的 async/await

很多人（包括我）这么写：

```javascript
// 错误示范
useEffect(async () => {
  const data = await fetchData();
  setData(data);
}, []);
```

看着没问题，对吧？

但是！useEffect 的返回值应该是一个清理函数，或者 undefined。

你写 async，返回的就是 Promise 了。React 会报警告，而且清理函数没法用了。

我第一次写的时候，警告跳出来我还以为是什么大问题，查了半天。

**正确写法：**

```javascript
useEffect(() => {
  let mounted = true;
  
  const fetchData = async () => {
    const data = await fetch('/api/data');
    if (mounted) {
      setData(await data.json());
    }
  };
  
  fetchData();
  
  return () => {
    mounted = false; // 防止组件卸载后还更新状态
  };
}, []);
```

那个 mounted 变量很重要，不然组件卸载了请求才回来，更新状态就报错了。

我做课程项目的时候，页面切来切去，经常报这个错，后来加了 mounted 就好了。

## 第五坑：状态更新不合并

class 组件里，setState 是合并的：

```javascript
this.setState({ name: 'Denis' }); // 不会影响其他 state
```

但 Hooks 里，setState 是替换的：

```javascript
const [user, setUser] = useState({ name: 'Denis', age: 18 });

setUser({ name: 'Denis LU' }); // age 没了！
```

我第一次用的时候，age 没了还以为是哪里删了，查了半天才发现是这个问题。

**怎么破？**
要么手动合并：

```javascript
setUser(prev => ({ ...prev, name: 'Denis LU' }));
```

要么拆分 state：

```javascript
const [name, setName] = useState('Denis');
const [age, setAge] = useState(18);
```

要么用 useReducer。

## 自定义 Hooks 真香

聊了这么多坑，说点开心的。

自定义 Hooks 是真的香。我写了几个，用起来贼方便。

举个例子，写一个 useLocalStorage：

```javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setStoredValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(value) : value;
      setValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('存不进去啊兄弟：', error);
    }
  };

  return [value, setStoredValue];
}
```

然后用的时候：

```javascript
const [theme, setTheme] = useLocalStorage('theme', 'dark');
```

就问你香不香？

再举个例子，useDebounce，我做搜索功能的时候写的：

```javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

搜索框防抖，一行代码搞定。

## 一些"保命"技巧

最后给大家分享几个我总结的"保命"技巧，都是踩坑踩出来的。

### 1. 安装 eslint-plugin-react-hooks

真的，装上它能帮你避免 80% 的 Hooks 问题。

```bash
npm install eslint-plugin-react-hooks --save-dev
```

```json
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

它会提醒你依赖数组漏了什么。我现在写代码全靠它提醒。

### 2. 一个 useEffect 只做一件事

别把所有逻辑都塞到一个 useEffect 里，拆分开，每个只负责一件事。

这样依赖数组清晰，出问题也好排查。我之前写大作业的时候，一个 useEffect 写了 100 多行，出了 Bug 根本找不到。

### 3. 复杂逻辑用 useReducer

如果状态之间有关联，或者更新逻辑很复杂，别硬扛，用 useReducer。

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

比一堆 useState 清爽多了。

### 4. 别在循环、条件、嵌套函数里调用 Hook

这个是铁律，别问为什么，问就是 React 规定的。我之前在 if 里写过 useState，直接报错。

### 5. 多写自定义 Hooks

把可复用的逻辑抽成自定义 Hooks，代码清爽，还能复用。我现在写项目，先想能不能抽个自定义 Hook。

## 结语

Hooks 这东西，说难不难，说简单也不简单。

刚上手的时候，我也骂过这是什么玩意儿。

用久了才发现，真香。

关键是要理解它的原理，搞清楚闭包、依赖数组这些东西。

踩坑不可怕，可怕的是踩了坑还不知道为什么。

希望这篇文章能帮你少踩几个坑。

当然，该踩的坑，一个都少不了。

毕竟，踩坑才是最好的学习方式。

好了，不说了，还有个 React 大作业要写，deadline 就在明天。

---
*写于某个被 React Hooks 坑了一下午的傍晚*
