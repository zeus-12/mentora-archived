export default async function handler(req, res) {
  if (req.method === "DELETE") {
  } else {
    res.status(400).json({ error: "Invalid Method" });
  }
}
