import {
  CAMPAIGN_TEMPLATES,
} from "@/app/admin/campaigns/template-library";
import CampaignTemplatesClient from "@/app/admin/campaigns/templates/templates-client";
import { isAdminEmail } from "@/utils/admin";
import { createClient } from "@/utils/supabase/server";

export default async function CampaignTemplatesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthenticated = Boolean(user);
  const isAdmin = isAdminEmail(user?.email);

  return (
    <CampaignTemplatesClient
      templates={CAMPAIGN_TEMPLATES}
      isAdmin={isAdmin}
      isAuthenticated={isAuthenticated}
    />
  );
}
