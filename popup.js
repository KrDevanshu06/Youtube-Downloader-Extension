const BACKEND_URL = "http://127.0.0.1:5000"; // Replace with your real backend URL

async function getCurrentTabUrl() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab?.url || "";
}

document.addEventListener("DOMContentLoaded", async () => {
  const statusEl = document.getElementById("status");
  const container = document.getElementById("formats-container");
  const titleEl = document.getElementById("video-title");

  const tabUrl = await getCurrentTabUrl();

  if (!tabUrl.includes("youtube.com/watch")) {
    statusEl.textContent = "⚠️ Not a YouTube video page.";
    return;
  }

  try {
    const apiUrl = `${BACKEND_URL}/get-links?url=${encodeURIComponent(tabUrl)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();

    // Hide status if successful
    statusEl.style.display = "none";
    titleEl.textContent = `🎬 ${data.title || "Untitled Video"}`;

    if (!data.formats || data.formats.length === 0) {
      container.innerHTML = "<p>No formats found.</p>";
      return;
    }

    data.formats.forEach(format => {
      const btn = document.createElement("button");
      btn.className = "format-btn";
      btn.textContent = `Download ${format.ext.toUpperCase()} ${format.resolution || ''}`;
      
      btn.onclick = () => {
        // Route the download through the Flask backend
        const downloadUrl = `${BACKEND_URL}/download?url=${encodeURIComponent(tabUrl)}&format_id=${format.format_id}`;
        chrome.tabs.create({ url: downloadUrl });
      };

      container.appendChild(btn);
    });

  } catch (error) {
    statusEl.textContent = "❌ Failed to load formats.";
    console.error("Error fetching formats:", error);
  }
});
