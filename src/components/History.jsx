import { useEffect, useState } from 'react';
import { Clock, PlayCircle } from 'lucide-react';

export default function History() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('snapnest-history');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('snapnest-history', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const handler = (e) => {
      if (e.detail?.type === 'add-history') {
        setItems((prev) => [e.detail.payload, ...prev].slice(0, 20));
      }
    };
    window.addEventListener('snapnest', handler);
    return () => window.removeEventListener('snapnest', handler);
  }, []);

  if (!items.length) {
    return (
      <section className="p-6 rounded-2xl border border-white/10 bg-white/70 dark:bg-neutral-900/60 backdrop-blur text-center">
        <div className="flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-300">
          <Clock size={18} />
          <span className="text-sm">Your downloads will appear here</span>
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 rounded-2xl border border-white/10 bg-white/70 dark:bg-neutral-900/60 backdrop-blur">
      <h3 className="font-semibold mb-4">History</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, idx) => (
          <article key={idx} className="rounded-xl overflow-hidden border border-white/10 bg-neutral-50 dark:bg-neutral-900">
            <div className="aspect-video bg-neutral-200/60 dark:bg-neutral-800/60 grid place-items-center text-neutral-500">
              <PlayCircle />
            </div>
            <div className="p-3 text-sm">
              <div className="truncate text-neutral-800 dark:text-neutral-100">{it.url}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">{it.format} • {it.quality} • {new Date(it.date).toLocaleString()}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
