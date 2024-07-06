import "~/styles/globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "Siamal - Donasi Mudah, Aman, dan Berdampak",
  description:
    "Siamal adalah platform donasi dan amal terpercaya yang menghubungkan Anda dengan berbagai program sosial di Indonesia. Bersama kita wujudkan perubahan positif untuk masyarakat.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
