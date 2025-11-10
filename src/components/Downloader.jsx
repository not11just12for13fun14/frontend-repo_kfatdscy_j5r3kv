import { useEffect, useMemo, useRef, useState } from 'react';
import { Download, Loader2, Link2, Scissors } from 'lucide-react';

const platforms = [
  { name: 'Instagram', color: 'from-pink-500 to-purple-500', url: 'instagram.com' },
  { name: 'Facebook', color: 'from-blue-500 to-blue-700', url: 'facebook.com' },
  { name: 'TikTok', color: 'from-slate-800 to-gray-900', url: 'tiktok.com' },
  { name: 'YouTube', color: 'from-red-500 to-rose-600', url: 'youtube.com' },
  { name: 'X', color: 'from-zinc-800 to-black', url: 'x.com' },
  { name: 'Snapchat', color: 'from-yellow-400 to-amber-500', url: 'snapchat.com' },
];

function ProgressBar({ progress }) {
  return (
    <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function Downloader({ onDownloaded }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState('HD');
  const [format, setFormat] = useState('MP4');
  const inputRef = useRef(null);

  // Auto-link detection when user copies a URL
  useEffect(() => {
    const handler = (e) => {
      const text = e.clipboardData?.getData('Text');
      if (text && /^https?:\/\//i.test(text)) {
        setUrl(text);
      }
    };
    window.addEventListener('copy', handler);
    return () => window.removeEventListener('copy', handler);
  }, []);

  const detectedPlatform = useMemo(() => {
    try {
      const u = new URL(url);
      return platforms.find((p) => u.hostname.includes(p.url))?.name || 'Unknown';
    } catch {
      return '';
    }
  }, [url]);

  const simulateDownload = async () => {
    setLoading(true);
    setProgress(0);
    // Fake progress for demo
    for (let i = 1; i <= 100; i++) {
      await new Promise((r) => setTimeout(r, 15));
      setProgress(i);
    }
    setLoading(false);
    onDownloaded?.({ url, quality, format, date: new Date().toISOString() });
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text);
      inputRef.current?.focus();
    } catch (e) {
      inputRef.current?.focus();
    }
  };

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 p-6 rounded-2xl border border-white/10 bg-white/70 dark:bg-neutral-900/60 backdrop-blur">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste video link here"
              className="w-full h-12 px-4 pr-24 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 placeholder-neutral-500 outline-none border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700"
            />
            <button
              onClick={pasteFromClipboard}
              className="absolute right-1 top-1 h-10 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white text-sm font-medium flex items-center gap-2"
            >
              <Link2 size={16} /> Paste
            </button>
          </div>
          <button
            onClick={simulateDownload}
            disabled={!/^https?:\/\//i.test(url) || loading}
            className="h-12 px-5 rounded-xl font-semibold text-white bg-neutral-900 disabled:opacity-50 dark:bg-white dark:text-neutral-900 flex items-center gap-2 justify-center"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
            {loading ? 'Downloading' : 'Download'}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <select value={quality} onChange={(e) => setQuality(e.target.value)} className="h-11 px-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
            {['SD','HD','Full HD','2K','4K'].map(q => <option key={q}>{q}</option>)}
          </select>
          <select value={format} onChange={(e) => setFormat(e.target.value)} className="h-11 px-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
            {['MP4','MP3','WEBM'].map(f => <option key={f}>{f}</option>)}
          </select>
          <button className="h-11 px-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center gap-2 justify-center">
            <Scissors size={16} /> Convert to MP3
          </button>
          <div className="h-11 rounded-lg bg-neutral-50 dark:bg-neutral-900/40 border border-white/10 grid place-items-center text-xs text-neutral-500">
            {detectedPlatform ? `Detected: ${detectedPlatform}` : 'Paste a link to detect platform'}
          </div>
        </div>

        {loading && (
          <div className="mt-6 space-y-2">
            <ProgressBar progress={progress} />
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Downloading… {progress}%</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
        {platforms.map((p) => (
          <div key={p.name} className={`aspect-video rounded-xl border border-white/10 bg-gradient-to-br ${p.color} text-white p-3 flex items-end font-semibold`}>{p.name}</div>
        ))}
      </div>
    </section>
  );
}
