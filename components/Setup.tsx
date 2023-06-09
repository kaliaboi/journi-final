"use client";

import { FC } from "react";
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
import { supabase } from "@/lib/supabase";
import { useSession } from "@supabase/auth-helpers-react";

interface SetupProps {
  open: boolean;
  password: string;
  setPassword: any;
  confirmPassword: string;
  setConfirmPassword: any;
  setSetupNeeded: any;
}

const Setup: FC<SetupProps> = ({
  open,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  setSetupNeeded,
}) => {
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

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="w-full flex justify-center sm:justify-start">
            <div className="w-36">
              <img src="/tea.svg" alt="" />
            </div>
          </div>

          <AlertDialogTitle>
            Welcome to Journi, {session?.user.user_metadata.name.split(" ")[0]}!
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
  );
};

export default Setup;
