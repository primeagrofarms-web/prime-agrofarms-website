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
    const { title, slug, excerpt, content, published_date, image_url, gallery_images } = formData;

    const { data: post, error } = await supabase
      .from('news')
      .insert([{ title, slug, excerpt, content, published_date, image_url, gallery_images }])
      .select()
      .single();

    if (error) throw error;

    // Send email notifications
    const { data: subscribers } = await supabase.from('newsletter_subscribers').select('email');
    
    if (subscribers && subscribers.length > 0) {
      const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/news/${slug}`;
      const subject = `New News: ${title}`;
      const html = `
        <h1>${title}</h1>
        <p>${excerpt}</p>
        <a href="${postUrl}">Read More</a>
      `;

      console.log(`📧 Sending emails to ${subscribers.length} subscribers...`);
      const emailResults = await Promise.allSettled(
        subscribers.map(sub => sendNewsletterEmail(sub.email, subject, html))
      );
      
      const successful = emailResults.filter(r => r.status === 'fulfilled').length;
      const failed = emailResults.filter(r => r.status === 'rejected').length;
      console.log(`✅ Emails sent: ${successful} successful, ${failed} failed`);
    } else {
      console.log('ℹ️ No subscribers to notify');
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}