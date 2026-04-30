'use client';

import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import useSWR from 'swr';
import axios from 'axios';
import { RiGoogleLine, RiSendPlaneFill, RiLogoutBoxLine, RiShieldUserLine, RiChat3Line } from 'react-icons/ri';
import Avatar from '@/components/elements/Avatar';
import EntryBubble from '@/components/elements/EntryBubble';
import { GuestbookEntry } from '@/types';
import { fetcher, ADMIN_EMAIL } from '@/lib/utils';

export default function GuestbookPage() {
  const { data: session } = useSession();
  const { data: entries, mutate, isLoading } = useSWR<GuestbookEntry[]>('/api/guestbook', fetcher);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim() || !session) return;
    setSending(true);
    try {
      await axios.post('/api/guestbook', { message });
      setMessage('');
      mutate();
    } catch {}
    setSending(false);
  };

  return (
    <section className="max-w-7xl mx-auto">

      {/* Header — sama style portfolio & blog */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
          Guestbook
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-base max-w-xl leading-relaxed">
          Leave a message, share your thoughts, or just say hi! Sign in to join the conversation.
        </p>
      </div>

      {/* Main card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">

        {/* Auth bar — hanya muncul kalau sudah login */}
        {session && (
          <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
            <div className="flex items-center gap-3">
              <Avatar image={session.user?.image} name={session.user?.name ?? 'U'} size={28} />
              <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {session.user?.name}
              </span>
              {session.user?.email === ADMIN_EMAIL && (
                <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-500">
                  <RiShieldUserLine size={11} /> Admin
                </span>
              )}
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 transition-colors"
            >
              <RiLogoutBoxLine size={13} /> Sign out
            </button>
          </div>
        )}

        {/* Chat area */}
        <div className="p-5 min-h-[380px] flex flex-col">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`flex items-end gap-2.5 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="w-8 h-8 rounded-full animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-10 w-48 rounded-2xl animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                </div>
              ))}
            </div>
          ) : !entries || entries.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 py-16">
              <RiChat3Line size={32} className="text-neutral-300 dark:text-neutral-600" />
              <p className="text-sm font-medium text-neutral-400 dark:text-neutral-500">
                Belum ada pesan. Jadilah yang pertama!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {[...entries].reverse().map((entry) => (
                <EntryBubble
                  key={entry.id}
                  entry={entry}
                  currentEmail={session?.user?.email}
                  onRefresh={mutate}
                />
              ))}
            </div>
          )}
        </div>

        {/* Input / Login */}
        <div className="border-t border-neutral-200 dark:border-neutral-800">
          {session ? (
            <div className="flex items-center gap-3 px-4 py-3">
              <Avatar image={session.user?.image} name={session.user?.name ?? 'U'} size={30} />
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
                }}
                placeholder="Tulis pesan... (Enter untuk kirim)"
                maxLength={300}
                className="flex-1 rounded-full px-4 py-2 text-sm outline-none bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500"
              />
              <button
                onClick={handleSubmit}
                disabled={sending || !message.trim()}
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-opacity bg-neutral-900 dark:bg-neutral-100 hover:opacity-80"
              >
                <RiSendPlaneFill size={15} className="text-white dark:text-neutral-900" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-8 px-5">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Sign in to leave a message. Your data is safe and secure.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => signIn('google')}
                  className="flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-semibold border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                >
                  <RiGoogleLine size={16} />
                  Continue with Google
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}