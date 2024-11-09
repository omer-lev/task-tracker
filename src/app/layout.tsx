import type { Metadata } from "next";
import "./globals.css";

import { Poppins } from 'next/font/google';
import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryProvider } from "@/react-query/provider";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner';

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
    <ClerkProvider afterSignOutUrl='/'>
      <html lang="en">
        <body
          className={`${poppins.className} antialiased bg-muted`}
        >
          <ReactQueryProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </ReactQueryProvider>

          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
