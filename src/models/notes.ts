import { MongoClient, Db } from "mongodb";

const dbURI = 'mongodb://localhost:27017/notes';

let dbConnection: Db | null = null;

export const connectDb = async (cb: (err?: unknown) => void): Promise<void> => {
  try {
    const client = await MongoClient.connect(dbURI);
    dbConnection = client.db();
    cb();
  } catch (err) {
    console.error("Database error", err);
    cb(err);
  }
};

export const getDb = (): Db => {
  if (!dbConnection)
    throw new Error("Database not connected yet!");

  return dbConnection;
};
