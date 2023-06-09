"use client";

import { FC, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FreeProps {
  createdAt: string;
}

const Free: FC<FreeProps> = ({ createdAt }) => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    const userId = session?.user.id;
    const { data, error } = await supabase.from("entries").insert({
      user_id: userId,
      created_at: createdAt,
      entry_body: value,
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
  return (
    <>
      <div className="h-full">
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

export default Free;
