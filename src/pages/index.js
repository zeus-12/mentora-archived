import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [blobs, setBlobs] = useState([]);

  useEffect(() => {
    const getBlobs = async () => {
      const res = await fetch("/api/get-blobs");
      const data = await res.json();
      setBlobs(data);
      console.log(data);
    };
    getBlobs();
  }, []);
  return (
    <div>
      <Head>
        <title>Mentora</title>
        <meta name="description" content="Acads app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {blobs.length > 0 &&
          blobs.map((blob) => (
            <div key={blob.name}>
              <p>{blob.name}</p>
              <img src={createObjectURL(blob.file)} alt=""></img>
            </div>
          ))}
      </div>
      <p className="text-blue-300">hello</p>
    </div>
  );
}
