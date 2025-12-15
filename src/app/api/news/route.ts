import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendNewsletterEmail } from '@/lib/resend';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;

    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('published_date', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching news:', error);
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error in news API:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const { title, slug, excerpt, content, published_date, image_url } = formData;

    const { data: post, error } = await supabase
      .from('news')
      .insert([{ title, slug, excerpt, content, published_date, image_url }])
      .select()
      .single();

    if (error) throw error;

    const { data: subscribers } = await supabase.from('newsletter_subscribers').select('email');
    const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/news/${slug}`;
    const subject = `New News: ${title}`;
    const html = `
      <h1>${title}</h1>
      <p>${excerpt}</p>
      <a href="${postUrl}">Read More</a>
    `;

    if (subscribers && subscribers.length > 0) {
      const emailPromises = subscribers.map(sub => sendNewsletterEmail(sub.email, subject, html));
      await Promise.all(emailPromises);
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}
