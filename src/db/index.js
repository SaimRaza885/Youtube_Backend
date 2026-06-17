import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const buildMongoUri = () => {
  const url = process.env.MONGODB_URL;
  const [base, query] = url.split("?");
  return query ? `${base}/${DB_NAME}?${query}` : `${base}/${DB_NAME}`;
};

export const DB_Connection = async () => {
  try {
    const connectionInstance = await mongoose.connect(buildMongoUri());
    console.log(
      "!! MongoDB Connection Succeeded !! DB HOST:",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error("FAILED TO CONNECT DATABASE >>>", error);
    throw error;
  }
};
