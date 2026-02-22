export type SiteRow = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  domain: string;
  public_key: string;
  is_default: boolean;
};

export function buildSiteSnippet(publicKey: string): string {
  return `<script src="https://supaweblabs.com/onsite.js" data-site="${publicKey}" defer></script>`;
}
