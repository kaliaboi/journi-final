import "../styles/globals.css";
import { useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import { PasswordProvider } from "@/contexts/PasswordContext";
import { Toaster } from "react-hot-toast";

function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <PasswordProvider>
        <Component {...pageProps} />
        <Toaster />
      </PasswordProvider>
    </SessionContextProvider>
  );
}
export default App;
