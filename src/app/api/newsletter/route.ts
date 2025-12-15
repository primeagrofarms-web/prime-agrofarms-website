import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendNewsletterEmail } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const { data: existing, error: checkError } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "This email is already subscribed to our newsletter" },
        { status: 400 }
      );
    }

    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email }]);

    if (insertError) {
      console.error("Error saving subscriber:", insertError);
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: 500 }
      );
    }

    try {
      await sendNewsletterEmail(
        email,
        "Welcome to Prime Agro Farm Newsletter",
        `
          <h1 style="color: #2D5F3F; font-family: Arial, sans-serif;">Thank You for Subscribing!</h1>
          <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            Welcome to the Prime Agro Farm community! We're thrilled to have you on board.
          </p>
          <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            You'll now receive updates about our latest news, blog posts, farm activities, and exclusive content directly in your inbox.
          </p>
          <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            Thank you for your interest in sustainable farming and agricultural innovation.
          </p>
          <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            Have questions or feedback? Reply to this email or contact us at <a href="mailto:primeagrofarmslimited@gmail.com" style="color: #2D5F3F; text-decoration: none;">primeagrofarmslimited@gmail.com</a>
          </p>
          <br>
          <p style="font-family: Arial, sans-serif; font-size: 14px; color: #666;">
            Best regards,<br>
            <strong>Prime Agro Farm Team</strong>
          </p>
        `
      );
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter. Check your email for confirmation!",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}