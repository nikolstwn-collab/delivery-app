import "./globals.css";
import { DM_Sans, Sora } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}