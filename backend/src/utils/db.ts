import mongoose from "mongoose";


export const ConnectDB: () => Promise<void> = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string)
    console.log(" 🚀 MONGODB CONNECTION SUCCESS")
  } catch (error: any) {
    console.log(" ❌ MONGODB CONNECTION FAILED")
    process.exit(1)
  }
}   

