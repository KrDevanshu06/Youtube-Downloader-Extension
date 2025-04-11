function addDownloadButton() {
    if (document.getElementById("yt-download-btn")) return;
  
    const btn = document.createElement("button");
    btn.id = "yt-download-btn";
    btn.innerText = "📥 Download (Edu)";
    btn.style.cssText = `
      background-color: #ff0000;
      color: white;
      border: none;
      padding: 8px;
      margin-top: 10px;
      cursor: pointer;
      border-radius: 4px;
      font-size: 14px;
    `;
  
    btn.onclick = () => {
      const videoUrl = window.location.href;
      chrome.runtime.sendMessage({ type: "DOWNLOAD_REQUEST", url: videoUrl });
    };
  
    const target = document.querySelector("#above-the-fold #top-level-buttons-computed");
    if (target) target.appendChild(btn);
  }
  
  // Observe for SPA navigation changes (YouTube dynamically changes pages)
  const observer = new MutationObserver(() => {
    addDownloadButton();
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
  