"use client";

import { useSession } from "@supabase/auth-helpers-react";
import { FC } from "react";

const Journal: FC = ({}) => {
  const session = useSession();
  return <div>{JSON.stringify(session)}</div>;
};

export default Journal;
