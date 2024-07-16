import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("connected to mongodb");
  } catch (error: any) {
    console.error(error.message);
  }
};

export default db;
