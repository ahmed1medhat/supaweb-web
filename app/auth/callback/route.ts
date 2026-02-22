import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function redirectTo(pathname: string, requestUrl: URL) {
  return NextResponse.redirect(new URL(pathname, requestUrl.origin));
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return redirectTo("/login", requestUrl);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    const encodedError = encodeURIComponent(error.message);
    return NextResponse.redirect(
      new URL(`/login?error=${encodedError}`, requestUrl.origin),
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirectTo("/login", requestUrl);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("user_id", user.id)
    .maybeSingle();

  const hasPlan = typeof profile?.plan === "string" && profile.plan.trim().length > 0;
  return redirectTo(hasPlan ? "/app" : "/select-plan", requestUrl);
}
