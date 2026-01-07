import { AppError } from "@/utils/apperror.js"; // Adicionado .js
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandling(error: any, req: Request, res: Response, next: NextFunction) {
    // 1. Erros operacionais da aplicação
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message
        });
    }

    // 2. Erros de validação do Zod
    if (error instanceof ZodError) {
        return res.status(400).json({ 
            message: "validation error", 
            issues: error.format() 
        });
    }

    // 3. Erros desconhecidos (Fallback)
    return res.status(500).json({
        message: "Internal server error"
    });
}