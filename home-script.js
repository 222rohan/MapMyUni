let currentModal = null;

const map = L.map('leaflet-map').setView([12.8399, 80.1365], 17);
let lastHighlighted = null;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '© OpenStreetMap'
}).addTo(map);

function showModal(title, content, latlng = null, moreLink = null, image = null) {
    if (currentModal) {
        currentModal.remove();
        currentModal = null;
    }

    const modal = document.createElement('div');
    modal.className = 'map-modal';

    modal.innerHTML = `
        <div class="map-modal-content">
            <span class="modal-close" onclick="this.closest('.map-modal').remove(); currentModal = null;">✕</span>
            <h3>${title}</h3>
            ${image ? `<img src="${image}" alt="${title}" class="modal-image" />` : ''}
            <p>${content}</p>
            ${moreLink ? `
                <div class="modal-more">
                    <a href="${moreLink}" target="_blank" class="read-more-button">Read More</a>
                </div>
            ` : ''}
        </div>
    `;

    document.body.appendChild(modal);

    if (latlng) {
        const point = map.latLngToContainerPoint(latlng);
        modal.style.position = 'absolute';
        modal.style.left = `${point.x + 20}px`;
        modal.style.top = `${point.y - 100}px`;
    }

    currentModal = modal;
}

const markerMap = {};

const points = [
    {
        name: 'Admin Building',
        lat: 12.83957038303225,
        lng: 80.13747977324925,
        content: 'Admin and Classrooms',
        image: '/images/admin.jpg',
        moreLink: '/locations/admin'
    },
    {
        name: 'Jasmine Annex',
        lat: 12.836874401872773,
        lng: 80.1353294935948,
        content: 'First year boys hostel',
        image: '/images/jasmine.jpg',
        moreLink: '/locations/hostel'
    },
    {
        name: 'Library',
        lat: 12.8390733564217,
        lng: 80.13820326190206,
        content: 'Central Library with digital access',
        image: '/images/library.jpg',
        moreLink: '/locations/library'
    },
    {
        name: 'Academic Block',
        lat: 12.838766081513057,
        lng: 80.13702031474783,
        content: 'All classrooms of departments',
        image: '/images/academic.jpg',
        moreLink: '/locations/academic'
    },
    {
        name: 'Cafeteria',
        lat: 12.837853926836036,
        lng: 80.13847339312308,
        content: 'Snacks and drinks',
        image: '/images/cafeteria.jpg',
        moreLink: '/locations/cafeteria'
    },
    {
        name: 'Sports Complex',
        lat: 12.836449905878164,
        lng: 80.13781335604857,
        content: 'Badminton, TT, Carrom',
        image: '/images/sports.jpg',
        moreLink: '/locations/sports'
    }
];

const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const highlightIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

points.forEach(p => {
    const marker = L.marker([p.lat, p.lng], { icon: defaultIcon })
        .addTo(map)
        .on('click', () => {
            highlightMarker(marker, p.name);
            showModal(p.name, p.content, [p.lat, p.lng], p.moreLink, p.image);
        });

    markerMap[p.name] = marker;
});

function highlightMarker(marker, name) {
    if (lastHighlighted && lastHighlighted !== marker) {
        lastHighlighted.setIcon(defaultIcon);
    }
    marker.setIcon(highlightIcon);
    lastHighlighted = marker;
}

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