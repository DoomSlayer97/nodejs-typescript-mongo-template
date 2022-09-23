import 'dotenv/config'
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { apiRoutes } from "./routes"


async function init() {

  await mongoose.connect("mongodb://localhost:27017/dbpractice");

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(apiRoutes);

  app.listen(process.env["PORT"], () => {
    console.log(`Server on port ${process.env["PORT"]}`)
  });

}

init();