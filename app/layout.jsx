import "./globals.css";

export const metadata = {
  title: "Inventory Dashboard",
  description: "BCG X Frontend Assignment Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
