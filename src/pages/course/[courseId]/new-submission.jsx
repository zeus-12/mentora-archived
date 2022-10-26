import { BlobServiceClient } from "@azure/storage-blob";
import { Button, Group, Image, SimpleGrid, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconTemperature, IconUpload, IconX } from "@tabler/icons";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { buttonOutlineClasses } from "../../../utils/constants";
import { prettifyId } from "../../../utils/helper";

const NewSubmission = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const handleUpload = (file) => {
    setFiles((prevState) => [...prevState, ...file]);
  };

  const uploadFileToBlob = useCallback(async (file, newFileName) => {
    const containerName = "course";
    const sasToken =
      "?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-10-24T15:22:58Z&st=2022-10-24T07:22:58Z&spr=https,http&sig=dzR4kiPuO2UGNE3Wpjx4nptx%2B2kghqJt5Xg5Yt6Nvnk%3D";
    setLoading(true);
    if (!file) {
      console.log("No FILE");
    } else {
      const blobService = new BlobServiceClient(
        `https://mentora.blob.core.windows.net/?${sasToken}`
      );

      const containerClient = blobService.getContainerClient(containerName);
      const blobClient = containerClient.getBlockBlobClient(newFileName);
      const options = { blobHTTPHeaders: { blobContentType: file.type } };

      const data = await blobClient.uploadData(file, options);
      console.log(data);

      await getBlobsInContainer(containerClient);
      const blobs = await getBlobsInContainer(containerClient);
      console.log(blobs);
      // setBlobs(blobs);
      console.log("uploaded");
    }
    setLoading(false);
  }, []);

  const submitHandler = async () => {
    files.map((file) => {
      const newFileName = `${courseId}/${file.name}`;
      uploadFileToBlob(file, newFileName);
    });
  };

  const previews = files.map((file, index) => {
    if (IMAGE_MIME_TYPE.includes(file.type)) {
      const imageUrl = URL.createObjectURL(file);
      return (
        <Image
          alt={file.name}
          key={index}
          src={imageUrl}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        />
      );
    } else if (PDF_MIME_TYPE.includes(file.type)) {
      return (
        <div key={file} className="flex flex-col items-center justify-center">
          <IconPhoto size={40} />
          <p>{file.name}</p>
          <embed src={file} />
        </div>
      );
    }
  });

  return (
    <div className="px-1 sm:px-2 md:px-4 lg:px-6 xl:px-32">
      <p>{prettifyId(courseId)}</p>
      <div className="flex justify-between">
        <p className="text-3xl font-semibold tracking-tighter mb-2">
          Add Materials!
        </p>
        <Button className={buttonOutlineClasses} onClick={submitHandler}>
          Submit
        </Button>
      </div>

      <Dropzone
        onDrop={(file) => handleUpload(file)}
        // onDrop={(files) => console.log("accepted files", files, typeof files)}
        // todo for reject show notification
        // onReject={(files) => console.log("rejected files", files)}
        maxSize={15 * 1024 ** 2}
        accept={[...PDF_MIME_TYPE, ...IMAGE_MIME_TYPE]}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: 220, pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload size={50} stroke={1.5} color={"blue"} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={50} stroke={1.5} color={"blue"} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={50} stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>

      <SimpleGrid
        className="gap-8"
        cols={4}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        mt={previews.length > 0 ? "xl" : 0}
      >
        {previews}
      </SimpleGrid>
    </div>
  );
};
export default NewSubmission;
