'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import axios from 'axios';
import {
  RiReplyLine,
  RiDeleteBin6Line,
  RiSendPlaneFill,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from 'react-icons/ri';
import Avatar from './Avatar';
import { GuestbookEntry, GuestbookReply } from '@/types';
import { ADMIN_EMAIL } from '@/lib/utils';

const ReplyBubble = ({
  reply,
  currentEmail,
}: {
  reply: GuestbookReply;
  currentEmail?: string | null;
}) => {
  const isMe = reply.email === currentEmail;
  return (
    <div className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
      <Avatar image={reply.image} name={reply.name} size={22} />
      <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
        {!isMe && (
          <span className="text-[11px] mb-1 ml-1" style={{ color: 'var(--text-tertiary)' }}>
            {reply.name}
          </span>
        )}
        <div
          className={`px-3 py-2 text-[13px] leading-relaxed rounded-2xl ${
            isMe ? 'rounded-br-none' : 'rounded-bl-none'
          }`}
          style={
            isMe
              ? { background: 'var(--ios-blue)', color: '#ffffff' }
              : { background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }
          }
        >
          {reply.message}
        </div>
        <span className="text-[10px] mt-1 px-1" style={{ color: 'var(--text-quaternary)' }}>
          {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true, locale: id })}
        </span>
      </div>
    </div>
  );
};

interface EntryBubbleProps {
  entry: GuestbookEntry;
  currentEmail?: string | null;
  onRefresh: () => void;
}

export default function EntryBubble({ entry, currentEmail, onRefresh }: EntryBubbleProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyMsg, setReplyMsg] = useState('');
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isMe = entry.email === currentEmail;
  const isAdmin = currentEmail === ADMIN_EMAIL;

  const handleDelete = async () => {
    if (!confirm('Hapus pesan ini?')) return;
    setDeleting(true);
    try {
      await axios.delete('/api/guestbook', { data: { id: entry.id } });
      onRefresh();
    } catch {}
    setDeleting(false);
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMsg.trim()) return;
    setSending(true);
    try {
      await axios.post(`/api/guestbook/${entry.id}`, { message: replyMsg });
      setReplyMsg('');
      onRefresh();
      setShowReplies(true);
      setShowReplyForm(false);
    } catch {}
    setSending(false);
  };

  return (
    <div className={`group flex items-end gap-2.5 ${isMe ? 'flex-row-reverse' : ''}`}>
      <div className="flex-shrink-0 self-end">
        <Avatar image={entry.image} name={entry.name} size={34} />
      </div>

      <div className={`flex flex-col gap-1 max-w-[72%] ${isMe ? 'items-end' : 'items-start'}`}>
        {!isMe && (
          <span className="text-xs font-medium ml-1" style={{ color: 'var(--text-tertiary)' }}>
            {entry.name}
            {isAdmin && (
              <span className="ml-1 text-[10px]" style={{ color: 'var(--text-quaternary)' }}>
                · {entry.email}
              </span>
            )}
          </span>
        )}

        <div
          className={`px-4 py-2.5 text-[14px] leading-relaxed rounded-2xl ${
            isMe ? 'rounded-br-none' : 'rounded-bl-none'
          }`}
          style={
            isMe
              ? { background: 'var(--ios-blue)', color: '#ffffff' }
              : { background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }
          }
        >
          {entry.message}
        </div>

        <div className={`flex items-center gap-3 px-1 ${isMe ? 'flex-row-reverse' : ''}`}>
          <span className="text-[11px]" style={{ color: 'var(--text-quaternary)' }}>
            {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true, locale: id })}
          </span>
          <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            {currentEmail && (
              <button
                onClick={() => { setShowReplyForm((v) => !v); setShowReplies(true); }}
                className="flex items-center gap-1 text-[11px] transition-colors"
                style={{ color: 'var(--text-tertiary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ios-blue)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
              >
                <RiReplyLine size={12} />
                Balas
              </button>
            )}
            {entry.replies.length > 0 && (
              <button
                onClick={() => setShowReplies((v) => !v)}
                className="flex items-center gap-0.5 text-[11px]"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {showReplies ? <RiArrowUpSLine size={13} /> : <RiArrowDownSLine size={13} />}
                {showReplies ? 'Tutup' : `${entry.replies.length} balasan`}
              </button>
            )}
            {isAdmin && (
              <button onClick={handleDelete} disabled={deleting}>
                <RiDeleteBin6Line
                  size={12}
                  style={{ color: 'var(--text-quaternary)' }}
                  className="transition-colors hover:text-red-500"
                />
              </button>
            )}
          </div>
        </div>

        {showReplies && entry.replies.length > 0 && (
          <div className={`mt-1 flex flex-col gap-2 w-full ${isMe ? 'items-end' : 'items-start'}`}>
            {entry.replies.map((reply) => (
              <ReplyBubble key={reply.id} reply={reply} currentEmail={currentEmail} />
            ))}
          </div>
        )}

        {showReplyForm && currentEmail && (
          <form onSubmit={handleReply} className="mt-1 flex w-full items-center gap-2">
            <input
              value={replyMsg}
              onChange={(e) => setReplyMsg(e.target.value)}
              placeholder="Tulis balasan..."
              maxLength={300}
              className="ios-input rounded-full px-4 py-1.5 text-[13px] flex-1"
            />
            <button
              type="submit"
              disabled={sending || !replyMsg.trim()}
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-opacity"
              style={{ background: 'var(--ios-blue)' }}
            >
              <RiSendPlaneFill size={12} color="#ffffff" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
