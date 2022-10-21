const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

// // connect to blob storage
// const connectToStorage = async () => {
//   const accountName = "mentora";
//   const accountKey = process.env.AZURE_ACCOUNT_KEY;
//   if (!accountName) throw Error("Azure Storage accountName not found");
//   if (!accountKey) throw Error("Azure Storage accountKey not found");

//   const sharedKeyCredential = new StorageSharedKeyCredential(
//     accountName,
//     accountKey
//   );

//   const blobServiceClient = new BlobServiceClient(
//     `https://${accountName}.blob.core.windows.net`,
//     sharedKeyCredential
//   );

//   const containerClient = blobServiceClient.getContainerClient("course");
//   return { blobServiceClient, containerClient };
// };

// export const getBlobClient = async (blobName) => {
//   const { containerClient } = await connectToStorage();
//   return containerClient.getBlockBlobClient(blobName);
// };

// get names of all blob files
const getBlobNames = async () => {
  // const { containerClient } = await connectToStorage();

  // const accountKey = process.env.AZURE_ACCOUNT_KEY ;
  const accountKey = "";

  const sharedKeyCredential = new StorageSharedKeyCredential(
    "mentora",
    accountKey
  );

  const blobServiceClient = new BlobServiceClient(
    `https://mentora.blob.core.windows.net`,
    sharedKeyCredential
  );

  // const blobServiceClient = BlobServiceClient.fromConnectionString(accountKey);
  const containerClient = blobServiceClient.getContainerClient("course");

  // const blobs = containerClient.listBlobsFlat();

  const res = [];
  // for await (const blob of blobs) {
  //   // const itemName = await item.name;
  //   const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);

  //   // console.log(`Blob: ${blob.name}`);
  //   // res.push(`https://mentora.blob.core.windows.net/course/${itemName}`);
  // }

  // List the blob(s) in the container.
  for await (const blob of containerClient.listBlobsFlat()) {
    const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
    res.push(tempBlockBlobClient.url);
  }

  return res;
};

console.log(getBlobNames());

// download file
// export const downloadBlobFile = async (blobName) => {
//   const blobClient = await getBlobClient(blobName);

//   // download file
//   await blobClient.downloadToFile(blobName);
// };

// upload new file
// delete file
