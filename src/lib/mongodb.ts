import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_MONGODB_URI;
const client = new MongoClient(uri);
let dbInstance: any = null;

export async function getDb() {
  if (!dbInstance) {
    await client.connect();
    dbInstance = client.db();
  }
  return dbInstance;
}
