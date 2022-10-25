import { Button, Input, Menu } from "@mantine/core";
import { useEffect, useState } from "react";
import BuddyCard from "../components/BuddyCard";
import { buttonOutlineClasses } from "../utils/tailwindClasses";
import {
  IconAdjustmentsHorizontal,
  IconCheck,
  IconNotebook,
} from "@tabler/icons";
import LoaderComponent from "../components/LoaderComponent";
import NewBuddyModal from "../components/NewBuddyModal";
import { notSignedInNotification } from "../utils/notification";
import { useSession } from "next-auth/react";

const Buddy = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buddies, setBuddies] = useState([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");

  useEffect(() => {
    const fetchBuddies = async () => {
      setLoading(true);
      const res = await fetch("/api/buddy");
      const data = await res.json();
      console.log(data.data);
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
    setIsModalOpen(true);
  };

  const availableFilters = ["all", "tutor", "batchmate"];
  const availableBranches = [
    "all",
    // "AS",
    "MA",
    "AE",
    // "ID",
    // "IL",
    "AM",
    "GN",
    "BT",
    // "NU",
    "CE",
    // "CA",
    // "CD",
    "CE",
    "CH",
    // "NE",
    "CS",
    // "IN",
    "CY",
    "ED",
    "EE",
    // "IG",
    "EP",
    // "EC",
    "HS",
    // "BS",
    // "MP",
    // "MS",
    // "HM",
    "ME",
    // "WS",
    "MM",
    // "MT",
    // "IT",
    // "PE",
    "OE",
    // "NC",
    // "NS",
    "NA",
    "PH",
  ];

  const filterCourseBranches = (data) => {
    if (branchFilter === "all") return data;
    return data.filter(
      (buddy) => buddy.course_id.slice(0, 2).toUpperCase() === branchFilter
    );
  };

  const filterBuddyRequests = (data) => {
    switch (filter) {
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
  const filterData = (data) => {
    if (searchQuery.trim().length === 0) {
      return data;
    } else {
      data = data.filter((item) =>
        // item.course_name
        //   .replaceAll(" ", "")
        //   .toLowerCase()
        //   .includes(searchQuery.replaceAll(" ", "").toLowerCase()) ||
        item.course_id
          .replaceAll(" ", "")
          .toLowerCase()
          .includes(searchQuery.replaceAll(" ", "").toLowerCase())
      );
      return data;
    }
  };

  const filteredBuddies = filterData(
    filterBuddyRequests(filterCourseBranches(buddies))
  );

  return (
    <div className="flex min-h-[90vh] md:px-4 px-2 lg:px-6 xl:px-8 flex-col">
      <div className="flex items-center justify-center">
        <div>
          <p className="text-3xl font-semibold">
            Having trouble with your studies? <br />
            <span>Get yourself a Study/Tutor Buddy</span>
          </p>
          <Button
            variant="outline"
            className={`mt-2 ${buttonOutlineClasses}`}
            onClick={() => applyBuddyBtnHandler()}
          >
            Apply Now!
          </Button>
        </div>
        {/* image to right */}
      </div>
      <p className="mt-16 tracking-tight font-semibold text-3xl text-center">
        Interested in {""}
        <span className="text-green-500">helping</span> others out?
      </p>

      <div className="flex gap-4 items-center mt-2 mb-4 justify-center">
        <div className="max-w-[40rem] flex-1">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="filled"
            placeholder="Enter course name/id"
            size="md"
          />
        </div>
        {console.log(buddies)}
        <Menu
          shadow="md"
          className="overflow-scroll"
          height={20}
          // position="bottom"
          width={200}
        >
          <Menu.Target>
            <Button className="text-gray-400 p-0 hover:text-white bg-inherit hover:bg-inherit">
              <IconAdjustmentsHorizontal className="w-7 h-7" />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Buddy Type</Menu.Label>
            {availableFilters.map((item) => (
              <Menu.Item
                onClick={() => setFilter(item)}
                key={item}
                className="capitalize"
              >
                <div className="flex justify-between items-center">
                  {item}
                  {item === filter && <IconCheck className="w-5 h-5" />}
                </div>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>

        <Menu shadow="md" height={20} width={200}>
          <Menu.Target>
            <Button className="text-gray-400 p-0 hover:text-white bg-inherit hover:bg-inherit">
              <IconNotebook className="w-7 h-7" />
            </Button>
          </Menu.Target>
          <Menu.Dropdown className="overflow-scroll h-60">
            <Menu.Label>Course Branch</Menu.Label>
            {availableBranches.map((item) => (
              <Menu.Item
                onClick={() => setBranchFilter(item)}
                key={item}
                className="capitalize"
              >
                <div className="flex justify-between items-center">
                  {item}
                  {item === branchFilter && <IconCheck className="w-5 h-5" />}
                </div>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      </div>

      {buddies.length === 0 && <LoaderComponent />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-2">
        {filteredBuddies.length > 0 ? (
          filteredBuddies.map((buddy) => (
            <BuddyCard key={buddy._id} buddy={buddy} />
          ))
        ) : (
          <p>No results found!</p>
        )}
      </div>
      <NewBuddyModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};
export default Buddy;
