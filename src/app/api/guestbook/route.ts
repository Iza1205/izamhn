import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { ADMIN_EMAIL } from '@/lib/utils';

export async function GET() {
  const entries = await prisma.guestbookEntry.findMany({
    orderBy: { created_at: 'desc' },
    include: {
      replies: { orderBy: { created_at: 'asc' } },
    },
  });
  return NextResponse.json(entries);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { message } = await req.json();
  if (!message?.trim())
    return NextResponse.json({ message: 'Message required' }, { status: 400 });

  const entry = await prisma.guestbookEntry.create({
    data: {
      message: message.trim(),
      name: session.user.name ?? 'Anonymous',
      email: session.user.email ?? '',
      image: session.user.image ?? null,
    },
    include: { replies: true },
  });
  return NextResponse.json(entry, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  if (session.user.email !== ADMIN_EMAIL)
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ message: 'ID required' }, { status: 400 });

  await prisma.guestbookEntry.delete({ where: { id: Number(id) } });
  return NextResponse.json({ message: 'Deleted' });
}
