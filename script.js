// Initialize videos array from localStorage
let videos = JSON.parse(localStorage.getItem('videos')) || [];

// DOM Elements
const videoForm = document.getElementById('videoForm');
const videoTitleInput = document.getElementById('videoTitle');
const videoUrlInput = document.getElementById('videoUrl');
const videoViewsInput = document.getElementById('videoViews');
const videosList = document.getElementById('videosList');
const totalCountSpan = document.getElementById('totalCount');

// Add video form submission
videoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addVideo(videoTitleInput.value, videoUrlInput.value, parseInt(videoViewsInput.value) || 0);
});

// Main add video function
function addVideo(title, url, views) {
    if (!title.trim()) {
        alert('Please enter a video title');
        return;
    }
    if (!url.trim()) {
        alert('Please enter a video URL');
        return;
    }

    const newVideo = {
        id: Date.now(),
        title: title.trim(),
        url: url.trim(),
        views: views || 0,
        dateAdded: new Date().toLocaleString()
    };
    
    videos.push(newVideo);
    saveVideos();
    renderVideos();
    
    // Reset form and focus on title
    videoForm.reset();
    videoViewsInput.value = '0';
    videoTitleInput.focus();
}

// Quick add with pre-filled values
function quickAddVideo(title, url, views) {
    videoTitleInput.value = title;
    videoUrlInput.value = url;
    videoViewsInput.value = views;
    videoTitleInput.focus();
}

// Sort videos by views (descending)
function sortVideos() {
    return [...videos].sort((a, b) => b.views - a.views);
}

// Render videos to the DOM
function renderVideos() {
    videosList.innerHTML = '';
    
    const sortedVideos = sortVideos();
    
    // Update total count
    totalCountSpan.textContent = `${sortedVideos.length} video${sortedVideos.length !== 1 ? 's' : ''}`;
    
    if (sortedVideos.length === 0) {
        videosList.innerHTML = '<p class="empty-message">No videos added yet. Start tracking! 🚀</p>';
        return;
    }
    
    sortedVideos.forEach((video, index) => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <div class="video-info">
                <div class="video-rank">#${index + 1}</div>
                <div class="video-details">
                    <div class="video-title">${escapeHtml(video.title)}</div>
                    <a href="${video.url}" target="_blank" class="video-url">🔗 ${truncateUrl(video.url)}</a>
                </div>
            </div>
            <div class="video-stats">
                <div class="view-count">
                    <div class="view-number">${video.views.toLocaleString()}</div>
                    <div class="view-label">Views</div>
                </div>
                <div class="video-actions">
                    <button class="btn-increment" onclick="incrementViews(${video.id})" title="Add 1 view">+</button>
                    <button class="btn-increment-10" onclick="incrementViews(${video.id}, 10)" title="Add 10 views">+10</button>
                    <button class="btn-edit" onclick="editVideo(${video.id})" title="Edit views">✎</button>
                    <button class="btn-delete" onclick="deleteVideo(${video.id})" title="Delete">✕</button>
                </div>
            </div>
        `;
        videosList.appendChild(videoCard);
    });
}

// Increment views for a video
function incrementViews(videoId, amount = 1) {
    const video = videos.find(v => v.id === videoId);
    if (video) {
        video.views += amount;
        saveVideos();
        renderVideos();
    }
}

// Edit video views
function editVideo(videoId) {
    const video = videos.find(v => v.id === videoId);
    if (video) {
        const newViews = prompt(`Edit views for "${video.title}":`, video.views);
        if (newViews !== null && newViews !== '') {
            const parsedViews = parseInt(newViews);
            if (!isNaN(parsedViews) && parsedViews >= 0) {
                video.views = parsedViews;
                saveVideos();
                renderVideos();
            } else {
                alert('Please enter a valid number');
            }
        }
    }
}

// Delete a video
function deleteVideo(videoId) {
    const video = videos.find(v => v.id === videoId);
    if (video && confirm(`Delete "${video.title}"?`)) {
        videos = videos.filter(v => v.id !== videoId);
        saveVideos();
        renderVideos();
    }
}

// Save videos to localStorage
function saveVideos() {
    localStorage.setItem('videos', JSON.stringify(videos));
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Truncate long URLs
function truncateUrl(url) {
    return url.length > 50 ? url.substring(0, 50) + '...' : url;
}

// Initial render
renderVideos();