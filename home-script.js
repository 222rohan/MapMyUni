// Initialize the map
const map = L.map('leaflet-map', {
    scrollWheelZoom: false, // Disable scroll wheel zoom to solve scrolling issues
    zoomControl: true,
}).setView([12.8399, 80.1365], 17);

let lastHighlighted = null;

// Add the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Map will zoom with scroll only when user clicks on it explicitly
let mapInteractionEnabled = false;

// When mouse enters the map container
document.getElementById('leaflet-map').addEventListener('mouseenter', function() {
    const mapElement = document.getElementById('leaflet-map');
    
    // Add 'click-to-interact' message if not already interacting
    if (!mapInteractionEnabled) {
        const interactMsg = document.createElement('div');
        interactMsg.id = 'map-interact-msg';
        interactMsg.innerHTML = 'Click to interact with map';
        interactMsg.style.position = 'absolute';
        interactMsg.style.top = '50%';
        interactMsg.style.left = '50%';
        interactMsg.style.transform = 'translate(-50%, -50%)';
        interactMsg.style.backgroundColor = 'rgba(0,0,0,0.6)';
        interactMsg.style.color = 'white';
        interactMsg.style.padding = '10px 15px';
        interactMsg.style.borderRadius = '5px';
        interactMsg.style.pointerEvents = 'none';  // Make sure clicks pass through this element
        interactMsg.style.zIndex = '999';
        mapElement.appendChild(interactMsg);
    }
});

// When mouse leaves the map container
document.getElementById('leaflet-map').addEventListener('mouseleave', function() {
    // Remove message if present
    const msgElement = document.getElementById('map-interact-msg');
    if (msgElement) {
        msgElement.remove();
    }
    
    // Disable interaction when leaving the map
    if (mapInteractionEnabled) {
        map.scrollWheelZoom.disable();
        mapInteractionEnabled = false;
    }
});

// Enable map interaction when clicked
document.getElementById('leaflet-map').addEventListener('click', function() {
    // Remove message if present
    const msgElement = document.getElementById('map-interact-msg');
    if (msgElement) {
        msgElement.remove();
    }
    
    if (!mapInteractionEnabled) {
        map.scrollWheelZoom.enable();
        mapInteractionEnabled = true;
    }
});
const markerMap = {};
// Marker definitions with enhanced data
const points = [
    {
        
        name: 'Admin Building',
        lat: 12.83957038303225,
        lng: 80.13747977324925,
        content: 'Houses the administrative offices.',
        images: [
            './images/admin.png',
        ],
        comments: [
            {
                author: 'AK',
                authorName: 'Anjali Kumar',
                date: 'May 1, 2025',
                content: 'The admin building has excellent modern facilities. The air conditioning works really well even during summer.',
                upvotes: 15,
                downvotes: 2
            }
        ]
    },
    {
        name: 'Academic Block',
        lat: 12.838766081513057,
        lng: 80.13702031474783,
        content: 'All classrooms of departments',
        image: '/images/academic.jpg',
        moreLink: '/locations/academic',
        images: [
            './images/acads.jpg',
        ],
        comments: [
            {
                author: 'PN',
                authorName: 'Prakash Nair',
                date: 'May 4, 2025',
                content: 'Classrooms are spacious and well-equipped with projectors and whiteboards.',
                upvotes: 18,
                downvotes: 1
            },
            {
                author: 'RS',
                authorName: 'Rohan Shenoy',
                date: 'April 29, 2025',
                content: 'Well maintained and clean. The air conditioning is a lifesaver during summer.',
                upvotes: 14,
                downvotes: 0
            },
        ]


    },
    {
        name: 'Jasmine Annex',
        lat: 12.836874401872773,
        lng: 80.1353294935948,
        content: 'First year boys hostel with modern amenities and shared common spaces.',
        images: [
            './images/jasmine.jpg',
        ],
        comments: [
            {
                author: 'PN',
                authorName: 'Prakash Nair',
                date: 'May 2, 2025',
                content: 'The rooms are spacious compared to other hostel buildings. Good ventilation too.',
                upvotes: 18,
                downvotes: 1
            },
            {
                author: 'AT',
                authorName: 'Arjun Tiwari',
                date: 'April 29, 2025',
                content: 'Common room has table tennis and carrom boards which is great for relaxing after classes.',
                upvotes: 14,
                downvotes: 0
            },
            {
                author: 'KG',
                authorName: 'Karan Gupta',
                date: 'April 26, 2025',
                content: 'Wi-Fi can be spotty sometimes, better connection near the common areas.',
                upvotes: 22,
                downvotes: 2
            },
            {
                author: 'RS',
                authorName: 'Rohit Singh',
                date: 'April 24, 2025',
                content: 'The laundry service is very convenient, but gets crowded on weekends.',
                upvotes: 9,
                downvotes: 1
            },
            {
                author: 'AM',
                authorName: 'Aditya Mishra',
                date: 'April 21, 2025',
                content: 'Hot water available during morning hours only. Plan accordingly!',
                upvotes: 16,
                downvotes: 3
            }
        ]
    },
    {
        name: 'Library',
        lat: 12.8390733564217,
        lng: 80.13820326190206,
        content: 'Central Library with extensive physical and digital resources.',
        images: [
            './images/library.jpg',
        ],
        comments: [
            {
                author: 'SM',
                authorName: 'Sneha Mehta',
                date: 'May 3, 2025',
                content: 'The silent study zones on the third floor are perfect for exam preparation.',
                upvotes: 25,
                downvotes: 0
            },
            {
                author: 'VK',
                authorName: 'Vikash Kumar',
                date: 'May 1, 2025',
                content: 'Digital resources are extensive, but the search interface could be more user-friendly.',
                upvotes: 17,
                downvotes: 3
            },
            {
                author: 'PG',
                authorName: 'Priya Gupta',
                date: 'April 29, 2025',
                content: 'I love the 24/7 access during exam season. Great initiative by the university.',
                upvotes: 30,
                downvotes: 1
            },
            {
                author: 'RK',
                authorName: 'Rajesh Kumar',
                date: 'April 27, 2025',
                content: 'The librarian is very helpful with research queries and finding rare resources.',
                upvotes: 11,
                downvotes: 0
            },
            {
                author: 'AV',
                authorName: 'Anita Verma',
                date: 'April 24, 2025',
                content: 'Group study rooms need to be booked at least 3 days in advance during peak times.',
                upvotes: 19,
                downvotes: 2
            }
        ]
    },
    {
        name: 'Cafeteria',
        lat: 12.837853926836036,
        lng: 80.13847339312308,
        content: 'Snacks and drinks',
        image: './images/cafeteria.jpg',
        moreLink: '/locations/cafeteria',
        images: [
            './images/cafeteria.jpg',
        ],
        comments: [
            {
                author: 'SM',
                authorName: 'Sneha Mehta',
                date: 'May 3, 2025',
                content: 'The cafeteria has a great variety of snacks and drinks.',
                upvotes: 20,
                downvotes: 12
            },
            {
                author: 'VK',
                authorName: 'Vikash Kumar',
                date: 'May 5, 2025',
                content: 'The biriyani is overpriced but tastes good.',
                upvotes: 17,
                downvotes: 3
            },
        ]
    },
    {
        name: 'Sports Complex',
        lat: 12.836449905878164,
        lng: 80.13781335604857,
        content: 'Badminton, TT, Carrom',
        image: '/images/sports.jpg',
        moreLink: '/locations/sports',
        images: [
            './images/sports.jpg',
        ],
        comments: [
            {
                author: 'SD',
                authorName: 'Sai Dinesh',
                date: 'May 1, 2025',
                content: 'The sports complex has excellent facilities for badminton and table tennis.',
                upvotes: 15,
                downvotes: 2
            },
            {
                author: 'RM',
                authorName: 'Ram M.',
                date: 'May 5, 2025',
                content: 'The carrom boards are always available and in good condition. But the lighting could be better.',
                upvotes: 37,
                downvotes: 7
            },
        ]
    }
];

// Create the modal container - will be populated when markers are clicked
const createModalContainer = () => {
    const modalContainer = document.createElement('div');
    modalContainer.id = 'map-modal-container';
    modalContainer.style.display = 'none';
    modalContainer.style.position = 'absolute';
    modalContainer.style.top = '0';
    modalContainer.style.width = '35%';
    modalContainer.style.right = 'auto'; // override the full-width setting
    modalContainer.style.bottom = '0';
    modalContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    modalContainer.style.zIndex = '1000';
    modalContainer.style.padding = '20px';
    modalContainer.style.overflowY = 'auto';
    modalContainer.style.fontSize = '16px';
    
    // Add to map container
    document.getElementById('leaflet-map').appendChild(modalContainer);
    return modalContainer;
};

// Create and append modal container
const modalContainer = createModalContainer();

const redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const defaultIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

let activeMarker = null;

points.forEach(point => {
    const marker = L.marker([point.lat, point.lng], { icon: defaultIcon }).addTo(map);
    marker.bindTooltip(point.name);

    marker.on('click', function(e) {
        if (activeMarker && activeMarker !== marker) {
            activeMarker.setIcon(defaultIcon);
        }

        marker.setIcon(redIcon);
        activeMarker = marker;

        showPointModal(point);
        L.DomEvent.stopPropagation(e);
        
    });
    markerMap[point.name] = marker;
});


// Format date to a more readable format
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Show modal with point details
function showPointModal(point) {
    // Disable map scrolling when modal is open
    map.scrollWheelZoom.disable();
    mapInteractionEnabled = false;
    
    // Clear previous content
    modalContainer.innerHTML = '';
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.fontSize = '24px';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.border = 'none';
    closeButton.style.background = 'transparent';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = closeModal;
    modalContainer.appendChild(closeButton);
    
    // Add title
    const title = document.createElement('h2');
    title.textContent = point.name;
    title.style.marginBottom = '10px';
    modalContainer.appendChild(title);
    
    // Add description
    const description = document.createElement('p');
    description.textContent = point.content;
    description.style.marginBottom = '20px';
    modalContainer.appendChild(description);
    
    // Create image gallery
    const imageGallery = document.createElement('div');
    imageGallery.style.display = 'flex';
    imageGallery.style.gap = '10px';
    imageGallery.style.overflowX = 'auto';
    imageGallery.style.marginBottom = '20px';
    imageGallery.style.padding = '10px 0';
    
    // Add images
    point.images.forEach(imgSrc => {
        const imgContainer = document.createElement('div');
        imgContainer.style.flexShrink = '0';
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.width = '300px';
        img.style.height = 'auto';
        img.style.borderRadius = '5px';
        
        imgContainer.appendChild(img);
        imageGallery.appendChild(imgContainer);
    });
    
    modalContainer.appendChild(imageGallery);
    
    // Comments section title
    const commentsTitle = document.createElement('h3');
    commentsTitle.textContent = 'Comments';
    commentsTitle.style.marginBottom = '10px';
    modalContainer.appendChild(commentsTitle);
    
    // Comments container
    const commentsContainer = document.createElement('div');
    commentsContainer.style.marginBottom = '20px';
    
    // Add top 5 comments
    point.comments.slice(0, 5).forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.style.padding = '10px';
        commentDiv.style.marginBottom = '10px';
        commentDiv.style.borderBottom = '1px solid #eee';
        
        // Comment header with author and date
        const commentHeader = document.createElement('div');
        commentHeader.style.display = 'flex';
        commentHeader.style.justifyContent = 'space-between';
        commentHeader.style.marginBottom = '5px';
        
        const authorSpan = document.createElement('span');
        authorSpan.innerHTML = `<strong>${comment.authorName}</strong> (${comment.author})`;
        authorSpan.style.fontWeight = 'bold';
        
        const dateSpan = document.createElement('span');
        dateSpan.textContent = comment.date;
        dateSpan.style.color = '#666';
        
        commentHeader.appendChild(authorSpan);
        commentHeader.appendChild(dateSpan);
        commentDiv.appendChild(commentHeader);
        
        // Comment content
        const content = document.createElement('p');
        content.textContent = comment.content;
        content.style.marginBottom = '10px';
        commentDiv.appendChild(content);
        
        // Upvote/downvote section
        const votesDiv = document.createElement('div');
        votesDiv.style.display = 'flex';
        votesDiv.style.gap = '15px';
        
        const upvotes = document.createElement('span');
        upvotes.innerHTML = `<span style="color: green;">&#x1F44D; ${comment.upvotes}</span>`;
        
        const downvotes = document.createElement('span');
        downvotes.innerHTML = `<span style="color: red;">&#x1F44E; ${comment.downvotes}</span>`;
        
        votesDiv.appendChild(upvotes);
        votesDiv.appendChild(downvotes);
        commentDiv.appendChild(votesDiv);
        
        commentsContainer.appendChild(commentDiv);
    });
    
    modalContainer.appendChild(commentsContainer);
    
    // Add "View All Comments" link
    const viewAllLink = document.createElement('a');
    viewAllLink.href = `#location/${point.name.toLowerCase().replace(/\s+/g, '-')}`;
    viewAllLink.textContent = 'View All Comments';
    viewAllLink.style.display = 'block';
    viewAllLink.style.textAlign = 'right';
    viewAllLink.style.color = '#0066cc';
    viewAllLink.style.textDecoration = 'none';
    viewAllLink.style.fontWeight = 'bold';
    viewAllLink.onclick = function(e) {
        e.preventDefault();
        // Here you would implement navigation to a full page for this location
        console.log(`Navigate to full page for: ${point.name}`);
        // For now, just close the modal
        closeModal();
    };
    
    modalContainer.appendChild(viewAllLink);
    
    // Show the modal
    modalContainer.style.display = 'block';
    
    // Prevent map clicks from propagating when clicking inside modal
    modalContainer.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Close the modal
function closeModal() {
    modalContainer.style.display = 'none';
    
    // Only re-enable map interaction if the user had previously clicked to interact
    if (mapInteractionEnabled) {
        map.scrollWheelZoom.enable();
    }
}

// Handle ESC key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalContainer.style.display === 'block') {
        closeModal();
    }
});

// Stop propagation of scroll events in the modal to prevent map zooming
modalContainer.addEventListener('wheel', function(e) {
    e.stopPropagation();
});


function gotoMarker(name) {
    const marker = markerMap[name];
    const data = points.find(p => p.name === name);

    if (marker && data) {
        map.flyTo([data.lat, data.lng], 18, { animate: true });

        setTimeout(() => {
            highlightMarker(marker, name);
            showModal(name, data.content, [data.lat, data.lng], data.moreLink, data.image);
        }, 500);

    } else {
        alert(`Marker for "${name}" not found`);
    }
}