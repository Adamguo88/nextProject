import { Inter } from "next/font/google";
import Header from "./_components/Header";
import "../scss/Index.scss";
const inter = Inter({ subsets: ["latin"] });

// async function LoginStatus() {
//   "use server";
//   const response = await fetch(
//     "http://localhost:3000/api/loginAPI/getLoginStatus",
//     {
//       method: "POST",
//       body: JSON.stringify({ type: "hello world123" }),
//     }
//   );
//   const data = await response.json();
//   console.log(data);
// }

export const metadata = {
  title: "首頁",
};
export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${inter.className} width100`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
