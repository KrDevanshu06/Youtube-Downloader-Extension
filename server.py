from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import yt_dlp
import tempfile
import os

app = Flask(__name__)
CORS(app)

@app.route('/get-links')
def get_links():
    video_url = request.args.get('url')
    if not video_url:
        return jsonify({'error': 'No URL provided'}), 400

    ydl_opts = {
        'quiet': True,
        'skip_download': True,
        'extract_flat': False,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            formats = []
            for f in info.get('formats', []):
                if f.get('url') and f.get('vcodec') != 'none':
                    formats.append({
                        'format_id': f['format_id'],
                        'ext': f['ext'],
                        'resolution': f.get('resolution') or f.get('height'),
                        'filesize': f.get('filesize') or f.get('filesize_approx'),
                        'video_codec': f.get('vcodec'),
                        'audio_codec': f.get('acodec'),
                        'url': f['url'],
                    })

            return jsonify({'title': info.get('title'), 'formats': formats})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/download')
def download():
    video_url = request.args.get('url')
    format_id = request.args.get('format_id')
    if not video_url or not format_id:
        return jsonify({'error': 'URL or format ID missing'}), 400

    ydl_opts = {
        'quiet': True,
        'format': format_id,
        'outtmpl': os.path.join(tempfile.gettempdir(), '%(title)s.%(ext)s'),
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=True)
            file_path = ydl.prepare_filename(info)

        return send_file(file_path, as_attachment=True)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
