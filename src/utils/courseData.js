const courseNameIdMap = require("../../name-id-map.json");

export const availableBranches = [
  "all",
  // "AS",
  "MA",
  "AE",
  // "ID",
  // "IL",
  "AM",
  "GN",
  "BT",
  // "NU",
  // "CA",
  // "CD",
  "CE",
  "CH",
  // "NE",
  "CS",
  // "IN",
  "CY",
  "ED",
  "EE",
  // "IG",
  "EP",
  // "EC",
  "HS",
  // "BS",
  // "MP",
  // "MS",
  // "HM",
  "ME",
  // "WS",
  "MM",
  // "MT",
  // "IT",
  // "PE",
  "OE",
  // "NC",
  // "NS",
  "NA",
  "PH",
];

export const searchFilteredDoubts = (searchQuery, data) => {
  if (searchQuery.trim().length === 0) {
    return data;
  } else {
    return data?.filter(
      (item) =>
        courseNameIdMap[item.course_id.toUpperCase()]
          // item.course_name
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
