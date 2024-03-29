import { errorNotification } from "../utils/notification";

export const getFetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((err) => errorNotification(err.message));

export const options = {
  shouldRetryOnError: false,
  revalidateOnFocus: false,
};

export const disableAutoRevalidate = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};
