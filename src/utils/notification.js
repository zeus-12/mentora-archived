import { IconCheck, IconX } from "@tabler/icons";
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

export const errorNotification = (message) => {
  showNotification({
    title: "Error",
    message,
    ...errorNotificationProps,
  });
};

export const successNotification = (message) => {
  showNotification({
    title: "Success",
    message,
    color: "green",
    icon: <IconCheck size={18} />,
  });
};
