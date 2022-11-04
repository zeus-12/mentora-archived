import { Badge, Button } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSwr from "swr";
import BuddyCard from "../components/BuddyCard";
import getFetcher from "../utils/swr";

const User = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [buddyData, setBuddyData] = useState(null);
  // const { data: buddyData } = useSWR("/api/buddy/user", getFetcher);

  const signoutHandler = () => {
    signOut();
    router.push("/");
  };

  useEffect(() => {
    const fetchBuddyData = async () => {
      const res = await fetch("/api/buddy/user", {
        method: "GET",
      });

      const data = await res.json();
      setBuddyData(data.data);
    };
    fetchBuddyData();
  }, [session]);

  // useEffect(() => {
  //   const getUserData = async () => {
  //     const res = await fetch("/api/user");
  //     const userData = await res.json();
  //     console.log(userData);
  //   };
  //   // const { data: userData, user_error } = useSwr("/api/user", getFetcher);
  //   // if (userData && userData.status === "BANNED") {
  //   //   signOut();
  //   // }
  // }, [session]);

  return (
    <div className="flex-1">
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

      <div className="">
        <p className="text-2xl font-semibold">Your Buddy Requests</p>
        <p className="text-sm text-gray-500">
          You may contact them through their smail
        </p>
        <div className="grid auto-rows-max justify-items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-3">
          {buddyData?.map((buddy) => (
            <div
              key={buddy._id}
              className="bg-gray-900 p-4 hover:scale-[102%] transition transform duration-100 ease-out  flex flex-col gap-1 justify-between space-y-1 rounded-lg"
            >
              <BuddyCard buddy={buddy} />
              <div className="flex justify-between">
                <p>Applied Users</p>
                <Badge color="green" size="md">
                  {buddy.applied_users?.length || 0}
                </Badge>
              </div>
              {buddy.applied_users?.map((applied) => (
                <div key={applied} className="flex flex-col gap-1">
                  <p className="text-gray-400 text-sm">{applied}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default User;
