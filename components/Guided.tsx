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
import { ChatGPTMessage } from "@/lib/opanai";
import { Progress } from "@/components/ui/progress";

interface GuidedProps {
  createdAt: string;
}

const Guided: FC<GuidedProps> = ({ createdAt }) => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<ChatGPTMessage[]>([
    {
      role: "assistant",
      content: `Hi ${
        session?.user.user_metadata.name.split(" ")[0]
      }, how are you doing today?`,
    },
  ]);

  const lastAssistantMessage = messages
    .filter((m) => m.role === "assistant")
    .pop()?.content;

  const handleAddMessage = async () => {
    setLoading(true);
    setMessages((m) => [...m, { role: "user", content: value }]);
    console.log(messages);
    axios
      .post("/api/getGuidedResponse", {
        messages: [...messages, { role: "user", content: value }],
      })
      .then((res) => {
        setMessages([
          ...messages,
          { role: "user", content: value },
          { role: "assistant", content: res.data.response },
        ]);
        setValue("");
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    // setLoading(true);

    setLoading(true);
    axios
      .post("/api/getSummary", {
        messages,
      })
      .then(async (res) => {
        console.log(res);
        const userId = session?.user.id;
        const { data, error } = await supabase.from("entries").insert({
          user_id: userId,
          created_at: createdAt,
          entry_body: res.data.response,
          entry_type: 1,
          entry_metadata: { trasncript: messages },
        });
        if (error) {
          setLoading(false);
          toast.error(error.message);
        } else {
          setLoading(false);
          toast.success("Entry saved succesfully!");
          router.push("/");
        }
      });
  };

  useEffect(() => {}, []);

  const refreshPrompt = async () => {};
  return (
    <>
      <div className="h-full">
        <Progress
          value={(messages.filter((m) => m.role === "user").length / 3) * 100}
          className="h-2 mb-8"
          // completed={
          //   (messages.filter((m) => m.role === "user").length / 3) * 100 >= 100
          // }
        />
        <div className="">
          <p className="mb-4">
            {loading ? "Fetching prompt..." : lastAssistantMessage}
          </p>
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
      <div className="flex flex-row-reverse gap-2">
        <Button
          className="bottom-0"
          onClick={handleAddMessage}
          disabled={loading}
        >
          Next
        </Button>
        {(messages.filter((m) => m.role === "user").length / 3) * 100 >=
          100 && (
          <Button
            className="bottom-0 bg-green-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            Submit
          </Button>
        )}
      </div>
    </>
  );
};

export default Guided;
