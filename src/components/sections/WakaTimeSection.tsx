'use client';

import { useEffect, useRef, useState } from 'react';

type WakaData = {
  startDate: string;
  endDate: string;
  dailyAverage: string;
  thisWeekTotal: string;
  bestDay: string;
  allTimeSinceToday: string;
  languages: { name: string; percent: number; text: string }[];
  editors: { name: string; percent: number; text: string }[];
};

function StatCard({ label, value, isDark }: { label: string; value: string; isDark: boolean }) {
  const bg      = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.2)';
  const border  = isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(0,0,0,0.07)';
  const textSub = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const textVal = isDark ? '#ffffff' : '#0f172a';

  return (
    <div
      className="rounded-2xl p-4 md:p-5 flex flex-col gap-1.5 backdrop-blur-sm"
      style={{ background: bg, border }}
    >
      <span className="text-[10px] md:text-[11px] uppercase tracking-widest font-semibold" style={{ color: textSub }}>
        {label}
      </span>
      <span className="text-[15px] md:text-[20px] font-black leading-tight" style={{ color: textVal }}>
        {value}
      </span>
    </div>
  );
}

function BarRow({ name, percent, isDark }: { name: string; percent: number; text: string; isDark: boolean }) {
  const trackBg = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  const textVal = isDark ? 'rgba(255,255,255,0.85)' : '#0f172a';
  const textSub = isDark ? 'rgba(255,255,255,0.4)'  : 'rgba(0,0,0,0.4)';

  return (
    <div className="flex items-center gap-3">
      <span className="text-[12px] md:text-[13px] font-medium w-16 md:w-28 shrink-0 truncate" style={{ color: textVal }}>
        {name}
      </span>
      <div className="flex-1 h-[4px] rounded-full overflow-hidden" style={{ background: trackBg }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${percent}%`,
            background: isDark
              ? 'linear-gradient(90deg, #93c5fd, #3b82f6)'
              : 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
            transition: 'width 0.8s ease',
          }}
        />
      </div>
      <span className="text-[11px] md:text-[12px] w-9 text-right shrink-0 tabular-nums font-medium" style={{ color: textSub }}>
        {percent.toFixed(0)}%
      </span>
    </div>
  );
}

function InnerCard({ title, children, isDark }: { title: string; children: React.ReactNode; isDark: boolean }) {
  const bg     = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.2)';
  const border = isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(0,0,0,0.07)';
  const label  = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)';

  return (
    <div
      className="rounded-2xl p-4 md:p-5 flex flex-col gap-3 md:gap-4 backdrop-blur-sm"
      style={{ background: bg, border }}
    >
      <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: label }}>
        {title}
      </span>
      {children}
    </div>
  );
}

export default function WakaTimeSection() {
  const [data, setData] = useState<WakaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [contentWidth, setContentWidth] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch('/api/wakatime')
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch(() => setError('Failed to fetch'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const measure = () => {
      const style = getComputedStyle(el);
      const w = el.offsetWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      setContentWidth(w);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const activeDark = mounted ? isDark : false;
  const mainText   = activeDark ? 'rgba(255,255,255,0.95)' : '#0f172a';
  const mutedText  = activeDark ? 'rgba(255,255,255,0.4)'  : 'rgba(0,0,0,0.4)';


  return (
    <section
      ref={sectionRef}
      className="rounded-3xl px-4 py-6 md:px-10 md:py-10 overflow-hidden bg-white/20 dark:bg-white/5 backdrop-blur-xl border border-neutral-300/70 dark:border-white/10"
    >
      <div
        className="mx-auto flex flex-col gap-5 md:gap-7"
        style={{ width: contentWidth ? contentWidth : '100%' }}
      >

        {/* Header */}
        <div>
          <h2
            className="text-[22px] md:text-[38px] font-black leading-tight mb-1"
            style={{ color: mainText }}
            suppressHydrationWarning
          >
            WakaTime
          </h2>
          <p className="text-[12px] md:text-[14px]" style={{ color: mutedText }} suppressHydrationWarning>
            Coding activity from the last 7 days
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center h-40">
            <div className="text-sm animate-pulse" style={{ color: mutedText }}>Loading WakaTime data...</div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center justify-center h-40">
            <div className="text-red-400 text-sm">
              {error === 'WAKATIME_API_KEY not set' ? 'Add WAKATIME_API_KEY to your .env.local' : error}
            </div>
          </div>
        )}

        {/* Data */}
        {data && (
          <div className="flex flex-col gap-2.5 md:gap-4">

            {/* Stats grid — 2 col mobile, 4 col sm+ */}
            <div className="grid grid-cols-2 gap-2 md:gap-3 sm:grid-cols-4">
              <StatCard label="Daily Avg"  value={data.dailyAverage}      isDark={activeDark} />
              <StatCard label="This Week"  value={data.thisWeekTotal}     isDark={activeDark} />
              <StatCard label="Best Day"   value={data.bestDay}           isDark={activeDark} />
              <StatCard label="All Time"   value={data.allTimeSinceToday} isDark={activeDark} />
            </div>

            {/* Languages + Editors */}
            <div className="grid grid-cols-1 gap-2 md:gap-3 sm:grid-cols-2">
              <InnerCard title="Top Languages" isDark={activeDark}>
                <div className="flex flex-col gap-2.5 md:gap-3">
                  {data.languages.length > 0
                    ? data.languages.map((l) => (
                        <BarRow key={l.name} name={l.name} percent={l.percent} text={l.text} isDark={activeDark} />
                      ))
                    : <span className="text-sm" style={{ color: mutedText }}>No data</span>
                  }
                </div>
              </InnerCard>

              <InnerCard title="Editors" isDark={activeDark}>
                <div className="flex flex-col gap-2.5 md:gap-3">
                  {data.editors.length > 0
                    ? data.editors.map((e) => (
                        <BarRow key={e.name} name={e.name} percent={e.percent} text={e.text} isDark={activeDark} />
                      ))
                    : <span className="text-sm" style={{ color: mutedText }}>No data</span>
                  }
                </div>
              </InnerCard>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}