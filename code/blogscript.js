document.addEventListener('DOMContentLoaded', () => {
    const savePostButton = document.getElementById('savePost');
    const postTitle = document.getElementById('postTitle');
    const postContent = document.getElementById('postContent');
    const postsContainer = document.getElementById('postsContainer');

    // Function to create a new post element
    const createPostElement = (title, content) => {
        const post = document.createElement('div');
        post.className = 'post';
        post.innerHTML = `
            <h3>${title}</h3>
            <p>${content}</p>
        `;
        return post;
    };

    // Function to save a new post
    const savePost = () => {
        const title = postTitle.value.trim();
        const content = postContent.value.trim();
        
        if (title && content) {
            const post = createPostElement(title, content);
            postsContainer.appendChild(post);

            // Clear the text areas after saving
            postTitle.value = '';
            postContent.value = '';
        } else {
            alert('Please enter both title and content.');
        }
    };

    // Event listener for the save post button
    savePostButton.addEventListener('click', savePost);
});
