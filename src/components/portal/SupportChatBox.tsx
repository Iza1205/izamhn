'use client';

import { useState, useRef, useEffect } from 'react';
import { RiSendPlaneLine } from 'react-icons/ri';

type Chat = {
  id: number;
  message: string;
  is_admin: boolean;
  created_at: Date;
};

export default function SupportChatBox({ userId, initialChats }: { userId: string; initialChats: Chat[] }) {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;
    setLoading(true);
    const res = await fetch('/api/portal/support', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (res.ok) {
      const newChat = await res.json();
      setChats((prev) => [...prev, newChat]);
      setMessage('');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-[#111] rounded-[20px] border border-black/5 dark:border-white/5 overflow-hidden flex flex-col" style={{ height: '60vh' }}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {chats.length === 0 && (
          <div className="text-center text-black/30 dark:text-white/20 text-[14px] pt-10">
            Belum ada pesan. Mulai chat dengan admin!
          </div>
        )}
        {chats.map((chat) => (
          <div key={chat.id} className={`flex ${chat.is_admin ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[75%] px-4 py-2.5 rounded-[14px] text-[14px] leading-relaxed ${
              chat.is_admin
                ? 'bg-[#f0f2f5] dark:bg-white/10 text-[#111] dark:text-white'
                : 'bg-[#111] dark:bg-white text-white dark:text-[#111]'
            }`}>
              {chat.message}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-black/5 dark:border-white/5 flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Tulis pesan..."
          className="flex-1 bg-[#f0f2f5] dark:bg-white/10 text-[#111] dark:text-white rounded-[12px] px-4 py-2.5 text-[14px] outline-none placeholder:text-black/30 dark:placeholder:text-white/30"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !message.trim()}
          className="w-10 h-10 rounded-[12px] bg-[#111] dark:bg-white flex items-center justify-center text-white dark:text-[#111] hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          <RiSendPlaneLine size={17} />
        </button>
      </div>
    </div>
  );
}