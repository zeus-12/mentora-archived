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
    <div className="flex justify-between md:mx-4 mx-2 lg:mx-6 xl:mx-8">
      <p className="text-4xl">
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
  );
};
export default User;
