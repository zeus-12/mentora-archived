import { Button, Group, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons";
import { useRouter } from "next/router";
import { useState } from "react";

const NewSubmission = () => {
  const router = useRouter();
  const { courseId } = router.query;

  const [files, setFiles] = useState([]);

  const handleUpload = (file) => {
    let uploadedFiles = [];
    file.map((item) => {
      console.log(file);
      uploadedFiles.push(URL.createObjectURL(item));
      // uploadedFiles.push(item);
    });
    setFiles((state) => [...state, ...uploadedFiles]);
  };

  const submitHandler = async () => {
    const res = fetch(`/api/resource/${courseId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ files }),
    });
  };

  return (
    <div>
      {files.length > 0 &&
        files.map((url, index) => {
          console.log(url);

          // check filetype and if image use img tag, for pdf figure out some way to get its coverpage thumbnail
          // also add onclick for both which would open up a modal for preview.

          // return <img className="w-64 h-64" src={url} key={index} alt="text" />;
          return <embed src={url} key={index} width="250" height="200" />;
          // console.log(getImageUrl(fileObject));
        })}

      {/* {files[0] && <img className="w-64 h-64" src={files[0]} alt="text" />} */}
      {/* course name  */}
      {/* course id  */}
      <p className="text-3xl font-semibold tracking-tighter mb-2">
        Add Materials!
      </p>

      <Dropzone
        onDrop={(file) => handleUpload(file)}
        // onDrop={(files) => console.log("accepted files", files, typeof files)}
        // todo for reject show notification
        // onReject={(files) => console.log("rejected files", files)}
        maxSize={15 * 1024 ** 2}
        accept={PDF_MIME_TYPE}
        // onChange={handleUpload}
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
      <Button onClick={submitHandler}>Submit</Button>
    </div>
  );
};
export default NewSubmission;
