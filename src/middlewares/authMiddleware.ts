import { Request, Response, NextFunction } from "express";
import { Auth } from "../models/auth";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userToken = req.headers.authorization;
  const authToken = await Auth.getAuthToken();

  if(userToken === authToken){
    next();
  } else {
    res.status(401).json({
      error: 'Unauthorized!'
    });
  }
}         