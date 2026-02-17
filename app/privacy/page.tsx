export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Enterprise Compliance</h2>
        <p>
          SupaWeb complies with GDPR, CCPA, and modern enterprise security standards.
          We process data under lawful contractual necessity and legitimate interest.
        </p>
        <p>
          We do not sell personal data. Enterprise Data Processing Addendums (DPA)
          are available upon request.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">GDPR Rights</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Right of access</li>
          <li>Right to rectification</li>
          <li>Right to erasure</li>
          <li>Right to restriction</li>
          <li>Right to portability</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Terms of Service</h2>
        <p>
          By using SupaWeb, you agree to comply with our acceptable use policy,
          subscription terms, and revenue estimation disclaimers.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cookie Policy</h2>
        <p>
          SupaWeb uses essential and performance cookies for authentication,
          security, and analytics purposes.
        </p>
      </section>

      <p className="text-sm text-gray-500">
        Contact: privacy@supaweb.com
      </p>
    </div>
  );
}
