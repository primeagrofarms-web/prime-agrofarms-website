import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@prime-agrofarms.com';
const FROM_NAME = process.env.RESEND_FROM_NAME || 'Prime Agro Farm';

export async function sendNewsletterEmail(to: string, subject: string, html: string) {
  try {
    const result = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to,
      subject,
      html,
      reply_to: 'primeagrofarmslimited@gmail.com',
    });
    
    console.log(`✅ Email sent to ${to}:`, result);
    return { success: true, result };
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error);
    return { success: false, error };
  }
}