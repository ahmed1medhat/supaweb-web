import VisualCampaignBuilder from "@/app/admin/campaigns/_components/visual-campaign-builder";
import { createCampaignAction } from "@/app/admin/campaigns/actions";
import { buildInitialValuesFromTemplate } from "@/app/admin/campaigns/builder-defaults";
import { getCampaignTemplateById } from "@/app/admin/campaigns/template-library";

type SearchParamValue = string | string[] | undefined;
type SearchParams = Record<string, SearchParamValue>;

type NewCampaignPageProps = {
  searchParams?: Promise<SearchParams> | SearchParams;
};

function getFirstValue(value: SearchParamValue): string | null {
  if (!value) {
    return null;
  }

  const text = Array.isArray(value) ? value[0] : value;
  return text || null;
}

function toErrorMessage(value: SearchParamValue): string | null {
  const text = getFirstValue(value);

  if (!text) {
    return null;
  }

  try {
    return decodeURIComponent(text);
  } catch {
    return text;
  }
}

export default async function NewCampaignPage({ searchParams }: NewCampaignPageProps) {
  const resolvedSearchParams = (await Promise.resolve(searchParams)) ?? {};
  const templateIdRaw = resolvedSearchParams.template;
  const templateId = Array.isArray(templateIdRaw) ? templateIdRaw[0] : templateIdRaw;
  const errorMessage = toErrorMessage(resolvedSearchParams.error);
  const template = getCampaignTemplateById(templateId);
  const initialValues = buildInitialValuesFromTemplate(template);

  return (
    <section className="space-y-4">
      {errorMessage ? (
        <div role="alert" className="rounded-xl border border-rose-400/35 bg-rose-500/10 px-4 py-3">
          <p className="text-sm font-semibold text-rose-100">Could not create campaign</p>
          <p className="mt-1 text-sm text-rose-200">{errorMessage}</p>
        </div>
      ) : null}

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
