import { Button } from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonOutlineClasses } from "../../utils/tailwindClasses";
import DoubtCard from "../../components/DoubtCard";
import LoaderComponent from "../../components/LoaderComponent";

const Doubts = () => {
  const { data: session } = useSession();
  const [doubts, setDoubts] = useState([]);

  useEffect(() => {
    const fetchDoubts = async () => {
      const res = await fetch(`/api/doubts`);
      const data = await res.json();
      setDoubts(data.data);
    };
    fetchDoubts();
  }, []);

  return (
    <div className="flex min-h-[90vh] flex-col">
      <div className="flex justify-between px-16">
        <p className="text-3xl">Doubts</p>
        <Link passHref href={session ? "/doubts/new" : ""}>
          <Button variant="outline" className={buttonOutlineClasses}>
            Ask Question
          </Button>
        </Link>

        {/* FILTER, SORT, AND OTHER STUFF */}
      </div>
      {/* doubts */}
      {doubts?.length === 0 && <LoaderComponent />}

      {doubts?.length > 0 && doubts.map((item) => <DoubtCard key={item._id} />)}
    </div>
  );
};

export default Doubts;
