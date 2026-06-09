#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
博客文章加载测试脚本
测试所有文章是否能正常加载
"""

import requests
import time
import sys
from datetime import datetime

# 配置
BASE_URL = "https://lccuhk.github.io/Denis-website"
BLOG_URL = f"{BASE_URL}/blog.html"

# 文章列表（从 blog.html 中的 postsMetadata 复制）
POSTS = [
    {
        "id": "hello-world",
        "title": "初入江湖，代码为剑",
        "file": "posts/hello-world.md",
        "category": "心法心得"
    },
    {
        "id": "react-hooks-guide",
        "title": "React Hooks 踩坑指南",
        "file": "posts/react-hooks-guide.md",
        "category": "前端剑术"
    },
    {
        "id": "python-ai-intro",
        "title": "Python AI 入坑指南",
        "file": "posts/python-ai-intro.md",
        "category": "AI心法"
    },
    {
        "id": "backend-microservices",
        "title": "我的第一个开源项目踩坑实录",
        "file": "posts/backend-microservices.md",
        "category": "项目实战"
    },
    {
        "id": "developer-tools",
        "title": "学生党效率提升指南",
        "file": "posts/developer-tools.md",
        "category": "兵器谱"
    },
    {
        "id": "career-advice",
        "title": "学生党避坑指南",
        "file": "posts/career-advice.md",
        "category": "江湖阅历"
    }
]

# 颜色输出
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    BOLD = '\033[1m'
    ENDC = '\033[0m'

def print_header(text):
    """打印标题"""
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'=' * 60}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.BLUE}  {text}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.BLUE}{'=' * 60}{Colors.ENDC}\n")

def print_success(text):
    """打印成功信息"""
    print(f"{Colors.GREEN}✅ {text}{Colors.ENDC}")

def print_error(text):
    """打印错误信息"""
    print(f"{Colors.RED}❌ {text}{Colors.ENDC}")

def print_warning(text):
    """打印警告信息"""
    print(f"{Colors.YELLOW}⚠️  {text}{Colors.ENDC}")

def test_blog_page():
    """测试博客主页面是否能正常访问"""
    print_header("测试 1: 博客主页面访问")
    
    try:
        response = requests.get(BLOG_URL, timeout=10)
        if response.status_code == 200:
            print_success(f"博客页面访问成功 (状态码: {response.status_code})")
            print(f"   页面大小: {len(response.content)} 字节")
            
            # 检查是否包含必要的内容
            content = response.text
            checks = [
                ("武林秘籍", "页面标题"),
                ("postsMetadata", "文章元数据"),
                ("marked", "Markdown 解析库"),
                ("theme-manager.js", "主题管理器")
            ]
            
            all_passed = True
            for check_str, desc in checks:
                if check_str in content:
                    print_success(f"包含 {desc}: {check_str}")
                else:
                    print_error(f"缺少 {desc}: {check_str}")
                    all_passed = False
            
            return all_passed
        else:
            print_error(f"博客页面访问失败 (状态码: {response.status_code})")
            return False
    except Exception as e:
        print_error(f"博客页面访问异常: {str(e)}")
        return False

def test_posts_files():
    """测试所有文章文件是否能正常访问"""
    print_header("测试 2: 文章文件访问")
    
    results = []
    
    for i, post in enumerate(POSTS, 1):
        post_url = f"{BASE_URL}/{post['file']}"
        print(f"\n{Colors.BOLD}[{i}/{len(POSTS)}] 测试: {post['title']}{Colors.ENDC}")
        print(f"   分类: {post['category']}")
        print(f"   URL: {post_url}")
        
        try:
            start_time = time.time()
            response = requests.get(post_url, timeout=10)
            elapsed_time = time.time() - start_time
            
            if response.status_code == 200:
                content = response.text
                content_length = len(content)
                
                # 检查内容是否为空
                if content_length < 100:
                    print_warning(f"文件内容过短 ({content_length} 字节)，可能有问题")
                    results.append((post, False, "内容过短"))
                else:
                    # 检查是否包含 Markdown 内容
                    if '# ' in content or '## ' in content:
                        print_success(f"文章加载成功 (状态码: {response.status_code}, 耗时: {elapsed_time:.2f}s, 大小: {content_length} 字节)")
                        results.append((post, True, f"大小: {content_length} 字节, 耗时: {elapsed_time:.2f}s"))
                    else:
                        print_warning(f"文件内容可能不是 Markdown 格式")
                        results.append((post, False, "非 Markdown 格式"))
            else:
                print_error(f"文章加载失败 (状态码: {response.status_code})")
                results.append((post, False, f"HTTP {response.status_code}"))
                
        except Exception as e:
            print_error(f"文章加载异常: {str(e)}")
            results.append((post, False, str(e)))
        
        # 稍微延迟，避免请求过快
        time.sleep(0.5)
    
    return results

def test_post_detail_urls():
    """测试文章详情页 URL 是否能正常访问"""
    print_header("测试 3: 文章详情页 URL")
    
    results = []
    
    for i, post in enumerate(POSTS, 1):
        detail_url = f"{BLOG_URL}?post={post['id']}"
        print(f"\n{Colors.BOLD}[{i}/{len(POSTS)}] 测试: {post['title']}{Colors.ENDC}")
        print(f"   URL: {detail_url}")
        
        try:
            response = requests.get(detail_url, timeout=10)
            if response.status_code == 200:
                print_success(f"详情页访问成功 (状态码: {response.status_code})")
                results.append((post, True, "访问成功"))
            else:
                print_error(f"详情页访问失败 (状态码: {response.status_code})")
                results.append((post, False, f"HTTP {response.status_code}"))
        except Exception as e:
            print_error(f"详情页访问异常: {str(e)}")
            results.append((post, False, str(e)))
        
        time.sleep(0.5)
    
    return results

def print_summary(file_results, url_results, blog_page_ok):
    """打印测试总结"""
    print_header("测试总结")
    
    total_posts = len(POSTS)
    file_passed = sum(1 for _, ok, _ in file_results if ok)
    url_passed = sum(1 for _, ok, _ in url_results if ok)
    
    print(f"\n{Colors.BOLD}测试时间:{Colors.ENDC} {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{Colors.BOLD}测试地址:{Colors.ENDC} {BASE_URL}")
    print(f"\n{Colors.BOLD}博客主页面:{Colors.ENDC} {'✅ 通过' if blog_page_ok else '❌ 失败'}")
    print(f"{Colors.BOLD}文章文件测试:{Colors.ENDC} {file_passed}/{total_posts} 通过")
    print(f"{Colors.BOLD}详情页 URL 测试:{Colors.ENDC} {url_passed}/{total_posts} 通过")
    
    # 详细结果
    print(f"\n{Colors.BOLD}详细结果:{Colors.ENDC}\n")
    
    for i, post in enumerate(POSTS, 1):
        file_ok = file_results[i-1][1]
        file_msg = file_results[i-1][2]
        url_ok = url_results[i-1][1]
        url_msg = url_results[i-1][2]
        
        status = "✅" if file_ok and url_ok else "❌"
        print(f"{status} [{i}] {post['title']}")
        print(f"   文件: {'✅ 通过' if file_ok else '❌ 失败'} - {file_msg}")
        print(f"   URL:  {'✅ 通过' if url_ok else '❌ 失败'} - {url_msg}")
        print()
    
    # 最终结论
    all_passed = blog_page_ok and file_passed == total_posts and url_passed == total_posts
    
    if all_passed:
        print(f"\n{Colors.GREEN}{Colors.BOLD}🎉 所有测试通过！博客功能正常！{Colors.ENDC}")
        return 0
    else:
        print(f"\n{Colors.RED}{Colors.BOLD}⚠️  部分测试失败，请检查上述错误信息{Colors.ENDC}")
        return 1

def main():
    """主函数"""
    print(f"\n{Colors.BOLD}{Colors.BLUE}")
    print("╔══════════════════════════════════════════════════════════════╗")
    print("║           侠客江湖 - 博客文章加载测试脚本                   ║")
    print("╚══════════════════════════════════════════════════════════════╝")
    print(Colors.ENDC)
    
    # 测试 1: 博客主页面
    blog_page_ok = test_blog_page()
    time.sleep(1)
    
    # 测试 2: 文章文件
    file_results = test_posts_files()
    time.sleep(1)
    
    # 测试 3: 文章详情页 URL
    url_results = test_post_detail_urls()
    
    # 打印总结
    exit_code = print_summary(file_results, url_results, blog_page_ok)
    
    print(f"\n{Colors.BLUE}{'=' * 60}{Colors.ENDC}\n")
    
    return exit_code

if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print(f"\n\n{Colors.YELLOW}测试被用户中断{Colors.ENDC}")
        sys.exit(1)
