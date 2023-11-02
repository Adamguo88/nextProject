import { Inter } from "next/font/google";
import Provider from "./_components/Provider";

import Header from "./_components/Header";
import "../scss/Index.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "首頁",
};
export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} width100`}>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
