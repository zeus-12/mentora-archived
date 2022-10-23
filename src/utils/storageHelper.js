const writeStreamToAzureStorage = async (
  fileName,
  imageBuffer,
  azureContainerName
) => {
  const blobFile = new BlockBlobClient(
    azureStorageConnectionUrl,
    azureContainerName,
    fileName
  );

  const stream = getStream(imageBuffer);
  const streamLength = imageBuffer.length;

  await blobFile.uploadStream(stream, streamLength).catch((error) => {
    throw new Error("Error uploading image to Azure Storage");
  });

  return blobFile;
};

export const uploadBlob = async (image, productId) => {
  if (!image) {
    throw new Error("No image found");
  }

  const { ext } = path.parse(image.originalname);

  if (![".jpg", ".jpeg", ".png"].includes(ext)) {
    throw new Error("Invalid image format");
  }

  const fileName = `${uuidv4()}${ext}`;
  const azureContainerName = "products";
  var thumbnailBlobFile = null;
  var originalBlobFile = null;

  try {
    const thumbnail = await generateThumbnailImage(image);
    const original = await generateOriginalImage(image);

    thumbnailBlobFile = await writeStreamToAzureStorage(
      `${productId}/thumbnails/${fileName}`,
      thumbnail,
      azureContainerName
    );

    originalBlobFile = await writeStreamToAzureStorage(
      `${productId}/originals/${fileName}`,
      original,
      azureContainerName
    );
  } catch (error) {
    throw new Error("Error uploading image to Azure Storage");
  }

  if (!thumbnailBlobFile || !originalBlobFile) {
    throw new Error("No image returned");
  }

  return {
    originalImageUrl: originalBlobFile.url,
    thumbnailImageUrl: thumbnailBlobFile.url,
  };
};
