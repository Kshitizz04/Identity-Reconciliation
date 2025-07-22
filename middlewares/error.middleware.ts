import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomError.js';

// NOTE: Got this done by copilot, but the CustomError and CustomResponse classes are my standard approach, I use them across all my projects for consistent error handling.

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        let error = { ...err };
        error.message = err.message;
        console.error(err);

        // Drizzle/Neon unique constraint violation
        // Postgres error code for unique violation: '23505'
        if (err.code === '23505') {
            const message = "Duplicate field value entered";
            error = new CustomError(message, 400);
        }

        // Drizzle/Neon not-null constraint violation
        // Postgres error code for not-null violation: '23502'
        if (err.code === '23502') {
            const message = "Missing required field";
            error = new CustomError(message, 400);
        }

        // Drizzle/Neon foreign key violation
        // Postgres error code for foreign key violation: '23503'
        if (err.code === '23503') {
            const message = "Invalid reference to related resource";
            error = new CustomError(message, 400);
        }

        // Drizzle/Neon check constraint violation
        // Postgres error code for check violation: '23514'
        if (err.code === '23514') {
            const message = "Check constraint failed";
            error = new CustomError(message, 400);
        }

        // General Drizzle query error
        if (err.name === 'DrizzleError' || err.name === 'QueryError') {
            const message = err.message || "Database query error";
            error = new CustomError(message, 500);
        }

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Server Error",
        });
    } catch {
        next(err);
    }
}

export default errorMiddleware;