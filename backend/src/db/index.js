import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);



export const DB_Connection = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      "!! MongoDB Connection Successfully !! DB HOST:",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error("FAILED TO CONNECT DATABASE >>>", error);
    throw error;
  }
};
