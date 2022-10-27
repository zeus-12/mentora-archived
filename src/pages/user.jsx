import { Button } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const User = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const signoutHandler = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <p className="text-4xl tracking-tight font-semibold">
          Hello, <span className="text-green-600">{session?.user?.name}</span>
        </p>
        <Button
          className="hover:bg-green-400 text-green-400 border-green-400 hover:text-white"
          color="#22c55e"
          onClick={signoutHandler}
          variant="outline"
        >
          Sign Out
        </Button>
      </div>
      <div className="flex mt-4 gap-4 flex-col">
        <div className="">
          <p className="text-2xl font-semibold">Buddies Applied</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">Doubts Asked</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">Buddies Applied</p>
        </div>
      </div>
    </div>
  );
};
export default User;
