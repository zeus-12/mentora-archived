import { Loader } from "@mantine/core";
import { green_400 } from "../utils/constants";

const LoaderComponent = () => {
  return (
    <div className="flex-grow h-[80vh] flex items-center justify-center">
      <Loader color={green_400} size="xl" variant="dots" />
    </div>
  );
};
export default LoaderComponent;
