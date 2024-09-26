import "./globals.css";

export const metadata = {
  title: "The User Manager App",
  description: "Manage and Store User Data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
