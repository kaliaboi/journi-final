import { FC } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

interface EntryListProps {
  entries: any;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 },
};

const EntryList: FC<EntryListProps> = ({ entries }) => {
  return (
    <div className="p-8">
      <motion.div variants={container} initial="hidden" animate="show">
        {entries.map((e: any) => (
          <motion.div variants={item}>
            <Card className="mb-2">
              <CardHeader>
                <CardTitle>{e.created_at}</CardTitle>
                <CardDescription>{e.entry_type}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{e.entry_body}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default EntryList;
