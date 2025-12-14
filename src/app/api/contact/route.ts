import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import emailjs from "@emailjs/browser";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, newsletter } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          name,
          email,
          phone: phone || null,
          subject,
          message,
          status: "unread",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to save message" },
        { status: 500 }
      );
    }

    try {
      const emailJsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: name,
            from_email: email,
            phone: phone || "Not provided",
            subject: subject,
            message: message,
            to_email: "primeagrofarmslimited@gmail.com",
          },
        }),
      });

      if (!emailJsResponse.ok) {
        console.error("EmailJS error:", await emailJsResponse.text());
      }
    } catch (emailError) {
      console.error("Email sending error:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      data,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
