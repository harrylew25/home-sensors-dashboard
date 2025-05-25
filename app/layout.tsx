"use client";

import { store } from "@/lib/store";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "react-redux";
import "./globals.css";
import "./msw";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Home sensor dashboard",
//   description: "Home sensor dashboard",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store()}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </Provider>
  );
}
