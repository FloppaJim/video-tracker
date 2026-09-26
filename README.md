# 🎬 Video Tracker

A simple and elegant web application to track video links and their view counts. Videos are automatically sorted from most viewed to least viewed.

## Features

✨ **Easy Video Management**
- Add videos with title, URL, and view count
- Automatic sorting by view count (most to least viewed)
- Increment views with a single click
- Delete videos anytime

💾 **Data Persistence**
- All videos are saved to your browser's local storage
- Your data persists between browser sessions

🎨 **Beautiful UI**
- Modern, responsive design
- Works perfectly on desktop and mobile
- Gradient backgrounds and smooth animations
- Ranked list with view count display

## How to Use

1. **Open the Website**
   - Simply open `index.html` in your web browser
   - Or visit the live hosted version

2. **Add a Video**
   - Enter the video title
   - Paste the video URL (works with YouTube, Vimeo, etc.)
   - Enter the current view count
   - Click "Add Video"

3. **Track Views**
   - Click "+1 View" to increment the view count
   - Videos automatically re-sort by view count
   - Watch your rankings update in real-time

4. **Manage Videos**
   - Click on the video URL to open it in a new tab
   - Click "Delete" to remove a video from your list

## Technical Details

- **Frontend**: HTML, CSS, JavaScript
- **Storage**: Browser LocalStorage (no database required)
- **Responsive**: Mobile-friendly design
- **No Dependencies**: Pure vanilla JavaScript

## File Structure

```
video-tracker/
├── index.html      # Main HTML file
├── styles.css      # Styling and responsive design
├── script.js       # JavaScript logic and interactions
└── README.md       # This file
```

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Opera: ✅ Full support

## Tips

- **Batch Import**: You can manually add multiple videos at once
- **View Management**: Use the +1 button to track view increments as they happen
- **URL Format**: Works with any video URL (YouTube, Vimeo, custom links, etc.)
- **Data Backup**: Your data is stored locally; clearing browser cache will delete your videos

## Future Enhancements

Possible features to add:
- Import/Export videos as JSON
- Multiple categories for organizing videos
- Date tracking for when videos were added
- Analytics and charts
- Dark mode

---

Enjoy tracking your videos! 🎥