const initialData = [
    { id: 1, author: "Founder", text: "Welcome! Post nested replies here.", replies: [
        { id: 2, author: "Engineer", text: "Recursion rendering engine ready!", replies: [] }
    ]}
];

const container = document.getElementById('comments-container');

const renderComments = (commentsList, targetNode) => {
    commentsList.forEach(comment => {
        const wrapper = document.createElement('div');
        wrapper.className = 'comment-box';
        
        const content = document.createElement('div');
        content.className = 'comment-content';
        content.innerHTML = `
            <div class="comment-author">@${comment.author}</div>
            <div class="comment-body">${comment.text}</div>
            <div class="actions">
                <button class="action-btn reply">↩ Reply</button>
                <button class="action-btn delete">✖ Delete</button>
            </div>
        `;
        wrapper.appendChild(content);

        if (comment.replies && comment.replies.length > 0) {
            renderComments(comment.replies, wrapper);
        }

        targetNode.appendChild(wrapper);
    });
};

renderComments(initialData, container);

container.addEventListener('click', (e) => {
    // Handle Remove
    if (e.target.classList.contains('delete')) {
        const box = e.target.closest('.comment-box');
        box.style.opacity = '0';
        setTimeout(() => box.remove(), 200);
    }

    // Handle Toggle Reply Input
    if (e.target.classList.contains('reply')) {
        const bubble = e.target.closest('.comment-content');
        if (bubble.querySelector('.reply-input-box')) return;

        const row = document.createElement('div');
        row.className = 'reply-input-box';
        row.innerHTML = `<input type="text" placeholder="Type your nested thoughts..." autofocus><button class="post-btn">Post</button>`;
        bubble.appendChild(row);
    }

    // Handle Post Finalization
    if (e.target.classList.contains('post-btn')) {
        const row = e.target.closest('.reply-input-box');
        const textVal = row.querySelector('input').value.trim();
        if (!textVal) return;

        const parentWrapper = e.target.closest('.comment-box');
        
        // Inject real node recursively
        renderComments([{ id: Date.now(), author: "You", text: textVal, replies: [] }], parentWrapper);
        row.remove();
    }
});
