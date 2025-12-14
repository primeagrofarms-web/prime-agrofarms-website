import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendNewsletterEmail } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const { title, slug, excerpt, content, author, published_date, image_url } = formData;

    // Insert blog
    const { data: post, error } = await supabase
      .from('blogs')
      .insert([{ title, slug, excerpt, content, author, published_date, image_url }])
      .select()
      .single();

    if (error) throw error;

    // Send emails
    const { data: subscribers } = await supabase.from('newsletter_subscribers').select('email');
    const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://prime-agrofarms.com'}/blog/${slug}`;
    const subject = `New Blog Post: ${title}`;
    const html = `
      <h1>${title}</h1>
      <p>${excerpt}</p>
      <a href="${postUrl}">Read More</a>
    `;

    const emailPromises = subscribers.map(sub => sendNewsletterEmail(sub.email, subject, html));
    await Promise.all(emailPromises);

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}