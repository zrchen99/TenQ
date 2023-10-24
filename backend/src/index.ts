import app from "./app.js";
import { connectDB } from "./db/connection.js";

const PORT = process.env.PORT || 5000;
//connections and listeners
connectDB().then(() => {
  console.log("Connected to MongoDB")
  app.listen(PORT, () => console.log("Server Running"));
}).catch((e) => console.log(e));

