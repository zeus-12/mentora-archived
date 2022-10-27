import { Loader } from "@mantine/core";
import { green_400 } from "../utils/constants";

const LoaderComponent = () => {
  return (
    <div className="flex-grow flex-1 flex items-center justify-center">
      <Loader color={green_400} size="md" variant="bars" />
    </div>
  );
};
export default LoaderComponent;
