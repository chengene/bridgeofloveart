/**
 * watchNow.js — Automatic Video Updates for the WatchNow Section
 *
 * Dynamically fetches the latest videos from the YouTube channel using the
 * YouTube RSS feed, parsed via the rss2json public API (no API key needed).
 * Falls back to the built-in video list if the network request fails.
 *
 * ─── HOW TO CONFIGURE ────────────────────────────────────────────────────────
 *
 *  1. Find your YouTube Channel ID (the "UCxxxx..." string):
 *       a. Go to https://www.youtube.com/account_advanced while signed in, OR
 *       b. Open any of your channel videos → right-click the page → View Source
 *          → search for "channelId" in the page source.
 *
 *  2. Paste the Channel ID into CHANNEL_ID below.
 *
 *  3. To add a video to the fallback list (shown when offline / API limit hit),
 *     add an entry to FALLBACK_VIDEOS with the video ID from its YouTube URL:
 *       https://www.youtube.com/watch?v=VIDEO_ID_HERE
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Configuration ─────────────────────────────────────────────────────────── */

const CHANNEL_ID = 'YOUR_CHANNEL_ID_HERE'; // ← Replace with your UCxxxx channel ID

const MAX_VIDEOS = 6;                       // Maximum videos to show at once

const REFRESH_INTERVAL_MS = 30 * 60 * 1000; // Auto-refresh every 30 minutes
const CHANNEL_ID = 'UC1x8-hhCnukw437Sx8emtlg'; // ← Replace with UCxxxx channel ID
const FALLBACK_VIDEOS = [
  { id: 'BpiAPcEHvjs', title: 'Creative Art Session',        publishedAt: '2024-03-01' },
  { id: 'fzvKbRzVEbA', title: 'Beautiful Drawing Tutorial',  publishedAt: '2024-02-15' },
  { id: 'LNNT-pLVulg', title: 'Mandala Art Creation',        publishedAt: '2024-01-20' },
];

/* ── WatchNow Manager ───────────────────────────────────────────────────────── */

class WatchNowManager {
  constructor() {
    this._grid     = null;
    this._status   = null;
    this._timer    = null;
  }

  /** Call once after the DOM is ready. */
  init() {
    this._grid   = document.getElementById('watchNowGrid');
    this._status = document.getElementById('watchNowStatus');

    if (!this._grid) return; // Not on the youtube page — do nothing.

    this._load();
    this._scheduleRefresh();
  }

  /* ── Private ── */

  _scheduleRefresh() {
    if (this._timer) clearInterval(this._timer);
    this._timer = setInterval(() => this._load(), REFRESH_INTERVAL_MS);
  }

  async _load() {
    this._showSkeleton();

    try {
      const videos = await this._fetchLatestVideos();
      this._render(videos);
      this._setStatus('live');
    } catch (err) {
      console.warn('[WatchNow] Live fetch failed — showing fallback videos.', err.message);
      this._render(FALLBACK_VIDEOS);
      this._setStatus('fallback');
    }
  }

  /**
   * Fetches the channel's latest videos via the YouTube RSS feed.
   * The rss2json.com API converts the feed to JSON and adds CORS headers,
   * so this works from any static front-end without a backend.
   */
  async _fetchLatestVideos() {
    if (!CHANNEL_ID || CHANNEL_ID === 'YOUR_CHANNEL_ID_HERE') {
      throw new Error('Channel ID not configured yet.');
    }

    const rssFeed = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(CHANNEL_ID)}`;
    const apiUrl  = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeed)}&count=${MAX_VIDEOS}`;

    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`rss2json returned HTTP ${res.status}`);

    const data = await res.json();
    if (data.status !== 'ok' || !Array.isArray(data.items)) {
      throw new Error('Unexpected API response format.');
    }

    return data.items
      .map(item => ({
        id:          this._extractVideoId(item.link),
        title:       item.title,
        publishedAt: item.pubDate,
      }))
      .filter(v => v.id)                                              // drop any with no video ID
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)) // latest first
      .slice(0, MAX_VIDEOS);
  }

  /** Extracts the 11-character YouTube video ID from a watch URL. */
  _extractVideoId(url) {
    const match = (url || '').match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return match ? match[1] : null;
  }

  /** Renders video cards into the grid container. */
  _render(videos) {
    if (!this._grid || !videos.length) return;

    this._grid.innerHTML = videos
      .map(video => `
        <div class="video-card anim-stagger-item">
          <iframe
            src="https://www.youtube.com/embed/${this._esc(video.id)}"
            title="${this._esc(video.title)}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy">
          </iframe>
          <p>${this._esc(video.title)}</p>
        </div>`)
      .join('');
  }

  /** Shows animated skeleton placeholder cards while loading. */
  _showSkeleton() {
    if (!this._grid) return;
    this._grid.innerHTML = Array.from({ length: MAX_VIDEOS }, () => `
      <div class="video-card video-skeleton">
        <div class="skeleton-media"></div>
        <div class="skeleton-line skeleton-line--long"></div>
        <div class="skeleton-line skeleton-line--short"></div>
      </div>`).join('');
  }

  /** Updates the small status badge below the grid. */
  _setStatus(type) {
    if (!this._status) return;
    if (type === 'live') {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this._status.innerHTML = `<span class="status-dot status-dot--live"></span> Live · Updated at ${time}`;
      this._status.dataset.state = 'live';
    } else {
      this._status.innerHTML = `<span class="status-dot status-dot--fallback"></span> Showing saved videos`;
      this._status.dataset.state = 'fallback';
    }
  }

  /**
   * Safely escapes a string for placement inside HTML attributes and text nodes.
   * Prevents XSS from any API-returned data.
   */
  _esc(str) {
    const d = document.createElement('div');
    d.textContent = String(str ?? '');
    return d.innerHTML;
  }
}

/* ── Bootstrap ──────────────────────────────────────────────────────────────── */

const watchNow = new WatchNowManager();
document.addEventListener('DOMContentLoaded', () => watchNow.init());
