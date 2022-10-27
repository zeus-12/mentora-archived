import { Button, TextInput } from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { availableBranches, buttonOutlineClasses } from "../../utils/constants";
import DoubtCard from "../../components/DoubtCard";
import LoaderComponent from "../../components/LoaderComponent";
import { notSignedInNotification } from "../../utils/notification";
import { filterOnSearch } from "../../utils/helper";
import MenuComponent from "../../components/MenuComponent";
import { IconNotebook } from "@tabler/icons";

const Doubts = () => {
  const { data: session } = useSession();
  const [doubts, setDoubts] = useState([]);
  const [branchFilter, setBranchFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDoubts = async () => {
      const res = await fetch(`/api/doubt`);
      const data = await res.json();
      setDoubts(data.data);
    };
    fetchDoubts();
  }, []);

  const filterOnBranch = (doubts) => {
    if (branchFilter === "all") {
      return doubts;
    }

    return doubts.filter((doubt) => {
      return doubt.course_id.startsWith(branchFilter);
    });
  };

  const filteredDoubts = filterOnSearch(searchQuery, filterOnBranch(doubts));

  return (
    <div className="flex flex-1 min-h-[80vh] flex-col">
      <div className="flex justify-center gap-2 mb-4">
        <div className="max-w-[40rem] flex-1 ">
          <TextInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="filled"
            placeholder="Enter course name/id"
            size="md"
          />
        </div>

        <MenuComponent
          state={branchFilter}
          setState={setBranchFilter}
          Icon={IconNotebook}
          availableFilters={availableBranches}
          title={"Course Branch"}
        />
        <Link passHref href={session ? "/doubt/new" : ""}>
          <Button
            variant="outline"
            onClick={() =>
              !session
                ? notSignedInNotification("Please sign in to ask a doubt!")
                : () => {}
            }
            className={buttonOutlineClasses}
          >
            Ask Question
          </Button>
        </Link>
      </div>

      {doubts?.length === 0 && <LoaderComponent />}

      <div className="space-y-4">
        {filteredDoubts?.length > 0 &&
          filteredDoubts.map((item) => (
            <DoubtCard doubt={item} key={item._id} />
          ))}

        {doubts.length > 0 && filteredDoubts?.length === 0 && (
          <div className="text-center text-gray-500">
            No doubts found for the given search query
          </div>
        )}
      </div>
    </div>
  );
};

export default Doubts;
