# 伦理学派别测试（GitHub Pages 可部署）

## 本地运行
```bash
npm install
npm run dev
```

## 构建与预览
```bash
npm run build
npm run preview
```

## 部署到 GitHub Pages（Actions）
1. 新建 GitHub 仓库（建议 public），把本项目推到 `main` 分支。
2. Settings → Pages → Source 选择 **GitHub Actions**。
3. 推送后等待 Actions 的 `Deploy to GitHub Pages` 完成。
4. 打开的链接形如：`https://<user>.github.io/<repo>/`

### 说明
- 使用 `HashRouter`：路径形如 `/#/test`，避免 GitHub Pages 刷新 404。
- `vite.config.ts` 使用 `base: './'`：静态资源相对路径，避免仓库名导致的路径问题。
- 答题与结果存储在浏览器 `localStorage`（仅本机）。

## 内容编辑入口
- 题库：`src/data/questions.json`
- 派别文案：`src/data/schools.json`
- 派别百科：`src/data/encyclopedia.json`
- 派别理想向量：`src/data/ideals.json`
