export default function BillingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      
      {/* Hero */}
      <section className="pt-28 pb-16 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-primary text-xs font-bold tracking-widest uppercase mb-6">
            Account & Subscription
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Billing & Subscription Management
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Manage your SupaWeb subscription, review plan limits, access invoices, 
            and update payment methods securely through our encrypted billing portal.
          </p>
        </div>
      </section>

      {/* Current Plan Card */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">

          {/* Plan Overview */}
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Current Plan</h2>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-extrabold text-primary">Pro</span>
              <span className="text-slate-400 text-sm">Monthly Subscription</span>
            </div>

            <ul className="space-y-3 text-slate-300 text-sm mb-8">
              <li>✔ 1,000 Crawl Pages</li>
              <li>✔ 800+ Revenue Factors</li>
              <li>✔ Full Intelligence Dashboard</li>
              <li>✔ API Access</li>
              <li>✔ Priority Support</li>
            </ul>

            <button className="w-full bg-primary hover:bg-blue-500 transition-all py-3 rounded-xl font-bold shadow-lg shadow-primary/30">
              Upgrade Plan
            </button>
          </div>

          {/* Billing Status */}
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Billing Status</h2>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex justify-between">
                <span>Status</span>
                <span className="text-emerald-400 font-bold">Active</span>
              </div>

              <div className="flex justify-between">
                <span>Next Invoice</span>
                <span>July 14, 2026</span>
              </div>

              <div className="flex justify-between">
                <span>Billing Cycle</span>
                <span>Monthly</span>
              </div>

              <div className="flex justify-between">
                <span>Amount</span>
                <span>$49 / month</span>
              </div>
            </div>

            <button className="mt-8 w-full border border-white/20 hover:bg-white/5 transition-all py-3 rounded-xl font-bold">
              Manage Payment Method
            </button>
          </div>
        </div>
      </section>

      {/* Invoice History */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold mb-10">Invoice History</h2>

          <div className="bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-slate-400 uppercase tracking-wider text-xs">
                <tr>
                  <th className="p-6">Invoice</th>
                  <th className="p-6">Date</th>
                  <th className="p-6">Amount</th>
                  <th className="p-6">Status</th>
                  <th className="p-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-6">#INV-000123</td>
                  <td className="p-6">June 14, 2026</td>
                  <td className="p-6">$49</td>
                  <td className="p-6 text-emerald-400 font-semibold">Paid</td>
                  <td className="p-6">
                    <button className="text-primary hover:underline">
                      Download PDF
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="p-6">#INV-000122</td>
                  <td className="p-6">May 14, 2026</td>
                  <td className="p-6">$49</td>
                  <td className="p-6 text-emerald-400 font-semibold">Paid</td>
                  <td className="p-6">
                    <button className="text-primary hover:underline">
                      Download PDF
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Secure Payment Processing
          </h3>

          <p className="text-slate-400 leading-relaxed text-sm">
            All payments are securely processed via Polar. SupaWeb does not store 
            full card numbers. Subscription validation is handled server-side 
            and enforced through secure authentication.
          </p>
        </div>
      </section>

    </div>
  );
}
