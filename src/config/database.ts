import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/tu_database";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Base de datos conectada exitosamente");
  } catch (error) {
    console.error("Error conectando a la base de datos:", error);
    process.exit(1);
  }
};
