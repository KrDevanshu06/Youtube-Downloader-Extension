# 📥 YouTube Downloader Extension

![License](https://img.shields.io/badge/License-GPLv3-blue.svg)
![Version](https://img.shields.io/badge/Version-1.0-brightgreen)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-orange)

A lightweight Chrome extension that adds a download button to YouTube videos for educational purposes. This project includes a backend server powered by Flask and `yt-dlp` to fetch video formats and handle downloads.

---

## 🚀 Features

- 🎬 Fetch available video formats for YouTube videos.
- 📥 Download videos in your preferred format and resolution.
- 🔄 Dynamic button injection for YouTube's single-page application (SPA).
- 🖥️ Backend server for secure and efficient video processing.

---

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/KrDevanshu06/Youtube-Downloader-Extension.git
cd Youtube-Downloader-Extension
```

### 2. Install Backend Dependencies
Make sure you have Python installed, then run:
```bash
pip install -r requirements.txt
```

### 3. Load the Extension in Chrome
1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer Mode**.
3. Click **Load unpacked** and select the project folder.

---

## 🖥️ Usage

1. Start the Flask backend server:
   ```bash
   python server.py
   ```
2. Open a YouTube video in Chrome.
3. Click the extension icon to open the popup.
4. Select your desired format and resolution, then click **Download**.

---

## 📂 Project Structure

```
📦 Youtube-Downloader-Extension
├── 📄 content.js         # Injects the download button into YouTube pages
├── 📄 popup.js           # Handles popup logic and API communication
├── 📄 popup.html         # Extension popup UI
├── 📄 styles.css         # Styling for the popup
├── 📄 server.py          # Flask backend for fetching formats and downloads
├── 📄 manifest.json      # Chrome extension manifest
├── 📄 requirements.txt   # Python dependencies
├── 📄 LICENSE            # GNU General Public License v3.0
└── 📄 README.md          # Project documentation
```

---

## 🔧 Technologies Used

- **Frontend**: JavaScript, HTML, CSS
- **Backend**: Python, Flask, `yt-dlp`
- **Browser API**: Chrome Extensions API

---

## ⚙️ API Endpoints

### `/get-links`
- **Method**: `GET`
- **Description**: Fetches available video formats for a given YouTube URL.
- **Query Parameters**:
  - `url` (string): The YouTube video URL.

### `/download`
- **Method**: `GET`
- **Description**: Downloads the video in the specified format.
- **Query Parameters**:
  - `url` (string): The YouTube video URL.
  - `format_id` (string): The format ID to download.

---

## 🛡️ License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

---

## 📸 Screenshots

### Popup Interface
![Popup Interface](https://via.placeholder.com/300x200?text=Popup+Interface)

### Download Button on YouTube
![Download Button](https://via.placeholder.com/300x200?text=Download+Button)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature-name'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## 📧 Contact

For questions or feedback, feel free to reach out:
- **Email**: [Write me here](mailto:krdevanshu06@rediffmail.com)
- **GitHub**: [KrDevanshu06](https://github.com/KrDevanshu06)

---

## ⚠️ Disclaimer

This extension is for **educational purposes only**. Downloading copyrighted content without permission may violate YouTube's terms of service and copyright laws.
