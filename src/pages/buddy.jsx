import { Button, Modal, Radio, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import BuddyCard from "../components/BuddyCard";
import { buttonOutlineClasses } from "../utils/tailwindClasses";
import { IconX } from "@tabler/icons";
import LoaderComponent from "../components/LoaderComponent";
import NewBuddyModal from "../components/NewBuddyModal";
import { notSignedInNotification } from "../utils/notification";
import { useSession } from "next-auth/react";

const Buddy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buddies, setBuddies] = useState([]);
  const { data: session } = useSession();
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

  const applyBuddyBtnHandler = () => {
    if (!session) {
      notSignedInNotification("Please sign in to apply for buddy");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-[90vh] flex-col">
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
      <p className="mt-16 mb-4 tracking-tight font-semibold text-3xl text-center">
        Interested in {""}
        <span className="text-green-500">helping</span> others out?
      </p>

      {buddies.length === 0 && <LoaderComponent />}

      <div className="flex gap-2 flex-wrap">
        {buddies.length > 0 &&
          buddies.map((buddy) => <BuddyCard key={buddy._id} buddy={buddy} />)}
      </div>
      <NewBuddyModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};
export default Buddy;
