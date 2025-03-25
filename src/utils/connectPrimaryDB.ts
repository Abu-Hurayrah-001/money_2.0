// IMPORTS.
import mongoose from "mongoose";

// CONNECT TO MONGO_DB.
const dbURI: string = process.env.MONGO_URI || "";
if (dbURI == "") {
    throw new Error("MONGO_URI is not defined in the environment variables.");
};

let retries = 10;

export const connectPrimaryDB = async (): Promise<void> => {
    try {
        const mongoConnection = await mongoose.connect(dbURI);
        console.log(`Database connected to: ${mongoConnection.connection.host}`);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.log(`Retrying...(retries left: ${retries}). Error: ${errorMessage}`);
        retries -= 1;
        if (retries >= 0) {
            setTimeout(connectPrimaryDB, 5000);
        } else {
            console.error("Database connection reattempts failed.");
            process.exit(1);
        };
    };
};