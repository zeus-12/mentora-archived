import { Button, TypographyStylesProvider } from "@mantine/core";
import { data } from "autoprefixer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoaderComponent from "../../components/LoaderComponent";
import { buttonOutlineClasses } from "../../utils/tailwindClasses";

const DoubtDetailsPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user?.email;
  const { doubtId } = router.query;

  const [doubt, setDoubt] = useState(null);

  useEffect(() => {
    console.log(doubtId);
    if (!doubtId) return;

    const fetchDoubtData = async () => {
      const res = await fetch(`/api/doubt/${doubtId}`);
      const data = await res.json();
      setDoubt(data.data);
    };
    fetchDoubtData();
  }, [doubtId]);

  const toggleDoubtStatus = async () => {
    if (!doubtId) return;
    if (!session || doubt.user !== user) {
      // todo
      // show notifcation
      return;
    }

    const res = await fetch(`/api/doubt/${doubtId}/resolve`, { method: "PUT" });
    const updatedDoubtData = await res.json();

    if (updatedDoubtData.error) {
      // todo show notification
      return;
    }
    setDoubt(updatedDoubtData);
  };

  if (!doubt)
    return (
      <div className="flex h-[90vh]">
        <LoaderComponent />
      </div>
    );
  return (
    <div>
      {doubt && (
        <div>
          <div className="flex justify-between">
            <p className="text-3xl font-semibold">{doubt.title}</p>
            {console.log(user, doubt.user, doubt.status)}
            {user === doubt.user && doubt.status === "PENDING" && (
              <Button
                onClick={toggleDoubtStatus}
                className={buttonOutlineClasses}
              >
                Mark as Resolved
                {/* {doubt.status === "RESOLVED" ? not : ""} */}
              </Button>
            )}

            {doubt.status === "RESOLVED" && (
              <p className="text-green-500 font-semibold">Resolved</p>
            )}
          </div>
          <p className="text-xl text-gray-400">{doubt.doubt}</p>

          {/* <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: doubt.doubt }} />
          </TypographyStylesProvider> */}
        </div>

        // add comments below
      )}
    </div>
  );
};
export default DoubtDetailsPage;
