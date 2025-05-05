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
const forumTopics = document.querySelector('.forum-topics');

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

// Modal functionality
const locationModal = document.getElementById("new-location-modal");
const openLocationModalBtn = document.getElementById("open-location-modal-btn");
const closeLocationModalBtn = document.querySelector("#new-location-modal .close-btn");

openLocationModalBtn.addEventListener("click", () => {
    locationModal.style.display = "block";
});

closeLocationModalBtn.addEventListener("click", () => {
    locationModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target == locationModal) {
        locationModal.style.display = "none";
    }
});

// Filter functionality
const locationFilter = document.getElementById("location-filter");
const locationCards = document.querySelectorAll(".location-card");

locationFilter.addEventListener("change", () => {
    const filterValue = locationFilter.value;
    
    locationCards.forEach(card => {
        if (filterValue === "all" || card.dataset.category === filterValue) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
});

// Search functionality
const searchInput = document.getElementById("location-search-input");

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    
    locationCards.forEach(card => {
        const locationName = card.querySelector(".location-name").textContent.toLowerCase();
        const locationDescription = card.querySelector(".location-description").textContent.toLowerCase();
        
        if (locationName.includes(searchTerm) || locationDescription.includes(searchTerm)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
});

// Comment form submission
const commentForms = document.querySelectorAll(".add-comment-form");

commentForms.forEach(form => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const commentText = form.querySelector("textarea").value;
        if (!commentText.trim()) return;
        
        const commentsList = form.closest(".location-comments").querySelector(".comments-list");
        const commentCount = form.closest(".location-comments").querySelector(".comment-count");
        
        // Create new comment element
        const newComment = document.createElement("div");
        newComment.className = "comment";
        newComment.innerHTML = `
            <div class="comment-header">
                <span class="commenter">You</span>
                <span class="comment-date">Just now</span>
            </div>
            <p class="comment-text">${commentText}</p>
        `;
        
        // Add to comments list
        commentsList.appendChild(newComment);
        
        // Update comment count
        const currentCount = parseInt(commentCount.textContent.match(/\d+/)[0]);
        commentCount.textContent = `(${currentCount + 1})`;
        
        // Clear the form
        form.querySelector("textarea").value = "";
    });
});

// New location form submission
const newLocationForm = document.getElementById("new-location-form");

newLocationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const locationName = document.getElementById("location-name").value;
    const locationCategory = document.getElementById("location-category").value;
    const locationDescription = document.getElementById("location-description").value;
    
    // Create new location card
    const newLocationCard = document.createElement("div");
    newLocationCard.className = "location-card";
    newLocationCard.dataset.category = locationCategory;
    newLocationCard.innerHTML = `
        <div class="location-image">
            <img src="/api/placeholder/400/250" alt="${locationName}" />
        </div>
        <div class="location-info">
            <span class="location-category ${locationCategory}">${locationCategory.charAt(0).toUpperCase() + locationCategory.slice(1)}</span>
            <h2 class="location-name">${locationName}</h2>
            <p class="location-description">${locationDescription}</p>
            
            <div class="location-comments">
                <h3>Student Comments <span class="comment-count">(0)</span></h3>
                
                <div class="comments-list">
                    <!-- No comments yet -->
                </div>
                
                <form class="add-comment-form">
                    <textarea placeholder="Share your experience..." required></textarea>
                    <button type="submit">Post Comment</button>
                </form>
            </div>
        </div>
    `;
    
    // Add event listener to the new comment form
    const newCommentForm = newLocationCard.querySelector(".add-comment-form");
    newCommentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const commentText = newCommentForm.querySelector("textarea").value;
        if (!commentText.trim()) return;
        
        const commentsList = newCommentForm.closest(".location-comments").querySelector(".comments-list");
        const commentCount = newCommentForm.closest(".location-comments").querySelector(".comment-count");
        
        // Create new comment element
        const newComment = document.createElement("div");
        newComment.className = "comment";
        newComment.innerHTML = `
            <div class="comment-header">
                <span class="commenter">You</span>
                <span class="comment-date">Just now</span>
            </div>
            <p class="comment-text">${commentText}</p>
        `;
        
        // Add to comments list
        commentsList.appendChild(newComment);
        
        // Update comment count
        const currentCount = parseInt(commentCount.textContent.match(/\d+/)[0]);
        commentCount.textContent = `(${currentCount + 1})`;
        
        // Clear the form
        newCommentForm.querySelector("textarea").value = "";
    });
    
    // Add new location to the list
    document.querySelector(".location-cards").appendChild(newLocationCard);
    
    // Clear the form and close modal
    newLocationForm.reset();
    locationModal.style.display = "none";
});