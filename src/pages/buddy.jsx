import { Button } from "@mantine/core";

const Buddy = () => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div>
          <p className="text-4xl font-semibold">
            Having trouble with your studies? <br />
            <span>Get yourself a Study/Tutor Buddy</span>
          </p>
          <Button
            variant="outline"
            className="text-green-500 mt-2 border-green-500 hover:bg-green-500 hover:text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Apply Now!
          </Button>
        </div>
        {/* image to right */}
      </div>
      <p className="mt-16 text-4xl text-center">
        Interested in helping others out?
      </p>
      {/* DISPLAY ALL THE DATA HERE */}
    </div>
  );
};
export default Buddy;
