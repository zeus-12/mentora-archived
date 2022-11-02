//todo
export default async function handler(req, res) {
  return;
  if (req.method === "DELETE") {
  } else {
    res.status(400).json({ error: "Invalid Method" });
  }
}
