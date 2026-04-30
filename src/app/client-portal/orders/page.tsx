import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = { title: 'My Orders | Client Portal' };

const statusColor: Record<string, string> = {
  pending:   'bg-yellow-100 text-yellow-700 dark:bg-yellow-400/10 dark:text-yellow-400',
  paid:      'bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400',
  completed: 'bg-green-100 text-green-700 dark:bg-green-400/10 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-400/10 dark:text-red-400',
};

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/client-portal/login');

  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (!user) redirect('/client-portal/login');

  const orders = await prisma.order.findMany({
    where: { user_id: user.id },
    include: { product: true, invoice: true },
    orderBy: { created_at: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-extrabold text-[#111] dark:text-white">My Orders</h1>
        <p className="text-[15px] text-black/50 dark:text-white/40 mt-1">Semua pesanan kamu</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-black/30 dark:text-white/20">
          <p>Belum ada pesanan</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-[#111] rounded-[20px] p-6 border border-black/5 dark:border-white/5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-[16px] font-bold text-[#111] dark:text-white truncate">{order.product.name}</p>
                <p className="text-[13px] text-black/40 dark:text-white/30 mt-0.5">
                  {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-[15px] font-bold text-[#111] dark:text-white">
                  Rp {order.amount.toLocaleString('id-ID')}
                </span>
                <span className={`px-3 py-1 rounded-full text-[12px] font-semibold capitalize ${statusColor[order.status] ?? ''}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}