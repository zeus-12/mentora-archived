import { useCallback, useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";

const containerName = "sample-container";
const sasToken = process.env.NEXT_PUBLIC_STORAGESASTOKEN;
const AZURE_STORAGE_URL = "https://mentora.blob.core.windows.net"

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const useItem = () => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [blobs, setBlobs] = useState([]);

  const getBlobsInContainer = async (containerClient) => {
    const returnedBlobUrls = [];

    for await (const blob of containerClient.listBlobsFlat()) {
      returnedBlobUrls.push(
        `${AZURE_STORAGE_URL}/course/${blob.name}`
      );
    }

    return returnedBlobUrls;
  };

  const uploadFileToBlob = useCallback(
    async (file,newFileName => {
      setLoading(true);
      if (!file) {
        setMessage("No FILE");
      } else {
        const blobService = new BlobServiceClient(
          `${AZURE_STORAGE_URL}/?${sasToken}`
        );

        const containerClient = blobService.getContainerClient(containerName);
        await containerClient.createIfNotExists({
          access: "container",
        });

        const blobClient = containerClient.getBlockBlobClient(newFileName);
        const options = { blobHTTPHeaders: { blobContentType: file.type } };

        await blobClient.uploadData(file, options);

        const blobs = await getBlobsInContainer(containerClient);
        setBlobs(blobs);
        setMessage("uploaded");
      }
      setLoading(false);
    },
    []
  );

  const getBlobs = useCallback(async () => {
    setLoading(true);
    const blobService = new BlobServiceClient(
      `${AZURE_STORAGE_URL}/?${sasToken}`
    );

    const containerClient =
      blobService.getContainerClient(containerName);

    const blobs = await getBlobsInContainer(containerClient);
    setBlobs(blobs);
    setLoading(false);
  }, []);

  const getItems = useCallback(async () => {
    setLoading(true);
    await axios
      .get("/api/items")
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        setMessage(`failed: ${err}`);
      });
    setLoading(false);
  }, []);

  const registerItem = useCallback(async (name) => {
    setLoading(true);
    const requestData = {
      name: name,
    };
    await axios
      .post("/api/register", requestData, { headers })
      .then((res) => {
        setMessage("registered!");
      })
      .catch((err) => {
        setMessage(`failed: ${err}`);
      });
    setLoading(false);
  }, []);

  return {
    getItems,
    registerItem,
    uploadFileToBlob,
    getBlobs,
    items,
    message,
    loading,
    blobs,
  };
};
