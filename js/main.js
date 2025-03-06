// Function to load and display latest blog posts
async function loadLatestPosts() {
    try {
        const response = await fetch('/blog/posts.json');
        const posts = await response.json();
        
        const latestPostsContainer = document.getElementById('latest-posts');
        const recentPosts = posts.slice(0, 3); // Show 3 most recent posts
        
        recentPosts.forEach(post => {
            const article = document.createElement('article');
            article.innerHTML = `
                <h3><a href="/blog/${post.slug}.html">${post.title}</a></h3>
                <p class="date">${new Date(post.date).toLocaleDateString()}</p>
                <p>${post.excerpt}</p>
            `;
            latestPostsContainer.appendChild(article);
        });
    } catch (error) {
        console.log('No posts found or error loading posts');
    }
}

// Load posts if we're on the homepage
if (document.getElementById('latest-posts')) {
    loadLatestPosts();
} 