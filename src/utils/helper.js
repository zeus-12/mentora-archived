export const prettifyId = (id) => {
  if (!id) {
    return;
  }
  return id.slice(0, 2).toUpperCase() + " " + id.slice(2);
};

export const generateAvatarText = (name) => {
  if (!name) {
    return;
  }
  return name
    .split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase()
    ?.slice(0, 2);
};

const name_id_map = require("../../name-id-map.json");

export const getCourseNameFromId = (id) => {
  if (!id) {
    return;
  }
  id = id.toUpperCase();

  if (id in name_id_map) {
    return name_id_map[id];
  } else {
    return;
  }
};
