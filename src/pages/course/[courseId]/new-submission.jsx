import { BlobServiceClient } from "@azure/storage-blob";
import { Button, Group, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { buttonOutlineClasses } from "../../../utils/tailwindClasses";
import { prettifyId } from "../../../utils/helper";

const NewSubmission = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const handleUpload = (file) => {
    // console.log(file);
    // let uploadedFiles = [];
    // file.map((item) => {
    //   console.log(file);
    //   // uploadedFiles.push(URL.createObjectURL(item));
    //   uploadedFiles.push(item);
    // });
    // setFiles((state) => [...state, ...file]);
    setFiles(file);
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

  console.log(files);
  const submitHandler = async () => {
    files.map((file) => {
      const newFileName = `${courseId}/${file.name}`;
      uploadFileToBlob(file, newFileName);
    });
  };

  return (
    <div>
      {/* {files.length > 0 &&
        files.map((url, index) => {
          console.log(url);

          // check filetype and if image use img tag, for pdf figure out some way to get its coverpage thumbnail
          // also add onclick for both which would open up a modal for preview.

          // return <img className="w-64 h-64" src={url} key={index} alt="text" />;
          return <embed src={url} key={index} width="250" height="200" />;
        })} */}

      {/* {files[0] && <img className="w-64 h-64" src={files[0]} alt="text" />} */}
      {/* course name  */}
      <p>{prettifyId(courseId)}</p>
      <p className="text-3xl font-semibold tracking-tighter mb-2">
        Add Materials!
      </p>

      <Dropzone
        onDrop={(file) => handleUpload(file)}
        // onDrop={(files) => console.log("accepted files", files, typeof files)}
        // todo for reject show notification
        // onReject={(files) => console.log("rejected files", files)}
        maxSize={15 * 1024 ** 2}
        accept={(IMAGE_MIME_TYPE, PDF_MIME_TYPE)}
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
      <Button className={buttonOutlineClasses} onClick={submitHandler}>
        Submit
      </Button>
    </div>
  );
};
export default NewSubmission;
