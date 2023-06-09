import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const NewJournalPopOver = ({}) => {
  const { push } = useRouter();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm">New Entry</Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <p className="mt-2 mb-4 font-bold">
          How would you like to journal today?
        </p>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => push("/journal?mode=guided")}
        >
          New guided entry
        </Button>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => push("/journal?mode=prompt")}
        >
          New prompt entry
        </Button>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => push("/journal?mode=free")}
        >
          New free entry
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default NewJournalPopOver;
