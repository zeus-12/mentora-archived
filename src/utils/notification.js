import { IconX } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";

export const errorNotificationProps = {
  icon: <IconX size={18} />,
  color: "red",
};

export const notSignedInNotification = (message) => {
  showNotification({
    title: "Please Sign In",
    message,
    ...errorNotificationProps,
  });
};
