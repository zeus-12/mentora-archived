const mapping = require("./name-id-map.json");

const res = [];

Object.keys(mapping).map((item) => {
  if (!res.includes(item.slice(0, 2))) {
    res.push(item.slice(0, 2));
  }
});

console.log(res);
