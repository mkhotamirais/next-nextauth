// import mongoose from "mongoose";

// const db = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI!);
//     console.log("connected to mongodb");
//   } catch (error: any) {
//     console.error(error.message);
//     process.exit(1);
//   }
// };

// export default db;

import mongoose from "mongoose";

const db = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000, // Contoh opsi yang valid
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default db;
