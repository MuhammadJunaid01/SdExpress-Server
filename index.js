const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://abbas:t43VVdhzTeg35Haf@cluster0.oisx1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("mongo pass and name", uri);
async function run() {
  try {
    await client.connect();
    const database = client.db("sdExpress");
    const texiTicketCollection = database.collection("texiTicket");
    app.get("/texiTicket", async (req, res) => {
      const query = {};
      const cursor = texiTicketCollection.find(query);
      const result = await cursor.toArray();
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
app.get("/helo", (req, res) => {
  res.send("hello testing api");
});
app.get("/", (req, res) => {
  res.send("Fly Earth server is runnig ");
});
run().catch(console.dir);
app.listen(port, () => {
  console.log("server is runnig the port", port);
});
