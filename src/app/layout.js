import localFont from "next/font/local";
import "./globals.css";
import Navabar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AuthProvider from "@/services/AuthProvider";
import { ToastContainer } from "./reacttoastify.js";
import 'react-toastify/dist/ReactToastify.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default: "Majestic Moments",
    template: "%s | Majestic Moments"
  },
  description: "Create your memory with us",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="majesticMomentsTheme">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navabar />
          {children}
          <Footer />
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
