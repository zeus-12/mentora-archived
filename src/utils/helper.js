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

const courseNameIdMap = require("../../name-id-map.json");

export const filterOnSearch = (searchQuery, data, initial) => {
  if (searchQuery.trim().length === 0) {
    if (initial) return initial;
    return data;
  } else {
    return data?.filter(
      (item) =>
        (item.course_name || courseNameIdMap[item.course_id.toUpperCase()])
          ?.replaceAll(" ", "")
          .toLowerCase()
          .includes(searchQuery.replaceAll(" ", "").toLowerCase()) ||
        item.course_id
          .replaceAll(" ", "")
          .toLowerCase()
          .includes(searchQuery.replaceAll(" ", "").toLowerCase())
    );
  }
};

export const postRequestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
