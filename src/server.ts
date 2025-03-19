// IMPORTS.
import app from "./app";
import dotenv from "dotenv";

// SERVER.
dotenv.config();
const port: number = Number(process.env.PORT) || 8000;

const startServer = async(): Promise<void> => {
    try {
        // TODO - IMPLEMENT MONGO_DB CONNECTION
        app.listen(port, () => {
            console.log(`Server is up and running on PORT: ${port}`);
        });
    } catch (error) {
        console.error("Error during server startup: ", error);
        process.exit(1);
    };
};

startServer();