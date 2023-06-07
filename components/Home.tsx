"use client";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { FC, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Home: FC = ({}) => {
  const [setupNeeded, setSetupNeeded] = useState<boolean>(false);
  const supabase = useSupabaseClient();
  const session = useSession();
  useEffect(() => {
    const checkIfNeedsSetup = async () => {
      const { data, error } = await supabase
        .from("setups")
        .select()
        .eq("user_id", session?.user.id);

      if (data) {
        if (data?.length === 0) {
          const res = await supabase
            .from("setups")
            .insert({ user_id: session?.user.id, setup_completed: false });
          setSetupNeeded(true);
        } else {
          if (!data[0].setup_completed) {
            setSetupNeeded(true);
          } else {
            setSetupNeeded(false);
          }
        }
      }
    };
    checkIfNeedsSetup();
  }, []);
  return (
    <div className="bg-slate-200 min-h-screen">
      <p>Account page will go here.</p>
      <p>{setupNeeded && "Setup Needed"}</p>
      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
      <AlertDialog open={setupNeeded}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Home;
