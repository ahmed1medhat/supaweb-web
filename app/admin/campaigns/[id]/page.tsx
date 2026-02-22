import { notFound } from "next/navigation";
import FlashMessage from "@/app/admin/campaigns/_components/flash-message";
import VisualCampaignBuilder from "@/app/admin/campaigns/_components/visual-campaign-builder";
import { updateCampaignAction } from "@/app/admin/campaigns/actions";
import { buildInitialValuesFromCampaign } from "@/app/admin/campaigns/builder-defaults";
import type { CampaignRow } from "@/app/admin/campaigns/types";
import { createClient } from "@/utils/supabase/server";

type Params = {
  id: string;
};

type SearchParamValue = string | string[] | undefined;
type SearchParams = Record<string, SearchParamValue>;

type EditCampaignPageProps = {
  params: Promise<Params> | Params;
  searchParams?: Promise<SearchParams> | SearchParams;
};

export default async function EditCampaignPage({ params, searchParams }: EditCampaignPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = (await Promise.resolve(searchParams)) ?? {};
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("campaigns")
    .select("id,created_at,updated_at,name,type,status,priority,title,message,cta_text,cta_url,primary_color,text_color,background_style,position,pages_mode,include_paths,audience_mode,plan_mode,frequency")
    .eq("id", resolvedParams.id)
    .maybeSingle();

  if (error) {
    return (
      <section className="space-y-4">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-white">Edit Campaign</h1>
          <p className="mt-2 text-sm text-slate-400">Update campaign details and targeting.</p>
        </header>

        <FlashMessage error={resolvedSearchParams.error ?? error.message} />
      </section>
    );
  }

  if (!data) {
    notFound();
  }

  const campaign = data as CampaignRow;
  const initialValues = buildInitialValuesFromCampaign(campaign);

  return (
    <section className="space-y-4">
      <FlashMessage error={resolvedSearchParams.error} />

      <VisualCampaignBuilder
        action={updateCampaignAction}
        submitLabel="Save Changes"
        backHref="/admin/campaigns"
        initialValues={initialValues}
        title="Edit Campaign"
        description="Update campaign content, targeting, and visual presentation."
      />
    </section>
  );
}
