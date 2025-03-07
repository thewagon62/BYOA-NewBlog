---
title: Blog
description: Latest blog posts and updates
---

# Blog Posts

<div id="blog-posts">
  <!-- Blog posts will be dynamically loaded here -->
</div>

<script>
fetch('/blog/posts.json')
  .then(response => response.json())
  .then(posts => {
    const blogPostsDiv = document.getElementById('blog-posts');
    posts.forEach(post => {
      const article = document.createElement('article');
      article.className = 'blog-post-preview';
      article.innerHTML = `
        <h2><a href="${post.url}">${post.title}</a></h2>
        <div class="post-meta">
          <time datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time>
        </div>
        ${post.description ? `<p>${post.description}</p>` : ''}
      `;
      blogPostsDiv.appendChild(article);
    });
  })
  .catch(error => console.error('Error loading blog posts:', error));
</script> 