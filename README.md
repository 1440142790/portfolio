# Visual Artist Portfolio

时尚、专业、艺术风格的摄影师/摄像师个人作品集网站

## 功能特性

- 响应式设计，完美适配桌面和移动设备
- 现代化 UI/UX 设计，金色主题配色
- 流畅的页面过渡和交互动画
- 图片画廊筛选功能
- 视频作品展示
- 图片灯箱放大查看
- 联系表单
- SEO 优化

## 本地预览

```bash
# 进入项目目录
cd D:/业务/portfolio

# 安装 serve (如未安装)
npm install -g serve

# 启动本地服务器
npx serve -l 3000
```

## 部署到 Netlify

### 方法一：拖拽上传
1. 访问 https://app.netlify.com/drop
2. 直接将 portfolio 文件夹拖入上传区域
3. 等待部署完成

### 方法二：Netlify CLI
```bash
npm install -g netlify-cli
cd D:/业务/portfolio
netlify deploy --prod
```

## 项目结构

```
portfolio/
├── index.html
├── styles.css
├── script.js
├── netlify.toml
├── package.json
└── assets/
    ├── images/ (1.jpg - 5.jpg)
    └── videos/ (1.mp4, 2.mp4)
```

## 自定义内容

编辑 index.html 文件中的个人信息和联系方式即可。
# portfolio
