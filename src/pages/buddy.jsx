import { Button, Input } from "@mantine/core";
import MenuComponent from "../components/MenuComponent";
import { useEffect, useState } from "react";
import BuddyCard from "../components/BuddyCard";
import { availableBranches, buttonOutlineClasses } from "../utils/constants";
import { IconAdjustmentsHorizontal, IconNotebook } from "@tabler/icons";
import LoaderComponent from "../components/LoaderComponent";
import NewBuddyModal from "../components/NewBuddyModal";
import { notSignedInNotification } from "../utils/notification";
import { useSession } from "next-auth/react";
import { filterOnSearch } from "../utils/helper";
import BuddyDetailsModal from "../components/BuddyDetailsModal";

const Buddy = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newBuddyModal, setNewBuddyModal] = useState(false);
  const [buddies, setBuddies] = useState([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [buddyTypeFilter, setBuddyTypeFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");

  const [cur, setCur] = useState(null);

  const closeDetailsModal = () => {
    setCur(null);
  };

  const closeNewBuddyModal = () => {
    setNewBuddyModal(false);
  };

  useEffect(() => {
    const fetchBuddies = async () => {
      setLoading(true);
      const res = await fetch("/api/buddy");
      const data = await res.json();

      if (data.error) {
        // todo show notification

        setLoading(false);
        return;
      }
      setBuddies(data.data);
      setLoading(false);
    };
    fetchBuddies();
  }, []);

  const applyBuddyBtnHandler = () => {
    if (!session) {
      notSignedInNotification("Please sign in to apply for buddy");
      return;
    }
    setNewBuddyModal(true);
  };

  const availableBuddyTypeFilters = ["all", "tutor", "batchmate"];

  const filterCourseBranches = (data) => {
    if (branchFilter === "all") return data;
    return data.filter((buddy) =>
      buddy.course_id.toUpperCase().startsWith(branchFilter)
    );
  };

  const filterBuddyRequests = (data) => {
    switch (buddyTypeFilter) {
      case "all":
        return data;
      case "tutor":
        return data.filter((buddy) => buddy.buddyType === "tutor");
      case "batchmate":
        return data.filter((buddy) => buddy.buddyType === "batchmate");
      default:
        return data;
    }
  };

  const filteredBuddies = filterOnSearch(
    searchQuery,
    filterBuddyRequests(filterCourseBranches(buddies))
  );

  return (
    <div className="flex min-h-[90vh] flex-col">
      <div className="flex sm:gap-4 gap-2 items-center mt-2 mb-4 justify-center">
        <div className="max-w-[40rem] flex-1">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="filled"
            placeholder="Enter course name/id"
            size="md"
          />
        </div>

        <MenuComponent
          state={buddyTypeFilter}
          setState={setBuddyTypeFilter}
          availableFilters={availableBuddyTypeFilters}
          title={"Buddy Type"}
          Icon={IconAdjustmentsHorizontal}
        />
        <MenuComponent
          state={branchFilter}
          setState={setBranchFilter}
          Icon={IconNotebook}
          availableFilters={availableBranches}
          title={"Course Branch"}
        />

        <Button
          variant="outline"
          className={buttonOutlineClasses}
          onClick={() => applyBuddyBtnHandler()}
        >
          Apply Now!
        </Button>
      </div>

      {buddies.length === 0 && <LoaderComponent />}

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-2"
        // style={{ gridTemplateRows: "max-content" }}
      >
        {filteredBuddies.length > 0 &&
          filteredBuddies.map((buddy) => (
            <div
              className="hover:cursor-pointer"
              onClick={() => setCur(buddy)}
              key={buddy._id}
            >
              <BuddyCard buddy={buddy} />
            </div>
          ))}
      </div>
      {buddies.length > 0 && filteredBuddies.length === 0 && (
        <p>No results found!</p>
      )}

      <NewBuddyModal
        newBuddyModal={newBuddyModal}
        closeNewBuddyModal={closeNewBuddyModal}
      />
      <BuddyDetailsModal
        buddyData={cur}
        closeDetailsModal={closeDetailsModal}
      />
    </div>
  );
};
export default Buddy;
