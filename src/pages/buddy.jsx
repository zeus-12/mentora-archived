import { Button, Modal, Radio, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import BuddyCard from "../components/BuddyCard";
import { buttonOutlineClasses } from "../utils/tailwindClasses";
import { IconX } from "@tabler/icons";
import NewBuddyModal from "../components/NewBuddyModal";

const Buddy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buddies, setBuddies] = useState([]);

  const [loading, setLoading] = useState(false);

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
  return (
    <div>
      <div className="flex items-center justify-center">
        <div>
          <p className="text-3xl font-semibold">
            Having trouble with your studies? <br />
            <span>Get yourself a Study/Tutor Buddy</span>
          </p>
          <Button
            variant="outline"
            className={`mt-2 ${buttonOutlineClasses}`}
            onClick={() => setIsModalOpen(true)}
          >
            Apply Now!
          </Button>
        </div>
        {/* image to right */}
      </div>
      <p className="mt-16 text-3xl text-center">
        Interested in helping others out?
      </p>
      {/* DISPLAY ALL THE DATA HERE */}
      {buddies.length > 0 &&
        buddies.map((buddy) => <BuddyCard key={buddy._id} />)}
      <NewBuddyModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};
export default Buddy;
