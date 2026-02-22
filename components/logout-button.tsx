"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type LogoutButtonProps = {
  className?: string;
};

export default function LogoutButton({ className }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  };

  return (
    <button type="button" onClick={() => void handleLogout()} className={className}>
      Log out
    </button>
  );
}
