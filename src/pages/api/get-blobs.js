// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getBlobNames } from "../../utils/storageHelper";

export default async function handler(req, res) {
  const data = await getBlobNames();
  // console.log(URL.createObjectURL(data[0].file));
  console.log(data);
  res.status(200).json(JSON.stringify(data));
}
