import { Button } from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { buttonOutlineClasses } from "../../utils/tailwindClasses";

const Doubts = () => {
  const { data: session } = useSession();
  return (
    <div>
      <div className="flex justify-between px-16">
        <p className="text-3xl">Doubts</p>
        <Link passHref href={session ? "/doubts/new" : ""}>
          <Button variant="outline" className={buttonOutlineClasses}>
            Ask Question
          </Button>
        </Link>
        {/* FILTER, SORT, AND OTHER STUFF */}
      </div>
    </div>
  );
};

export default Doubts;
