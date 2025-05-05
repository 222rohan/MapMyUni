document.getElementById('search-input').addEventListener('input', function() {
    let searchTerm = this.value.toLowerCase();
    let topics = document.querySelectorAll('.forum-topic');

    topics.forEach(function(topic) {
        let title = topic.querySelector('.topic-title').textContent.toLowerCase();
        let snippet = topic.querySelector('.topic-snippet').textContent.toLowerCase();

        if (title.includes(searchTerm) || snippet.includes(searchTerm)) {
            topic.style.display = 'block';  // Show matching topic
        } else {
            topic.style.display = 'none';  // Hide non-matching topic
        }
    });
});

const modal = document.getElementById('new-discussion-modal');
const openModalButton = document.querySelector('.create-topic-btn');
const closeModalButton = document.querySelector('.close-btn');
const form = document.getElementById('new-discussion-form');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const forumTopics = document.querySelector('.forum-topics');

searchInput.addEventListener('input', filterTopics);
categoryFilter.addEventListener('change', filterTopics);

function filterTopics() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const topics = forumTopics.querySelectorAll('.forum-topic');

    topics.forEach(function(topic) {
        const title = topic.querySelector('.topic-title').textContent.toLowerCase();
        const snippet = topic.querySelector('.topic-snippet').textContent.toLowerCase();
        const category = topic.querySelector('.topic-category').textContent.toLowerCase();

        const matchesSearch = title.includes(searchTerm) || snippet.includes(searchTerm);
        const matchesCategory = selectedCategory ? category.includes(selectedCategory) : true;

        // Display or hide the topic based on the filters
        if (matchesSearch && matchesCategory) {
            topic.style.display = 'block';  // Show matching topic
        } else {
            topic.style.display = 'none';  // Hide non-matching topic
        }
    });
}

openModalButton.addEventListener('click', function() {
    modal.style.display = 'block';
    clearForm();
});

closeModalButton.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close the modal if clicked outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission to server

    const title = document.getElementById('topic-title').value;
    const category = document.getElementById('topic-category').value;
    const content = document.getElementById('topic-content').value;

    // Create new topic HTML structure
    const newTopicHTML = `
        <div class="forum-topic">
            <span class="topic-category ${category}">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
            <h2 class="topic-title">${title}</h2>
            <p class="topic-snippet">${content}</p>
            <div class="topic-meta">
                <span class="posts">0 posts</span>
                <span class="latest">Updated: Just now</span>
            </div>
            <a href="#" class="topic-readmore">Join Discussion →</a>
        </div>
    `;

    // Append the new topic to the forum
    forumTopics.insertAdjacentHTML('afterbegin', newTopicHTML);

    // Close the modal and clear the form
    modal.style.display = 'none';
    clearForm();
});

function clearForm() {
    document.getElementById('new-discussion-form').reset();
}