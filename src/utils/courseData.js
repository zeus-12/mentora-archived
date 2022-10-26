const courseNameIdMap = require("../../name-id-map.json");

export const availableBranches = [
  "all",
  "AE",
  "AM",
  "BT",
  "CE",
  "CH",
  "CS",
  "CY",
  "ED",
  "EE",
  "EP",
  "GN",
  "HS",
  "MA",
  "ME",
  "MM",
  "NA",
  "OE",
  "PH",
  // "AS",

  // "ID",
  // "IL",

  // "NU",
  // "CA",
  // "CD",

  // "NE",

  // "IN",

  // "IG",

  // "EC",

  // "BS",
  // "MP",
  // "MS",
  // "HM",

  // "WS",
  // "MT",
  // "IT",
  // "PE",
  // "NC",
  // "NS",
];

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
