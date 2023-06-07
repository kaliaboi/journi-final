"use client";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { FC, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";

const Home: FC = ({}) => {
  const [setupNeeded, setSetupNeeded] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const supabase = useSupabaseClient();
  const session = useSession();

  const storePassword = async (hash: string) => {
    const response = await supabase
      .from("setups")
      .update({
        password_hash: hash,
        setup_completed: true,
        last_secured: Date.now(),
      })
      .eq("user_id", session?.user.id);

    setSetupNeeded(false);
  };

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
    <div className="flex flex-col items-center h-full w-full bg-slate-200">
      <div className="w-full max-w-2xl bg-slate-50">
        <p>Account page will go here.</p>
        <p>{setupNeeded && "Setup Needed"}</p>
        <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        <AlertDialog open={setupNeeded}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="w-full flex justify-center sm:justify-start">
                <div className="w-36">
                  <img src="/tea.svg" alt="" />
                </div>
              </div>

              <AlertDialogTitle>
                Welcome to Journi,{" "}
                {session?.user.user_metadata.name.split(" ")[0]}!
              </AlertDialogTitle>
              <AlertDialogDescription>
                Before we get started, you will need to add a password to your
                journal so that your entreis are secure and encrypted
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="my-8 flex flex-col gap-2">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                type="password"
              />
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                type="password"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogAction
                disabled={password.length < 6 || password !== confirmPassword}
                onClick={() =>
                  axios
                    .post("/api/hashPassword", { password })
                    .then((res) => storePassword(res.data.hash))
                }
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Home;
