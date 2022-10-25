import { Modal } from "@mantine/core";

const BuddyDetailsModal = ({ buddyData, closeDetailsModal }) => {
  return (
    <div>
      <Modal
        withCloseButton={false}
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={!!buddyData}
        onClose={closeDetailsModal}
        centered={true}
        classNames={{
          modal: "bg-black flex flex-col justify-center items-center",
        }}
        size="lg"
        radius="md"
      >
        hi
      </Modal>
    </div>
  );
};
export default BuddyDetailsModal;
