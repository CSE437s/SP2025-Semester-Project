import { Toaster } from "react-hot-toast";
import { testConnection } from "@/lib/supabase";
import "./globals.css";

// Test database connection when app starts
testConnection().catch(console.error);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
} 