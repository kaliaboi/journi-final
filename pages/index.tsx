import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Landing from "@/components/Landing";
import JournalHome from "@/components/Home";
import { useEffect, useState } from "react";

export default function Home() {
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.log(error);
    }
  }

  async function signInWithDiscord() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });
    if (error) {
      console.log(error);
    }
  }
  const session = useSession();
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  });
  return (
    <>
      {session ? (
        <JournalHome />
      ) : (
        <Landing
          google={signInWithGoogle}
          discord={signInWithDiscord}
          loading={loading}
        />
      )}
    </>
  );
}
