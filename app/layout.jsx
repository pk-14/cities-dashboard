import "./globals.css";
import Navbar from "../components/navbar/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full flex flex-col bg-gray-50 text-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
