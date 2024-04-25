import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import 'framework7-icons/css/framework7-icons.css';
import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={`font-sansation`}>
        <Component {...pageProps} />
        <Head>
          <link rel="icon" href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3oo0tHTZ0hgXIfdUjC7TIeTOCXhUpvRBd3g&usqp=CAU" />
        </Head>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
