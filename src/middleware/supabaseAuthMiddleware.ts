import supabase from "@/config/supabaseClient";
import { NextFunction, Request, Response } from "express";

export const supabaseAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  let { data, error } = await supabase.auth.getUser(token);
  if (error) {
    console.error("Failed to get supabase auth user", error);
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    let authId = data?.user?.id;
    return next();
  }
};