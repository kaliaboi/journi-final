"use client";

import { FC, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Title from "./ui/Title";
import axios from "axios";
import { RefreshCcw } from "lucide-react";

interface PromptProps {
  createdAt: string;
}

const Prompt: FC<PromptProps> = ({ createdAt }) => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");

  const handleSubmit = async () => {
    setLoading(true);
    const userId = session?.user.id;
    const { data, error } = await supabase.from("entries").insert({
      user_id: userId,
      created_at: createdAt,
      entry_body: value,
      entry_type: 2,
      entry_metadata: { prompt: prompt },
    });
    if (error) {
      setLoading(false);
      toast.error(error.message);
    } else {
      setLoading(false);
      toast.success("Entry saved succesfully!");
      router.push("/");
    }
  };

  useEffect(() => {
    setLoading(true);
    axios.get("/api/getPrompt").then((res) => {
      setPrompt(res.data.prompt);
      setLoading(false);
    });
  }, []);

  const refreshPrompt = async () => {
    setLoading(true);
    axios.get("/api/getPrompt").then((res) => {
      setPrompt(res.data.prompt);
      setLoading(false);
    });
  };
  return (
    <>
      <div className="h-full">
        <div className="">
          <p className="mb-4">{loading ? "Fetching prompt..." : prompt}</p>
          <Button onClick={refreshPrompt}>
            <RefreshCcw />
          </Button>
        </div>

        <TextareaAutosize
          value={value}
          onChange={(e) => setValue(e.target.value)}
          minRows={6}
          placeholder="Start typing... (Press return to submit)"
          aria-label="chat input"
          required
          className="w-full appearance-none rounded-md border border-slate-50 focus:border-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-50"
        />
      </div>
      <div className="flex flex-row-reverse">
        <Button className="bottom-0" onClick={handleSubmit} disabled={loading}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default Prompt;
