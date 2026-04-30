import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SupportChatBox from '@/components/portal/SupportChatBox';

export const metadata = { title: 'Support | Client Portal' };

export default async function SupportPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/client-portal/login');

  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (!user) redirect('/client-portal/login');

  const chats = await prisma.supportChat.findMany({
    where: { user_id: user.id },
    orderBy: { created_at: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-extrabold text-[#111] dark:text-white">Support</h1>
        <p className="text-[15px] text-black/50 dark:text-white/40 mt-1">Chat langsung dengan admin</p>
      </div>
      <SupportChatBox userId={user.id} initialChats={chats} />
    </div>
  );
}