import FlashMessage from "@/app/admin/campaigns/_components/flash-message";
import VisualCampaignBuilder from "@/app/admin/campaigns/_components/visual-campaign-builder";
import { createCampaignAction } from "@/app/admin/campaigns/actions";
import { buildInitialValuesFromTemplate } from "@/app/admin/campaigns/builder-defaults";
import { getCampaignTemplateById } from "@/app/admin/campaigns/template-library";

type SearchParamValue = string | string[] | undefined;
type SearchParams = Record<string, SearchParamValue>;

type NewCampaignPageProps = {
  searchParams?: Promise<SearchParams> | SearchParams;
};

export default async function NewCampaignPage({ searchParams }: NewCampaignPageProps) {
  const resolvedSearchParams = (await Promise.resolve(searchParams)) ?? {};
  const templateIdRaw = resolvedSearchParams.template;
  const templateId = Array.isArray(templateIdRaw) ? templateIdRaw[0] : templateIdRaw;
  const template = getCampaignTemplateById(templateId);
  const initialValues = buildInitialValuesFromTemplate(template);

  return (
    <section className="space-y-4">
      <FlashMessage error={resolvedSearchParams.error} />

      <VisualCampaignBuilder
        action={createCampaignAction}
        submitLabel="Create Campaign"
        backHref="/admin/campaigns"
        initialValues={initialValues}
        title="Create Campaign"
        description="Build and preview your campaign before saving."
        templateName={template.name}
        templateId={template.id}
        templatePickerHref="/admin/campaigns/templates"
      />
    </section>
  );
}
