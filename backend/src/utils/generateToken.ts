import jwt, { SignOptions} from "jsonwebtoken";

export const generateToken = (userId: string) => {
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d" as any,
  };

  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET as string, 
    options
  );
};
