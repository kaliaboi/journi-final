import { FC } from "react";
import { Badge } from "./ui/badge";
import { Separator } from "@/components/ui/separator";

interface EntryCardProps {
  entry: any;
}

export const getEntryType = (entryCode: number) => {
  switch (entryCode) {
    case 1:
      return "Guided entry";
    case 2:
      return "Prompt entry";
    case 3:
      return "Free entry";
    default:
      return "Free entry";
  }
};

const EntryCard: FC<EntryCardProps> = ({ entry }) => {
  return (
    <div className="w-full flex mb-12">
      <div className="icon"></div>
      <div className="content">
        <p className="mb-2 text-[14px]">{entry.created_at}</p>
        {entry.entry_type === 1 && (
          <p className="my-4 font-semibold">
            Guided entry on {entry.created_at.split(",")[0]}
          </p>
        )}
        {entry.entry_type === 2 && (
          <p className="my-4 font-semibold">{entry.entry_metadata.prompt}</p>
        )}
        <p className="my-4">{entry.entry_body}</p>
      </div>
    </div>
  );
};

export default EntryCard;
