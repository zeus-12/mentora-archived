import { Group, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons";

const NewSubmission = () => {
  return (
    <div>
      {/* course name  */}
      {/* course id  */}
      <p className="text-3xl font-semibold tracking-tighter">Add Materials!</p>

      <Dropzone
        onDrop={(files) => console.log("accepted files", files, typeof files)}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
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
    </div>
  );
};
export default NewSubmission;
