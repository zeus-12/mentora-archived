import { Button, Input, TextInput } from "@mantine/core";
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
import useSWR from "swr";
import { getFetcher } from "../utils/swr";

const Buddy = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newBuddyModal, setNewBuddyModal] = useState(false);
  const { data: session } = useSession();
  const [buddyTypeFilter, setBuddyTypeFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");

  const [cur, setCur] = useState(null);

  const closeDetailsModal = () => {
    setCur(null);
  };

  const closeNewBuddyModal = () => {
    setNewBuddyModal(false);
  };

  // const { data: buddies, error } = useSWR("/api/buddy", getFetcher);
  const buddies = [];
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
    <div className="flex flex-1 flex-col">
      <div className="flex sm:gap-4 gap-2 items-center mb-4 justify-center">
        <div className="max-w-[40rem] flex-1">
          <TextInput
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

      {buddies?.length === 0 && <LoaderComponent />}

      {filteredBuddies?.length > 0 && (
        <div className="grid auto-rows-max justify-items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-3">
          {filteredBuddies.map((buddy) => (
            // <div  >
            <BuddyCard
              onClick={() => setCur(buddy)}
              buddy={buddy}
              key={buddy._id}
            />
            // </div>
          ))}
        </div>
      )}
      {buddies?.length > 0 && filteredBuddies.length === 0 && (
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
