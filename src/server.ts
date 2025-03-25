// IMPORTS.
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { connectPrimaryDB } from "./utils/connectPrimaryDB";

// SERVER.
const port: number = Number(process.env.PORT) || 8000;

const startServer = async(): Promise<void> => {
    try {
        app.listen(port, () => {
            console.log(`Server is up and running on PORT: ${port}`);
        });
        await connectPrimaryDB();
    } catch (error) {
        console.error("Error during server startup: ", error);
        process.exit(1);
    };
};

(async () => {
    await startServer();
})();