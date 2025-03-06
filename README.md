# Simple Static Site with Markdown Support

A lightweight static site generator that converts Markdown content into HTML pages. Built with vanilla HTML, CSS, and JavaScript.

## Features

- Clean and responsive design
- Blog support with automatic post listing
- Markdown content with frontmatter
- No complex frameworks - just simple, fast static pages

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Add content:
- Create blog posts in `content/blog/` as Markdown files
- Create pages in `content/` as Markdown files
- Use frontmatter for metadata (title, date, excerpt)

3. Build the site:
```bash
npm run build
```

4. Serve the site:
You can use any static file server. For development, you can use Python's built-in server:
```bash
python -m http.server
```
Or Node's `http-server`:
```bash
npx http-server
```

## Content Structure

### Blog Posts
Create `.md` files in `content/blog/` with this structure:
```markdown
---
title: Your Post Title
date: YYYY-MM-DD
excerpt: A brief description of your post
---

Your content here...
```

### Pages
Create `.md` files in `content/` for regular pages like about.md, faq.md, etc.

## Customization

- Edit `css/style.css` to customize the look and feel
- Modify `scripts/build.js` to add new features
- Update the HTML template in the build script for structural changes