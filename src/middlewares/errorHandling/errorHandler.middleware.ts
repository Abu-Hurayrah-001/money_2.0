// IMPORTS.
import { Response } from "express";

// GENERAL ERROR HANDLING.
export const errorHandler = (
    err: any,
    res: Response,
): void => {
    let statusCode: number = err.statusCode || 500;
    let message: string = err.message || "Internal server error.";

    // For unexpected errors in production.
    if (process.env.NODE_ENV != "development" && !err.isOperational) {
        console.error("Unexpected error: ", err.message); // Displaying original error to developers.
        statusCode = 500;
        message: "Something went wrong." // Generic error message for users.
    };

    // For all errors in development.
    if (process.env.NODE_ENV === "development") {
        console.error("Error details: ", err);
    };

    // Sending response.
    res.status(statusCode).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};