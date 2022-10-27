export const getFetcher = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((data) => data.data);

export const options = {
  shouldRetryOnError: false,
  revalidateOnFocus: false,
};
