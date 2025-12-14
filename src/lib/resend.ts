import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewsletterEmail(to: string, subject: string, html: string) {
  await resend.emails.send({
    from: 'Prime Agro Farm <noreply@prime-agrofarms.com>',
    to,
    subject,
    html,
    reply_to: 'primeagrofarmslimited@gmail.com',
  });
}