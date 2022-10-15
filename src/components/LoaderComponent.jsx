import { Loader } from "@mantine/core";

const LoaderComponent = () => {
  return (
    <div className="h-[92vh] flex items-center justify-center">
      <Loader size="xl" variant="dots" />
    </div>
  );
};
export default LoaderComponent;
