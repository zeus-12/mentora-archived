import { Blockquote, Button, Modal } from "@mantine/core";
import { IconCurrencyRupee } from "@tabler/icons";
import { buttonOutlineClasses } from "../utils/constants";
import { prettifyId } from "../utils/helper";
const idNameMapping = require("../../name-id-map.json");

const BuddyDetailsModal = ({ buddyData, closeDetailsModal }) => {
  // {
  //   "_id": "6350d1eb159d8d17636207c3",
  //   "course_id": "ed1012",
  //   "course_name": "learn stuff",
  //   "user": "elonmask2806@gmail.com",
  //   "message": "adsfasfsdfasf",
  //   "buddyType": "tutor",
  //   "money": "12",
  //   "date": "2022-10-20T04:43:23.737Z",
  // }
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
          <p className="text-2xl">
            {prettifyId(buddyData?.course_id)}:{" "}
            <span className="text-gray-500">
              {idNameMapping[buddyData?.course_id?.toUpperCase()]}
            </span>
          </p>

          {/* <p className="text-xl text-gray-400">Message</p> */}
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
            <p className="bg-green-700 text-gray-300 text-base inline-flex px-2 py-[0.5px] rounded-2xl">
              {buddyData?.buddyType}
            </p>
          </div>

          <Button className={buttonOutlineClasses}>Apply!</Button>
        </div>
      </Modal>
    </div>
  );
};
export default BuddyDetailsModal;
