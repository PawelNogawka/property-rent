import "./globals.scss";
import { DM_Sans } from "next/font/google";
import getCurrentUser from "./actions/GetCurrentUser";

import Navbar from "./components/navbarElements/Navbar";
import Footer from "./components/Footer";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Airnb",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={sans.className}>
        <div id="overlays"></div>
        <Navbar currentUser={currentUser} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
