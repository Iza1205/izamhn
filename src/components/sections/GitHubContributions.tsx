'use client';

import { useEffect, useRef, useState } from 'react';

type ContributionDay = {
  contributionCount: number;
  date: string;
};

type Week = {
  contributionDays: ContributionDay[];
};

type ContributionsData = {
  total: number;
  thisWeek: number;
  pullRequests: number;
  issues: number;
  weeks: Week[];
};

function getColor(count: number, isDark: boolean): string {
  if (isDark) {
    if (count === 0) return 'rgba(255,255,255,0.06)';
    if (count <= 3)  return '#1e3a5f';
    if (count <= 6)  return '#1d5fa8';
    if (count <= 9)  return '#2b8be0';
    return '#60b3f7';
  } else {
    if (count === 0) return 'rgba(0,0,0,0.07)';
    if (count <= 3)  return '#bfdbfe';
    if (count <= 6)  return '#60a5fa';
    if (count <= 9)  return '#2563eb';
    return '#1d4ed8';
  }
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const GAP = 3;
const MIN_LABEL_GAP_PX = 28;
const MOBILE_CELL_SIZE = 7;

export default function GitHubContributions() {
  const [data, setData] = useState<ContributionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hovered, setHovered] = useState<ContributionDay | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [cellSize, setCellSize] = useState(11);
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch('/api/github-contributions')
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch(() => setError('Failed to fetch'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!data || !sectionRef.current) return;
    const numWeeks = data.weeks.length;
    const calculate = (contentWidth: number) => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCellSize(MOBILE_CELL_SIZE);
      } else {
        const size = Math.floor((contentWidth - GAP * (numWeeks - 1)) / numWeeks);
        setCellSize(Math.max(size, 10));
      }
    };
    // offsetWidth includes padding, subtract it
    const el = sectionRef.current;
    const style = getComputedStyle(el);
    const padLeft = parseFloat(style.paddingLeft);
    const padRight = parseFloat(style.paddingRight);
    calculate(el.offsetWidth - padLeft - padRight);

    const observer = new ResizeObserver((entries) => {
      calculate(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [data]);

  const monthLabels: { label: string; colIndex: number; leftPx: number }[] = [];
  if (data) {
    let lastMonth = -1;
    let lastLabelPx = -Infinity;
    data.weeks.forEach((week, i) => {
      const firstDay = week.contributionDays[0];
      if (firstDay) {
        const m = new Date(firstDay.date).getMonth();
        const leftPx = i * (cellSize + GAP);
        if (m !== lastMonth && leftPx - lastLabelPx >= MIN_LABEL_GAP_PX) {
          monthLabels.push({ label: MONTHS[m], colIndex: i, leftPx });
          lastMonth = m;
          lastLabelPx = leftPx;
        }
      }
    });
  }

  const bestDay = data
    ? Math.max(...data.weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount)))
    : 0;
  const avg = data ? Math.round(data.total / 365) : 0;

  const activeDark  = mounted ? isDark : false;
  const accentText  = activeDark ? '#60b3f7' : '#2563eb';
  const mutedText   = activeDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const mainText    = activeDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.85)';
  const legendColors = activeDark
    ? ['rgba(255,255,255,0.06)', '#1e3a5f', '#1d5fa8', '#2b8be0', '#60b3f7']
    : ['rgba(0,0,0,0.07)', '#bfdbfe', '#60a5fa', '#2563eb', '#1d4ed8'];

  return (
    <>
      <style>{`
        .grid-scroll::-webkit-scrollbar { height: 3px; }
        .grid-scroll::-webkit-scrollbar-track { background: transparent; }
        .grid-scroll::-webkit-scrollbar-thumb { background: rgba(96,179,247,0.3); border-radius: 99px; }
        .grid-scroll { scrollbar-width: thin; scrollbar-color: rgba(96,179,247,0.3) transparent; }
        .stats-scroll::-webkit-scrollbar { display: none; }
        .stats-scroll { scrollbar-width: none; }
      `}</style>

      <section ref={sectionRef} className="rounded-3xl px-6 py-8 md:px-10 md:py-10 overflow-hidden bg-white/20 dark:bg-white/5 backdrop-blur-xl border border-neutral-300/70 dark:border-white/10">

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center h-32">
            <div className="text-sm animate-pulse" style={{ color: mutedText }}>Loading contributions...</div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center justify-center h-32">
            <div className="text-red-400 text-sm">
              {error === 'GITHUB_TOKEN not set'
                ? 'Add GITHUB_TOKEN to your .env.local to load contributions.'
                : error}
            </div>
          </div>
        )}

        {/* Grid */}
        {data && (() => {
          const gridWidth = data.weeks.length * (cellSize + GAP) - GAP;
          return (
            <div className="flex flex-col items-center">
              {/* Centered block */}
              <div style={{ width: isMobile ? '100%' : gridWidth }}>

                {/* Header — rata dengan grid */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0 mb-6 md:mb-8">
                  <div>
                    <h2
                      className="text-[26px] md:text-[38px] font-black leading-tight mb-1"
                      style={{ color: mainText }}
                      suppressHydrationWarning
                    >
                      Contributions
                    </h2>
                    <p className="text-[13px] md:text-[14px]" style={{ color: mutedText }} suppressHydrationWarning>
                      A year of commits, PRs, and late-night debugging{' '}
                      <a
                        href="https://github.com/iza1205"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline font-medium"
                        style={{ color: accentText }}
                      >
                        @izamhn
                      </a>
                    </p>
                  </div>

                  <div className="stats-scroll flex gap-6 overflow-x-auto md:overflow-visible md:gap-8 md:text-right pb-1">
                    {[
                      { value: data.total.toLocaleString(), label: 'Total' },
                      { value: data.pullRequests,           label: 'Pull Requests' },
                      { value: bestDay,                     label: 'Best Day' },
                      { value: avg,                         label: '/ day avg' },
                    ].map(({ value, label }) => (
                      <div key={label} className="shrink-0" suppressHydrationWarning>
                        <div className="text-[22px] md:text-[28px] font-black" style={{ color: accentText }}>{value}</div>
                        <div className="text-[10px] md:text-[11px] uppercase tracking-widest" style={{ color: mutedText }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Month labels */}
                <div className="relative h-5 mb-1">
                  {monthLabels.map(({ label, colIndex, leftPx }) => (
                    <div
                      key={`${label}-${colIndex}`}
                      className="text-[11px] absolute whitespace-nowrap"
                      style={{ left: leftPx, top: 0, color: mutedText }}
                      suppressHydrationWarning
                    >
                      {label}
                    </div>
                  ))}
                </div>

                {/* Cells */}
                <div
                  ref={gridRef}
                  className="grid-scroll overflow-x-auto md:overflow-visible"
                >
                  <div className="flex" style={{ gap: GAP, minWidth: isMobile ? 'max-content' : undefined }}>
                    {data.weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                        {week.contributionDays.map((day) => (
                          <div
                            key={day.date}
                            onMouseEnter={() => setHovered(day)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                              width: cellSize,
                              height: cellSize,
                              borderRadius: 2,
                              backgroundColor: getColor(day.contributionCount, activeDark),
                              cursor: 'default',
                              transition: 'transform 0.1s',
                              transform: hovered?.date === day.date ? 'scale(1.4)' : 'scale(1)',
                              flexShrink: 0,
                            }}
                            suppressHydrationWarning
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend + tooltip */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2" suppressHydrationWarning>
                    <span className="text-[11px]" style={{ color: mutedText }}>Less</span>
                    {legendColors.map((c, i) => (
                      <div key={i} style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: c, flexShrink: 0 }} />
                    ))}
                    <span className="text-[11px]" style={{ color: mutedText }}>More</span>
                  </div>
                  <div
                    className="text-[12px] font-medium transition-opacity duration-150"
                    style={{
                      color: mutedText,
                      opacity: hovered && hovered.contributionCount > 0 ? 1 : 0,
                      minWidth: 140,
                      textAlign: 'right',
                    }}
                  >
                    {hovered && hovered.contributionCount > 0 && (
                      <>
                        <span className="font-bold" style={{ color: accentText }}>{hovered.contributionCount}</span>
                        {' '}contributions on {hovered.date}
                      </>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })()}
      </section>
    </>
  );
}