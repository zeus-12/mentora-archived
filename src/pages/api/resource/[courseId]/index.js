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
  } else {
    res.status(400).json({ error: "Invalid Method" });
  }
}
