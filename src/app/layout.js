import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "antd/dist/antd.css";
import MessageProvider from "./components/MessageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jm Novelties - Gift Inquiry Portal",
  description:
    "Send inquiries for gift products and novelties. No login required, simple form submission.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MessageProvider>
          {children}
        </MessageProvider>
      </body>
    </html>
  );
}
