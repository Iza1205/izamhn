'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import { RiWhatsappLine, RiArrowRightLine } from 'react-icons/ri';

// export const metadata: Metadata = { title: 'Contact' };
// Note: metadata export tidak bisa dipakai di 'use client', pindahkan ke layout atau gunakan generateMetadata

export default function ContactPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!name.trim() && !message.trim()) return;

    const text = name.trim()
      ? `Halo Iza! Perkenalkan, aku ${name.trim()}.\n\n${message.trim()}`
      : message.trim();

    const waUrl = `https://wa.me/62XXXXXXXXXX?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
          Contact
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-base max-w-xl leading-relaxed">
          Tertarik kolaborasi atau punya project? Aku terbuka!
        </p>
      </div>

      {/* WhatsApp form */}
      <div className="ios-card p-5 flex flex-col gap-4">
        <p className="text-[17px] font-semibold" style={{ color: 'var(--text-primary)' }}>
          Send Me a Message
        </p>

        {/* Name field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-[13px] font-semibold"
            style={{ color: 'var(--text-secondary)' }}
          >
            Nama / Perusahaan
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama atau nama perusahaan kamu"
            className="w-full rounded-[10px] px-3.5 py-3 text-[15px] outline-none transition-shadow"
            style={{
              background: 'var(--fill-secondary)',
              color: 'var(--text-primary)',
              border: 'none',
            }}
          />
        </div>

        {/* Message field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="message"
            className="text-[13px] font-semibold"
            style={{ color: 'var(--text-secondary)' }}
          >
            Pesan
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ceritain project-mu atau sekadar say hi..."
            rows={5}
            className="w-full rounded-[10px] px-3.5 py-3 text-[15px] outline-none resize-none transition-shadow"
            style={{
              background: 'var(--fill-secondary)',
              color: 'var(--text-primary)',
              border: 'none',
            }}
          />
        </div>

        {/* Send button */}
        <button
          onClick={handleSend}
          className="w-full flex items-center justify-center gap-2 rounded-[12px] py-4 text-[16px] font-semibold text-white transition-opacity active:opacity-80"
          style={{ background: '#25D366' }}
        >
          <RiWhatsappLine size={20} />
          Kirim via WhatsApp
          <RiArrowRightLine size={16} />
        </button>

        <p className="text-[12px] text-center" style={{ color: 'var(--text-quaternary)' }}>
          Dengan mengirim pesan, kamu setuju untuk dihubungi via WhatsApp.
        </p>
      </div>

      {/* Response time card */}
      <div className="ios-card p-5 flex flex-col items-center gap-2 text-center">
        <p className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>
          Response time
        </p>
        <p className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
          Biasanya aku reply dalam 1–2 hari kerja. Untuk project urgent, langsung WhatsApp aja!
        </p>
      </div>
    </div>
  );
}