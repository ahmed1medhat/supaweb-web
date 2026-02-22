import CampaignForm from "@/app/admin/campaigns/_components/campaign-form";
import FlashMessage from "@/app/admin/campaigns/_components/flash-message";
import { createCampaignAction } from "@/app/admin/campaigns/actions";

type SearchParamValue = string | string[] | undefined;
type SearchParams = Record<string, SearchParamValue>;

type NewCampaignPageProps = {
  searchParams?: Promise<SearchParams> | SearchParams;
};

export default async function NewCampaignPage({ searchParams }: NewCampaignPageProps) {
  const resolvedSearchParams = (await Promise.resolve(searchParams)) ?? {};

  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white">Create Campaign</h1>
        <p className="mt-2 text-sm text-slate-400">Configure a new onsite campaign.</p>
      </header>

      <FlashMessage error={resolvedSearchParams.error} />

      <CampaignForm
        action={createCampaignAction}
        submitLabel="Create Campaign"
        backHref="/admin/campaigns"
      />
    </section>
  );
}
