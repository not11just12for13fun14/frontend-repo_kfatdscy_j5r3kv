import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[380px] sm:min-h-[460px] lg:min-h-[560px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient overlay to make text readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/0 dark:from-black/40 dark:via-black/30 dark:to-black/10" />

      <div className="relative z-10 p-6 sm:p-10 lg:p-16 flex flex-col items-start justify-center gap-6 max-w-3xl">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400">
          Snap Nest
        </h1>
        <p className="text-neutral-700 dark:text-neutral-200 text-base sm:text-lg">
          Download videos, reels, shorts, and stories from Instagram, Facebook, TikTok, YouTube, X, and Snapchat — all in one place.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">Futuristic UI</span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white">Smooth animation</span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">Minimal layout</span>
        </div>
      </div>
    </section>
  );
}
