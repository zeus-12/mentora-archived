import { TypographyStylesProvider } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DoubtDetailsPage = () => {
  const router = useRouter();

  const { doubtId } = router.query;

  const [doubt, setDoubt] = useState(null);

  useEffect(() => {
    if (!doubtId) return;

    const fetchDoubtData = async () => {
      const res = await fetch(`/api/doubt/${doubtId}`);
      const data = await res.json();
      setDoubt(data.data);
    };
    fetchDoubtData();
  }, [doubtId]);
  return (
    <div>
      {doubt && (
        <div>
          <p>{doubt.title}</p>
          {/* <p>{doubt.doubt}</p> */}
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: doubt.doubt }} />
          </TypographyStylesProvider>
        </div>

        // add comments below
      )}
    </div>
  );
};
export default DoubtDetailsPage;
