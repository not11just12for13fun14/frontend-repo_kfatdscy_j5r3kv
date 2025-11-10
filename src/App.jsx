import { useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Downloader from './components/Downloader';
import History from './components/History';

function App() {
  const handleDownloaded = useCallback((item) => {
    const event = new CustomEvent('snapnest', { detail: { type: 'add-history', payload: item } });
    window.dispatchEvent(event);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 space-y-8 pb-16">
        <Hero />

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Downloader onDownloaded={handleDownloaded} />
            <History />
          </div>

          <aside className="space-y-4">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/70 dark:bg-neutral-900/60 backdrop-blur">
              <h3 className="font-semibold mb-2">How it works</h3>
              <ol className="list-decimal list-inside text-sm text-neutral-600 dark:text-neutral-300 space-y-1">
                <li>Copy a link from Instagram, Facebook, TikTok, YouTube, X, or Snapchat.</li>
                <li>Paste it into the box and tap Download.</li>
                <li>Pick quality or convert to MP3 if needed.</li>
                <li>Find your saved items in History.</li>
              </ol>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
              <h3 className="font-semibold mb-2">Why Snap Nest?</h3>
              <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                <li>Unified downloader for multiple platforms</li>
                <li>One-tap paste and download</li>
                <li>Dark and light themes</li>
                <li>Smooth progress animations</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Snap Nest — Built for speed and simplicity
      </footer>
    </div>
  );
}

export default App;
