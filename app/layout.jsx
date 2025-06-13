import "./globals.css";

export const metadata = {
  title: "Inventory Dashboard",
  description: "BCG X Frontend Assignment Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full flex flex-col bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
