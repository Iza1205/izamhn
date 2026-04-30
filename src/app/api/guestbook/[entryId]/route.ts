import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ entryId: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { entryId: entryIdStr } = await params;
  const entryId = parseInt(entryIdStr);
  const { message } = await req.json();

  if (!message?.trim())
    return NextResponse.json({ message: 'Message required' }, { status: 400 });
  if (isNaN(entryId))
    return NextResponse.json({ message: 'Invalid entry ID' }, { status: 400 });

  const reply = await prisma.guestbookReply.create({
    data: {
      message: message.trim(),
      name: session.user.name ?? 'Anonymous',
      email: session.user.email ?? '',
      image: session.user.image ?? null,
      entry_id: entryId,
    },
  });
  return NextResponse.json(reply, { status: 201 });
}