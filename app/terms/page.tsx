export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
      <h1 className="text-4xl font-bold">Terms of Service</h1>
      <p className="text-sm text-gray-500">Last Updated: February 2026</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
        <p>
          By accessing or using SupaWeb, you agree to be bound by these Terms.
          If you are using the Service on behalf of an organization, you
          represent that you have authority to bind that entity.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Description of Service</h2>
        <p>
          SupaWeb provides revenue intelligence analysis, SEO audits,
          performance diagnostics, and revenue impact modeling.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Subscription & Billing</h2>
        <p>
          Paid subscriptions auto-renew unless canceled. Payments are processed
          via third-party providers. Fees are non-refundable unless required by law.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Revenue Disclaimer</h2>
        <p>
          Revenue projections are algorithmic estimates and do not constitute
          financial or investment advice.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
        <p>
          SupaWeb shall not be liable for indirect or consequential damages.
          Liability is limited to fees paid in the preceding 12 months.
        </p>
      </section>

      <p className="text-sm text-gray-500">
        Contact: legal@supaweb.com
      </p>
    </div>
  );
}
