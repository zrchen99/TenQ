import { connect, disconnect } from "mongoose";
async function connectDB() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (e) {
        console.log(e)
        throw new Error("Failed connect to MongoDB");
    }
};

async function disconnectDB() {
    try {
        await disconnect();
    } catch (e) {
        console.log(e)
        throw new Error("Failed disconnect to MongoDB");
    }
}

export { connectDB, disconnectDB };