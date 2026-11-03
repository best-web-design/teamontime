import { revalidatePath } from 'next/cache';
import { timingSafeEqual } from 'crypto';

// Called by the API after every admin save so the public site shows changes straight away.
export async function POST(req) {
  const secret = process.env.REVALIDATE_SECRET || '';
  const given = req.headers.get('x-secret') || '';
  if (!secret || given.length !== secret.length || !timingSafeEqual(Buffer.from(given), Buffer.from(secret))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  revalidatePath('/', 'layout');
  return Response.json({ ok: true });
}
