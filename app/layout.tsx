// app/layout.tsx
import "./globals.css";
import CampaignWidget from "@/components/CampaignWidget";

export const metadata = {
  title: "SupaWeb",
  description: "Revenue Intelligence Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Inter font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Material Icons (Outlined) */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />

        {/* Material Icons (Round) */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />

        {/* Material Symbols (Outlined) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
          rel="stylesheet"
        />
      </head>

      {/* مهم: خلي الـ body هنا بدون Tailwind CDN */}
      <body className="font-sans antialiased">
        {children}
        <CampaignWidget />
      </body>
    </html>
  );
}
