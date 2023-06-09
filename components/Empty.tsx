import Lottie from "lottie-react";
import { FC } from "react";
import Paragraph from "./ui/Paragraph";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import animation from "../public/transistor-man-sitting-and-looking-at-smartphone.json";

interface EmptyProps {}

const Empty: FC<EmptyProps> = ({}) => {
  const { push } = useRouter();
  return (
    <div className="flex flex-col items-center w-80">
      <Lottie className="h-40 md:h-72" animationData={animation} loop={true} />
      <Paragraph prominence="dark" className="text-center mt-2 font-bold">
        No Entries Yet!
      </Paragraph>
      <Paragraph prominence="dark" className="text-center mt-2">
        As you start journaling, your entries will show up here. Click on the
        button below to start your first entry!
      </Paragraph>
      <Popover>
        <PopoverTrigger>
          <Button className="mt-8">New Entry</Button>
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
    </div>
  );
};

export default Empty;
