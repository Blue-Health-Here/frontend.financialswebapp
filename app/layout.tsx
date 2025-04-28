import { Toaster } from "react-hot-toast";
import "./globals.css";
import ThemeProvider from "./ThemeProvider";
import { Montserrat } from "next/font/google"
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});


export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Financials Web App",
  description: "The financials web app for all your financial needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className={montserrat.variable}>
      <body className="bg-background text-foreground" suppressHydrationWarning={true}>
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
