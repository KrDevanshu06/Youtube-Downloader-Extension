from flask import Flask, request, jsonify
from flask_cors import CORS
import yt_dlp

app = Flask(__name__)
CORS(app)

@app.route("/formats")
def get_formats():
    video_url = request.args.get("url")
    if not video_url:
        return jsonify({"error": "Missing URL"}), 400

    ydl_opts = {
        "quiet": True,
        "skip_download": True,
        "forcejson": True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            formats = [
                {
                    "ext": f["ext"],
                    "resolution": f.get("format_note"),
                    "url": f["url"]
                }
                for f in info.get("formats", [])
                if f.get("url")
            ]
            return jsonify({
                "title": info.get("title"),
                "formats": formats
            })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
