// Simpan file ini di: app/api/wakatime/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'WAKATIME_API_KEY not set' }, { status: 500 });
  }

  const encoded = Buffer.from(apiKey).toString('base64');
  const headers = { Authorization: `Basic ${encoded}` };

  try {
    const [summaryRes, allTimeRes, langsRes, editorsRes] = await Promise.all([
      fetch('https://wakatime.com/api/v1/users/current/summaries?range=last_7_days', { headers }),
      fetch('https://wakatime.com/api/v1/users/current/all_time_since_today', { headers }),
      fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', { headers }),
      fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', { headers }),
    ]);

    const [summary, allTime, stats] = await Promise.all([
      summaryRes.json(),
      allTimeRes.json(),
      langsRes.json(),
    ]);

    const days = summary?.data ?? [];

    // Total this week
    const totalSeconds = days.reduce(
      (acc: number, d: any) => acc + (d.grand_total?.total_seconds ?? 0),
      0,
    );

    // Daily average
    const dailyAvg = days.length > 0 ? Math.round(totalSeconds / days.length) : 0;

    // Best day
    let bestDay = { date: '', seconds: 0 };
    days.forEach((d: any) => {
      const s = d.grand_total?.total_seconds ?? 0;
      if (s > bestDay.seconds) bestDay = { date: d.range?.date ?? '', seconds: s };
    });

    const formatTime = (seconds: number) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      return h > 0 ? `${h} hrs ${m} mins` : `${m} mins`;
    };

    const formatDate = (dateStr: string) => {
      if (!dateStr) return '';
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    };

    return NextResponse.json({
      startDate: formatDate(days[0]?.range?.date ?? ''),
      endDate: formatDate(days[days.length - 1]?.range?.date ?? ''),
      dailyAverage: formatTime(dailyAvg),
      thisWeekTotal: formatTime(totalSeconds),
      bestDay: bestDay.date
        ? `${formatDate(bestDay.date)} (${formatTime(bestDay.seconds)})`
        : '-',
      allTimeSinceToday: allTime?.data?.text ?? '-',
      languages: (stats?.data?.languages ?? []).slice(0, 5).map((l: any) => ({
        name: l.name,
        percent: l.percent,
        text: l.text,
      })),
      editors: (stats?.data?.editors ?? []).slice(0, 3).map((e: any) => ({
        name: e.name,
        percent: e.percent,
        text: e.text,
      })),
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch WakaTime data' }, { status: 500 });
  }
}