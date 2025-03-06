const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');
const frontMatter = require('front-matter');

// Configure marked for security
marked.setOptions({
    headerIds: false,
    mangle: false
});

// Template function for wrapping content in HTML
function wrapInTemplate(content, metadata = {}) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${metadata.title || 'My Website'}</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="/index.html">Home</a></li>
                <li><a href="/blog/index.html">Blog</a></li>
                <li><a href="/about.html">About</a></li>
                <li><a href="/faq.html">FAQ</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article class="content">
            ${content}
        </article>
    </main>

    <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>

    <script src="/js/main.js"></script>
</body>
</html>`;
}

// Process a single markdown file
async function processMarkdownFile(filePath, outputPath) {
    const content = await fs.readFile(filePath, 'utf8');
    const { attributes, body } = frontMatter(content);
    const htmlContent = marked.parse(body);
    const fullHtml = wrapInTemplate(htmlContent, attributes);
    await fs.outputFile(outputPath, fullHtml);
    return attributes;
}

// Build the site
async function build() {
    try {
        // Create necessary directories
        await fs.ensureDir('content');
        await fs.ensureDir('content/blog');
        await fs.ensureDir('blog');

        // Process blog posts
        const blogPosts = [];
        const blogFiles = await fs.readdir('content/blog');
        
        for (const file of blogFiles) {
            if (file.endsWith('.md')) {
                const filePath = path.join('content/blog', file);
                const outputPath = path.join('blog', file.replace('.md', '.html'));
                const metadata = await processMarkdownFile(filePath, outputPath);
                blogPosts.push({
                    ...metadata,
                    slug: file.replace('.md', ''),
                    url: `/blog/${file.replace('.md', '.html')}`
                });
            }
        }

        // Sort posts by date and save posts.json
        blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        await fs.writeJson('blog/posts.json', blogPosts);

        // Process pages
        const pages = ['about', 'faq'];
        for (const page of pages) {
            const filePath = `content/${page}.md`;
            if (await fs.pathExists(filePath)) {
                await processMarkdownFile(filePath, `${page}.html`);
            }
        }

        console.log('Site built successfully!');
    } catch (error) {
        console.error('Error building site:', error);
    }
}

build(); 