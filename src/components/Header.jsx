import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function Header() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    return (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <header className="w-full flex items-center justify-between py-4 px-4 sm:px-6 lg:px-10">
      <div className="flex items-center gap-3 select-none">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-amber-400 shadow-lg shadow-fuchsia-500/30 ring-1 ring-white/20 grid place-items-center">
          {/* Nest-like glyph */}
          <div className="h-6 w-6 rounded-full border-2 border-white/80 relative">
            <div className="absolute inset-1 rounded-full border border-white/60" />
            <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 8px rgba(255,255,255,0.35)' }} />
          </div>
        </div>
        <div className="leading-tight">
          <div className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400">Snap Nest</div>
          <p className="text-xs text-neutral-600 dark:text-neutral-300">All-in-one social video downloader</p>
        </div>
      </div>

      <button
        onClick={() => setDark((d) => !d)}
        className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        aria-label="Toggle theme"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}
