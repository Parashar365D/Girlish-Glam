import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const databaseConnect = async () => {
  try {
    await mongoose.connect(process.env.DATA_BASE_URI);
    console.log("DataBase Connect");
  } catch (error) {
    console.log("Error connecting database: ", error);
    process.exit(1);
  }
}

export default databaseConnect;