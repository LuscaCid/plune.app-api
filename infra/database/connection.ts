import { connect } from "mongoose";
import { AppError } from "../utils/AppError";
import { Logger } from "../../domain/config/logger";
const uri = process.env["MONGO_URI"] ?? "";
const dbName = process.env["DB_NAME"] ?? "plune-app"
if (!uri) {
  throw new AppError("enviroment variable not found for conneciton")
}

export const connectDatabase = async () => {
  try {
    await connect(uri, { dbName });
    console.log("Connected to the database");
  } catch (err: unknown) {
    Logger.error(err);
  }
}