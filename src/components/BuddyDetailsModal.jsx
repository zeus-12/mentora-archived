import { Blockquote, Button, Modal } from "@mantine/core";
import { IconCurrencyRupee } from "@tabler/icons";
import Link from "next/link";
import { buttonOutlineClasses } from "../utils/constants";
import { prettifyId } from "../utils/helper";
const idNameMapping = require("../../name-id-map.json");
import { useSWRConfig } from "swr";
import { errorNotification, successNotification } from "../utils/notification";

const BuddyDetailsModal = ({ buddyData, closeDetailsModal }) => {
  const { mutate } = useSWRConfig();

  const applyBuddyHandler = async () => {
    const res = await fetch(`/api/buddy/${buddyData._id}/apply`, {
      method: "POST",
    });

    const data = await res.json();
    if (data.error) {
      errorNotification("Error applying buddy");
      return;
    }
    successNotification("Applied Successfully!");
    closeDetailsModal();
    mutate("/api/buddy");
  };

  return (
    <div>
      <Modal
        withCloseButton={false}
        transition="fade"
        transitionTimingFunction="ease"
        opened={!!buddyData}
        onClose={closeDetailsModal}
        centered={true}
        classNames={{
          modal: "bg-black p-16",
        }}
        size="lg"
        radius="md"
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-2xl">
              {prettifyId(buddyData?.course_id)}:{" "}
              <span className="text-gray-500">
                {idNameMapping[buddyData?.course_id?.toUpperCase()]}
              </span>
            </p>
            <p className="bg-green-700 text-gray-300 text-base inline-flex px-2 py-[2px] rounded-2xl capitalize">
              {buddyData?.buddyType}
            </p>
          </div>

          <Blockquote>
            <p>{buddyData?.message}</p>
          </Blockquote>

          <div className="flex gap-2 text-lg">
            {buddyData?.buddyType === "tutor" && (
              <div className="flex">
                <IconCurrencyRupee />
                {buddyData?.money}
              </div>
            )}
          </div>

          {!buddyData?.self && !buddyData?.applied && (
            <Button
              onClick={applyBuddyHandler}
              className={buttonOutlineClasses}
            >
              Apply!
            </Button>
          )}

          {buddyData?.applied && (
            <p className="text-gray-400 text-center">
              Already Applied! <br />
              You&apos;ll be notified at{" "}
              <Link href="/user">
                <span className="hover:cursor-pointer text-green-200">
                  User Page
                </span>
              </Link>{" "}
              once they approve!
            </p>
          )}

          {buddyData?.self && (
            <p className="text-gray-400 text-center">
              You cant apply for your own request!
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
};
export default BuddyDetailsModal;
