import { Inter } from "next/font/google";
import Header from "./_components/Header";
import "../scss/Index.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "首頁",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} width100`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
