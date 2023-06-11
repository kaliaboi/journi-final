"use client";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { FC, useEffect, useState } from "react";
import Setup from "./Setup";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import Empty from "./Empty";
import EntryList from "./EntryList";
import { toast } from "react-hot-toast";
import NewJournalPopOver from "./NewJournalPopOver";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarLoader } from "react-spinners";
import Paragraph from "./ui/Paragraph";

//TODO: add entry type

const Home: FC = ({}) => {
  const [setupNeeded, setSetupNeeded] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [entries, setEntries] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [avatar, setAvatar] = useState();
  const supabase = useSupabaseClient();
  const session = useSession();

  const getEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("entries").select();
    if (error) {
      toast.error(error.message);
    } else {
      setEntries(data.reverse());
    }
    setLoading(false);
  };

  useEffect(() => {
    setAvatar(session?.user.user_metadata.avatar_url);
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
    getEntries();
  }, []);

  return (
    <div className="flex flex-col items-center h-full w-full overflow-hidden">
      <div className="w-full max-w-3xl h-full overflow-scroll">
        <div className="flex flex-col min-h-screen">
          <div className="nav w-full h-10 flex items-center justify-between p-8 sticky top-0 bg-white shadow-sm">
            <div className="logo flex gap-2 items-center">
              <p>
                📕 {session?.user.user_metadata.full_name.split(" ")[0]}'s
                Journal
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <NewJournalPopOver />
              {avatar ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="w-8 h-8 cursor-pointer">
                      <AvatarImage src={avatar} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-2">
                    <Button
                      className="shadow-none"
                      variant="outline"
                      size="sm"
                      onClick={() => supabase.auth.signOut()}
                    >
                      Sign Out
                    </Button>
                  </PopoverContent>
                </Popover>
              ) : (
                <Skeleton className="w-8 h-8 rounded-full" />
              )}
            </div>
          </div>

          {entries ? (
            entries.length === 0 ? (
              <div className="empty flex justify-center items-center  grow">
                <Empty />
              </div>
            ) : (
              <EntryList entries={entries} />
            )
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <BarLoader />
            </div>
          )}
        </div>
        <Setup
          open={setupNeeded}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          setSetupNeeded={setSetupNeeded}
        />
      </div>
      <p className="p-4 w-full text-center bg-white">
        Created with ☕️ and ♥️ by{" "}
        <a
          className="underline underline-offset-4"
          href="https://abhishekkalia.design"
        >
          Abhishek Kalia
        </a>
      </p>
    </div>
  );
};

export default Home;
