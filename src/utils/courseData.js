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
