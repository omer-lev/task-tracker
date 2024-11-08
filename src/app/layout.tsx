import type { Metadata } from "next";
import "./globals.css";

import { Poppins } from 'next/font/google';
import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryProvider } from "@/react-query/provider";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Tasker",
  description: "Manage your projects and tasks effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${poppins.className} antialiased bg-muted`}
        >
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
