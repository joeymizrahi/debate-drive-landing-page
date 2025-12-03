import type { Metadata, Viewport } from "next";
import { Assistant } from "next/font/google"; 
import "./globals.css";

const assistant = Assistant({ subsets: ["hebrew", "latin"] });

export const metadata: Metadata = {
  title: "Debate Drive",
  description: "Voice debates for drivers.",
};

// Fixed: Viewport is now a separate export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${assistant.className} bg-background text-text antialiased`}>
        {/* Outer Desktop Background (Darker Slate) */}
        <div className="min-h-screen flex justify-center bg-[#020617]">
          
          {/* Mobile App Container */}
          <main className="w-full max-w-[430px] min-h-screen bg-background flex flex-col relative shadow-2xl border-x border-slate-800 overflow-hidden">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}