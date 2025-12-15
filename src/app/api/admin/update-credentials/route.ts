import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session");

    if (!adminSession || adminSession.value !== "authenticated") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { currentEmail, currentPassword, newEmail, newPassword } = await request.json();

    const { data: admin, error: fetchError } = await supabase
      .from("admin_credentials")
      .select("*")
      .eq("email", currentEmail)
      .eq("password", currentPassword)
      .single();

    if (fetchError || !admin) {
      return NextResponse.json(
        { error: "Current credentials are incorrect" },
        { status: 401 }
      );
    }

    const updates: { email?: string; password?: string; updated_at: string } = {
      updated_at: new Date().toISOString(),
    };

    if (newEmail) updates.email = newEmail;
    if (newPassword) updates.password = newPassword;

    const { error: updateError } = await supabase
      .from("admin_credentials")
      .update(updates)
      .eq("id", admin.id);

    if (updateError) {
      throw updateError;
    }

    cookieStore.delete("admin_session");

    return NextResponse.json({
      success: true,
      message: "Credentials updated successfully. Please login again.",
    });
  } catch (error) {
    console.error("Update credentials error:", error);
    return NextResponse.json(
      { error: "An error occurred while updating credentials" },
      { status: 500 }
    );
  }
}
