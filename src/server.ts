import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.json({ messege: "opa" });
});

app.post("/", (req, res) => {
  return res.json({ message: "rota post" });
});
app.listen(3333, () => console.log("server is running"));
