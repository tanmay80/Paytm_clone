const mainRouter = require("./routes/index");

const cors = require("cors")
const express= require("express");
const app=express();

app.use(cors());
app.use(express.json())
app.use("/api/v1",mainRouter)

app.listen(3000, () => {
  console.log(`listening on port 3000`)
})