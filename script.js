// Initialize videos array from localStorage
let videos = JSON.parse(localStorage.getItem('videos')) || [];

// DOM Elements
const videoForm = document.getElementById('videoForm');
const videoTitleInput = document.getElementById('videoTitle');
const videoUrlInput = document.getElementById('videoUrl');
const videoViewsInput = document.getElementById('videoViews');
const videosList = document.getElementById('videosList');

// Add video form submission
videoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newVideo = {
        id: Date.now(),
        title: videoTitleInput.value,
        url: videoUrlInput.value,
        views: parseInt(videoViewsInput.value) || 0,
        dateAdded: new Date().toLocaleString()
    };
    
    videos.push(newVideo);
    saveVideos();
    renderVideos();
    
    // Reset form
    videoForm.reset();
    videoViewsInput.value = '0';
});

// Sort videos by views (descending)
function sortVideos() {
    return [...videos].sort((a, b) => b.views - a.views);
}

// Render videos to the DOM
function renderVideos() {
    videosList.innerHTML = '';
    
    const sortedVideos = sortVideos();
    
    if (sortedVideos.length === 0) {
        videosList.innerHTML = '<p class="empty-message">No videos added yet. Add one to get started!</p>';
        return;
    }
    
    sortedVideos.forEach((video, index) => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <div class="video-info">
                <div style="display: flex; align-items: center;">
                    <div class="video-rank">#${index + 1}</div>
                    <div>
                        <div class="video-title">${escapeHtml(video.title)}</div>
                        <a href="${video.url}" target="_blank" class="video-url">${video.url}</a>
                    </div>
                </div>
            </div>
            <div class="video-stats">
                <div class="view-count">
                    <div class="view-label">Views</div>
                    <div class="view-number">${video.views.toLocaleString()}</div>
                </div>
                <div class="video-actions">
                    <button class="btn-increment" onclick="incrementViews(${video.id})">+1 View</button>
                    <button class="btn-delete" onclick="deleteVideo(${video.id})">Delete</button>
                </div>
            </div>
        `;
        videosList.appendChild(videoCard);
    });
}

// Increment views for a video
function incrementViews(videoId) {
    const video = videos.find(v => v.id === videoId);
    if (video) {
        video.views++;
        saveVideos();
        renderVideos();
    }
}

// Delete a video
function deleteVideo(videoId) {
    if (confirm('Are you sure you want to delete this video?')) {
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

// Initial render
renderVideos();