import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import 'framework7-icons/css/framework7-icons.css';
import { api } from "~/utils/api";
import { Toaster, toast } from 'sonner'


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
      <Toaster position="top-left" richColors/>
      <Head>
          <link rel="icon" href="/icon.png" />
        </Head>
        <Component {...pageProps} />
     
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
