import { Avatar as AvatarMantine } from "@mantine/core";
import { generateAvatarText } from "../utils/helper";

export const Avatar = (userName) => {
  return (
    <div>
      <AvatarMantine size={40} color="blue">
        {generateAvatarText(userName)}
      </AvatarMantine>
    </div>
  );
};
