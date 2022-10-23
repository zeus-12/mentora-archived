import { v4 as uuidv4 } from "uuid";
import getStream from "into-stream";

const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

export default async function handler(req, res) {
  const { courseId } = req.query;
  if (!courseId) {
    return res.status(400).json({ message: "Missing course ID" });
  }

  if (req.method === "GET") {
    // get names of all blob files
    const getBlobNames = async () => {
      const accountKey = process.env.AZURE_ACCOUNT_KEY;
      if (!accountKey) throw Error("Azure Storage accountKey not found");

      const sharedKeyCredential = new StorageSharedKeyCredential(
        "mentora",
        accountKey
      );

      const blobServiceClient = new BlobServiceClient(
        `https://mentora.blob.core.windows.net`,
        sharedKeyCredential
      );

      const containerClient = blobServiceClient.getContainerClient("course");

      const res = [];

      for await (const blob of containerClient.listBlobsFlat()) {
        const tempBlockBlobClient = containerClient.getBlockBlobClient(
          blob.name
        );
        res.push(tempBlockBlobClient.url);
        //   console.log(tempBlockBlobClient.url);
      }

      return res;
    };

    const data = await getBlobNames();
    res.status(200).json(data);
  } else if (req.method === "POST") {
    const { files } = req.body;
    console.log(files);
    // return;
    const accountKey = process.env.AZURE_ACCOUNT_KEY;
    if (!accountKey) throw Error("Azure Storage accountKey not found");
    const sharedKeyCredential = new StorageSharedKeyCredential(
      "mentora",
      accountKey
    );
    const blobServiceClient = new BlobServiceClient(
      `https://mentora.blob.core.windows.net`,
      sharedKeyCredential
    );
    const containerClient = blobServiceClient.getContainerClient("course");

    files.map(async (item) => {
      const blobName = `${courseId}/` + uuidv4() + ".pdf";
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Display blob name and url
      console.log("uploading");
      // upload pdf item to blob storage
      const stream = getStream(item);
      const streamLength = item.length;
      await blockBlobClient
        .uploadStream(stream, streamLength)
        .catch((error) => {
          throw new Error("Error uploading image to Azure Storage");
        });
      console.log("uploaded");

      // const stream = getStream(item);
      // const streamLength = item.length;
      // await blockBlobClient
      //   .uploadStream(stream, streamLength)
      //   .catch((error) => {
      //     throw new Error("Error uploading image to Azure Storage");
      //   });

      // const uploadBlobResponse = await blockBlobClient.upload(
      //   item,
      //   item.length
      // );
      // console.log(
      //   `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
      // );
    });
  } else {
    res.status(400).json({ error: "Invalid Method" });
  }
}
