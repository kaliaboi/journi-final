"use client";

import Free from "@/components/Free";
import Guided from "@/components/Guided";
import Prompt from "@/components/Prompt";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Cross, X } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

const Journal: FC = ({}) => {
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient();

  const getJournal = (mode: any) => {
    if (mode === "free")
      return <Free createdAt={moment().format("MMMM Do, h:mm a")} />;
    if (mode === "guided")
      return <Guided createdAt={moment().format("MMMM Do, h:mm a")} />;
    if (mode === "prompt")
      return <Prompt createdAt={moment().format("MMMM Do, h:mm a")} />;
  };

  return (
    <>
      {session ? (
        <div className="flex flex-col items-center h-full w-full">
          <div className="w-full max-w-3xl pt-4 bg-white h-full">
            <div className="flex flex-col h-full">
              <div className="nav w-full h-10 flex items-center justify-between p-8">
                <div className="logo flex gap-2 items-center">
                  <p>
                    New Entry{" "}
                    <span className="text-gray-400">
                      / {moment().format("MMMM Do, h:mm a")}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="shadow-none"
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push("/")}
                  >
                    <X />
                  </Button>
                </div>
              </div>
              <div className="body px-8 py-6">
                {getJournal(router.query.mode)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Please login first</p>
      )}
    </>
  );
};

export default Journal;
