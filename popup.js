// popup.js
async function getCurrentTabUrl() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab.url;
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
    const statusEl = document.getElementById("status");
    const container = document.getElementById("formats-container");
    const titleEl = document.getElementById("video-title");
  
    const tabUrl = await getCurrentTabUrl();
  
    if (!tabUrl.includes("youtube.com/watch")) {
      statusEl.textContent = "⚠️ Not a YouTube video page.";
      return;
    }
  
    try {
      const backendUrl = `https://your-backend.onrender.com/get-links?url=${encodeURIComponent(tabUrl)}`;
      const res = await fetch(backendUrl);
      const data = await res.json();
  
      statusEl.style.display = "none";
      titleEl.textContent = `🎬 ${data.title}`;
  
      if (!data.formats || data.formats.length === 0) {
        container.innerHTML = "<p>No formats found.</p>";
        return;
      }
  
      data.formats.forEach(format => {
        const btn = document.createElement("button");
        btn.className = "format-btn";
        btn.textContent = `Download ${format.ext.toUpperCase()} ${format.resolution || ''}`;
        btn.onclick = () => {
          chrome.tabs.create({ url: format.url });
        };
        container.appendChild(btn);
      });
    } catch (err) {
      statusEl.textContent = "❌ Failed to load formats.";
      console.error(err);
    }
  });
  