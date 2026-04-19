# Images

Drop local photos here. Current source: Google Drive (see images.js LOCAL_IMAGES flag).

## Naming conventions
- hero/: hero-1.jpg, hero-2.jpg, ... hero-5.jpg
- room1/ … room4/: room1-1.jpg, room1-2.jpg, etc.
- gallery/: gallery-1.jpg, gallery-2.jpg, ... (up to 46)

## Switching from Google Drive to local files
In src/data/images.js, change LOCAL_IMAGES to true.
All imageUrl() calls will then load from /images/ instead of Google Drive.
