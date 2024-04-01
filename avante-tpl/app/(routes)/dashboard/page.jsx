import { getSession } from "next-auth/react";

export default function Dashboard({session}) {
  return (
    <>
        {session}
    </>
  );
}
