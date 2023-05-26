import { NextFunction, Request, Response } from "express";

export const setCorsOptions = (req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = ['https://epos-khai.onrender.com', 'http://localhost:4200'];
  const origin = req.headers.origin ?? '';

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    return next();
  }
}