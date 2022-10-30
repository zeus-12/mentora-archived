import { Image } from "@mantine/core";
import { IMAGE_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto } from "@tabler/icons";

const FilePreview = ({ file }) => {
  if (IMAGE_MIME_TYPE.includes(file.type)) {
    const imageUrl = URL.createObjectURL(file);
    return <Image alt={file.name} src={imageUrl} props={file.name} />;
  } else if (PDF_MIME_TYPE.includes(file.type)) {
    const fileUrl = URL.createObjectURL(file);

    return (
      <div className="flex flex-col items-center justify-center">
        {/* <IconPhoto size={40} /> */}
        <embed className="w-50 h-50" src={fileUrl} />
        <p>{file.name}</p>
      </div>
    );
  }
};
export default FilePreview;
